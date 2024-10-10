import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"
import { createClient } from "@supabase/supabase-js"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.openai_api_key, "OpenAI")

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

    const openai = new OpenAI({
      apiKey: profile.openai_api_key || "",
      organization: profile.openai_organization_id,
      baseURL: "https://gateway.ai.cloudflare.com/v1/77a0b1436313aeb84549202bdd962b63/pixelverseaisystems/openai",
      // headers: {
      //   'cf-cache-ttl': 172800000
      // }
    });

    const response = await openai.chat.completions.create({
      model: chatSettings.model as ChatCompletionCreateParamsBase["model"],
      messages: messages as ChatCompletionCreateParamsBase["messages"],
      temperature: chatSettings.temperature,
      max_tokens:
        chatSettings.model === "gpt-4-1106-vision-preview" ||
        chatSettings.model === "gpt-4o"
          ? 4096
          : null, // TODO: Fix
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
        "OpenAI API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "OpenAI API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
