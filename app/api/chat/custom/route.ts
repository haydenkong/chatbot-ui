import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { createClient } from "@supabase/supabase-js"
import { Database } from "@/supabase/types"

interface UserProfile {
  tier: string
  messages_sent_today: Record<string, number>
}

export const runtime = "edge"
export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages, customModelId } = json as {
    chatSettings: ChatSettings
    messages: any[]
    customModelId: string
  }

  try {
    const supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: customModel, error } = await supabaseAdmin
      .from("models")
      .select("*")
      .eq("id", customModelId)
      .single()

    if (!customModel) {
      throw new Error(error.message)
    }

    await checkAndUpdateMessageLimit(customModel.user_id, chatSettings.model)

    const custom = new OpenAI({
      apiKey: customModel.api_key || "",
      baseURL: customModel.base_url
    })

    const response = await custom.chat.completions.create({
      model: chatSettings.model as ChatCompletionCreateParamsBase["model"],
      messages: messages as ChatCompletionCreateParamsBase["messages"],
      temperature: chatSettings.temperature,
      stream: true
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Custom API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("incorrect api key")) {
      errorMessage =
        "Custom API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}

export async function checkAndUpdateMessageLimit(userId: string, model: string) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabaseAdmin
    .from<UserProfile>("profiles")
    .select("tier, messages_sent_today")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const userProfile = data as UserProfile;
  const userTier = userProfile.tier;
  const messagesSentToday = userProfile.messages_sent_today[model] || 0;
  const messageLimit = CHAT_SETTING_LIMITS[model].MESSAGE_LIMITS[userTier];

  if (messagesSentToday >= messageLimit) {
    throw new Error(`You have reached the daily message limit for ${model}. Please upgrade your plan to send more messages.`);
  }

  if (messageLimit - messagesSentToday <= 3) {
    console.warn(`${messageLimit - messagesSentToday} Messages Left for today. Upgrade to get more usage.`);
  }

  const updatedMessagesSentToday = {
    ...userProfile.messages_sent_today,
    [model]: messagesSentToday + 1
  };

  const { error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({ messages_sent_today: updatedMessagesSentToday })
    .eq("user_id", userId);

  if (updateError) {
    throw new Error(updateError.message);
  }
}
