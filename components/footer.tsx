import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Company Info - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/lato-logo.png"
                alt="Lato"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Latois a thriving community where innovators, professionals, and enthusiasts come together to share knowledge, collaborate, and grow.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-md bg-gray-800 flex items-center justify-center text-white hover:bg-gray-700 transition-colors">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/testimonial" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Testimonial
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Developers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Web Technologies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Learn Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  MM Plus
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Hacks Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Our communities */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Our communities</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  MM Communities
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  MM Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  MM Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-teal-500" />
                <span className="text-sm text-gray-600">+123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-teal-500" />
                <span className="text-sm text-gray-600">support@mm.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">© 2025 Lato. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Use
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/legal" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Legal
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/sitemap" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Site Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
