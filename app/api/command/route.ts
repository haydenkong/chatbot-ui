import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { createClient } from "@supabase/supabase-js"
import OpenAI from "openai"

export const runtime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { input } = json as {
    input: string
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
    const messagesSentToday = userProfile.messages_sent_today["gpt-4-1106-preview"] || 0
    const messageLimit = CHAT_SETTING_LIMITS["gpt-4-1106-preview"].MESSAGE_LIMITS[userTier]

    if (messagesSentToday >= messageLimit) {
      return new Response(
        JSON.stringify({
          message: `You have reached the daily message limit for gpt-4-1106-preview. Please upgrade your plan to send more messages.`
        }),
        { status: 400 }
      )
    }

    if (messageLimit - messagesSentToday <= 3) {
      console.warn(`${messageLimit - messagesSentToday} Messages Left for today. Upgrade to get more usage.`)
    }

    const openai = new OpenAI({
      apiKey: profile.openai_api_key || "",
      organization: profile.openai_organization_id
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: "Respond to the user."
        },
        {
          role: "user",
          content: input
        }
      ],
      temperature: 0,
      max_tokens:
        CHAT_SETTING_LIMITS["gpt-4-turbo-preview"].MAX_TOKEN_OUTPUT_LENGTH
    })

    const content = response.choices[0].message.content

    const updatedMessagesSentToday = {
      ...userProfile.messages_sent_today,
      "gpt-4-1106-preview": messagesSentToday + 1
    }

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ messages_sent_today: updatedMessagesSentToday })
      .eq("user_id", profile.user_id)

    if (updateError) {
      throw new Error(updateError.message)
    }

    return new Response(JSON.stringify({ content }), {
      status: 200
    })
  } catch (error: any) {
    const errorMessage = error.error?.message || "An unexpected error occurred"
    const errorCode = error.status || 500
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
