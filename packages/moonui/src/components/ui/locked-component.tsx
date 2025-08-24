"use client"

// Locked Component UI
// Pro componentlerin locked state'ini gösteren wrapper component

import React, { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Badge } from './badge'
import { Lock, Crown, Zap, AlertCircle } from 'lucide-react'

interface LockedComponentProps {
  children: React.ReactNode
  componentName: string
  className?: string
  showPreview?: boolean
  previewDuration?: number // ms
}

export function LockedComponent({
  children,
  componentName,
  className,
  showPreview = true,
  previewDuration = 2000
}: LockedComponentProps) {
  const [isPreviewActive, setIsPreviewActive] = useState(false)
  const [previewTimeout, setPreviewTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (!showPreview) return
    
    setIsPreviewActive(true)
    
    // Clear existing timeout
    if (previewTimeout) {
      clearTimeout(previewTimeout)
    }
    
    // Set new timeout
    const timeout = setTimeout(() => {
      setIsPreviewActive(false)
    }, previewDuration)
    
    setPreviewTimeout(timeout)
  }

  const handleMouseLeave = () => {
    if (previewTimeout) {
      clearTimeout(previewTimeout)
      setPreviewTimeout(null)
    }
    setIsPreviewActive(false)
  }

  return (
    <div 
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Component Content */}
      <div 
        className={cn(
          "transition-all duration-300",
          !isPreviewActive && "blur-sm grayscale-[0.3] opacity-60"
        )}
      >
        {children}
      </div>

      {/* Overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10",
          "border-2 border-dashed border-amber-400/30 rounded-lg",
          "flex items-center justify-center",
          "transition-all duration-300",
          isPreviewActive ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="text-center space-y-3 p-6">
          {/* Pro Badge */}
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1"
            >
              <Crown className="w-3 h-3 mr-1" />
              PRO ONLY
            </Badge>
          </div>

          {/* Lock Icon */}
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          {/* Component Name */}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {componentName}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            This premium component is available with Pro subscription
          </p>

          {/* Upgrade Button */}
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/pricing'
              }
            }}
          >
            <Zap className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        </div>
      </div>

      {/* Preview Hint */}
      {showPreview && !isPreviewActive && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
            Hover to preview
          </div>
        </div>
      )}
    </div>
  )
}

// Pro Component Wrapper - Otomatik erişim kontrolü ile
interface ProComponentWrapperProps {
  children: React.ReactNode
  componentId: string
  componentName?: string
  className?: string
  fallback?: React.ReactNode
  requireCLI?: boolean
}

