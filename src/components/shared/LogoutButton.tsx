"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "../ui/button";
import { useState } from "react";

const LogoutButton = () => {
  const { logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logout()
      // logout() already redirects to /login, so no need to do anything else
    } catch (error) {
      console.error("[logout] Error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={"destructive"}
      disabled={isLoading}
      onClick={handleLogout}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  )
}
export default LogoutButton