// app/api/user/usage/route.ts
import { createClient } from '@supabase/supabase-js';
import { getServerProfile } from '@/lib/server/server-chat-helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const profile = await getServerProfile()
    const today = new Date().toISOString().split('T')[0]

    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('daily_usage, usage_reset_date')
      .eq('user_id', profile.user_id)
      .single()

    if (error) throw new Error(error.message)
    if (!profileData) return new Response("Profile not found", { status: 404 })

    const usage = profileData.daily_usage?.[today] ?? {}

    return new Response(JSON.stringify({ usage }), { status: 200 })
  } catch (error) {
    console.error("Usage fetch error:", error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(errorMessage, { status: 500 })
  }
}