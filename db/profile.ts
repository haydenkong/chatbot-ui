import { supabase } from "@/lib/supabase/browser-client"
import { ProfileUsage, Tables, TablesInsert, TablesUpdate } from "@/supabase/types"


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
  
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('daily_usage, usage_reset_date')
    .eq('user_id', userId)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch profile: ${fetchError.message}`);
  }

  const updateData: TablesUpdate<"profiles"> = {
    daily_usage: {},
    usage_reset_date: new Date().toISOString()
  };

  // Reset usage if it's a new day
  if (!profile?.usage_reset_date || new Date(profile.usage_reset_date).toISOString().split('T')[0] !== today) {
    updateData.daily_usage = {
      ...profile?.daily_usage,
      [today]: { [model]: 1 }
    };

    const { error: resetError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('user_id', userId);

    if (resetError) {
      throw new Error(`Failed to reset usage: ${resetError.message}`);
    }
    return;
  }

  // Update existing usage
  const currentUsage: ProfileUsage = profile.daily_usage || {};
  const todayUsage = currentUsage[today] || {};
  updateData.daily_usage = {
    ...currentUsage,
    [today]: {
      ...todayUsage,
      [model]: (todayUsage[model] || 0) + 1
    }
  };

  const { error: updateError } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', userId);

  if (updateError) {
    throw new Error(`Failed to update usage: ${updateError.message}`);
  }
}
