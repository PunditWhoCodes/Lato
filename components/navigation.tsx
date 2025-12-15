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
import { MessageCircle, User, LogOut, Settings, Heart, ChevronDown, Menu, X, Check, MailIcon } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { useSavedTours } from "@/lib/saved-tours-context"
import { useEnhancedMessages } from "@/contexts/EnhancedMessagesContext"

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
]

export function Navigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { savedToursCount } = useSavedTours()
  const { getTotalUnread } = useEnhancedMessages()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const totalUnreadMessages = getTotalUnread()
  const isWishlistPage = pathname === "/wishlist" || pathname === "/saved-trips"

  return (
    <nav className="bg-[#FFFFFF] sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

            <Link
              href="/destinations"
              className="text-gray-700 hover:text-black transition-colors font-normal text-[15px]"
            >
              Destinations
            </Link>

            <Link
              href="/travel-styles"
              className="text-gray-700 hover:text-black transition-colors font-normal text-[15px]"
            >
              Travel Styles
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-black transition-colors font-normal text-[15px]"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
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
                  className={`p-2 rounded-full transition-colors ${
                    isWishlistPage
                      ? "text-[#00A699]"
                      : "text-gray-700 hover:text-[#00A699]"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlistPage ? "fill-[#00A699]" : ""}`}
                  />
                </Link>

                <Link
                  href="/messages"
                  className="p-2 rounded-full text-gray-700 hover:text-[#00A699] transition-colors relative"
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
                  <DropdownMenuContent className="w-56 p-1 bg-white" align="end" forceMount>
                    <div className="flex flex-col space-y-1 px-3 py-2">
                      <p className="text-sm font-medium leading-none text-[#1C1B1F]">{user.name}</p>
                      <p className="text-xs leading-none text-[#495560]">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem asChild className="px-3 py-2 rounded-md cursor-pointer text-[#495560] hover:bg-[#F0FDFC] hover:text-[#7BBCB0] focus:bg-[#F0FDFC] focus:text-[#7BBCB0]">
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-3 py-2 rounded-md cursor-pointer text-[#495560] hover:bg-[#F0FDFC] hover:text-[#7BBCB0] focus:bg-[#F0FDFC] focus:text-[#7BBCB0]">
                      <Link href="/wishlist" className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-3 py-2 rounded-md cursor-pointer text-[#495560] hover:bg-[#F0FDFC] hover:text-[#7BBCB0] focus:bg-[#F0FDFC] focus:text-[#7BBCB0]">
                      <Link href="/messages" className="flex items-center">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Messages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="px-3 py-2 rounded-md cursor-pointer text-[#495560] hover:bg-[#F0FDFC] hover:text-[#7BBCB0] focus:bg-[#F0FDFC] focus:text-[#7BBCB0]">
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                      onClick={async () => {
                        await logout()
                      }}
                      className="px-3 py-2 rounded-md cursor-pointer text-[#F23813] hover:bg-red-50 hover:text-[#E54D2E] focus:bg-red-50 focus:text-[#E54D2E]"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
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

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background max-h-[calc(100vh-4rem)] overflow-y-auto transition-colors">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/about"
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/tours"
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Places
            </Link>

            <Link
              href="/destinations"
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinations
            </Link>

            <Link
              href="/travel-styles"
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Travel Styles
            </Link>

            <Link
              href="/contact"
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {user ? (
              <>
                <div className="border-t pt-3 space-y-3">
                  <div className="py-2">
                    <p className="text-xs text-muted-foreground mb-2">Currency</p>
                    <div className="flex flex-wrap gap-2">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => setSelectedCurrency(currency)}
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            selectedCurrency.code === currency.code
                              ? "bg-[#00A699] text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {currency.code}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/wishlist"
                    className={`flex items-center py-2 text-base font-medium transition-colors ${
                      isWishlistPage ? "text-[#00A699]" : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className={`h-5 w-5 mr-2 ${isWishlistPage ? "fill-[#00A699]" : ""}`} />
                    Wishlist
                    {savedToursCount > 0 && (
                      <Badge className="ml-2 bg-[#00A699] text-white text-xs">
                        {savedToursCount}
                      </Badge>
                    )}
                  </Link>
                  <Link
                    href="/messages"
                    className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Messages
                    {totalUnreadMessages > 0 && (
                      <Badge className="ml-2 bg-[#00A699] text-white text-xs">
                        {totalUnreadMessages}
                      </Badge>
                    )}
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={async () => {
                      await logout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center py-2 text-base font-medium text-destructive w-full"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t pt-3 mt-3 space-y-3">
                <Link
                  href="/login"
                  className="block w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link
                  href="/register"
                  className="block w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="default" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
