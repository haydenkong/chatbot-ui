import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ messages_sent_today: {} });

    if (error) {
      throw new Error(error.message);
    }

    return new NextResponse("Messages reset successfully", {
      status: 200,
    });
  } catch (error: any) {
    const errorMessage = error.message || "An unexpected error occurred";
    const errorCode = error.status || 500;
    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    });
  }
}
