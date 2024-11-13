import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

interface ModelUsage {
  [model: string]: number;
}

interface DailyUsage {
  [date: string]: ModelUsage;
}

export const getProfileByUserId = async (userId: string) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*, tier")
    .eq("user_id", userId)
    .single()

  if (!profile) {
    throw new Error(error.message)
  }

  return profile
}

export const getProfilesByUserId = async (userId: string) => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)

  if (!profiles) {
    throw new Error(error.message)
  }

  return profiles
}

export const createProfile = async (profile: TablesInsert<"profiles">) => {
  const { data: createdProfile, error } = await supabase
    .from("profiles")
    .insert([profile])
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return createdProfile
}

export const updateProfile = async (
  profileId: string,
  profile: TablesUpdate<"profiles">
) => {
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profileId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedProfile
}

export const deleteProfile = async (profileId: string) => {
  const { error } = await supabase.from("profiles").delete().eq("id", profileId)

  if (error) {
    throw new Error(error.message)
  }

  return true
}

export const incrementModelUsage = async (userId: string, model: string) => {
  const today = new Date().toISOString().split('T')[0];

  const { data: profile } = await supabase
  .from('profiles')
  .select('daily_usage, usage_reset_date')
  .eq('user_id', userId)
  .single();

  // Reset usage if it's a new day
  if (!profile?.usage_reset_date || new Date(profile.usage_reset_date).toISOString().split('T')[0] !== today) {
  await supabase
    .from('profiles')
    .update({ 
      daily_usage: { [today]: { [model]: 1 } },
      usage_reset_date: new Date().toISOString()
    })
    .eq('user_id', userId);
  return;
  }

  // Increment usage for model with proper typing
  const usage = (profile?.daily_usage as DailyUsage)?.[today] ?? {} as ModelUsage;
  usage[model] = (usage[model] || 0) + 1;

  await supabase
  .from('profiles')
  .update({ 
    daily_usage: { [today]: usage }
  })
  .eq('user_id', userId);
}