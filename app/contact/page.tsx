"use client"

import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Navigation />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-[19px] lg:px-[160px] pt-6">
        <div className="flex items-center gap-[2px] text-[14px]">
          <Link href="/" className="font-poppins text-[#686869] hover:underline leading-[21px]">Home</Link>
          <ChevronRight className="w-[14px] h-[14px] text-[#686869]/40" />
          <span className="font-poppins text-[#00A792] leading-[21px]">Get in touch</span>
        </div>
      </div>

      {/* Main Container - Header + Form */}
      <section className="max-w-7xl mx-auto px-[16px] lg:px-[160px] pt-[24px] lg:pt-[32px] pb-[40px] lg:pb-[53px]">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-[80px]">
          {/* Left Content - Header */}
          <div className="flex flex-col gap-[38px] lg:gap-[53px] w-full lg:w-auto">
            {/* Header Section */}
            <div className="flex flex-row justify-between items-start lg:items-center gap-4">
              {/* Text */}
              <div className="flex flex-col gap-[12px] lg:gap-[21px] w-full lg:w-[732px]">
                {/* Get Started */}
                <p className="font-poppins font-normal text-[20px] lg:text-[16px] leading-[37px] lg:leading-[24px] text-black">
                  Get Started
                </p>
                {/* Main Heading */}
                <h1 className="font-poppins font-bold text-[30px] lg:text-[60px] leading-[42px] lg:leading-[66px] text-black">
                  Get in touch with us. We&apos;re here to assist you.
                </h1>
              </div>

              {/* Social Media Icons - Desktop Only */}
              <div className="hidden lg:flex flex-col items-center gap-[16px]">
                {/* Facebook */}
                <a
                  href="https://facebook.com/latotravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[33px] h-[33px] rounded-full border border-[#B7B7B7] flex items-center justify-center hover:border-[#00A792] transition-colors"
                >
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 3.75V2.625C3.5 2.252 3.752 2 4.125 2H4.75V0H3.5C2.395 0 1.5 0.895 1.5 2V3.75H0.5V5.5H1.5V10H3.5V5.5H4.75L5.5 3.75H3.5Z" fill="#1E2532"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/latotravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[33px] h-[33px] rounded-full border border-[#B7B7B7] flex items-center justify-center hover:border-[#00A792] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1.08C7.602 1.08 7.792 1.086 8.425 1.117C9.009 1.144 9.327 1.24 9.539 1.32C9.819 1.427 10.019 1.555 10.229 1.765C10.439 1.975 10.567 2.175 10.673 2.455C10.754 2.667 10.85 2.985 10.877 3.569C10.907 4.202 10.913 4.392 10.913 5.994C10.913 7.596 10.907 7.786 10.877 8.419C10.85 9.003 10.754 9.321 10.673 9.533C10.567 9.813 10.439 10.013 10.229 10.223C10.019 10.433 9.819 10.561 9.539 10.667C9.327 10.748 9.009 10.844 8.425 10.871C7.792 10.901 7.602 10.907 6 10.907C4.398 10.907 4.208 10.901 3.575 10.871C2.991 10.844 2.673 10.748 2.461 10.667C2.181 10.561 1.981 10.433 1.771 10.223C1.561 10.013 1.433 9.813 1.327 9.533C1.246 9.321 1.15 9.003 1.123 8.419C1.093 7.786 1.087 7.596 1.087 5.994C1.087 4.392 1.093 4.202 1.123 3.569C1.15 2.985 1.246 2.667 1.327 2.455C1.433 2.175 1.561 1.975 1.771 1.765C1.981 1.555 2.181 1.427 2.461 1.32C2.673 1.24 2.991 1.144 3.575 1.117C4.208 1.087 4.398 1.08 6 1.08ZM6 0C4.371 0 4.166 0.007 3.526 0.036C2.887 0.065 2.451 0.167 2.07 0.315C1.675 0.468 1.341 0.673 1.007 1.007C0.673 1.341 0.468 1.675 0.315 2.07C0.167 2.451 0.065 2.887 0.036 3.526C0.007 4.166 0 4.371 0 6C0 7.629 0.007 7.834 0.036 8.474C0.065 9.113 0.167 9.549 0.315 9.93C0.468 10.325 0.673 10.659 1.007 10.993C1.341 11.327 1.675 11.532 2.07 11.685C2.451 11.833 2.887 11.935 3.526 11.964C4.166 11.993 4.371 12 6 12C7.629 12 7.834 11.993 8.474 11.964C9.113 11.935 9.549 11.833 9.93 11.685C10.325 11.532 10.659 11.327 10.993 10.993C11.327 10.659 11.532 10.325 11.685 9.93C11.833 9.549 11.935 9.113 11.964 8.474C11.993 7.834 12 7.629 12 6C12 4.371 11.993 4.166 11.964 3.526C11.935 2.887 11.833 2.451 11.685 2.07C11.532 1.675 11.327 1.341 10.993 1.007C10.659 0.673 10.325 0.468 9.93 0.315C9.549 0.167 9.113 0.065 8.474 0.036C7.834 0.007 7.629 0 6 0Z" fill="#1E2532"/>
                    <path d="M6 2.919C4.298 2.919 2.919 4.298 2.919 6C2.919 7.702 4.298 9.081 6 9.081C7.702 9.081 9.081 7.702 9.081 6C9.081 4.298 7.702 2.919 6 2.919ZM6 8C4.895 8 4 7.105 4 6C4 4.895 4.895 4 6 4C7.105 4 8 4.895 8 6C8 7.105 7.105 8 6 8Z" fill="#1E2532"/>
                    <path d="M9.203 3.517C9.6 3.517 9.923 3.195 9.923 2.797C9.923 2.4 9.6 2.077 9.203 2.077C8.805 2.077 8.483 2.4 8.483 2.797C8.483 3.195 8.805 3.517 9.203 3.517Z" fill="#1E2532"/>
                  </svg>
                </a>

                {/* Twitter */}
                <a
                  href="https://x.com/latotravel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[33px] h-[33px] rounded-full border border-[#B7B7B7] flex items-center justify-center hover:border-[#00A792] transition-colors"
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0.94C9.64 1.1 9.26 1.2 8.86 1.24C9.27 0.99 9.58 0.6 9.72 0.13C9.34 0.36 8.92 0.53 8.48 0.62C8.12 0.23 7.59 0 7 0C5.9 0 5 0.9 5 2C5 2.16 5.02 2.31 5.05 2.46C3.3 2.37 1.75 1.58 0.71 0.37C0.54 0.66 0.44 1 0.44 1.36C0.44 2.06 0.8 2.67 1.33 3.03C1.02 3.02 0.72 2.93 0.46 2.79V2.81C0.46 3.79 1.14 4.61 2.04 4.79C1.88 4.84 1.7 4.86 1.52 4.86C1.39 4.86 1.27 4.85 1.14 4.83C1.39 5.64 2.13 6.23 3 6.24C2.31 6.78 1.44 7.1 0.5 7.1C0.33 7.1 0.17 7.09 0.01 7.07C0.91 7.64 1.97 7.97 3.11 7.97C6.98 7.97 9.09 4.9 9.09 2.2C9.09 2.11 9.09 2.02 9.09 1.93C9.49 1.64 9.83 1.27 10.09 0.85L10 0.94Z" fill="#1E2532"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Input Area */}
            <form className="flex flex-col items-end gap-[38px] lg:gap-[32px] w-full lg:w-[959px]">
              {/* Input Container - Stacked on mobile, row on desktop */}
              <div className="flex flex-col lg:flex-row items-start gap-[26px] lg:gap-[21px] w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full lg:flex-1 h-[50px] lg:h-[42px] px-[18px] lg:px-[15px] border border-[rgba(0,0,0,0.59)] rounded-[8px] lg:rounded-[7px] font-poppins font-light text-[14px] lg:text-[12px] leading-[29px] lg:leading-[24px] text-black placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#00A792] bg-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full lg:flex-1 h-[50px] lg:h-[42px] px-[18px] lg:px-[15px] border border-[rgba(0,0,0,0.59)] rounded-[8px] lg:rounded-[7px] font-poppins font-light text-[14px] lg:text-[12px] leading-[29px] lg:leading-[24px] text-black placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#00A792] bg-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  className="w-full lg:flex-1 h-[50px] lg:h-[42px] px-[18px] lg:px-[15px] border border-[rgba(0,0,0,0.59)] rounded-[8px] lg:rounded-[7px] font-poppins font-light text-[14px] lg:text-[12px] leading-[29px] lg:leading-[24px] text-black placeholder:text-[rgba(0,0,0,0.5)] focus:outline-none focus:border-[#00A792] bg-transparent"
                />
              </div>

              {/* Message Textarea */}
              <textarea
                placeholder="Message"
                className="w-full h-[127px] lg:h-[106px] px-[18px] lg:px-[15px] py-[8px] lg:py-[7px] border border-[rgba(0,0,0,0.59)] rounded-[8px] lg:rounded-[7px] font-poppins font-light text-[14px] lg:text-[12px] leading-[29px] lg:leading-[24px] text-black placeholder:text-[rgba(0,0,0,0.6)] focus:outline-none focus:border-[#00A792] resize-none bg-transparent"
              />

              {/* CTA Button */}
              <button
                type="submit"
                className="flex flex-row justify-center items-center gap-[4px] lg:gap-[3px] w-[218px] lg:w-[182px] h-[48px] lg:h-[40px] bg-[#00A792] rounded-[24px] lg:rounded-[20px] font-poppins font-normal text-[16px] lg:text-[13px] leading-[normal] text-white text-center hover:bg-[#008F7A] transition-colors"
              >
                Leave us a Message
                <ArrowRight className="w-[19px] h-[19px] lg:w-[16px] lg:h-[16px]" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="relative overflow-hidden">
        {/* Wavy Background */}
        <div className="absolute inset-0 pointer-events-none">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 1920 400"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* First wave - lightest */}
            <path
              d="M0 80C160 40 320 120 480 80C640 40 800 120 960 80C1120 40 1280 120 1440 80C1600 40 1760 120 1920 80V400H0V80Z"
              fill="#F5FBFA"
            />
            {/* Second wave - slightly darker */}
            <path
              d="M0 120C160 80 320 160 480 120C640 80 800 160 960 120C1120 80 1280 160 1440 120C1600 80 1760 160 1920 120V400H0V120Z"
              fill="#EDF8F6"
            />
            {/* Third wave - darkest */}
            <path
              d="M0 160C160 120 320 200 480 160C640 120 800 200 960 160C1120 120 1280 200 1440 160C1600 120 1760 200 1920 160V400H0V160Z"
              fill="#E5F5F3"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-[16px] lg:px-[160px] py-[40px] lg:py-[53px]">
          <div className="flex flex-col lg:flex-row items-start gap-[24px] lg:gap-[46px]">
            {/* Header */}
            <div className="flex flex-col gap-[24px] lg:gap-[16px] w-full lg:w-[383px]">
              <p className="font-poppins font-normal text-[20px] lg:text-[16px] leading-[37px] lg:leading-[24px] text-[#00A792]">
                Contact Info
              </p>
              <h2 className="font-poppins font-bold text-[30px] lg:text-[37px] leading-[1.3] text-[#00A792]">
                We are always happy to assist you
              </h2>
            </div>

            {/* Container - Email & Number - Stacked on mobile */}
            <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-[68px] w-full lg:w-auto">
              {/* Email */}
              <div className="flex flex-col gap-[27px] lg:gap-[18px] p-[32px] lg:p-[21px] w-full lg:w-[207px]">
                {/* Heading */}
                <div className="flex flex-col gap-[25px] lg:gap-[17px]">
                  <p className="font-poppins font-bold text-[22px] lg:text-[15px] leading-[normal] text-[rgba(0,0,0,0.6)]">
                    Email Address
                  </p>
                  <div className="w-[27px] lg:w-[18px] h-[3px] lg:h-[2px] bg-[rgba(0,0,0,0.6)]" />
                </div>
                {/* Details */}
                <div className="flex flex-col gap-[25px] lg:gap-[17px]">
                  <p className="font-poppins font-bold text-[22px] lg:text-[15px] leading-[normal] text-[rgba(0,0,0,0.6)]">
                    help@info.com
                  </p>
                  <p className="font-poppins font-normal text-[20px] lg:text-[13px] leading-[32px] lg:leading-[21px] text-[rgba(0,0,0,0.6)]">
                    Assistance hours:<br />
                    Monday - Friday 6 am<br />
                    to 8 pm EST
                  </p>
                </div>
              </div>

              {/* Number */}
              <div className="flex flex-col gap-[27px] lg:gap-[18px] p-[32px] lg:p-[21px] w-full lg:w-[207px]">
                {/* Heading */}
                <div className="flex flex-col gap-[25px] lg:gap-[17px]">
                  <p className="font-poppins font-bold text-[22px] lg:text-[15px] leading-[normal] text-[rgba(0,0,0,0.6)]">
                    Number
                  </p>
                  <div className="w-[27px] lg:w-[18px] h-[3px] lg:h-[2px] bg-[rgba(0,0,0,0.6)]" />
                </div>
                {/* Details */}
                <div className="flex flex-col gap-[25px] lg:gap-[17px]">
                  <p className="font-poppins font-bold text-[22px] lg:text-[15px] leading-[normal] text-[rgba(0,0,0,0.6)]">
                    (808) 998-34256
                  </p>
                  <p className="font-poppins font-normal text-[20px] lg:text-[13px] leading-[32px] lg:leading-[21px] text-[rgba(0,0,0,0.6)]">
                    Assistance hours:<br />
                    Monday - Friday 6 am<br />
                    to 8 pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
