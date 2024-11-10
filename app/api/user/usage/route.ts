// app/api/user/usage/route.ts
import { getServerProfile } from "@/lib/server/server-chat-helpers"
import { supabase } from "@/lib/supabase/browser-client"

export async function GET(request: Request) {
  try {
    const profile = await getServerProfile()
    
    // Get local midnight in user's timezone
    const now = new Date()
    const localMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    )
    
    // Convert local midnight to UTC for database query
    const utcMidnight = new Date(
      localMidnight.getTime() - localMidnight.getTimezoneOffset() * 60000
    ).toISOString()

    console.log("Local midnight:", localMidnight)
    console.log("UTC query time:", utcMidnight)

    const { data: messages, error } = await supabase
      .from("messages")
      .select("model, created_at")
      .eq("user_id", profile.user_id)
      .gte("created_at", utcMidnight)

    if (error) {
      console.error("Query error:", error)
      throw error
    }

    const usage = messages?.reduce((acc, msg) => {
      acc[msg.model] = (acc[msg.model] || 0) + 1
      return acc
    }, {} as Record<string, number>) || {}

    return new Response(JSON.stringify({ usage }), { status: 200 })
  } catch (error) {
    console.error("Usage fetch error:", error)
    return new Response(String(error), { status: 500 })
  }
}