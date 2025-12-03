"use client"

import type { Background } from "@/lib/background-generator"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface BackgroundCardProps {
  background: Background
  isSelected: boolean
  onClick: () => void
  isFavoritesMode?: boolean
  onRemoveFavorite?: () => void
}

export function BackgroundCard({ background, isSelected, onClick, isFavoritesMode, onRemoveFavorite }: BackgroundCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-36 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group border",
        isSelected
          ? "border-gray-400 ring-2 ring-gray-300 shadow-md scale-100"
          : "border-gray-300 hover:border-gray-400 hover:shadow-sm",
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: background.css,
        }}
      />

      {background.svg && <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: background.svg }} />}

      <div
        className={cn(
          "absolute inset-0 bg-black/0 transition-all duration-300",
          isSelected ? "bg-black/5" : "group-hover:bg-black/10",
        )}
      />

      <div
        className={cn(
          "absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-medium transition-all duration-300",
          isSelected
            ? "bg-gray-900/20 text-gray-900 border border-gray-900/30"
            : "bg-black/40 backdrop-blur-sm text-white/80",
        )}
      >
        {background.type}
      </div>

      {isFavoritesMode && onRemoveFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemoveFavorite()
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          title="Remove from favorites"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {isSelected && <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-900 rounded-full shadow-lg" />}
    </button>
  )
}
