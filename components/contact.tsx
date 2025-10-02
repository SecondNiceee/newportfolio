"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { MessageCircle, Send, Zap } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Contact() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="contact" className="py-8 sm:py-12 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-center gap-4 mb-6">
            <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-bounce" />
            <Send className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-bounce delay-200" />
            <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-bounce delay-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Готовы начать проект?
          </h2>
          <p className="text-foreground/60 font-mono text-base sm:text-lg max-w-2xl mx-auto">
            Свяжитесь со мной в Telegram, чтобы обсудить ваш проект. Быстрый ответ, профессиональный подход,
            неограниченные доработки до оплаты.
          </p>
        </div>

        <div
          className={`max-w-md mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <Card className="cursor-pointer bg-gradient-to-br from-primary/10 via-background/50 to-primary/5 border-primary/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />

            <CardContent className="p-8 text-center relative">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <MessageCircle className="h-16 w-16 text-primary mx-auto relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </div>

              <h3 className="text-xl font-bold mb-2">Написать в Telegram</h3>
              <p className="text-foreground/60 text-sm mb-6">
                @LastTryS — всегда на связи для обсуждения вашего проекта
              </p>

              <Button
                className="w-full py-3 group-hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 relative overflow-hidden cursor-pointer"
                size="lg"
                asChild
              >
                <a href="https://t.me/LastTryS" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <span className="relative z-10">Написать в Telegram</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
