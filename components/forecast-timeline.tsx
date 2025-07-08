"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, Cloud, Sun, Calendar, Filter } from "lucide-react"

export function ForecastTimeline() {
  const [scenarioValue, setScenarioValue] = useState([50])
  const [selectedChannel, setSelectedChannel] = useState("all")

  const baseData = [
    { day: "Mon", electronics: 85, groceries: 120, apparel: 65, weather: "sunny", events: [] },
    { day: "Tue", electronics: 92, groceries: 115, apparel: 70, weather: "cloudy", events: ["Local Festival"] },
    { day: "Wed", electronics: 78, groceries: 140, apparel: 55, weather: "rainy", events: [] },
    { day: "Thu", electronics: 105, groceries: 95, apparel: 80, weather: "rainy", events: [] },
    { day: "Fri", electronics: 130, groceries: 110, apparel: 95, weather: "sunny", events: ["Payday"] },
    { day: "Sat", electronics: 145, groceries: 160, apparel: 120, weather: "sunny", events: ["Weekend Rush"] },
    { day: "Sun", electronics: 110, groceries: 135, apparel: 85, weather: "cloudy", events: [] },
  ]

  // Adjust data based on scenario slider
  const adjustedData = baseData.map((item) => ({
    ...item,
    electronics: Math.round(item.electronics * (0.5 + scenarioValue[0] / 100)),
    groceries: Math.round(item.groceries * (0.5 + scenarioValue[0] / 100)),
    apparel: Math.round(item.apparel * (0.5 + scenarioValue[0] / 100)),
  }))

  const weatherIcons = {
    sunny: <Sun className="h-4 w-4 text-yellow-500" />,
    cloudy: <Cloud className="h-4 w-4 text-gray-500" />,
    rainy: <Cloud className="h-4 w-4 text-blue-500" />,
  }

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Augmented Forecast Timeline
          </CardTitle>
          <div className="flex items-center gap-2">
            <Tabs value={selectedChannel} onValueChange={setSelectedChannel}>
              <TabsList>
                <TabsTrigger value="all">All Channels</TabsTrigger>
                <TabsTrigger value="instore">In-Store</TabsTrigger>
                <TabsTrigger value="pickup">Pickup</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Scenario Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Scenario Adjustment</label>
            <Badge variant="outline">
              {scenarioValue[0] < 30 ? "Pessimistic" : scenarioValue[0] > 70 ? "Optimistic" : "Baseline"}
            </Badge>
          </div>
          <Slider value={scenarioValue} onValueChange={setScenarioValue} max={100} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Heavy Rain Impact</span>
            <span>Current: {scenarioValue[0]}%</span>
            <span>Sunny Weather Boost</span>
          </div>
        </div>

        {/* Main Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={adjustedData}>
              <defs>
                <linearGradient id="electronics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="groceries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="apparel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = adjustedData.find((item) => item.day === label)
                    return (
                      <div className="bg-white dark:bg-slate-800 p-3 border rounded-lg shadow-lg">
                        <p className="font-semibold">{label}</p>
                        <div className="space-y-1">
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {entry.value}
                            </p>
                          ))}
                        </div>
                        {data && (
                          <div className="mt-2 pt-2 border-t space-y-1">
                            <div className="flex items-center gap-2">
                              {weatherIcons[data.weather as keyof typeof weatherIcons]}
                              <span className="text-xs capitalize">{data.weather}</span>
                            </div>
                            {data.events.length > 0 && (
                              <div className="space-y-1">
                                {data.events.map((event, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {event}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="electronics"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#electronics)"
                name="Electronics"
              />
              <Area
                type="monotone"
                dataKey="groceries"
                stackId="1"
                stroke="#10b981"
                fill="url(#groceries)"
                name="Groceries"
              />
              <Area
                type="monotone"
                dataKey="apparel"
                stackId="1"
                stroke="#f59e0b"
                fill="url(#apparel)"
                name="Apparel"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weather and Events Timeline */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Weather & Events Overlay</h4>
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Rain Event Active</span>
            </div>
            <Badge className="bg-blue-500">Wed-Thu</Badge>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {adjustedData.map((day, index) => (
              <div key={index} className="text-center space-y-1">
                <div className="text-xs font-medium">{day.day}</div>
                <div className="flex justify-center">{weatherIcons[day.weather as keyof typeof weatherIcons]}</div>
                {day.events.length > 0 && (
                  <div className="space-y-1">
                    {day.events.map((event, i) => (
                      <div key={i} className="w-2 h-2 bg-purple-500 rounded-full mx-auto"></div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter Categories
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Export Forecast
          </Button>
          <Button size="sm">Save Scenario</Button>
        </div>
      </CardContent>
    </Card>
  )
}
