import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { Profile } from "@/supabase/types"

// Function to get a single profile by user ID
export const getProfileByUserId = async (userId: string): Promise<Profile> => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*") // Select all columns
    .eq("user_id", userId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return profile as Profile
}

// Function to get multiple profiles by user ID
export const getProfilesByUserId = async (userId: string) => {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*") // Select all columns
    .eq("user_id", userId)

  if (error) {
    throw new Error(error.message)
  }

  return profiles
}

// Function to create a new profile
export const createProfile = async (profile: TablesInsert<"profiles">) => {
  const { data: createdProfile, error } = await supabase
    .from("profiles")
    .insert([profile])
    .select("*") // Select all columns
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return createdProfile
}

// Function to update an existing profile
export const updateProfile = async (
  profileId: string,
  profile: TablesUpdate<"profiles">
) => {
  const { data: updatedProfile, error } = await supabase
    .from("profiles")
    .update(profile)
    .eq("id", profileId)
    .select("*") // Select all columns
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedProfile
}

// Function to delete a profile by profile ID
export const deleteProfile = async (profileId: string) => {
  const { error } = await supabase.from("profiles").delete().eq("id", profileId)

  if (error) {
    throw new Error(error.message)
  }

  return true
}
