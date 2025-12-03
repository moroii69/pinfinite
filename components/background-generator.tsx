"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Copy, Download, Zap, Github, Heart, Sliders, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VirtualBackgroundGrid } from "./virtual-background-grid";
import { Counter } from "./counter";
import { generateBackground, type Background } from "@/lib/background-generator";
import { presetConfigs } from "@/lib/background-presets";

type CopyMode = "css" | "tailwind" | null;
type TabType = "all" | "favorites";
type OverlayType = "none" | "saas" | "dashboard" | "minimal" | "ecommerce";

export function BackgroundGenerator() {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState<CopyMode>(null);
  const [overlayType, setOverlayType] = useState<OverlayType>("none");
  const [favorites, setFavorites] = useState<Set<Background>>(new Set());
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [patternOpacity, setPatternOpacity] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("bgFavorites");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setFavorites(new Set(parsedFavorites));
    }
  }, []);

  useEffect(() => {
    const randomOffset = Math.floor(Math.random() * 1000000);
    const preloadedBgs = Array.from({ length: 5000 }, (_, i) =>
      generateBackground(i + randomOffset, presetConfigs[i % presetConfigs.length]),
    );
    setBackgrounds(preloadedBgs);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgrounds((prev) => {
        const startIndex = prev.length;
        const newBgs = Array.from({ length: 1000 }, (_, i) =>
          generateBackground(
            startIndex + i,
            presetConfigs[(startIndex + i) % presetConfigs.length],
          ),
        );
        return [...prev, ...newBgs];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentBackground = backgrounds[selectedIndex];
  const displayedBackgrounds = activeTab === "favorites" ? Array.from(favorites) : backgrounds;

  const generateFullCSS = useCallback(() => {
    if (!currentBackground) return "";

    if (currentBackground.svg) {
      return `/* Pattern: ${currentBackground.type} | Preset: ${currentBackground.preset} | Opacity: ${patternOpacity}% */
background-color: ${currentBackground.css};
background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(currentBackground.svg)}');
background-size: 100% 100%;
background-repeat: no-repeat;
background-attachment: fixed;
opacity: ${(patternOpacity / 100).toFixed(2)};
width: 100%;
height: 100vh;`;
    } else {
      return `/* Pattern: ${currentBackground.type} | Preset: ${currentBackground.preset} | Opacity: ${patternOpacity}% */
background: ${currentBackground.css};
background-attachment: fixed;
opacity: ${(patternOpacity / 100).toFixed(2)};
width: 100%;
height: 100vh;`;
    }
  }, [currentBackground, patternOpacity]);

  const generateFullTailwind = useCallback(() => {
    if (!currentBackground) return "";

    if (currentBackground.svg) {
      return `<!-- Pattern: ${currentBackground.type} | Preset: ${currentBackground.preset} | Opacity: ${patternOpacity}% -->
<div
  className="fixed inset-0 w-screen h-screen"
  style={{
    backgroundColor: '${currentBackground.css}',
    backgroundImage: 'url("data:image/svg+xml;utf8,${encodeURIComponent(currentBackground.svg)}",
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    opacity: ${(patternOpacity / 100).toFixed(2)}
  }}
>
  {/* Your content here */}
</div>`;
    } else {
      return `<!-- Pattern: ${currentBackground.type} | Preset: ${currentBackground.preset} | Opacity: ${patternOpacity}% -->
<div
  className="fixed inset-0 w-screen h-screen"
  style={{
    background: '${currentBackground.css}',
    backgroundAttachment: 'fixed',
    opacity: ${(patternOpacity / 100).toFixed(2)}
  }}
>
  {/* Your content here */}
</div>`;
    }
  }, [currentBackground, patternOpacity]);

  const handleCopy = useCallback(
    async (mode: CopyMode) => {
      if (!currentBackground) return;

      let textToCopy = "";
      if (mode === "css") {
        textToCopy = generateFullCSS();
      } else if (mode === "tailwind") {
        textToCopy = generateFullTailwind();
      }

      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(mode);
        setTimeout(() => setCopied(null), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
    [currentBackground, generateFullCSS, generateFullTailwind],
  );

  const handleToggleFavorite = useCallback(() => {
    if (!currentBackground) return;

    const newFavorites = new Set(favorites);
    const existingBg = Array.from(newFavorites).find((bg) => bg.id === currentBackground.id);

    if (existingBg) {
      newFavorites.delete(existingBg);
    } else {
      newFavorites.add(currentBackground);
    }

    setFavorites(newFavorites);
    localStorage.setItem("bgFavorites", JSON.stringify(Array.from(newFavorites)));
  }, [currentBackground, favorites]);

  const handleExportSvg = useCallback(() => {
    if (!currentBackground?.svg) return;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(currentBackground.svg),
    );
    element.setAttribute("download", `pattern-${selectedIndex}.svg`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [currentBackground, selectedIndex]);

  const handleRandomize = useCallback(() => {
    if (displayedBackgrounds.length === 0) return;
    const randomIdx = Math.floor(Math.random() * displayedBackgrounds.length);
    const actualIdx = backgrounds.indexOf(displayedBackgrounds[randomIdx]);
    setSelectedIndex(actualIdx);
  }, [backgrounds, displayedBackgrounds]);

  const renderOverlay = () => {
    const overlayContent = {
      saas: (
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-md flex flex-col">
          <div className="h-16 border-b border-white/10 flex items-center px-8 justify-between bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-white/40 to-white/20" />
              <span className="text-sm font-semibold text-white/90">Product</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-xs text-white/60 hover:text-white/90 transition-colors">
                Docs
              </button>
              <button className="px-4 py-2 bg-white/90 text-black text-xs font-medium rounded-lg hover:bg-white transition-colors">
                Sign In
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 space-y-6">
            <div className="text-center space-y-3 max-w-2xl">
              <h1 className="text-4xl font-bold text-white/95">Exceptional experiences</h1>
              <p className="text-white/70 text-base">Built on beautiful backgrounds that inspire</p>
            </div>
            <div className="flex gap-3 pt-4">
              <button className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
                Get Started
              </button>
              <button className="px-6 py-2.5 bg-white/10 border border-white/30 text-white/90 text-sm font-medium rounded-lg hover:bg-white/20 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      ),
      dashboard: (
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50 backdrop-blur-lg flex">
          <div className="w-72 border-r border-white/10 bg-white/5 p-6 space-y-6">
            <div className="h-10 bg-white/10 rounded-lg w-2/3" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-10 bg-white/10 rounded-lg ${i === 1 ? "bg-white/20" : ""}`}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 p-8 space-y-6">
            <div className="h-12 bg-white/10 rounded-lg w-1/3" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-white/5 rounded-lg border border-white/10" />
              ))}
            </div>
            <div className="flex-1 bg-white/5 rounded-lg border border-white/10 min-h-64" />
          </div>
        </div>
      ),
      minimal: (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-6xl font-bold text-white/90">404</p>
            <p className="text-white/70 text-lg">Something went wrong</p>
            <p className="text-white/50 text-sm">The page you're looking for doesn't exist</p>
          </div>
        </div>
      ),
      ecommerce: (
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 backdrop-blur-md flex flex-col">
          <div className="h-16 border-b border-white/10 flex items-center px-8 justify-between bg-white/5">
            <span className="text-lg font-bold text-white/95">Store</span>
            <div className="flex items-center gap-6">
              <button className="text-sm text-white/60 hover:text-white/90">Shop</button>
              <button className="text-sm text-white/60 hover:text-white/90">About</button>
              <button className="px-4 py-2 bg-white/10 text-white/90 text-sm rounded border border-white/20 hover:bg-white/20 transition-colors">
                Cart
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="text-center space-y-8 max-w-3xl">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-white/95">New Collection</h1>
                <p className="text-white/70">Discover what's next</p>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white/10 rounded-lg border border-white/20"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    };

    return overlayType !== "none" ? overlayContent[overlayType] : null;
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden border-r border-gray-200">
        <div
          className="absolute inset-0"
          style={{
            background: currentBackground?.css,
            opacity: patternOpacity / 100,
          }}
        />
        {currentBackground?.svg && (
          <div
            className="absolute inset-0"
            style={{ opacity: patternOpacity / 100 }}
            dangerouslySetInnerHTML={{ __html: currentBackground.svg }}
          />
        )}

        {renderOverlay()}

        <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none">
          <div className="absolute top-6 right-6 pointer-events-auto">
            <button
              onClick={() => setOverlayType(overlayType === "none" ? "saas" : "none")}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white transition-colors"
              title="Toggle overlay"
            >
              {overlayType === "none" ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>
          <div />
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-white/60">Pattern</p>
            <h2 className="text-3xl font-bold text-white text-balance">
              {currentBackground?.type.charAt(0).toUpperCase()}
              {currentBackground?.type.slice(1)}
            </h2>
            <p className="text-sm text-white/70">
              #{selectedIndex + 1} • {currentBackground?.preset}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 lg:max-w-md flex-col bg-white border-l border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4 space-y-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-lg font-semibold text-gray-900">Patterns</h1>
              <p className="text-xs text-gray-600">
                <Counter target={backgrounds.length} /> total • #{selectedIndex + 1}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="text-xs text-gray-600 hover:text-gray-900 transition-colors underline"
              >
                Home
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
                title="Star on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 text-xs py-1.5 rounded transition-colors border ${
                activeTab === "all"
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded transition-colors border ${
                activeTab === "favorites"
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200"
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Favorites
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <VirtualBackgroundGrid
            backgrounds={displayedBackgrounds}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            allBackgrounds={backgrounds}
            isFavoritesMode={activeTab === "favorites"}
            onRemoveFavorite={(bg) => {
              const newFavorites = new Set(favorites);
              newFavorites.delete(bg);
              setFavorites(newFavorites);
              localStorage.setItem("bgFavorites", JSON.stringify(Array.from(newFavorites)));
            }}
          />
        </div>

        {/* Controls */}
        <div className="border-t border-gray-200 p-4 space-y-3 flex-shrink-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                opacity
              </label>
              <span className="text-xs font-semibold text-gray-900">{patternOpacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={patternOpacity}
              onChange={(e) => setPatternOpacity(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy("css")}
              className="flex items-center justify-center gap-1.5 text-xs h-9"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied === "css" ? "copied!" : "CSS"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy("tailwind")}
              className="flex items-center justify-center gap-1.5 text-xs h-9"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied === "tailwind" ? "coopied!" : "tailwind"}</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSvg}
              disabled={!currentBackground?.svg}
              className="flex items-center justify-center gap-1.5 text-xs h-9 disabled:opacity-50 bg-transparent"
            >
              <Download className="w-3.5 h-3.5" />
              <span>SVG</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleFavorite}
              className={`flex items-center justify-center gap-1.5 text-xs h-9 ${
                Array.from(favorites).some((bg) => bg.id === currentBackground?.id)
                  ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                  : ""
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${Array.from(favorites).some((bg) => bg.id === currentBackground?.id) ? "fill-current" : ""}`}
              />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleRandomize}
              className="flex items-center justify-center gap-1.5 text-xs h-9 bg-black text-white hover:bg-gray-900"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>random</span>
            </Button>
          </div>

          <div className="text-[11px] text-gray-600 text-center py-2 border-t border-gray-200 pt-3">
            click pattern to preview • {currentBackground?.type}
          </div>
        </div>
      </div>
    </div>
  );
}
