// app/api/user/usage/route.ts
import { createClient } from '@supabase/supabase-js';
import { getServerProfile } from '@/lib/server/server-chat-helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const profile = await getServerProfile()
    const today = new Date()
    const midnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0, 0, 0, 0
    )

    console.log("Profile:", profile)
    console.log("UTC Date used:", midnight.toISOString())

    const { data: messages, error } = await supabase
      .from("messages")
      .select("model, created_at")
      .eq("user_id", profile.user_id)
      .eq("role", "assistant") // Add this line to only count assistant responses
      .gte("created_at", midnight.toISOString())

    console.log("Messages found:", messages?.length)
    console.log("Query error:", error)
    console.log("Raw messages:", messages)

    if (!messages) return new Response("No messages found", { status: 404 })

    const usage = messages.reduce((acc, msg) => {
      acc[msg.model] = (acc[msg.model] || 0) + 1
      return acc 
    }, {} as Record<string, number>)

    console.log("Calculated usage:", usage)

    return new Response(JSON.stringify({ usage }), { status: 200 })
  } catch (error) {
    console.error("Usage fetch error:", error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(errorMessage, { status: 500 })
  }
}