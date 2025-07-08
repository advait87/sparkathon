"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, RefreshCw } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
      <SidebarTrigger className="-ml-1" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Store Operations Dashboard</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Live
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
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
