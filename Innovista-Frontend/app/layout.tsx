import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Healthcare AI Platform - Smart Healthcare for Everyone",
  description:
    "Pakistan's first AI-powered healthcare platform connecting patients with doctors, providing instant symptom analysis, and ensuring emergency care.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
