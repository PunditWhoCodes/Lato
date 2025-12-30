"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, ArrowRight, ChevronRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ================= HERO SECTION ================= */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* Breadcrumb */}
          <nav className="mb-10 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00A699] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#00A699]">Get in touch</span>
          </nav>

          {/* Content Grid */}
          <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-[1fr_420px]">

            {/* Left Content */}
            <div>
              <p className="mb-4 text-sm font-medium text-gray-700">
                Get Started
              </p>

              <h1 className="mb-10 max-w-xl text-4xl font-bold leading-tight text-black md:text-5xl">
                Get in touch with us.
                <br />
                We&apos;re here to assist
                <br />
                you.
              </h1>

              {/* Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Email Address" type="email" />
                  <Input placeholder="Phone Number (optional)" />
                </div>

                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-teal-600 focus:outline-none"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    Leave us a Message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Social Icons */}
            <div className="hidden lg:flex flex-col items-center gap-4 pt-16">
              <SocialIcon icon={<Facebook />} />
              <SocialIcon icon={<Instagram />} />
              <SocialIcon icon={<Twitter />} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO SECTION ================= */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">

            {/* Left */}
            <div>
              <p className="mb-3 text-sm font-medium text-teal-600">
                Contact Info
              </p>
              <h2 className="text-3xl font-bold leading-tight text-teal-700">
                We are always
                <br />
                happy to assist you
              </h2>
            </div>

            {/* Email */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                Email Address
              </h4>
              <p className="mb-3 text-sm text-gray-700">
                help@info.com
              </p>
              <p className="text-sm text-gray-500">
                Assistance hours:
                <br />
                Monday – Friday 6 am
                <br />
                to 8 pm EST
              </p>
            </div>

            {/* Phone */}
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900">
                Number
              </h4>
              <p className="mb-3 text-sm text-gray-700">
                (808) 998-34256
              </p>
              <p className="text-sm text-gray-500">
                Assistance hours:
                <br />
                Monday – Friday 6 am
                <br />
                to 8 pm EST
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ================= REUSABLE COMPONENTS ================= */

function Input({
  type = "text",
  placeholder,
}: {
  type?: string
  placeholder: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-teal-600 focus:outline-none"
    />
  )
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <Link
      href="#"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
    >
      {icon}
    </Link>
  )
}
