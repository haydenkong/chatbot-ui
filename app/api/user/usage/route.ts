// app/api/user/usage/route.ts
import { createClient } from '@supabase/supabase-js';
import { getServerProfile } from '@/lib/server/server-chat-helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  try {
    const profile = await getServerProfile();

    // Get user's local midnight time
    const now = new Date();
    const localMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0, 0
    );

    // Convert local midnight to UTC time
    const midnightUTC = new Date(localMidnight.getTime() + localMidnight.getTimezoneOffset() * 60000);

    console.log('Profile:', profile);
    console.log('Local Midnight:', localMidnight.toISOString());
    console.log('Midnight UTC:', midnightUTC.toISOString());

    const { data: messages, error } = await supabase
      .from('messages')
      .select('model, created_at')
      .eq('user_id', profile.user_id)
      .gte('created_at', midnightUTC.toISOString());

    if (error) {
      console.log('Query error:', error);
      return new Response('Error fetching messages', { status: 500 });
    }

    console.log('Messages found:', messages?.length);

    if (!messages || messages.length === 0) {
      return new Response('No messages found', { status: 404 });
    }

    const usage = messages.reduce((acc, msg) => {
      acc[msg.model] = (acc[msg.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('Calculated usage:', usage);

    return new Response(JSON.stringify({ usage }), { status: 200 });
  } catch (error) {
    console.error('Usage fetch error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(errorMessage, { status: 500 });
  }
}