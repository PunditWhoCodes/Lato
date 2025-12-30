"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, AtSign } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
          {/* Left - Brand Section */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/lato-logo.png"
                alt="Lato"
                width={100}
                height={38}
                priority
                className="h-[38px] w-auto"
              />
            </Link>

            {/* Tagline */}
            <p className="font-poppins font-light text-[15px] leading-[22px] text-black max-w-[280px]">
              More than just bookings. Lato connects travelers with curated travel experiences, trusted tour operators.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <SocialIcon href="#" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.6667 17.3333H21.3333L22.3333 13.3333H18.6667V11.3333C18.6667 10.3067 18.6667 9.33333 20.6667 9.33333H22.3333V6C22.0227 5.96 20.7147 5.86667 19.3467 5.86667C16.492 5.86667 14.6667 7.42933 14.6667 10.5333V13.3333H11.3333V17.3333H14.6667V26.1333H18.6667V17.3333Z" fill="#293960"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 10.6667C14.5855 10.6667 13.229 11.2286 12.2288 12.2288C11.2286 13.229 10.6667 14.5855 10.6667 16C10.6667 17.4145 11.2286 18.771 12.2288 19.7712C13.229 20.7714 14.5855 21.3333 16 21.3333C17.4145 21.3333 18.771 20.7714 19.7712 19.7712C20.7714 18.771 21.3333 17.4145 21.3333 16C21.3333 14.5855 20.7714 13.229 19.7712 12.2288C18.771 11.2286 17.4145 10.6667 16 10.6667Z" fill="#293960"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.6 2.66667C7.76174 2.66667 6.00087 3.39714 4.69919 4.69919C3.3975 6.00087 2.66667 7.76174 2.66667 9.6V22.4C2.66667 24.2383 3.39714 25.9991 4.69919 27.3008C6.00087 28.6025 7.76174 29.3333 9.6 29.3333H22.4C24.2383 29.3333 25.9991 28.6029 27.3008 27.3008C28.6025 25.9991 29.3333 24.2383 29.3333 22.4V9.6C29.3333 7.76174 28.6029 6.00087 27.3008 4.69919C25.9991 3.3975 24.2383 2.66667 22.4 2.66667H9.6ZM8 16C8 13.8783 8.84286 11.8434 10.3431 10.3431C11.8434 8.84286 13.8783 8 16 8C18.1217 8 20.1566 8.84286 21.6569 10.3431C23.1571 11.8434 24 13.8783 24 16C24 18.1217 23.1571 20.1566 21.6569 21.6569C20.1566 23.1571 18.1217 24 16 24C13.8783 24 11.8434 23.1571 10.3431 21.6569C8.84286 20.1566 8 18.1217 8 16ZM24 9.33333C24.7364 9.33333 25.3333 8.73638 25.3333 8C25.3333 7.26362 24.7364 6.66667 24 6.66667C23.2636 6.66667 22.6667 7.26362 22.6667 8C22.6667 8.73638 23.2636 9.33333 24 9.33333Z" fill="#293960"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.3653 3H28.7947L19.1173 14.0267L30.4 29H21.5653L14.5893 19.8347L6.61867 29H2.18667L12.512 17.2133L1.6 3H10.6667L16.9973 11.4107L24.3653 3ZM22.8 26.32H25.2267L9.328 5.48H6.72L22.8 26.32Z" fill="#293960"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 11.3333H3.33333V28H8V11.3333Z" fill="#293960"/>
                  <path d="M5.66667 2.66667C4.00001 2.66667 2.66667 4 2.66667 5.66667C2.66667 7.33333 4.00001 8.66667 5.66667 8.66667C7.33334 8.66667 8.66667 7.33333 8.66667 5.66667C8.66667 4 7.33334 2.66667 5.66667 2.66667Z" fill="#293960"/>
                  <path d="M22.6667 11.3333C19.3333 11.3333 18 12.6667 17.3333 14V11.3333H12V28H17.3333V19.3333C17.3333 17.3333 18 15.3333 20.6667 15.3333C23.3333 15.3333 23.3333 18 23.3333 19.3333V28H28.6667V18.6667C28.6667 14 27.3333 11.3333 22.6667 11.3333Z" fill="#293960"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="#" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.2267 19.6L19.8667 16L14.2267 12.4V19.6ZM28.3467 8.97333C28.5333 9.65333 28.6667 10.5733 28.76 11.7467C28.8667 12.92 28.9067 13.9333 28.9067 14.8133L29 16C29 19.1467 28.76 21.4667 28.3467 23.0267C27.9733 24.4 27.0667 25.3067 25.6933 25.68C25.0133 25.8667 23.7333 26 21.7333 26.0933C19.76 26.2 17.9467 26.24 16.2667 26.24L14 26.3333C7.90667 26.3333 4.2 26.0933 2.64 25.68C1.26667 25.3067 0.36 24.4 -0.013333 23.0267C-0.2 22.3467 -0.333333 21.4267 -0.426667 20.2533C-0.533333 19.08 -0.573333 18.0667 -0.573333 17.1867L-0.666667 16C-0.666667 12.8533 -0.426667 10.5333 -0.013333 8.97333C0.36 7.6 1.26667 6.69333 2.64 6.32C3.32 6.13333 4.6 6 6.6 5.90667C8.57333 5.8 10.3867 5.76 12.0667 5.76L14.3333 5.66667C20.4267 5.66667 24.1333 5.90667 25.6933 6.32C27.0667 6.69333 27.9733 7.6 28.3467 8.97333Z" fill="#293960"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Right - Link Columns */}
          <div className="flex flex-col gap-10">
            {/* Row 1: 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {/* Company */}
              <FooterColumn title="Company">
                <FooterLink href="/about">About us</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/testimonial">Testimonial</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
              </FooterColumn>

              {/* Explore Destinations */}
              <FooterColumn title="Explore Destinations">
                <FooterLink href="/tours?region=europe">Europe</FooterLink>
                <FooterLink href="/tours?region=asia">Asia</FooterLink>
                <FooterLink href="/tours?region=middle-east">Middle East</FooterLink>
                <FooterLink href="/tours?region=africa">Africa</FooterLink>
                <FooterLink href="/tours?region=australia">Australia</FooterLink>
              </FooterColumn>

              {/* For Travelers */}
              <FooterColumn title="For Traveler's">
                <FooterLink href="/tours">Browse Tours</FooterLink>
                <FooterLink href="/guides">Find Local Guides</FooterLink>
                <FooterLink href="/support">Traveler Support Center</FooterLink>
                <FooterLink href="/payments">Secure Payments</FooterLink>
                <FooterLink href="/refund-policy">Refund Policy</FooterLink>
              </FooterColumn>

              {/* For Operators */}
              <FooterColumn title="For Operators">
                <FooterLink href="/partner">Become a Partner</FooterLink>
                <FooterLink href="/list-tours">List Your Tours</FooterLink>
                <FooterLink href="/dashboard">Operator Dashboard</FooterLink>
                <FooterLink href="/bookings">Manage Bookings</FooterLink>
                <FooterLink href="/messages">Chat with Travelers</FooterLink>
              </FooterColumn>
            </div>

            {/* Row 2: 3 columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Travel Experiences */}
              <FooterColumn title="Travel Experiences">
                <FooterLink href="/tours?style=adventure">Adventure Tours</FooterLink>
                <FooterLink href="/tours?style=cultural">Cultural & Heritage Trips</FooterLink>
                <FooterLink href="/tours?style=luxury">Luxury Experiences</FooterLink>
                <FooterLink href="/tours?style=wellness">Wellness Retreats</FooterLink>
                <FooterLink href="/tours?style=family">Family Travel</FooterLink>
              </FooterColumn>

              {/* Legal */}
              <FooterColumn title="Legal">
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/cookies">Cookie Settings</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </FooterColumn>

              {/* Contact Us */}
              <div className="flex flex-col gap-3">
                <h4 className="font-poppins font-semibold text-[15px] text-black">
                  Contact Us
                </h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-[18px] h-[18px] text-[#00A792]" strokeWidth={2.5} />
                    <span className="font-poppins text-[14px] text-[#3A3A3A]">
                      +123 456 7890
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AtSign className="w-[18px] h-[18px] text-[#00A792]" strokeWidth={2.5} />
                    <span className="font-poppins text-[14px] text-[#3A3A3A]">
                      support@mm.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="font-poppins font-light text-[14px] text-[#3A3A3A]">
              © 2025 Lato. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div className="flex items-center gap-5 lg:gap-8">
              <Link
                href="/privacy"
                className="font-poppins font-medium text-[14px] text-[#3A3A3A] hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-poppins font-medium text-[14px] text-[#3A3A3A] hover:text-black transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                href="/legal"
                className="font-poppins font-medium text-[14px] text-[#3A3A3A] hover:text-black transition-colors"
              >
                Legal
              </Link>
              <Link
                href="/sitemap"
                className="font-poppins font-medium text-[14px] text-[#3A3A3A] hover:text-black transition-colors"
              >
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ================= REUSABLE COMPONENTS ================= */

function SocialIcon({
  href,
  children,
  "aria-label": ariaLabel,
}: {
  href: string
  children: React.ReactNode
  "aria-label": string
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
    >
      {children}
    </Link>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-poppins font-semibold text-[15px] text-black">
        {title}
      </h4>
      <ul className="flex flex-col gap-[10px]">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className="font-poppins text-[14px] text-black/80 hover:text-black transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}
