"use server";

import { createSupabaseServerRouteHandler } from "@/lib/supabase";
import { prisma } from "@/lib/db";
import { getTenantUrl } from "@/lib/helpers/tenant";
import { createClient } from "@supabase/supabase-js";

export interface LoginResult {
  success: boolean;
  message: string;
  redirectTo?: string;
  userId?: string;
  accountSlug?: string;
  accountId?: string;
}

/**
 * Server action for login - handles authentication securely on the server
 */
export async function loginAction(
  email: string,
  password: string
): Promise<LoginResult> {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    console.log("[login] Attempting login for:", email);

    const supabase = await createSupabaseServerRouteHandler();

    // Sign in with Supabase
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("[login] Supabase auth error:", authError.message);
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    if (!authData.user) {
      console.error("[login] No user returned from Supabase");
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    console.log("[login] Supabase auth successful for user:", authData.user.id);

    // Get user's staff record from Prisma
    const staffRecord = await prisma.staff.findUnique({
      where: { id: authData.user.id },
      select: {
        id: true,
        name: true,
        workEmail: true,
        staffGroup: true,
        applicationAdmin: true,
        account: {
          select: {
            id: true,
            accountSlug: true,
            firmName: true,
          },
        },
      },
    });

    if (!staffRecord) {
      console.error(
        "[login] Staff record not found for user:",
        authData.user.id
      );
      return {
        success: false,
        message: "User not found in system",
      };
    }

    if (!staffRecord.account) {
      console.error("[login] Account not found for staff:", authData.user.id);
      return {
        success: false,
        message: "User not associated with any account",
      };
    }

    const accountSlug = staffRecord.account.accountSlug;
    const accountId = staffRecord.account.id;

    // Initialize Supabase admin client to update user metadata
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Update app_metadata with accountSlug (merge with existing to avoid overwriting other fields)
    const currentMetadata = authData.user.app_metadata || {};
    const newMetadata = { ...currentMetadata, accountSlug, accountId };

    const { error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(authData.user.id, {
        app_metadata: newMetadata,
      });

    if (updateError) {
      console.error(
        "[login] Error updating app_metadata:",
        updateError.message
      );
      // Proceed with login anyway, as metadata update is not critical for this session
    } else {
      console.log(
        "[login] Updated user app_metadata with accountSlug:",
        accountSlug
      );
    }

    console.log(
      "[login] Login successful for:",
      staffRecord.name,
      "account:",
      accountSlug
    );

    // Determine redirect based on role
    const pathname = "/dashboard";

    // Build tenant URL
    const redirectTo = getTenantUrl(accountSlug, pathname);

    return {
      success: true,
      message: "Login successful",
      redirectTo,
      userId: authData.user.id,
      accountSlug,
      accountId,
    };
  } catch (error) {
    console.error("[login] Server action error:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}
