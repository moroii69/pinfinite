"use client"

import { useEffect, useState } from "react"
import { BackgroundGenerator } from "@/components/background-generator"

export default function Playground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <BackgroundGenerator />
}
