import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import { ConditionalFooter } from "@/components/conditional-footer"
import { ConditionalChat } from "@/components/conditional-chat"
import { Providers } from "@/components/providers"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Lato Marketplace - Unlock Your Next Adventure",
  description:
    "Explore unique travel experiences tailored just for you. Connect with local experts and book your adventure today."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="font-sans flex flex-col min-h-screen">
        <Providers>
          {children}
          <ConditionalFooter />
          <ConditionalChat />
        </Providers>
      </body>
    </html>
  );
}
