import { checkApiKey, getServerProfile, trackMessageCount } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { MESSAGE_LIMITS } from "@/lib/tier-limits"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages, userTier } = json as {
    chatSettings: ChatSettings
    messages: any[]
    userTier: string
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.perplexity_api_key, "Perplexity")

    // Check message limits based on user's tier
    const userMessageLimit = MESSAGE_LIMITS[chatSettings.model][userTier]
    const userMessageCount = await trackMessageCount(userTier, chatSettings.model)

    if (userMessageCount >= userMessageLimit) {
      return new Response(
        JSON.stringify({
          message: `Message limit reached for today. Upgrade to get more usage.`
        }),
        { status: 400 }
      )
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
