"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Narrow content container for readability */}
        <div className="max-w-3xl">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00A699] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#00A699]">Privacy Policy</span>
          </nav>

        {/* Page Title */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: [Month Year]
          </p>
        </header>

        {/* Intro */}
        <p className="mb-10 text-base leading-7 text-gray-700">
          At Lato, your privacy matters. We collect only what’s necessary to plan
          better trips and deliver smooth travel experiences. This policy
          explains how we handle your information.
        </p>

        {/* ================= SECTIONS ================= */}
        <Section title="Information We Collect">
          <p>
            We may collect the following information when you use Lato:
          </p>
          <ul>
            <li>Full name and contact details (email, phone number)</li>
            <li>Travel preferences and booking details</li>
            <li>
              Payment information (processed securely via third-party providers)
            </li>
            <li>Device and usage data to improve website performance</li>
          </ul>
          <p className="mt-4">
            No spying. No unnecessary hoarding.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>Your data is used to:</p>
          <ul>
            <li>Process bookings and payments</li>
            <li>Communicate trip details, updates, and support</li>
            <li>Personalize travel recommendations</li>
            <li>Improve our services and user experience</li>
            <li>Meet legal and regulatory requirements</li>
          </ul>
          <p className="mt-4">That’s it. No drama.</p>
        </Section>

        <Section title="Data Sharing & Third Parties">
          <p>We only share your information with:</p>
          <ul>
            <li>
              Airlines, hotels, and service partners needed to fulfill your
              booking
            </li>
            <li>Secure payment processors</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p className="mt-4 font-medium">
            We never sell your personal data. Ever.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            Lato uses industry-standard security measures to protect your data.
            While no system is flawless, we take every reasonable step to keep
            your information safe and confidential.
          </p>
        </Section>

        <Section title="Cookies & Tracking">
          <p>We use cookies to:</p>
          <ul>
            <li>Remember your preferences</li>
            <li>Analyze site traffic</li>
            <li>Improve performance</li>
          </ul>
          <p className="mt-4">
            You can manage cookie settings through your browser at any time.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request corrections or updates</li>
            <li>Ask for deletion of your information</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
          <p className="mt-4">
            Just reach out. We won’t make it painful.
          </p>
        </Section>

        <Section title="Data Retention">
          <p>
            We keep your information only as long as necessary to provide
            services or comply with legal obligations. When it’s no longer
            needed, it’s securely removed.
          </p>
        </Section>

        <Section title="Policy Updates">
          <p>
            This policy may be updated from time to time. Any changes will be
            reflected on this page with a revised date.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            For privacy-related questions or requests:
          </p>
          <p className="mt-2">
            Email:{" "}
            <a
              href="mailto:privacy@lato.travel"
              className="text-teal-600 hover:underline"
            >
              privacy@lato.travel
            </a>
          </p>
          <p className="mt-2 text-gray-600">
            We’re here to help, not hide.
          </p>
        </Section>
        </div>
      </div>

      <Footer />
    </div>
  )
}

/* ================= REUSABLE SECTION ================= */

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        {title}
      </h2>
      <div className="space-y-3 text-base leading-7 text-gray-700">
        {children}
      </div>
    </section>
  )
}
