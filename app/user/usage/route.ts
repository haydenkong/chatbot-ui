// app/api/user/usage/route.ts
import { getServerProfile } from "@/lib/server/server-chat-helpers"
import { supabase } from "@/lib/supabase/browser-client"

export async function GET(request: Request) {
    try {
      const profile = await getServerProfile()
      
      // Get start of day in UTC
      const today = new Date()
      today.setUTCHours(0, 0, 0, 0)
  
      const { data: messages } = await supabase
        .from("messages")
        .select("model, created_at")
        .eq("user_id", profile.user_id)
        .gte("created_at", today.toISOString())
  
      if (!messages) return new Response("No messages found", { status: 404 })
  
      // Add debug logging
      console.log("UTC Date used:", today.toISOString())
      console.log("Messages found:", messages.length)
  
      const usage = messages.reduce((acc, msg) => {
        // Debug logging for message dates
        const msgDate = new Date(msg.created_at)
        console.log("Message date:", msgDate.toISOString(), "Model:", msg.model)
        
        acc[msg.model] = (acc[msg.model] || 0) + 1
        return acc
      }, {} as Record<string, number>)
  
      return new Response(JSON.stringify({ usage }), { status: 200 })
    } catch (error: any) {
      console.error("Usage fetch error:", error)
      return new Response(error.message, { status: 500 })
    }
  }