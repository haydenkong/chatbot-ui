import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"

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

    // Check if the user has reached the message limit for the day
    const model = chatSettings.model
    const tier = profile.tier
    const messagesSentToday = profile.messages_sent_today[model] || 0
    const messageLimit = CHAT_SETTING_LIMITS[model].MESSAGE_LIMITS[tier]

    if (messagesSentToday >= messageLimit) {
      return new Response(
        JSON.stringify({
          message: `You have reached the message limit for ${model} today. Please try again tomorrow or upgrade your plan.`
        }),
        { status: 429 }
      )
    }

    const openai = new OpenAI({
      apiKey: profile.openai_api_key || "",
      organization: profile.openai_organization_id,
      baseURL: "https://gateway.ai.cloudflare.com/v1/77a0b1436313aeb84549202bdd962b63/pixelverseaisystems/openai",
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

    // Update the number of messages sent today for the model
    const updatedMessagesSentToday = {
      ...profile.messages_sent_today,
      [model]: messagesSentToday + 1
    }

    await supabaseAdmin
      .from("profiles")
      .update({ messages_sent_today: updatedMessagesSentToday })
      .eq("user_id", profile.user_id)

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
