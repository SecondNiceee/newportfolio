"use client"

import { Hero } from "@/components/hero"
import { Principles } from "@/components/principles"
import { Portfolio } from "@/components/portfolio"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <div>
      <Hero />
      <Principles />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <Contact />
    </div>
  )
}
