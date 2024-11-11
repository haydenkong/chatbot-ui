// lib/chat-helpers/check-limits.ts
import { TIER_LIMITS, TierName } from "@/lib/tier-limits"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const checkMessageLimits = async (
  userId: string,
  tier: string, // Keep as string for compatibility
  model: string
) => {
  const today = new Date()
  const midnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0, 0, 0, 0
  )

  const { data: messages } = await supabase
    .from("messages")
    .select("model")
    .eq("user_id", userId)
    .gte("created_at", midnight.toISOString())

  if (!messages) return { allowed: false, error: "Could not check limits" }

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