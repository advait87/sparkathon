"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, RefreshCw, Wifi, WifiOff, Loader2 } from "lucide-react"
import { useApiHealth } from "@/hooks/use-dashboard-data"
import { config } from "@/lib/config"
import { DashboardApiService } from "@/lib/api-service"

interface DashboardHeaderProps {
  onRefresh?: () => void
  isRefreshing?: boolean
}

export function DashboardHeader({ onRefresh, isRefreshing = false }: DashboardHeaderProps) {
  const { data: isApiHealthy, loading: healthLoading } = useApiHealth({
    refreshInterval: config.realtime.healthCheckInterval,
    enabled: config.features.enableRealtime
  })
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
      <SidebarTrigger className="-ml-1" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Store Operations Dashboard</h1>
          {/* Connection Status Badge */}
          {healthLoading ? (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Connecting
            </Badge>
          ) : isApiHealthy ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Wifi className="h-3 w-3 mr-1" />
              Live
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              DashboardApiService.clearCache()
              onRefresh?.()
            }}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">3</Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
