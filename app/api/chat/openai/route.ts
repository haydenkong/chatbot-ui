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

    const openai = new OpenAI({
      apiKey: profile.openai_api_key || "",
      organization: profile.openai_organization_id,
      baseURL: "https://gateway.ai.cloudflare.com/v1/77a0b1436313aeb84549202bdd962b63/pixelverseaisystems/openai",
      // headers: {
      //   'cf-cache-ttl': 172800000
      // }
    });

    // Before the OpenAI call
    const isO1Model = chatSettings.model === "o1-preview" || chatSettings.model === "o1-mini";
    const isO3Model = chatSettings.model === "o3-mini";
    const isO4Model = chatSettings.model === "o4-mini-2025-04-16";
    const shouldFilterSystemMessages = isO1Model || isO4Model;
    const filteredMessages = shouldFilterSystemMessages
      ? messages.filter(msg => msg.role !== 'system')
      : messages;

    const response = await openai.chat.completions.create({
      model: chatSettings.model as ChatCompletionCreateParamsBase["model"],
      messages: filteredMessages as ChatCompletionCreateParamsBase["messages"],
      temperature: isO1Model || isO3Model || isO4Model ? 1 : chatSettings.temperature,
      ...(isO1Model || isO3Model || isO4Model
        ? {
            max_completion_tokens: isO1Model 
              ? 32768 
              : (isO3Model || isO4Model) 
              ? 100000 // 100k tokens for o3 and o4 models
              : 4096
          }
        : {
            max_tokens: chatSettings.model === "gpt-4o-mini" 
              ? 16383  
              : chatSettings.model === "gpt-4o"
              ? 4096
              : 4096
          }
      ),
      stream: true
    });

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