// lib/chat-helpers/check-limits.ts
import { TIER_LIMITS, TierName } from "@/lib/tier-limits"
import { supabase } from "@/lib/supabase/browser-client"

// Add interfaces
interface ModelUsage {
  [model: string]: number;
}

interface DailyUsage {
  [date: string]: ModelUsage;
}

export const checkMessageLimits = async (userId: string, tier: string, model: string) => {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('daily_usage, usage_reset_date')
    .single();

  if (!profile) return { allowed: false, error: "Could not check limits" };

  const tierLimits = TIER_LIMITS[tier as TierName];
  const modelLimit = tierLimits[model];
  const dailyLimit = tierLimits.messages_per_day;

  // Check if unlimited
  if (modelLimit === -1 && dailyLimit === -1) return { allowed: true };

  const usage = (profile?.daily_usage as DailyUsage)?.[today] ?? {} as ModelUsage;
  const modelUsage = usage[model] || 0;
  const totalUsage = Object.values(usage).reduce((sum: number, val: number) => sum + val, 0);

  if (modelLimit === 0) {
    return {
      allowed: false,
      error: `Oops. You current plan does not have access to this model. You need to upgrade to a higher plan to access ${model}`
    };
  }

  if (modelLimit !== -1 && modelUsage >= modelLimit) {
    return {
      allowed: false,
      error: `You have reached your daily limit for ${model}`
    };
  }

  if (dailyLimit !== -1 && totalUsage >= dailyLimit) {
    return {
      allowed: false,
      error: "You have reached your total daily message limit"
    };
  }

  return { allowed: true };
}