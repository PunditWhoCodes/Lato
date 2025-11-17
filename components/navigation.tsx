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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MessageCircle, User, LogOut, Settings, Heart, DollarSign, Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth"
import { useSavedTours } from "@/lib/saved-tours-context"
import { useEnhancedMessages } from "@/contexts/EnhancedMessagesContext"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { destinations, travelStyles } from "@/lib/data"

export function Navigation() {
  const { user, logout } = useAuth()
  const { savedToursCount } = useSavedTours()
  const { getTotalUnread } = useEnhancedMessages()
  const [hoveredContinent, setHoveredContinent] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const totalUnreadMessages = getTotalUnread()

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Using imported destinations data from lib/data

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Logo width={120} height={40} />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/tours"
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      Explore Tours
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-white font-medium">
                    Destinations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[900px] p-0">
                      <div className="flex">
                        {/* Left Panel - Continents */}
                        <div className="w-52 bg-gradient-to-b from-muted/50 to-muted/30 dark:from-muted/30 dark:to-muted/20 rounded-l-lg p-3 space-y-2">
                          {destinations.map((continent, index) => (
                            <div
                              key={continent.name}
                              className={cn(
                                "px-4 py-3 cursor-pointer transition-all duration-300 relative group rounded-xl",
                                "hover:shadow-md hover:scale-[1.02] transform",
                                hoveredContinent === continent.name ||
                                  (!hoveredContinent && continent.name === "Africa")
                                  ? "bg-background shadow-lg border border-primary/20 text-primary scale-[1.02]"
                                  : "bg-background/60 hover:bg-background border border-transparent hover:border-primary/10",
                              )}
                              onMouseEnter={() => setHoveredContinent(continent.name)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-sm leading-tight">{continent.name}</h3>
                                  <p className="text-xs text-muted-foreground/80 mt-0.5">
                                    {continent.regions.length} places
                                  </p>
                                </div>
                                <div
                                  className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    hoveredContinent === continent.name ||
                                      (!hoveredContinent && continent.name === "Africa")
                                      ? "bg-primary shadow-sm"
                                      : "bg-muted group-hover:bg-primary/60",
                                  )}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Right Panel - Destinations */}
                        <div className="flex-1 p-6 rounded-r-lg">
                          {(() => {
                            const activeContinent = destinations.find(
                              (continent) => continent.name === (hoveredContinent || "Africa"),
                            )
                            return (
                              <div>
                                <h3 className="font-semibold text-foreground mb-4 text-lg">
                                  {activeContinent?.name} Destinations
                                </h3>
                                <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto">
                                  {activeContinent?.regions.map((region) => (
                                    <NavigationMenuLink key={region} asChild>
                                      <Link
                                        href={`/tours?destination=${encodeURIComponent(region)}`}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded hover:bg-accent/50 block"
                                      >
                                        {region}
                                      </Link>
                                    </NavigationMenuLink>
                                  ))}
                                </div>
                              </div>
                            )
                          })()}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-white font-medium">
                    Travel Styles
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[800px] p-8">
                      <div className="grid grid-cols-3 gap-8">
                        {travelStyles.map((style) => (
                          <div key={style.name}>
                            <h3 className="font-semibold text-foreground mb-3 text-lg">{style.name}</h3>
                            <div className="grid grid-cols-1 gap-2">
                              {style.types.map((type) => (
                                <NavigationMenuLink key={type} asChild>
                                  <Link
                                    href={`/tours?style=${encodeURIComponent(type)}`}
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors py-2 px-2 rounded hover:bg-accent/50"
                                  >
                                    {type}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/companies"
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      Tour Companies
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
                if (mobileMenuOpen) {
                  setExpandedSection(null)
                }
              }}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
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
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background max-h-[calc(100vh-4rem)] overflow-y-auto transition-colors">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/tours"
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Tours
            </Link>

            {/* Destinations Expandable Section */}
            <div className="border-b pb-2">
              <button
                onClick={() => toggleSection("destinations")}
                className="w-full flex items-center justify-between py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Destinations</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    expandedSection === "destinations" && "rotate-180"
                  )}
                />
              </button>
              {expandedSection === "destinations" && (
                <div className="pl-4 pb-2 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  {destinations.map((continent) => (
                    <div key={continent.name} className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">{continent.name}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {continent.regions.map((region) => (
                          <Link
                            key={region}
                            href={`/tours?destination=${encodeURIComponent(region)}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setExpandedSection(null)
                            }}
                          >
                            {region}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Travel Styles Expandable Section */}
            <div className="border-b pb-2">
              <button
                onClick={() => toggleSection("travelStyles")}
                className="w-full flex items-center justify-between py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Travel Styles</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    expandedSection === "travelStyles" && "rotate-180"
                  )}
                />
              </button>
              {expandedSection === "travelStyles" && (
                <div className="pl-4 pb-2 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  {travelStyles.map((style) => (
                    <div key={style.name} className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">{style.name}</h4>
                      <div className="space-y-1">
                        {style.types.map((type) => (
                          <Link
                            key={type}
                            href={`/tours?style=${encodeURIComponent(type)}`}
                            className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setExpandedSection(null)
                            }}
                          >
                            {type}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/companies"
              className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tour Companies
            </Link>

            {/* Theme Toggle for Mobile */}
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-base font-medium text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </div>

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
                    onClick={() => {
                      logout()
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
