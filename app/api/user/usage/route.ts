// app/api/user/usage/route.ts
import { getServerProfile } from "@/lib/server/server-chat-helpers";
import { supabase } from "@/lib/supabase/browser-client";

export async function GET(request: Request) {
  try {
    const profile = await getServerProfile();

    console.log("Profile:", profile);

    const { data: messages, error } = await supabase
      .from("messages")
      .select("model, created_at")
      .eq("user_id", profile.user_id);

    console.log("Messages found:", messages?.length);
    console.log("Query error:", error);
    console.log("Raw messages:", messages);

    if (!messages) return new Response("No messages found", { status: 404 });

    const usage = messages.reduce((acc, msg) => {
      acc[msg.model] = (acc[msg.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("Calculated usage:", usage);

    return new Response(JSON.stringify({ usage }), { status: 200 });
  } catch (error) {
    console.error("Usage fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(errorMessage, { status: 500 });
  }
}