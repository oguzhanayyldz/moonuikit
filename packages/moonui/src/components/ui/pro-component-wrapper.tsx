"use client"

// Pro Component Wrapper - Simplified Version
// Development: CLI auth required
// Production: License key validation with 24h cache

import React, { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { Badge } from './badge'
import { Lock, Terminal, AlertCircle } from 'lucide-react'

interface ProComponentWrapperProps {
  children: React.ReactNode
  componentId: string
  componentName?: string
  className?: string
  fallback?: React.ReactNode
}

interface LicenseCache {
  timestamp: number
  hasProAccess: boolean
}

const CACHE_KEY = 'moonui_license_cache'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export function ProComponentWrapper({
  children,
  componentId,
  componentName,
  className,
  fallback
}: ProComponentWrapperProps) {
  const [state, setState] = useState<{
    hasAccess: boolean
    loading: boolean
    message?: string
  }>({
    hasAccess: false,
    loading: true
  })

  useEffect(() => {
    // Check if development environment
    const isDevelopment = () => {
      if (typeof window === 'undefined') return false
      
      const isLocalhost = 
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('.local')
      
      const isDevPort = 
        window.location.port === '3000' ||
        window.location.port === '3001' ||
        window.location.port === '8080' ||
        window.location.port === '5173'
      
      // Must be localhost with dev port
      return process.env.NODE_ENV === 'development' && isLocalhost && isDevPort
    }

    // DEVELOPMENT: Check CLI auth
    if (isDevelopment()) {
      const checkDevAuth = () => {
        const cliToken = localStorage.getItem('moonui_cli_token')
        const deviceId = localStorage.getItem('moonui_device_id')
        
        if (!cliToken || !deviceId) {
          setState({
            hasAccess: false,
            loading: false,
            message: 'CLI authentication required'
          })
          return
        }
        
        // Token exists - allow access
        setState({
          hasAccess: true,
          loading: false
        })
      }
      
      checkDevAuth()
      return
    }

    // PRODUCTION: Check license cache
    const checkProdLicense = () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const data = JSON.parse(cached) as LicenseCache
          const now = Date.now()
          
          // Cache still valid (24 hours)
          if (data.timestamp && (now - data.timestamp) < CACHE_DURATION) {
            setState({
              hasAccess: data.hasProAccess,
              loading: false
            })
            return
          }
        }
        
        // No valid cache - need license key
        const licenseKey = process.env.NEXT_PUBLIC_MOONUI_LICENSE_KEY
        
        if (!licenseKey) {
          setState({
            hasAccess: false,
            loading: false,
            message: 'No license key configured'
          })
          return
        }
        
        // Validate license async
        validateLicense(licenseKey).then(result => {
          // Save to cache
          const cacheData: LicenseCache = {
            timestamp: Date.now(),
            hasProAccess: result.hasProAccess
          }
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
          
          setState({
            hasAccess: result.hasProAccess,
            loading: false
          })
        }).catch(error => {
          console.error('License validation failed:', error)
          
          // Try expired cache as fallback
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            const data = JSON.parse(cached) as LicenseCache
            setState({
              hasAccess: data.hasProAccess,
              loading: false,
              message: 'Using cached license'
            })
          } else {
            setState({
              hasAccess: false,
              loading: false,
              message: 'License validation failed'
            })
          }
        })
        
      } catch (error) {
        console.error('License check error:', error)
        setState({
          hasAccess: false,
          loading: false,
          message: 'License check failed'
        })
      }
    }
    
    checkProdLicense()
  }, [])

  // Loading state
  if (state.loading) {
    return (
      <div className={cn("animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-32", className)}>
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  // Access granted
  if (state.hasAccess) {
    return <>{children}</>
  }

  // Development: Show CLI auth required
  if (state.message === 'CLI authentication required') {
    return (
      <div className={cn("relative", className)}>
        <div className="blur-sm grayscale opacity-60 pointer-events-none">
          {fallback || children}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 border-2 border-dashed border-blue-400/30 rounded-lg flex items-center justify-center">
          <div className="text-center space-y-3 p-6 bg-white/90 dark:bg-gray-900/90 rounded-lg">
            <Badge variant="secondary" className="mb-2">
              <Terminal className="w-3 h-3 mr-1" />
              DEV AUTH REQUIRED
            </Badge>
            <h3 className="font-semibold">CLI Authentication Required</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Login with MoonUI CLI to use Pro components in development
            </p>
            <code className="block bg-black text-green-400 p-2 rounded text-xs font-mono">
              npx moonui auth login
            </code>
          </div>
        </div>
      </div>
    )
  }

  // Production: Show license required
  return (
    <div className={cn("relative", className)}>
      <div className="blur-sm grayscale opacity-60 pointer-events-none">
        {fallback || children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10 border-2 border-dashed border-amber-400/30 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-3 p-6 bg-white/90 dark:bg-gray-900/90 rounded-lg">
          <Badge variant="destructive" className="mb-2">
            <AlertCircle className="w-3 h-3 mr-1" />
            LICENSE REQUIRED
          </Badge>
          <h3 className="font-semibold">{componentName || componentId}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            {state.message || 'Pro license required to use this component'}
          </p>
          <a 
            href="https://moonui.dev/pricing" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-colors"
          >
            Get Pro License
          </a>
        </div>
      </div>
    </div>
  )
}

// Validate license with API
async function validateLicense(licenseKey: string): Promise<{ hasProAccess: boolean }> {
  const response = await fetch('/api/v1/license/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      licenseKey,
      domain: window.location.hostname
    })
  })
  
  if (!response.ok) {
    throw new Error('License validation failed')
  }
  
  const data = await response.json()
  return {
    hasProAccess: data.hasProAccess || false
  }
}