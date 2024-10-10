import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { createClient } from "@supabase/supabase-js"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.google_gemini_api_key, "Google")

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

    const genAI = new GoogleGenerativeAI(profile.google_gemini_api_key || "")
    const googleModel = genAI.getGenerativeModel({ model: chatSettings.model })

    const lastMessage = messages.pop()

    const chat = googleModel.startChat({
      history: messages,
      generationConfig: {
        temperature: chatSettings.temperature
      }
    })

    const response = await chat.sendMessageStream(lastMessage.parts)

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response.stream) {
          const chunkText = chunk.text()
          controller.enqueue(encoder.encode(chunkText))
        }
        controller.close()
      }
    })

    // Update the number of messages sent today for the model
    const updatedMessagesSentToday = {
      ...profile.messages_sent_today,
      [model]: messagesSentToday + 1
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    await supabaseAdmin
      .from("profiles")
      .update({ messages_sent_today: updatedMessagesSentToday })
      .eq("user_id", profile.user_id)

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain" }
    })

  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Google Gemini API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("api key not valid")) {
      errorMessage =
        "Google Gemini API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
