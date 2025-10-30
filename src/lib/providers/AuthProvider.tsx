"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const supabase = createSupabaseClient();
  const hasSubscribed = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (hasSubscribed.current) return;
    hasSubscribed.current = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      console.log("[auth] Auth event:", event);

      if (event === "SIGNED_OUT") {
        setIsRefreshing(true);
        router.push("/login");
      } else if (event === "SIGNED_IN") {
        setIsRefreshing(true);
        router.refresh();
      }

      setTimeout(() => setIsRefreshing(false), 500);
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  if (isRefreshing) {
    return <LoadingScreen />;
  }

  return children;
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20 z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  );
}
