import { checkApiKey, getServerProfile, trackMessageCount } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"
import { MESSAGE_LIMITS } from "@/lib/tier-limits"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages, userTier } = json as {
    chatSettings: ChatSettings
    messages: any[]
    userTier: string
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.openai_api_key, "OpenAI")

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