export function ProComponentWrapper({
  children,
  componentId,
  componentName,
  className,
  fallback,
  requireCLI = true
}: ProComponentWrapperProps) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean
    deviceValid: boolean
    hasProAccess: boolean
    loading: boolean
  }>({
    isAuthenticated: false,
    deviceValid: false,
    hasProAccess: false,
    loading: true
  })

  useEffect(() => {
    // Enhanced environment detection - prevent manipulation
    const isDevelopment = () => {
      // Check multiple indicators to prevent spoofing
      const checks = {
        nodeEnv: process.env.NODE_ENV === 'development',
        nextPublicEnv: process.env.NEXT_PUBLIC_VERCEL_ENV === 'development',
        localhost: typeof window !== 'undefined' && (
          window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.includes('.local')
        ),
        port: typeof window !== 'undefined' && (
          window.location.port === '3000' ||
          window.location.port === '3001' ||
          window.location.port === '8080'
        ),
        vercelEnv: !process.env.VERCEL,
        ciEnv: !process.env.CI,
        deploymentEnv: !process.env.DEPLOYMENT_ENV
      }
      
      // If running on Vercel, Netlify, or any deployment platform - it's production
      if (process.env.VERCEL || process.env.NETLIFY || process.env.RENDER || 
          process.env.RAILWAY_ENVIRONMENT || process.env.FLY_APP_NAME ||
          process.env.DEPLOYMENT_ENV === 'production') {
        return false
      }
      
      // Must be localhost AND development env
      return checks.nodeEnv && checks.localhost && !checks.vercelEnv && !checks.ciEnv
    }
    
    // Skip checks only in true production or if not requiring CLI
    if (!isDevelopment() || !requireCLI) {
      setAuthState({
        isAuthenticated: true,
        deviceValid: true,
        hasProAccess: true,
        loading: false
      })
      return
    }

    // Check CLI authentication in development
    async function checkAuth() {
      try {
        const cliToken = localStorage.getItem('moonui_cli_token')
        const deviceId = localStorage.getItem('moonui_device_id')
        
        if (!cliToken || !deviceId) {
          setAuthState({
            isAuthenticated: false,
            deviceValid: false,
            hasProAccess: false,
            loading: false
          })
          return
        }

        // Validate token and device with API
        const response = await fetch('/api/device/validate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cliToken}`,
            'X-Device-ID': deviceId,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            environment: {
              nodeEnv: process.env.NODE_ENV,
              hostname: window.location.hostname,
              port: window.location.port,
              protocol: window.location.protocol
            }
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          setAuthState({
            isAuthenticated: true,
            deviceValid: data.valid,
            hasProAccess: data.hasProAccess,
            loading: false
          })
        } else {
          setAuthState({
            isAuthenticated: false,
            deviceValid: false,
            hasProAccess: false,
            loading: false
          })
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          deviceValid: false,
          hasProAccess: false,
          loading: false
        })
      }
    }

    checkAuth()
  }, [requireCLI])

  // Loading state
  if (authState.loading) {
    return (
      <div className={cn("animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-32", className)}>
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  // Development mode checks - use same enhanced detection
  const isDevelopment = () => {
    const checks = {
      nodeEnv: process.env.NODE_ENV === 'development',
      localhost: typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('.local')
      ),
      port: typeof window !== 'undefined' && (
        window.location.port === '3000' ||
        window.location.port === '3001' ||
        window.location.port === '8080'
      )
    }
    
    if (process.env.VERCEL || process.env.NETLIFY || process.env.RENDER || 
        process.env.RAILWAY_ENVIRONMENT || process.env.FLY_APP_NAME) {
      return false
    }
    
    return checks.nodeEnv && checks.localhost
  }
  
  if (isDevelopment() && requireCLI) {
    // Not authenticated
    if (!authState.isAuthenticated) {
      return (
        <div className={cn("relative", className)}>
          <div className="blur-sm grayscale-[0.3] opacity-60 pointer-events-none">
            {fallback || children}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10 border-2 border-dashed border-red-400/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-3 p-6">
              <Badge variant="destructive" className="mb-2">
                <Lock className="w-3 h-3 mr-1" />
                CLI AUTH REQUIRED
              </Badge>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                CLI Authentication Required
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                Run the following command to authenticate:
              </p>
              <code className="block bg-black/80 text-green-400 p-2 rounded text-xs">
                npx moonui auth login
              </code>
            </div>
          </div>
        </div>
      )
    }

    // Device not valid
    if (!authState.deviceValid) {
      return (
        <div className={cn("relative", className)}>
          <div className="blur-sm grayscale-[0.3] opacity-60 pointer-events-none">
            {fallback || children}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10 border-2 border-dashed border-yellow-400/30 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-3 p-6">
              <Badge variant="secondary" className="bg-yellow-500 text-white mb-2">
                <Zap className="w-3 h-3 mr-1" />
                DEVICE LIMIT
              </Badge>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Device Limit Exceeded
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                This device is not registered or you've reached your device limit
              </p>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500"
                onClick={() => window.open('/dashboard/devices', '_blank')}
              >
                Manage Devices
              </Button>
            </div>
          </div>
        </div>
      )
    }

    // No pro access
    if (!authState.hasProAccess) {
      return (
        <LockedComponent
          componentName={componentName || componentId}
          className={className}
        >
          {fallback || children}
        </LockedComponent>
      )
    }
  }

  // All checks passed - show component
  return <div className={className}>{children}</div>
}

// Pro Badge Component
export function ProBadge({ className }: { className?: string }) {
  return (
    <Badge 
      variant="secondary"
      className={cn(
        "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs",
        className
      )}
    >
      <Crown className="w-3 h-3 mr-1" />
      PRO
    </Badge>
  )
}

// Free Badge Component  
export function FreeBadge({ className }: { className?: string }) {
  return (
    <Badge 
      variant="outline"
      className={cn("border-green-500 text-green-600 dark:text-green-400 text-xs", className)}
    >
      FREE
    </Badge>
  )
}
