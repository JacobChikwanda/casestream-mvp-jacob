import { getCurrentUser } from "@/lib/supabase/server";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      userId: user.id,
      email: user.email,
      user: user,
    });
  } catch (error) {
    console.error("[v0] Error in GET /api/user:", error);
    return Response.json({ error: "Failed to get user" }, { status: 500 });
  }
}
