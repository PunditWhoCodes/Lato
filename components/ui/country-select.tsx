"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MapPin } from "lucide-react"
import * as flags from "country-flag-icons/react/3x2"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { countries, type Country } from "@/lib/data/countries"
import type { CountryOption } from "@/app/tours/hooks/useCountries"

export interface CountrySelectProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  showIcon?: boolean
  variant?: "default" | "search-bar"
  availableCountries?: CountryOption[]
}

// Helper function to get flag component
const getFlagComponent = (countryCode: string) => {
  const FlagComponent = (flags as any)[countryCode]
  return FlagComponent
}

export function CountrySelect({
  value,
  onChange,
  placeholder = "Where to?",
  className,
  showIcon = true,
  variant = "default",
  availableCountries = [],
}: CountrySelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const countryList = React.useMemo(() => {
    if (availableCountries.length > 0) {
      return availableCountries.map((apiCountry) => ({
        code: apiCountry.iso,
        name: apiCountry.name,
        tripCount: apiCountry.tripCount,
      }))
    }
    return countries
  }, [availableCountries])

  const selectedCountry = React.useMemo(() => {
    if (!value) return null
    return countryList.find(
      (country) =>
        country.code.toLowerCase() === value.toLowerCase() ||
        country.name.toLowerCase() === value.toLowerCase()
    )
  }, [value, countryList])

  const SelectedFlag = selectedCountry ? getFlagComponent(selectedCountry.code) : null

  const handleSelect = (currentValue: string) => {
    const country = countryList.find(
      (c) => c.name.toLowerCase() === currentValue.toLowerCase()
    )
    if (country) {
      onChange(availableCountries.length > 0 ? country.code : country.name)
      setOpen(false)
    }
  }

  const handleClear = () => {
    onChange("")
    setSearchValue("")
  }

  // Filter countries based on search
  const filteredCountries = React.useMemo(() => {
    if (!searchValue) return countryList

    const search = searchValue.toLowerCase()
    return countryList.filter(
      (country) =>
        country.name.toLowerCase().includes(search) ||
        country.code.toLowerCase().includes(search)
    )
  }, [searchValue, countryList])

  if (variant === "search-bar") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center flex-1 min-w-0 py-1 md:py-0 cursor-pointer">
            {showIcon && (
              <MapPin className="ml-4 text-muted-foreground h-5 w-5 shrink-0" />
            )}
            <div className="flex-1 px-3 py-2 md:py-1">
              {selectedCountry && SelectedFlag ? (
                <div className="flex items-center gap-2">
                  <SelectedFlag className="w-5 h-4" />
                  <span className="text-base">{selectedCountry.name}</span>
                </div>
              ) : (
                <span className="text-base text-muted-foreground/70">
                  {placeholder}
                </span>
              )}
            </div>
            <ChevronsUpDown className="mr-4 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search countries..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {value && (
                  <CommandItem
                    value=""
                    onSelect={handleClear}
                    className="text-muted-foreground"
                  >
                    <Check className="mr-2 h-4 w-4 opacity-0" />
                    <span>Clear selection</span>
                  </CommandItem>
                )}
                {filteredCountries.map((country) => {
                  const FlagComponent = getFlagComponent(country.code)
                  return (
                    <CommandItem
                      key={country.code}
                      value={country.name}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value?.toLowerCase() === country.name.toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {FlagComponent && <FlagComponent className="mr-2 w-5 h-4" />}
                      <span>{country.name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedCountry && SelectedFlag ? (
            <div className="flex items-center gap-2">
              <SelectedFlag className="w-5 h-4" />
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search countries..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {value && (
                <CommandItem
                  value=""
                  onSelect={handleClear}
                  className="text-muted-foreground"
                >
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  <span>Clear selection</span>
                </CommandItem>
              )}
              {filteredCountries.map((country) => {
                const FlagComponent = getFlagComponent(country.code)
                return (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.toLowerCase() === country.name.toLowerCase()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {FlagComponent && <FlagComponent className="mr-2 w-5 h-4" />}
                    <span>{country.name}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
