"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageCircle, User, LogOut, Settings, Heart, ChevronDown, Menu, X, Check, MailIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { useSavedTours } from "@/lib/saved-tours-context"
import { useEnhancedMessages } from "@/contexts/EnhancedMessagesContext"
import { DestinationsDropdownTrigger, DestinationsDropdownPanel } from "@/components/navigation/DestinationsDropdown"
import { TravelStyleDropdownTrigger, TravelStyleDropdownPanel } from "@/components/navigation/TravelStyleDropdown"

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
]

// Regions with their countries for mobile destination dropdown
const MOBILE_REGIONS = [
  {
    name: "Africa",
    places: 23,
    countries: ["Morocco", "Egypt", "Kenya", "South Africa", "Tanzania", "Nigeria"],
  },
  {
    name: "Europe",
    places: 23,
    countries: ["Italy", "Spain", "Turkey", "France", "Greece", "Portugal", "Germany", "Netherlands", "Switzerland", "Croatia"],
  },
  {
    name: "Asia",
    places: 23,
    countries: ["Thailand", "Japan", "Indonesia", "Vietnam", "Malaysia", "Singapore", "Philippines", "South Korea", "China", "India"],
  },
  {
    name: "South America",
    places: 23,
    countries: ["Peru", "Brazil", "Argentina", "Mexico", "Colombia", "Chile"],
  },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, logout, isHydrated } = useAuth()
  const { savedToursCount } = useSavedTours()
  const { getTotalUnread } = useEnhancedMessages()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [openDropdown, setOpenDropdown] = useState<"destinations" | "travel-style" | null>(null)

  // Mobile menu dropdown states
  const [mobileDestinationExpanded, setMobileDestinationExpanded] = useState(false)
  const [mobileTravelStyleExpanded, setMobileTravelStyleExpanded] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const handleDropdownOpen = (dropdown: "destinations" | "travel-style") => {
    setOpenDropdown(dropdown)
  }

  const handleDropdownClose = () => {
    setOpenDropdown(null)
  }

  const totalUnreadMessages = getTotalUnread()
  const isWishlistPage = pathname === "/wishlist" || pathname === "/saved-trips"
  const isChatsPage = pathname === "/chats" || pathname.startsWith("/chats/")

  return (
    <nav className="bg-[#FFFFFF] sticky top-0 z-50 border-b border-gray-100 relative">
      {/* Mobile Header - Figma: px-[47px] py-[12px], content w-[304px] */}
      <div className="flex lg:hidden justify-center px-[47px] py-[12px]">
        <div className="flex items-center justify-between w-[304px]">
          <Link href="/" className="flex items-center">
            <img
              src="/lato-logo.png"
              alt="Lato"
              className="w-[41px] h-[16px] object-contain"
            />
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
              if (mobileMenuOpen) {
                // Reset states when closing
                setMobileDestinationExpanded(false)
                setMobileTravelStyleExpanded(false)
                setSelectedRegion(null)
              }
            }}
            className="w-[24px] h-[24px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-[24px] h-[24px]" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5L20 5" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 12L6 12" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 19L16 19" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <img
              src="/lato-logo.png"
              alt="Lato"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            <Link
              href="/about"
              className="text-gray-700 hover:text-black transition-colors font-normal text-[15px]"
            >
              About Us
            </Link>

            <Link
              href="/tours"
              className="text-gray-700 hover:text-black transition-colors font-normal text-[15px]"
            >
              Explore Places
            </Link>

            <DestinationsDropdownTrigger
              isOpen={openDropdown === "destinations"}
              onOpen={() => handleDropdownOpen("destinations")}
              onClose={handleDropdownClose}
            />

            <TravelStyleDropdownTrigger
              isOpen={openDropdown === "travel-style"}
              onOpen={() => handleDropdownOpen("travel-style")}
              onClose={handleDropdownClose}
            />

            <Link
              href="/contact"
              className="text-gray-700 hover:text-black transition-colors font-normal text-[15px]"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!isHydrated ? (
              // Show loading placeholder while hydrating
              <div className="w-24 h-10 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            ) : user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-gray-700 hover:text-[#00A699] transition-colors font-normal text-[15px] outline-none">
                      {selectedCurrency.code}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 p-1 bg-white">
                    {currencies.map((currency) => (
                      <DropdownMenuItem
                        key={currency.code}
                        onClick={() => setSelectedCurrency(currency)}
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                          selectedCurrency.code === currency.code
                            ? "bg-[#E6F7F5] text-[#00A699]"
                            : "hover:bg-[#F0FDFC] hover:text-[#00A699]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-gray-500">{currency.symbol}</span>
                          <span>{currency.code}</span>
                        </span>
                        {selectedCurrency.code === currency.code && (
                          <Check className="h-4 w-4 text-[#00A699]" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href="/wishlist"
                  className={`p-2 rounded-full transition-colors relative ${
                    isWishlistPage
                      ? "text-[#00A699]"
                      : "text-gray-700 hover:text-[#00A699]"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlistPage ? "fill-[#00A699]" : ""}`}
                  />
                  {savedToursCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-[#00A699] text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                      {savedToursCount}
                    </Badge>
                  )}
                </Link>

                <Link
                  href="/chats"
                  className={`p-2 rounded-full transition-colors relative ${
                    isChatsPage
                      ? "text-[#00A699]"
                      : "text-gray-700 hover:text-[#00A699]"
                  }`}
                >
                  <MailIcon className="h-5 w-5" />
                  {totalUnreadMessages > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-[#00A699] text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                      {totalUnreadMessages}
                    </Badge>
                  )}
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:ring-2 hover:ring-[#00A699]/20">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-[#00A699] text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 p-3 bg-white rounded-xl shadow-lg border-0" align="end" forceMount>
                    <DropdownMenuItem asChild className="group px-0 py-2 rounded-md cursor-pointer text-[#1C1B1F] hover:bg-transparent hover:text-[#00A699] focus:bg-transparent focus:text-[#00A699]">
                      <Link href="/profile" className="flex items-center justify-between w-full">
                        <span>My Profile</span>
                        <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="group px-0 py-2 rounded-md cursor-pointer text-[#1C1B1F] hover:bg-transparent hover:text-[#00A699] focus:bg-transparent focus:text-[#00A699]">
                      <Link href="/settings" className="flex items-center justify-between w-full">
                        <span>Settings</span>
                        <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="group px-0 py-2 rounded-md cursor-pointer text-[#1C1B1F] hover:bg-transparent hover:text-[#00A699] focus:bg-transparent focus:text-[#00A699]">
                      <Link href="/wishlist" className="flex items-center justify-between w-full">
                        <span>My Bookings</span>
                        <ChevronDown className="h-4 w-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        await logout()
                      }}
                      className="px-0 py-2 rounded-md cursor-pointer text-[#F23813] hover:bg-transparent hover:text-[#E54D2E] focus:bg-transparent focus:text-[#E54D2E]"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-black transition-colors font-normal text-[15px]"
                >
                  Login
                </Link>
                <div className="group">
                  <Link
                    href="/register"
                    className="relative overflow-hidden rounded-full bg-black text-white px-6 py-2.5 font-normal text-[15px] inline-flex items-center justify-center"
                  >
                    <span className="relative z-10">Sign Up</span>

                    <span className="absolute inset-0 bg-[#00A792] rounded-full scale-0 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100 z-0"></span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Panels - Full width below navbar */}
      <DestinationsDropdownPanel
        isOpen={openDropdown === "destinations"}
        onClose={handleDropdownClose}
      />
      <TravelStyleDropdownPanel
        isOpen={openDropdown === "travel-style"}
        onClose={handleDropdownClose}
      />

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F7F7] relative overflow-y-auto" style={{ minHeight: mobileDestinationExpanded ? (selectedRegion ? '900px' : '650px') : (user ? '617px' : '375px') }}>
          {/* Back Arrow - Figma: left: 16px, top: 78px (30px from menu top since header is 48px) */}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              setMobileDestinationExpanded(false)
              setMobileTravelStyleExpanded(false)
              setSelectedRegion(null)
            }}
            className="absolute left-[16px] top-[30px] flex items-center justify-center w-[37px] h-[38px] bg-white/30 rounded-full"
            style={{ transform: 'rotate(90deg)' }}
            aria-label="Close menu"
          >
            <ChevronDown className="w-[9px] h-[4.5px] text-[#141B34]" style={{ transform: 'rotate(-90deg)' }} />
          </button>

          {/* Not logged in: Login/Sign Up buttons - Figma: centered, top: 27px (75px - 48px header) */}
          {!isHydrated ? (
            <div className="absolute left-1/2 -translate-x-1/2 top-[27px] flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            </div>
          ) : !user ? (
            <div className="absolute left-1/2 -translate-x-1/2 top-[27px] flex items-center justify-between w-[290px] h-[38px]">
              <Link
                href="/login"
                className="flex items-center justify-center w-[110px] h-[38px] rounded-[23px] font-poppins font-light text-[14px] text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center w-[129px] h-[38px] bg-black rounded-[22px] font-poppins font-light text-[13px] text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : null}

          {/* Menu Items - Figma logged-in: left: 37px, top: 43px (91px - 48px) | not logged-in: left: 35px, top: 106px (154px - 48px) */}
          {/* Figma: width: 140px, height: 226px, gap: 19px, font: Poppins 19.69px/30px */}
          <div
            className="absolute flex flex-col items-start gap-[19px] w-[140px]"
            style={{
              left: '37px',
              top: user ? '43px' : '106px'
            }}
          >
            <Link
              href="/about"
              className="h-[30px] font-poppins font-normal text-[19.69px] leading-[30px] text-[#1C1B1F]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/tours"
              className="h-[30px] font-poppins font-normal text-[19.69px] leading-[30px] text-[#1C1B1F]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Places
            </Link>

            <button
              onClick={() => {
                setMobileDestinationExpanded(!mobileDestinationExpanded)
                setMobileTravelStyleExpanded(false)
                setSelectedRegion(null)
              }}
              className="flex items-center gap-[11px] h-[30px] font-poppins font-normal text-[19.69px] leading-[30px]"
            >
              <span className={mobileDestinationExpanded ? "text-[#00A792]" : "text-[#1C1B1F]"}>
                Destination
              </span>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                className={`transition-transform duration-200 ${mobileDestinationExpanded ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1L6 5L11 1"
                  stroke={mobileDestinationExpanded ? "#00A792" : "#141B34"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                setMobileTravelStyleExpanded(!mobileTravelStyleExpanded)
                setMobileDestinationExpanded(false)
                setSelectedRegion(null)
              }}
              className="flex items-center justify-between w-full h-[30px] font-poppins font-normal text-[19.69px] leading-[30px]"
            >
              <span className={mobileTravelStyleExpanded ? "text-[#00A792]" : "text-[#1C1B1F]"}>
                Travel Style
              </span>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                className={`transition-transform duration-200 ${mobileTravelStyleExpanded ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1L6 5L11 1"
                  stroke={mobileTravelStyleExpanded ? "#00A792" : "#141B34"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Link
              href="/contact"
              className="h-[30px] font-poppins font-normal text-[19.69px] leading-[30px] text-[#1C1B1F]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>

          {/* Destination Dropdown Cards - Show when expanded */}
          {mobileDestinationExpanded && (
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center w-[341px]" style={{ top: user ? '200px' : '263px' }}>
              <div className="bg-[#F7F7F7] rounded-[8.99px] p-[16px] w-[334px]">
                <div className="flex flex-col gap-[18px]">
                  {MOBILE_REGIONS.map((region) => (
                    <button
                      key={region.name}
                      onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                      className={`flex items-center justify-between w-[300.5px] h-[83.68px] px-[13.5px] py-[10.8px] rounded-[10px] transition-all ${
                        selectedRegion === region.name
                          ? "bg-[#00A792] shadow-[0px_42.59px_39.22px_0px_rgba(192,207,205,0.45)]"
                          : "bg-[#FCFDFE]"
                      }`}
                    >
                      <div className="flex flex-col items-start">
                        <span className={`font-poppins font-medium text-[17.71px] leading-[27px] ${
                          selectedRegion === region.name ? "text-white" : "text-[#1C1B1F]"
                        }`}>
                          {region.name}
                        </span>
                        <span className={`font-poppins font-light text-[17.09px] leading-[26px] ${
                          selectedRegion === region.name ? "text-white" : "text-[#1C1B1F]/40"
                        }`}>
                          {region.places} Places
                        </span>
                      </div>
                      {selectedRegion === region.name && (
                        <ChevronDown className="w-[10.8px] h-[5.4px] text-white -rotate-90" strokeWidth={1.5} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Countries Grid - Show when region is selected */}
              {selectedRegion && (
                <div className="mt-[40px] px-[35px] w-full">
                  <h3 className="font-poppins font-normal text-[19.69px] leading-[30px] text-[#1C1B1F] mb-[20px]">
                    {selectedRegion}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-[80px] gap-y-[8.58px]">
                    {MOBILE_REGIONS.find(r => r.name === selectedRegion)?.countries.map((country) => (
                      <Link
                        key={country}
                        href={`/tours?destination=${encodeURIComponent(country)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-['Plus_Jakarta_Sans'] font-normal text-[18.52px] leading-[37px] text-[#3A3A3A] text-left hover:text-[#00A792] transition-colors"
                      >
                        {country}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/tours?region=${encodeURIComponent(selectedRegion)}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-block font-poppins font-normal text-[14px] text-[#00A792] mt-[20px]"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Logged in user options - Figma: left: 37px, top: 301px (349px - 48px) */}
          {/* Figma: width: 158px, height: 284px, font: Plus Jakarta Sans 21.59px/43px */}
          {user && !mobileDestinationExpanded && (
            <div className="absolute left-[37px] top-[301px] flex flex-col items-start w-[158px]">
              {/* Menu items with gap-[5px], height: 240px */}
              <div className="flex flex-col items-start gap-[5px] w-full">
                <Link
                  href="/profile"
                  className="h-[44px] flex items-center font-['Plus_Jakarta_Sans'] font-normal text-[21.59px] leading-[43px] text-[#3A3A3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/wishlist"
                  className="h-[44px] flex items-center font-['Plus_Jakarta_Sans'] font-normal text-[21.59px] leading-[43px] text-[#3A3A3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wishlist
                  {savedToursCount > 0 && (
                    <Badge className="ml-2 bg-[#00A699] text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                      {savedToursCount}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/chats"
                  className="h-[44px] flex items-center font-['Plus_Jakarta_Sans'] font-normal text-[21.59px] leading-[43px] text-[#3A3A3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                  {totalUnreadMessages > 0 && (
                    <Badge className="ml-2 bg-[#00A699] text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                      {totalUnreadMessages}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/settings"
                  className="h-[44px] flex items-center font-['Plus_Jakarta_Sans'] font-normal text-[21.59px] leading-[43px] text-[#3A3A3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  href="/my-bookings"
                  className="h-[44px] flex items-center font-['Plus_Jakarta_Sans'] font-normal text-[21.59px] leading-[43px] text-[#3A3A3A]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </Link>
              </div>
              {/* Logout with border-top - Figma: border-top: 1px solid rgba(0, 0, 0, 0.1) */}
              <button
                onClick={async () => {
                  await logout()
                  setMobileMenuOpen(false)
                }}
                className="h-[44px] flex items-center font-['Plus_Jakarta_Sans'] font-normal text-[21.59px] leading-[43px] text-[#F23813] border-t border-black/10 w-[158px] mt-0"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      )}
    </nav>
  )
}
