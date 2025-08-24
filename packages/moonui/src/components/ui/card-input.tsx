"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Input } from "@/components/ui"
import { CreditCard } from "lucide-react"

// Card type detection
const getCardType = (number: string): string => {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3(?:0[0-5]|[68])/,
    jcb: /^35/,
  }

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(number)) return type
  }
  return "unknown"
}

// Format card number with spaces
const formatCardNumber = (value: string, cardType: string): string => {
  const cleaned = value.replace(/\s+/g, "")
  const groups = cardType === "amex" ? [4, 6, 5] : [4, 4, 4, 4]
  
  let formatted = ""
  let position = 0
  
  for (const group of groups) {
    if (position >= cleaned.length) break
    if (formatted) formatted += " "
    formatted += cleaned.slice(position, position + group)
    position += group
  }
  
  return formatted
}

// Card Number Input
export interface CardNumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string, cardType: string) => void
  showIcon?: boolean
}

export const CardNumberInput = React.forwardRef<HTMLInputElement, CardNumberInputProps>(
  ({ className, value = "", onChange, showIcon = true, size, ...props }, ref) => {
    const [cardType, setCardType] = React.useState("unknown")
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "")
      const detectedType = getCardType(rawValue)
      setCardType(detectedType)
      
      const maxLength = detectedType === "amex" ? 15 : 16
      const truncated = rawValue.slice(0, maxLength)
      const formatted = formatCardNumber(truncated, detectedType)
      
      onChange?.(truncated, detectedType)
      
      // Update the input value
      e.target.value = formatted
    }
    
    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          value={formatCardNumber(value, cardType)}
          onChange={handleChange}
          className={cn(showIcon && "pl-10", className)}
          {...props}
        />
        {showIcon && (
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
      </div>
    )
  }
)
CardNumberInput.displayName = "CardNumberInput"

// Card Expiry Input
export interface CardExpiryInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string) => void
}

export const CardExpiryInput = React.forwardRef<HTMLInputElement, CardExpiryInputProps>(
  ({ className, value = "", onChange, size, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let rawValue = e.target.value.replace(/\D/g, "")
      
      if (rawValue.length >= 2) {
        const month = parseInt(rawValue.slice(0, 2))
        if (month > 12) {
          rawValue = "12" + rawValue.slice(2)
        } else if (month === 0) {
          rawValue = "01" + rawValue.slice(2)
        }
      }
      
      rawValue = rawValue.slice(0, 4)
      let formatted = rawValue
      
      if (rawValue.length >= 2) {
        formatted = rawValue.slice(0, 2) + "/" + rawValue.slice(2)
      }
      
      onChange?.(rawValue)
      e.target.value = formatted
    }
    
    const formattedValue = value.length >= 2 ? value.slice(0, 2) + "/" + value.slice(2) : value
    
    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="cc-exp"
        placeholder="MM/YY"
        value={formattedValue}
        onChange={handleChange}
        className={className}
        {...props}
      />
    )
  }
)
CardExpiryInput.displayName = "CardExpiryInput"

// Card CVC Input
export interface CardCVCInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string) => void
  cardType?: string
}

export const CardCVCInput = React.forwardRef<HTMLInputElement, CardCVCInputProps>(
  ({ className, value = "", onChange, cardType = "unknown", size, ...props }, ref) => {
    const maxLength = cardType === "amex" ? 4 : 3
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, "").slice(0, maxLength)
      onChange?.(rawValue)
    }
    
    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="cc-csc"
        placeholder={cardType === "amex" ? "1234" : "123"}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={className}
        {...props}
      />
    )
  }
)
CardCVCInput.displayName = "CardCVCInput"

// Card Zip Input
export interface CardZipInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string
  onChange?: (value: string) => void
  format?: "US" | "CA" | "UK" | "other"
}

export const CardZipInput = React.forwardRef<HTMLInputElement, CardZipInputProps>(
  ({ className, value = "", onChange, format = "US", size, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let rawValue = e.target.value
      
      switch (format) {
        case "US":
          rawValue = rawValue.replace(/\D/g, "").slice(0, 5)
          break
        case "CA":
          rawValue = rawValue.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)
          if (rawValue.length >= 3) {
            rawValue = rawValue.slice(0, 3) + " " + rawValue.slice(3)
          }
          break
        case "UK":
          rawValue = rawValue.toUpperCase().replace(/[^A-Z0-9\s]/g, "").slice(0, 8)
          break
        default:
          rawValue = rawValue.slice(0, 10)
      }
      
      onChange?.(rawValue.replace(/\s/g, ""))
      e.target.value = rawValue
    }
    
    const getPlaceholder = () => {
      switch (format) {
        case "US": return "12345"
        case "CA": return "K1A 0B1"
        case "UK": return "SW1A 1AA"
        default: return "Postal Code"
      }
    }
    
    return (
      <Input
        ref={ref}
        type="text"
        autoComplete="postal-code"
        placeholder={getPlaceholder()}
        value={value}
        onChange={handleChange}
        className={className}
        {...props}
      />
    )
  }
)
CardZipInput.displayName = "CardZipInput"