"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { useState } from "react"
import dynamic from "next/dynamic"

const GL = dynamic(() => import("./gl").then((mod) => ({ default: mod.GL })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />,
})

export function Hero() {
  const [hovering, setHovering] = useState(false)
  return (
    <div className="flex flex-col h-[85vh] justify-center relative">
      <GL hovering={hovering} />

      <div className="absolute inset-0 bg-black/50 z-[1]" />

      <div className="text-center relative z-10 animate-fade-in-up">
        <h1 className="text-4xl sm:text-7xl md:text-8xl font-sentient">Nick</h1>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mt-4 text-primary">Веб-разработчик</h2>
        <p className="font-mono text-base sm:text-xl md:text-2xl text-foreground/60 text-balance mt-6 sm:mt-8 max-w-[700px] mx-auto px-4">
          Превращаю идеи в молниеносно быстрые и визуально потрясающие веб-решения
        </p>

        <Link className="contents max-sm:hidden" href="#contact">
          <Button
            variant="secondary"
            className="mt-14 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] text-black font-semibold shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] hover:scale-105 transition-all duration-300 border border-[#FFA500]/30"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Contact me
          </Button>
        </Link>
        <Link className="contents sm:hidden" href="#contact">
          <Button
            variant="secondary"
            size="sm"
            className="mt-14 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] text-black font-semibold shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)] hover:scale-105 transition-all duration-300 border border-[#FFA500]/30"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Contact me
          </Button>
        </Link>
      </div>
    </div>
  )
}
