"use client";

export default function Randomizer() {
  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col">
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            <div className="text-sm font-semibold tracking-tight">pinfinite</div>
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
              the math behind random patterns
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              understanding the algorithms that generate unique, mathematically beautiful
              backgrounds
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  seeded random generation
                </h3>
                <p className="text-gray-600 mb-4">
                  each pattern uses a deterministic seed based on its index, ensuring
                  reproducibility while maintaining visual variety.
                </p>
                <div className="bg-white p-4 rounded border font-mono text-sm">
                  <div className="text-gray-800">seed = index × π</div>
                  <div className="text-gray-600 mt-2">
                    random = sin(seed × 12.9898 + seed × 78.233) × 43758.5453
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">color generation</h3>
                <p className="text-gray-600 mb-4">
                  HSL colors are generated using seeded randomness with configurable saturation and
                  lightness ranges.
                </p>
                <div className="bg-white p-4 rounded border font-mono text-sm">
                  <div className="text-gray-800">hue = floor(random(seed × 1.23) × 360)</div>
                  <div className="text-gray-600 mt-2">
                    saturation = base + (random(seed × 1.45) - 0.5) × 20
                  </div>
                  <div className="text-gray-600 mt-1">
                    lightness = base + (random(seed × 1.67) - 0.5) × 15
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">patternn types</h3>
                <p className="text-gray-600 mb-4">
                  21 different pattern algorithms create diverse visual effects, from gradients to
                  geometric shapes.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">gradient</span>
                    <span className="text-gray-500">linear gradients with random angles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">mesh</span>
                    <span className="text-gray-500">multiple radial gradients overlay</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">noise</span>
                    <span className="text-gray-500">perlin-like noise patterns</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">geometric</span>
                    <span className="text-gray-500">dots, grids, hexagons, triangles</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">SVG generation</h3>
                <p className="text-gray-600 mb-4">
                  vector patterns use mathematical functions to create scalable, crisp graphics at
                  any size.
                </p>
                <div className="bg-white p-4 rounded border font-mono text-sm">
                  <div className="text-gray-800">size = 15 + floor(random(seed) × 50)</div>
                  <div className="text-gray-600 mt-2">
                    spacing = 25 + floor(random(seed + 1) × 35)
                  </div>
                  <div className="text-gray-600 mt-1">position = random(seed + 2) × 100%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-4">
              every refresh generates new random seeds, creating infinite unique combinations
            </p>
            <a
              href="/playground"
              className="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              start creating
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
