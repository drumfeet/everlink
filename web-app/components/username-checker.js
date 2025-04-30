"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export function UsernameChecker({ username, setUsername, onAvailabilityChange }) {
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Don't check empty usernames
    if (!username) {
      setError(null)
      onAvailabilityChange(false)
      return
    }

    // Debounce the check
    const timeoutId = setTimeout(() => {
      setIsChecking(true)
      setError(null)

      // Mock function that always passes
      setTimeout(() => {
        // Basic validation for username format
        if (!/^[a-z0-9-]+$/.test(username)) {
          setError("Username can only contain letters, numbers, and hyphens")
          onAvailabilityChange(false)
        } else if (username.length < 3) {
          setError("Username must be at least 3 characters long")
          onAvailabilityChange(false)
        } else {
          // Always pass the availability check
          onAvailabilityChange(true)
        }
        setIsChecking(false)
      }, 500) // Simulate network delay
    }, 500) // 500ms debounce

    return () => clearTimeout(timeoutId)
  }, [username, onAvailabilityChange])

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
          placeholder="Choose a unique name (e.g., johndoe)"
          className={`pr-10 bg-black/50 border-gray-700 text-white ${
            error ? "border-red-500 focus-visible:ring-red-500/20" : ""
          }`}
        />
        {isChecking && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <p className="text-xs text-gray-400">
        Your profile URL is everlink.fun/
        <span className="font-medium text-gray-300">{username || "username"}</span>
      </p>
    </div>
  )
}
