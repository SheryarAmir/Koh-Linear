import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/(ui)/theme-provider"
import { Header } from "@/app/(ui)/Header"
import { Footer } from "@/app/(ui)/Footer"
import QueryProvider from "@/app/Provider/Query-Provider";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kho-Linear",
  description: "A clean, minimalist platform inspired by Linear's design philosophy",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider defaultTheme="system" storageKey="kho-linear-theme">
          <div className="container mx-auto min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
 <QueryProvider>
              {children}
              </QueryProvider>
              </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
