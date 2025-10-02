"use client"

import type React from "react"

import { Card, CardContent } from "./ui/card"
import { Zap, Smartphone, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Principles() {
  const { ref, isVisible } = useScrollAnimation()

  const principles = [
    {
      title: "Google PageSpeed",
      subtitle: "Скорость сайта",
      description:
        "Google Speed: На телефонах > 80, На ПК > 90-100. Проверьте сами! Быстрая загрузка — это основа успешного сайта.",
      metric: "91/100",
      metricLabel: "Средний PageSpeed",
      icon: Zap,
      gradient: "from-yellow-500/10 via-orange-500/5 to-yellow-600/10",
      iconColor: "text-yellow-400",
      glowColor: "shadow-yellow-500/50",
    },
    {
      title: "Mobile-first",
      subtitle: "Стильный дизайн на мобильных устройствах",
      description:
        "Многие пользователи используют только телефон для открытия сайтов. Супер важно, чтобы сайт выглядел потрясающе на них.",
      metric: "100%",
      metricLabel: "Мобильная оптимизация",
      icon: Smartphone,
      gradient: "from-blue-500/10 via-cyan-400/5 to-blue-600/10",
      iconColor: "text-blue-400",
      glowColor: "shadow-blue-500/50",
    },
    {
      title: "Неограниченные правки",
      subtitle: "Чтобы понравилось именно ВАМ",
      description: "Количество доработок — неограниченно ДО оплаты. Мне важно, чтобы именно вам понравился сайт.",
      metric: "∞",
      metricLabel: "Правок до оплаты",
      icon: RefreshCw,
      gradient: "from-green-500/10 via-emerald-400/5 to-green-600/10",
      iconColor: "text-green-400",
      glowColor: "shadow-green-500/50",
    },
  ]

  return (
    <section id="principles" className="py-8 sm:py-12 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Что для меня важно?
          </h2>
          <p className="text-foreground/60 font-mono text-base sm:text-lg max-w-2xl mx-auto">
            Три основных принципа, которые делают каждый проект особенным
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 h-full" style={{ perspective: "1000px" }}>
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return <PrincipleCard key={index} principle={principle} Icon={Icon} index={index} isVisible={isVisible} />
          })}
        </div>
      </div>
    </section>
  )
}

function PrincipleCard({ principle, Icon, index, isVisible }: any) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -15
    const rotateYValue = ((x - centerX) / centerX) * 15

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      className={`relative h-full transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
        transition: "transform 0.1s ease-out, opacity 0.7s ease-out, translate 0.7s ease-out",
        transformStyle: "preserve-3d",
        transitionDelay: `${index * 150}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        className={`h-full bg-black/70 ${principle.gradient} border-border/50 backdrop-blur-sm transition-all duration-300 group relative overflow-hidden`}
        style={{
          boxShadow: `
            0 20px 60px -15px rgba(0, 0, 0, 0.8),
            0 0 40px ${principle.glowColor.includes("yellow") ? "rgba(234, 179, 8, 0.3)" : principle.glowColor.includes("blue") ? "rgba(59, 130, 246, 0.3)" : "rgba(34, 197, 94, 0.3)"}
          `,
        }}
      >
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${principle.gradient} opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-500`}
          style={{ zIndex: -1 }}
        />

        <CardContent className="h-full flex flex-col p-8 relative" style={{ transform: "translateZ(50px)" }}>
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-background/30 group-hover:bg-background/50 transition-colors backdrop-blur-sm group-hover:shadow-2xl">
              <Icon
                className={`h-8 w-8 ${principle.iconColor} group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_20px_currentColor]`}
              />
            </div>
          </div>

          <div className="text-center mb-6">
            <div
              className={`text-5xl font-bold ${principle.iconColor} mb-2 group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_25px_currentColor]`}
              style={{ transform: "translateZ(30px)" }}
            >
              {principle.metric}
            </div>
            <div className="text-sm text-foreground/60 font-mono">{principle.metricLabel}</div>
          </div>

          <h3 className="text-xl font-bold mb-2 text-center group-hover:text-white transition-colors">
            {principle.title}
          </h3>
          <h4 className={`${principle.iconColor} font-semibold mb-4 text-center drop-shadow-lg`}>
            {principle.subtitle}
          </h4>
          <p className="text-foreground/90 text-base leading-relaxed text-center group-hover:text-foreground transition-colors">
            {principle.description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
