import { NextRequest, NextResponse } from "next/server";
import { createEtherealAccount } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    // Only allow in development or when explicitly enabled
    if (process.env.NODE_ENV === "production" && process.env.ALLOW_ETHEREAL_TEST !== "true") {
      return NextResponse.json(
        { error: "Ethereal testing is disabled in production" },
        { status: 403 }
      );
    }

    const testAccount = await createEtherealAccount();

    return NextResponse.json({
      success: true,
      message: "Ethereal test account created successfully",
      credentials: {
        user: testAccount.user,
        pass: testAccount.pass,
        webInterface: `https://ethereal.email/message/${testAccount.webMessageId}`,
      },
      instructions: [
        "Set these credentials in your .env.local:",
        `ETHEREAL_USER="${testAccount.user}"`,
        `ETHEREAL_PASS="${testAccount.pass}"`,
        "",
        "Or set USE_ETHEREAL=true to use auto-generated credentials"
      ]
    });
  } catch (error) {
    console.error("Error creating Ethereal account:", error);
    return NextResponse.json(
      {
        error: "Failed to create Ethereal test account",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
