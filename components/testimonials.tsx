"use client"

import { Card, CardContent } from "./ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()

  const testimonials = [
    {
      author: "teleatelekz",
      text: "Хочу выразить огромную благодарность Николаю за создание сайта! Работа была выполнена профессионально, быстро и с учётом всех моих пожеланий. Очень понравился подход — Николай всегда на связи, помогает с советами, предлагает лучшие решения. Сайт получился современным, удобным и отлично работает на всех устройствах. Рекомендую всем, кто ищет настоящего специалиста!",
      gradient: "from-blue-500/10 to-purple-500/10",
    },
    {
      author: "05marianna",
      text: "Николай, отлично и быстро справился с заказом. Плюс еще проконсультировал по другим интересующим вопросам. Коммуникабельный, доброжелательный и полезный человечек.",
      gradient: "from-green-500/10 to-blue-500/10",
    },
    {
      author: "vbstrakov",
      text: "Николай, отлично и быстро справился с заказом. Плюс еще проконсультировал по другим интересующим вопросам. Коммуникабельный, доброжелательный и полезный человечек.",
      gradient: "from-purple-500/10 to-pink-500/10",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section id="testimonials" className="py-8 sm:py-12 relative overflow-hidden" ref={ref}>
      {/* Increased overlay opacity from 30% to 50% */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex justify-center mb-6">
            <Quote className="h-8 w-8 sm:h-12 sm:w-12 text-primary/30 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sentient mb-4 sm:mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Отзывы клиентов
          </h2>
          <p className="text-foreground/60 font-mono text-base sm:text-lg">Что говорят о моей работе</p>
        </div>

        <div
          className={`relative max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Slider wrapper */}
          <div className="overflow-hidden h-[400px]">
            <div
              className="flex transition-transform duration-700 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4 h-full">
                  <Card className="bg-black/70 border-border/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group relative overflow-hidden h-full">
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="h-16 w-16 text-primary" />
                    </div>

                    <CardContent className="p-8 md:p-12 relative flex flex-col h-full">
                      <div className="flex mb-6 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-6 w-6 fill-primary text-primary group-hover:scale-110 transition-transform duration-300"
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>

                      <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-8 italic relative text-center flex-1 flex items-center justify-center">
                        <Quote className="h-5 w-5 text-primary/50 inline mr-2" />
                        {testimonial.text}
                        <Quote className="h-5 w-5 text-primary/50 inline ml-2 rotate-180" />
                      </p>

                      <div className="text-center">
                        <div className="w-16 h-0.5 bg-primary/30 mx-auto mb-4" />
                        <div className="text-primary font-semibold text-lg">— {testimonial.author}</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black/70 backdrop-blur-sm border-primary/40 hover:bg-black/90 hover:border-primary/60 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 w-12 h-12"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8 text-primary" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black/70 backdrop-blur-sm border-primary/40 hover:bg-black/90 hover:border-primary/60 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 w-12 h-12"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8 text-primary" />
          </Button>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
