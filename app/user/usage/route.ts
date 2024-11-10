// app/api/user/usage/route.ts
import { getServerProfile } from "@/lib/server/server-chat-helpers"
import { supabase } from "@/lib/supabase/browser-client"

export async function GET(request: Request) {
  try {
    const profile = await getServerProfile()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: messages } = await supabase
      .from("messages")
      .select("model")
      .eq("user_id", profile.user_id)
      .gte("created_at", today.toISOString())

    if (!messages) return new Response("No messages found", { status: 404 })

    const usage = messages.reduce((acc, msg) => {
      acc[msg.model] = (acc[msg.model] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return new Response(JSON.stringify({ usage }), { status: 200 })
  } catch (error: any) {
    return new Response(error.message, { status: 500 })
  }
}