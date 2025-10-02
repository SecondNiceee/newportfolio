import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { WebGLBackground } from "@/components/webgl-background"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Nick - Веб-разработчик",
  description: "Превращаю идеи в молниеносно быстрые и визуально потрясающие веб-решения",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <WebGLBackground />
        <Header />
        {children}
      </body>
    </html>
  )
}
