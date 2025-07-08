"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BarChart3, Map, Brain, TrendingUp, Wrench, MessageSquare, Settings, Zap, Moon, Sun, Store } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Overview",
    url: "#",
    icon: BarChart3,
    id: "overview",
  },
  {
    title: "Store Map",
    url: "#",
    icon: Map,
    id: "map",
  },
  {
    title: "AI War Room",
    url: "#",
    icon: Brain,
    id: "warroom",
  },
  {
    title: "Forecasting",
    url: "#",
    icon: TrendingUp,
    id: "forecast",
  },
  {
    title: "Maintenance",
    url: "#",
    icon: Wrench,
    id: "maintenance",
  },
  {
    title: "Ops Chat",
    url: "#",
    icon: MessageSquare,
    id: "chat",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    id: "settings",
  },
]

interface DashboardSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

export function DashboardSidebar({ activeView, setActiveView, darkMode, setDarkMode }: DashboardSidebarProps) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Store className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">SmartRetail Twin</span>
            <span className="truncate text-xs text-muted-foreground">AI Control Center</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => setActiveView(item.id)} isActive={activeView === item.id}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Extensions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Zap />
                  <span>AR Overlays</span>
                  <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Beta</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" size="sm" onClick={() => setDarkMode(!darkMode)} className="w-full">
            {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
