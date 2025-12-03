"use client"

import { useEffect, useRef, useCallback, useState, useMemo } from "react"
import type { Background } from "@/lib/background-generator"
import { BackgroundCard } from "./background-card"

interface VirtualBackgroundGridProps {
  backgrounds: Background[]
  selectedIndex: number
  onSelect: (index: number) => void
  allBackgrounds: Background[]
  isFavoritesMode?: boolean
  onRemoveFavorite?: (background: Background) => void
}

export function VirtualBackgroundGrid({
  backgrounds,
  selectedIndex,
  onSelect,
  allBackgrounds,
  isFavoritesMode = false,
  onRemoveFavorite,
}: VirtualBackgroundGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 48 })

  const COLUMNS = 2
  const CARD_HEIGHT = 140
  const GAP = 12
  const ROW_HEIGHT = CARD_HEIGHT + GAP

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const { scrollTop, clientHeight } = containerRef.current

    const itemsPerRow = COLUMNS
    const visibleRows = Math.ceil(clientHeight / ROW_HEIGHT)
    const bufferRows = 5

    const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - bufferRows)
    const endRow = startRow + visibleRows + bufferRows * 2

    const start = startRow * itemsPerRow
    const end = Math.min(backgrounds.length, (endRow + 1) * itemsPerRow)

    setVisibleRange({
      start: Math.max(0, start),
      end: Math.min(end, backgrounds.length),
    })
  }, [backgrounds.length])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => container.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!containerRef.current) return
    const rowIndex = Math.floor(selectedIndex / COLUMNS)
    const targetScroll = rowIndex * ROW_HEIGHT - containerRef.current.clientHeight / 2
    containerRef.current.scrollTo({ top: Math.max(0, targetScroll), behavior: "smooth" })
  }, [selectedIndex])

  const visibleBackgrounds = useMemo(
    () => backgrounds.slice(visibleRange.start, visibleRange.end),
    [backgrounds, visibleRange],
  )

  const offsetY = (visibleRange.start / COLUMNS) * ROW_HEIGHT

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <div style={{ transform: `translateY(${offsetY}px)` }} className="transition-none">
        <div className="grid grid-cols-2 gap-3 px-4 pt-2 pb-4">
          {visibleBackgrounds.map((bg, idx) => {
            const actualIndex = backgrounds.indexOf(bg)
            const allBackgroundsIndex = allBackgrounds.indexOf(bg)
            return (
              <BackgroundCard
                key={`${bg.id}-${visibleRange.start + idx}`}
                background={bg}
                isSelected={allBackgroundsIndex === selectedIndex}
                onClick={() => onSelect(allBackgroundsIndex)}
                isFavoritesMode={isFavoritesMode}
                onRemoveFavorite={onRemoveFavorite ? () => onRemoveFavorite(bg) : undefined}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
