"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Clock, Target } from "lucide-react"

export function KPIBar() {
  const kpis = [
    {
      title: "SKUs in Danger Zone",
      value: "247",
      total: "12,450",
      percentage: 85,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      type: "ring",
    },
    {
      title: "Fill Rate vs Forecast",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      type: "sparkline",
    },
    {
      title: "Urgent Alerts",
      value: "12",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      type: "badge",
    },
    {
      title: "Avg Restock Lead Time",
      value: "2.4",
      unit: "days",
      change: "-0.3",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      type: "metric",
    },
    {
      title: "Forecast Confidence",
      value: "87.3%",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      type: "percentage",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="glass-card border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              {kpi.type === "badge" && (
                <Badge variant="destructive" className="animate-pulse">
                  {kpi.value}
                </Badge>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">{kpi.title}</p>

              {kpi.type === "ring" && (
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray={`${kpi.percentage}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-red-600">{kpi.percentage}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">of {kpi.total}</p>
                  </div>
                </div>
              )}

              {kpi.type === "sparkline" && (
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{kpi.value}</span>
                    <span
                      className={`text-sm flex items-center ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {kpi.change}
                    </span>
                  </div>
                  <div className="mt-2 h-8 bg-gradient-to-r from-green-200 to-green-400 rounded opacity-60"></div>
                </div>
              )}

              {kpi.type === "metric" && (
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{kpi.value}</span>
                  <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                  {kpi.change && <span className="text-sm text-green-600 ml-2">({kpi.change})</span>}
                </div>
              )}

              {kpi.type === "percentage" && (
                <div className="space-y-2">
                  <span className="text-2xl font-bold">{kpi.value}</span>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: kpi.value }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
