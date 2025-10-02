"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { ExternalLink, Code, Palette, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Portfolio() {
  const { ref, isVisible } = useScrollAnimation()

  const projects = [
    {
      title: "DocOnline24",
      description:
        "Профессиональный генератор документов с актуальными шаблонами. Telegram-бот с современным интерфейсом и быстрой обработкой запросов.",
      url: "https://doconline24.ru/",
      image: "/images/doconline24.png",
      tags: ["Telegram Bot", "React", "Node.js"],
      gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
      glowColor: "shadow-purple-500/50",
    },
    {
      title: "Теле-Ателье",
      description:
        "Сервисный центр по ремонту телевизоров. Современный дизайн с акцентом на доверие и профессионализм. Адаптивная верстка для всех устройств.",
      url: "https://teleatele.kz/",
      image: "/images/teleatele.png",
      tags: ["Landing Page", "Mobile-First", "SEO"],
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      glowColor: "shadow-blue-500/50",
    },
    {
      title: "VB Finance",
      description:
        "Финансовые и юридические услуги. Профессиональный корпоративный сайт с акцентом на экспертность и надежность.",
      url: "https://vsbatrakova.ru/",
      image: "/images/vbfinance.png",
      tags: ["Corporate", "WordPress", "Forms"],
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      glowColor: "shadow-green-500/50",
    },
  ]

  return (
    <section id="portfolio" className="py-8 sm:py-12 relative overflow-hidden" ref={ref}>
      {/* Increased overlay opacity from 30% to 50% */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-center gap-4 mb-6">
            <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-bounce delay-100" />
            <Palette className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-bounce delay-300" />
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-bounce delay-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 sm:mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Мои работы
          </h2>
          <p className="text-foreground/60 font-mono text-base sm:text-lg max-w-2xl mx-auto">
            Примеры сайтов, которые я создал с фокусом на скорость и пользовательский опыт
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-700 cursor-pointer hover:scale-[1.02] sm:hover:scale-105 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-75 blur-xl ${project.glowColor}`}
              />

              <Card className="relative bg-gradient-to-br pt-0 from-gray-900/90 to-black/90 border-2 border-gray-800 backdrop-blur-xl overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />

                <div className="aspect-video overflow-hidden min-h-[200px] sm:min-h-[220px] lg:min-h-[250px] relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 mix-blend-overlay`}
                  />
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap gap-1 sm:gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r ${project.gradient} rounded-full text-xs text-white font-mono font-bold shadow-lg backdrop-blur-sm`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6 relative h-full flex flex-col">
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent drop-shadow-lg`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">{project.description}</p>

                  <Button
                    className={`w-full mt-auto bg-gradient-to-r ${project.gradient} hover:shadow-2xl ${project.glowColor} transition-all duration-300 font-bold text-white border-0 text-sm sm:text-base py-2 sm:py-3`}
                    asChild
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Посмотреть сайт
                      <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </a>
                  </Button>
                </CardContent>

                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-20 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2`}
                />
              </Card>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-foreground/60 font-mono text-sm sm:text-base animate-pulse">
            Все сайты хорошо выглядят как на ПК, так и на мобильных устройствах, убедитесь сами
          </p>
        </div>
      </div>
    </section>
  )
}
