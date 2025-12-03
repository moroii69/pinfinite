"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col">
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-sm font-semibold tracking-tight">pinfinite</div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors underline"
          >
            github
          </a>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full space-y-12 text-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900">
              ∞ unique backgrounds for every project
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              ∞-ly generated, mathematically unique patterns. copy as CSS, tailwind, or SVG. perfect
              for projects.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="/playground"
              className="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-900 transition-colors"
            >
              start creating
            </a>
            <a
              href="/randomizer"
              className="inline-block px-8 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              how it works
            </a>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-500">free • no signup • open source</p>
          </div>
        </div>
      </main>
    </div>
  );
}
