"use client"

import { useEffect, useState } from "react"

interface CounterProps {
  target: number
}

export function Counter({ target }: CounterProps) {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const counterInterval = setInterval(() => {
      setDisplayCount((prev) => {
        if (prev < target) {
          return Math.min(prev + Math.ceil((target - prev) / 100), target)
        }
        return prev
      })
    }, 10) // Update every 10ms for smooth animation

    return () => clearInterval(counterInterval)
  }, [target])

  return <span>{displayCount}</span>
}