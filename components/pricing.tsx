"use client"

import { Check, Sparkles, Zap, Shield } from "lucide-react"
import { Button } from "./ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Pricing() {
  const { ref, isVisible } = useScrollAnimation()

  const features = [
    "Полный цикл разработки от идеи до запуска",
    "Примерное создание лендинга 2-3 дня",
    "Форма заявки с уведомлениями в Telegram, WhatsApp или на почту",
    "Интеграция с WordPress для удобного управления контентом",
    "До 3-х страниц для ваших товаров или услуг",
    "Неограниченные правки до оплаты",
  ]

  return (
    <section id="pricing" className="py-8 sm:py-12 md:py-16 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-blue)]/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,var(--accent-blue)/10,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,var(--accent-green)/8,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20">
            <Sparkles className="h-4 w-4 text-[var(--accent-blue)]" />
            <span className="text-sm font-medium text-[var(--accent-blue)]">Специальное предложение</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Цены</h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Прозрачное ценообразование без скрытых платежей
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="bg-gradient-to-br from-[var(--pricing-card)] to-[var(--pricing-card)]/80 rounded-2xl p-8 md:p-10 border border-[var(--pricing-border)] shadow-xl hover:shadow-2xl hover:border-[var(--accent-blue)]/30 transition-all duration-300 group">
            <div className="text-center mb-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-[var(--accent-blue)]/10 rounded-full blur-2xl group-hover:bg-[var(--accent-blue)]/20 transition-colors" />
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                  3000₽
                </div>
                <p className="text-muted-foreground text-lg">Сайт под ключ</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/10">
                <Zap className="h-5 w-5 text-[var(--accent-blue)]" />
                <span className="text-xs text-center text-muted-foreground">Быстро</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/10">
                <Shield className="h-5 w-5 text-[var(--accent-green)]" />
                <span className="text-xs text-center text-muted-foreground">Надёжно</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/10">
                <Sparkles className="h-5 w-5 text-[var(--accent-blue)]" />
                <span className="text-xs text-center text-muted-foreground">Качественно</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 group/item hover:translate-x-1 transition-transform">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center group-hover/item:bg-[var(--accent-green)]/30 transition-colors">
                      <Check className="h-3 w-3 text-[var(--accent-green)]" strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-foreground text-base leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-white text-black hover:bg-white/90 font-semibold hover:scale-[1.02] transition-transform py-6"
              size="lg"
            >
              Начать проект
            </Button>
          </div>
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20">
            <Shield className="h-4 w-4 text-[var(--accent-green)]" />
            <p className="text-foreground font-medium">Оплата после полного согласования результата</p>
          </div>
        </div>
      </div>
    </section>
  )
}
