import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { getBase64FromDataURL, getMediaTypeFromDataURL } from "@/lib/utils"
import { ChatSettings } from "@/types"
import Anthropic from "@anthropic-ai/sdk"
import { AnthropicStream, StreamingTextResponse } from "ai"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.anthropic_api_key, "Anthropic")

    let ANTHROPIC_FORMATTED_MESSAGES: any = messages.slice(1)

    ANTHROPIC_FORMATTED_MESSAGES = ANTHROPIC_FORMATTED_MESSAGES?.map(
      (message: any) => {
        const messageContent =
          typeof message?.content === "string"
            ? [message.content]
            : message?.content

        return {
          ...message,
          content: messageContent.map((content: any) => {
            if (typeof content === "string") {
              return { type: "text", text: content }
            } else if (
              content?.type === "image_url" &&
              content?.image_url?.url?.length
            ) {
              return {
                type: "image",
                source: {
                  type: "base64",
                  media_type: getMediaTypeFromDataURL(content.image_url.url),
                  data: getBase64FromDataURL(content.image_url.url)
                }
              }
            } else {
              return content
            }
          })
        }
      }
    )

    // Calculate total input tokens
    const totalInputTokens = ANTHROPIC_FORMATTED_MESSAGES.reduce((acc: number, message: any) => {
      return acc + message.content.reduce((contentAcc: number, content: any) => {
        if (content.type === "text") {
          // Rough estimate: 1 token per 4 characters
          return contentAcc + Math.ceil(content.text.length / 4)
        }
        // Add a fixed number for images (e.g., 100 tokens)
        return contentAcc + (content.type === "image" ? 100 : 0)
      }, 0)
    }, 0)

    // Add system message tokens
    const systemMessageTokens = Math.ceil(messages[0].content.length / 4)
    const totalTokens = totalInputTokens + systemMessageTokens

    // Check if total tokens exceed the limit
    const maxContextTokens = CHAT_SETTING_LIMITS[chatSettings.model].MAX_CONTEXT_LENGTH
    if (totalTokens > maxContextTokens) {
      return new NextResponse(
        JSON.stringify({
          message: `Input token limit exceeded. Please reduce your input.`
        }),
        { status: 400 }
      )
    }

    const anthropic = new Anthropic({
      apiKey: profile.anthropic_api_key || "",
      baseURL: "https://gateway.ai.cloudflare.com/v1/77a0b1436313aeb84549202bdd962b63/pixelverseaisystems/anthropic"
    })

    try {
      const response = await anthropic.messages.create({
        model: chatSettings.model === 'claude-3-opus-20240229'
          ? 'claude-3-5-haiku-latest'
          : chatSettings.model === 'claude-3-5-sonnet-20240620'
          ? 'claude-3-5-haiku-latest'
          : chatSettings.model,
        messages: ANTHROPIC_FORMATTED_MESSAGES,
        temperature: chatSettings.temperature,
        system: messages[0].content,
        max_tokens: CHAT_SETTING_LIMITS[chatSettings.model].MAX_TOKEN_OUTPUT_LENGTH,
        stream: true
      });
    };


      try {
        const stream = AnthropicStream(response)
        return new StreamingTextResponse(stream)
      } catch (error: any) {
        console.error("Error parsing Anthropic API response:", error)
        return new NextResponse(
          JSON.stringify({
            message: "An error occurred while parsing the Anthropic API response"
          }),
          { status: 500 }
        )
      }
    } catch (error: any) {
      console.error("Error calling Anthropic API:", error)
      return new NextResponse(
        JSON.stringify({
          message: "An error occurred while calling the Anthropic API"
        }),
        { status: 500 }
      )
    }
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage = "Anthropic API Key not found. Please set it in your profile settings."
    } else if (errorCode === 401) {
      errorMessage = "Anthropic API Key is incorrect. Please fix it in your profile settings."
    }

    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}