"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Phone } from "lucide-react"

// Country codes data
const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
  { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
  { code: "+31", country: "NL", flag: "🇳🇱", name: "Netherlands" },
  { code: "+46", country: "SE", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", country: "NO", flag: "🇳🇴", name: "Norway" },
  { code: "+45", country: "DK", flag: "🇩🇰", name: "Denmark" },
  { code: "+358", country: "FI", flag: "🇫🇮", name: "Finland" },
  { code: "+48", country: "PL", flag: "🇵🇱", name: "Poland" },
  { code: "+90", country: "TR", flag: "🇹🇷", name: "Turkey" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
  { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+64", country: "NZ", flag: "🇳🇿", name: "New Zealand" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
  { code: "+54", country: "AR", flag: "🇦🇷", name: "Argentina" },
  { code: "+20", country: "EG", flag: "🇪🇬", name: "Egypt" },
  { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
]

// Format phone number based on country
const formatPhoneNumber = (value: string, countryCode: string): string => {
  const cleaned = value.replace(/\D/g, "")
  
  switch (countryCode) {
    case "+1": // US/Canada
      if (cleaned.length <= 3) return cleaned
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
    
    case "+44": // UK
      if (cleaned.length <= 4) return cleaned
      if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`
    
    case "+90": // Turkey
      if (cleaned.length <= 3) return cleaned
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      if (cleaned.length <= 9) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`
    
    default: // Generic formatting
      let formatted = ""
      for (let i = 0; i < cleaned.length; i++) {
        if (i > 0 && i % 3 === 0) formatted += " "
        formatted += cleaned[i]
      }
      return formatted
  }
}

// Get max length based on country
const getMaxLength = (countryCode: string): number => {
  switch (countryCode) {
    case "+1": return 10 // US/Canada
    case "+44": return 11 // UK
    case "+90": return 10 // Turkey
    default: return 15 // Generic max
  }
}

export interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string, countryCode: string) => void
  defaultCountry?: string
  showIcon?: boolean
  showCountrySelect?: boolean
  countries?: typeof countryCodes
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ 
    className, 
    value = "", 
    onChange, 
    defaultCountry = "+1",
    showIcon = true,
    showCountrySelect = true,
    countries = countryCodes,
    size,
    ...props 
  }, ref) => {
    const [countryCode, setCountryCode] = React.useState(defaultCountry)
    const [phoneNumber, setPhoneNumber] = React.useState(value)
    
    const selectedCountry = countries.find(c => c.code === countryCode) || countries[0]
    
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "")
      const maxLength = getMaxLength(countryCode)
      const truncated = rawValue.slice(0, maxLength)
      const formatted = formatPhoneNumber(truncated, countryCode)
      
      setPhoneNumber(truncated)
      onChange?.(truncated, countryCode)
      
      // Update the input value with formatted version
      e.target.value = formatted
    }
    
    const handleCountryChange = (newCountryCode: string) => {
      setCountryCode(newCountryCode)
      onChange?.(phoneNumber, newCountryCode)
    }
    
    const formattedValue = formatPhoneNumber(phoneNumber, countryCode)
    
    return (
      <div className={cn("relative flex gap-2", className)}>
        {showCountrySelect && (
          <Select value={countryCode} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.code}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.code}</span>
                    <span className="text-muted-foreground">{country.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        <div className="relative flex-1">
          <Input
            ref={ref}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder={countryCode === "+1" ? "(555) 123-4567" : "123 456 789"}
            value={formattedValue}
            onChange={handlePhoneChange}
            className={cn(showIcon && "pl-10", className)}
            {...props}
          />
          {showIcon && (
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>
    )
  }
)
PhoneInput.displayName = "PhoneInput"