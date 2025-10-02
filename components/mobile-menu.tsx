"use client"

import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface MobileMenuProps {
  className?: string
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: "Принципы", href: "#principles" },
    { name: "Работы", href: "#portfolio" },
    { name: "цена", href: "#pricing" },
    { name: "Отзывы", href: "#testimonials" },
    { name: "Контакты", href: "#contact" },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn("group cursor-pointer lg:hidden p-2 text-foreground transition-colors", className)}
          aria-label="Open menu"
        >
          <Menu className="group-[[data-state=open]]:hidden" size={24} />
          <X className="hidden group-[[data-state=open]]:block" size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div data-overlay="true" className="fixed z-30 inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in-0 duration-300" />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (e.target instanceof HTMLElement && e.target.dataset.overlay !== "true") {
              e.preventDefault()
            }
          }}
          className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-40 bg-background/95 backdrop-blur-lg border-l border-border/20 shadow-2xl animate-in slide-in-from-right-full duration-300 ease-out"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <h2 className="text-lg font-semibold text-foreground">Меню</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          <nav className="flex flex-col p-6 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="group relative flex items-center px-4 py-3 text-base font-mono uppercase text-foreground/70 hover:text-foreground transition-all duration-200 rounded-lg hover:bg-accent/10"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
              </Link>
            ))}

            <div className="mt-8 pt-6 border-t border-border/20">
              <Link
                href="https://t.me/LastTryS"
                onClick={handleLinkClick}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center px-4 py-3 text-base font-mono uppercase text-primary hover:text-primary/80 transition-all duration-200 rounded-lg hover:bg-primary/5"
              >
                <span className="relative z-10">Telegram</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg" />
              </Link>
            </div>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-xs text-muted-foreground text-center">
              © 2024 Nick - Веб-разработчик
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
