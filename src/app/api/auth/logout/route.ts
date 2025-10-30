import { NextResponse } from "next/server";
import { createSupabaseServerRouteHandler } from "@/lib/supabase";

export async function POST() {
  try {
    const supabase = await createSupabaseServerRouteHandler();

    // Sign out from Supabase (clears server-side session)
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("[logout] Supabase error:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Logged out successfully" }, {
      status: 200,
    });
  } catch (error) {
    console.error("[logout] Error:", error);
    return NextResponse.json({ message: "Internal server error" }, {
      status: 500,
    });
  }
}
