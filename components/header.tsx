import Link from "next/link"
import { MobileMenu } from "./mobile-menu"

export const Header = () => {
  return (
    <div className="relative z-50 pt-4 md:pt-8 w-full">
      <div className="absolute inset-0 bg-black/50 z-0" />
      <header className="relative flex items-center justify-between max-w-7xl mx-auto px-4 container">
        <Link href="/" className="cursor-pointer">
          <div className="text-2xl md:text-3xl font-bold text-primary">Nick</div>
        </Link>
        <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
          {["Принципы", "Работы", "цена", "Отзывы", "Контакты"].map((item, index) => {
            const hrefs = ["#principles", "#portfolio", "#pricing", "#testimonials", "#contact"]
            return (
              <Link
                className="uppercase cursor-pointer inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                href={hrefs[index]}
                key={item}
              >
                {item}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="max-lg:hidden cursor-pointer bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Contact
          </Link>
          <MobileMenu />
        </div>
      </header>
    </div>
  )
}
