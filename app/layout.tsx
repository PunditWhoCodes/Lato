import type React from "react"
import type { Metadata } from "next"
import { Poppins, Montserrat, Open_Sans, Mulish, Volkhov, Inter } from "next/font/google"
import "./globals.css"
import { ConditionalFooter } from "@/components/conditional-footer"
import { ConditionalChat } from "@/components/conditional-chat"
import { Providers } from "@/components/providers"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "600", "700"],
})

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
  weight: ["400", "600", "700"],
})

const volkhov = Volkhov({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-volkhov",
  weight: ["400", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "700"],
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
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} ${openSans.variable} ${mulish.variable} ${volkhov.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-poppins flex flex-col min-h-screen bg-background" suppressHydrationWarning>
        <Providers>
          {children}
          <ConditionalFooter />
          <ConditionalChat />
        </Providers>
      </body>
    </html>
  );
}
