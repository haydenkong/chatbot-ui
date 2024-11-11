// lib/chat-helpers/check-limits.ts
import { TIER_LIMITS, TierName } from "@/lib/tier-limits";
import { supabase } from "@/lib/supabase/browser-client";

export const checkMessageLimits = async (
  userId: string,
  tier: string,
  model: string
) => {
  const { data: messages } = await supabase
    .from("messages")
    .select("model")
    .eq("user_id", userId);

  if (!messages) return { allowed: false, error: "Could not check limits" };

  // Validate tier is a valid TierName
  if (!Object.keys(TIER_LIMITS).includes(tier)) {
    return { allowed: false, error: "Invalid tier" }
  }

  const tierLimits = TIER_LIMITS[tier as TierName]
  const modelLimit = tierLimits[model]
  const dailyLimit = tierLimits.messages_per_day

  // Check if unlimited
  if (modelLimit === -1 && dailyLimit === -1) return { allowed: true }

  const modelUsage = messages.filter(msg => msg.model === model).length
  const totalUsage = messages.length

  if (modelLimit !== -1 && modelUsage >= modelLimit) {
    return {
      allowed: false,
      error: `You have reached your daily limit for ${model}`
    }
  }

  if (dailyLimit !== -1 && totalUsage >= dailyLimit) {
    return {
      allowed: false,
      error: "You have reached your total daily message limit"
    }
  }

  return { allowed: true }
}