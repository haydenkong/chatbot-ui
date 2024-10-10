import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.perplexity_api_key, "Perplexity")

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: userProfile, error } = await supabaseAdmin
      .from("profiles")
      .select("tier, messages_sent_today")
      .eq("user_id", profile.user_id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    const userTier = userProfile.tier
    const messagesSentToday = userProfile.messages_sent_today[chatSettings.model] || 0
    const messageLimit = CHAT_SETTING_LIMITS[chatSettings.model].MESSAGE_LIMITS[userTier]

    if (messagesSentToday >= messageLimit) {
      return new Response(
        JSON.stringify({
          message: `You have reached the daily message limit for ${chatSettings.model}. Please upgrade your plan to send more messages.`
        }),
        { status: 400 }
      )
    }

    if (messageLimit - messagesSentToday <= 3) {
      // Display warning if less than 3 messages are left
      console.warn(`${messageLimit - messagesSentToday} Messages Left for today. Upgrade to get more usage.`)
    }

    // Perplexity is compatible the OpenAI SDK
    const perplexity = new OpenAI({
      apiKey: profile.perplexity_api_key || "",
      baseURL: "https://api.perplexity.ai/"
    })

    const response = await perplexity.chat.completions.create({
      model: chatSettings.model,
      messages,
      stream: true
    })

    const stream = OpenAIStream(response)

    // Update messages_sent_today field
    const updatedMessagesSentToday = {
      ...userProfile.messages_sent_today,
      [chatSettings.model]: messagesSentToday + 1
    }

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ messages_sent_today: updatedMessagesSentToday })
      .eq("user_id", profile.user_id)

    if (updateError) {
      throw new Error(updateError.message)
    }

    return new StreamingTextResponse(stream)
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Perplexity API Key not found. Please set it in your profile settings."
    } else if (errorCode === 401) {
      errorMessage =
        "Perplexity API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
