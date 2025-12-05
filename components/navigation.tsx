"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageCircle, User, LogOut, Settings, Heart, DollarSign, Menu, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { useSavedTours } from "@/lib/saved-tours-context"
import { useEnhancedMessages } from "@/contexts/EnhancedMessagesContext"

export function Navigation() {
  const { user, logout } = useAuth()
  const { savedToursCount } = useSavedTours()
  const { getTotalUnread } = useEnhancedMessages()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const totalUnreadMessages = getTotalUnread()

  return (
    <nav className="bg-[#FFFFFF] sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/lato-logo.png"
              alt="Lato"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Center Navigation - Simple Links */}
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

          {/* Mobile Menu Button */}
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

          {/* Auth Section - Right Side */}
          <div className="hidden lg:flex items-center gap-8">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="relative">
                  <Link href="/messages" className="flex items-center">
                    <MessageCircle className="h-5 w-5" />
                    {totalUnreadMessages > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                        {totalUnreadMessages}
                      </Badge>
                    )}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild className="relative">
                  <Link href="/saved-trips" className="flex items-center">
                    <Heart className="h-5 w-5" />
                    {savedToursCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                        {savedToursCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/currency" className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Currency
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        await logout()
                      }}
                      className="text-destructive"
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
                <Link
                  href="/register"
                  className="rounded-full bg-black text-white hover:bg-gray-800 px-6 py-2.5 font-normal text-[15px] transition-colors inline-block"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  <Link
                    href="/messages"
                    className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Messages
                    {totalUnreadMessages > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground text-xs">
                        {totalUnreadMessages}
                      </Badge>
                    )}
                  </Link>
                  <Link
                    href="/saved-trips"
                    className="flex items-center py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Saved Trips
                    {savedToursCount > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground text-xs">
                        {savedToursCount}
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
