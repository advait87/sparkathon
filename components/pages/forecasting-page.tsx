"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, Cloud, Sun, Calendar, Filter, Download, Play, Pause, RotateCcw } from "lucide-react"

export function ForecastingPage() {
  const [scenarioValue, setScenarioValue] = useState([50])
  const [selectedChannel, setSelectedChannel] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [timeRange, setTimeRange] = useState("7d")
  const [isPlaying, setIsPlaying] = useState(false)

  const baseData = [
    {
      day: "Mon",
      date: "Dec 18",
      electronics: 85,
      groceries: 120,
      apparel: 65,
      pharmacy: 45,
      weather: "sunny",
      events: [],
      temperature: 72,
    },
    {
      day: "Tue",
      date: "Dec 19",
      electronics: 92,
      groceries: 115,
      apparel: 70,
      pharmacy: 48,
      weather: "cloudy",
      events: ["Local Festival"],
      temperature: 68,
    },
    {
      day: "Wed",
      date: "Dec 20",
      electronics: 78,
      groceries: 140,
      apparel: 55,
      pharmacy: 52,
      weather: "rainy",
      events: [],
      temperature: 58,
    },
    {
      day: "Thu",
      date: "Dec 21",
      electronics: 105,
      groceries: 95,
      apparel: 80,
      pharmacy: 41,
      weather: "rainy",
      events: [],
      temperature: 55,
    },
    {
      day: "Fri",
      date: "Dec 22",
      electronics: 130,
      groceries: 110,
      apparel: 95,
      pharmacy: 67,
      weather: "sunny",
      events: ["Payday"],
      temperature: 65,
    },
    {
      day: "Sat",
      date: "Dec 23",
      electronics: 145,
      groceries: 160,
      apparel: 120,
      pharmacy: 78,
      weather: "sunny",
      events: ["Weekend Rush"],
      temperature: 70,
    },
    {
      day: "Sun",
      date: "Dec 24",
      electronics: 110,
      groceries: 135,
      apparel: 85,
      pharmacy: 56,
      weather: "cloudy",
      events: ["Christmas Eve"],
      temperature: 67,
    },
  ]

  const extendedData = [
    ...baseData,
    {
      day: "Mon+",
      date: "Dec 25",
      electronics: 95,
      groceries: 180,
      apparel: 75,
      pharmacy: 89,
      weather: "sunny",
      events: ["Christmas"],
      temperature: 72,
    },
    {
      day: "Tue+",
      date: "Dec 26",
      electronics: 160,
      groceries: 140,
      apparel: 200,
      pharmacy: 67,
      weather: "sunny",
      events: ["Boxing Day"],
      temperature: 74,
    },
    {
      day: "Wed+",
      date: "Dec 27",
      electronics: 140,
      groceries: 125,
      apparel: 180,
      pharmacy: 54,
      weather: "cloudy",
      events: [],
      temperature: 69,
    },
    {
      day: "Thu+",
      date: "Dec 28",
      electronics: 120,
      groceries: 110,
      apparel: 160,
      pharmacy: 48,
      weather: "sunny",
      events: [],
      temperature: 71,
    },
    {
      day: "Fri+",
      date: "Dec 29",
      electronics: 135,
      groceries: 105,
      apparel: 140,
      pharmacy: 52,
      weather: "cloudy",
      events: ["Year-end Sales"],
      temperature: 66,
    },
    {
      day: "Sat+",
      date: "Dec 30",
      electronics: 150,
      groceries: 130,
      apparel: 170,
      pharmacy: 61,
      weather: "sunny",
      events: ["New Year Prep"],
      temperature: 73,
    },
    {
      day: "Sun+",
      date: "Dec 31",
      electronics: 125,
      groceries: 155,
      apparel: 145,
      pharmacy: 78,
      weather: "cloudy",
      events: ["New Year's Eve"],
      temperature: 68,
    },
  ]

  const currentData = timeRange === "14d" ? extendedData : baseData

  // Adjust data based on scenario slider
  const adjustedData = currentData.map((item) => ({
    ...item,
    electronics: Math.round(item.electronics * (0.5 + scenarioValue[0] / 100)),
    groceries: Math.round(item.groceries * (0.5 + scenarioValue[0] / 100)),
    apparel: Math.round(item.apparel * (0.5 + scenarioValue[0] / 100)),
    pharmacy: Math.round(item.pharmacy * (0.5 + scenarioValue[0] / 100)),
  }))

  const weatherIcons = {
    sunny: <Sun className="h-4 w-4 text-yellow-500" />,
    cloudy: <Cloud className="h-4 w-4 text-gray-500" />,
    rainy: <Cloud className="h-4 w-4 text-blue-500" />,
  }

  const scenarios = [
    { name: "Baseline", value: 50, description: "Normal operating conditions" },
    { name: "Optimistic", value: 75, description: "Favorable weather + marketing boost" },
    { name: "Pessimistic", value: 25, description: "Bad weather + supply issues" },
    { name: "Holiday Boost", value: 85, description: "Peak holiday shopping" },
    { name: "Economic Downturn", value: 15, description: "Reduced consumer spending" },
  ]

  const categoryData = [
    { category: "Electronics", current: 145, forecast: 160, confidence: 87, trend: "up" },
    { category: "Groceries", current: 180, forecast: 195, confidence: 92, trend: "up" },
    { category: "Apparel", current: 120, forecast: 200, confidence: 78, trend: "up" },
    { category: "Pharmacy", current: 67, forecast: 75, confidence: 94, trend: "stable" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Advanced Forecasting Center
          </h1>
          <p className="text-muted-foreground">
            AI-powered demand prediction with scenario modeling and external factor analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Model Accuracy: 89.3%
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Last Updated: 2 min ago
          </Badge>
        </div>
      </div>

      {/* Control Panel */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Forecast Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="14d">14 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Channel</label>
              <Tabs value={selectedChannel} onValueChange={setSelectedChannel}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="instore">In-Store</TabsTrigger>
                  <TabsTrigger value="pickup">Pickup</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Simulation</label>
              <div className="flex gap-2">
                <Button
                  variant={isPlaying ? "secondary" : "default"}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setScenarioValue([50])}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Scenario Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Scenario Modeling</label>
              <Badge variant="outline">
                {scenarioValue[0] < 30 ? "Pessimistic" : scenarioValue[0] > 70 ? "Optimistic" : "Baseline"}
              </Badge>
            </div>
            <Slider value={scenarioValue} onValueChange={setScenarioValue} max={100} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Economic Downturn</span>
              <span>Current: {scenarioValue[0]}%</span>
              <span>Holiday Boost</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {scenarios.map((scenario) => (
                <Button
                  key={scenario.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setScenarioValue([scenario.value])}
                  className="text-xs"
                >
                  {scenario.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Forecast Chart */}
        <div className="xl:col-span-3">
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Multi-Series Demand Forecast</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">Save Scenario</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
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
                      <linearGradient id="pharmacy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
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
                              <p className="font-semibold">
                                {label} - {data?.date}
                              </p>
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
                                    <span className="text-xs capitalize">
                                      {data.weather} ({data.temperature}°F)
                                    </span>
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
                    <Area
                      type="monotone"
                      dataKey="pharmacy"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="url(#pharmacy)"
                      name="Pharmacy"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weather and Events Timeline */}
          <Card className="glass-card border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                External Factors Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Rain Event Impact</span>
                </div>
                <Badge className="bg-blue-500">Wed-Thu</Badge>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {adjustedData.slice(0, 7).map((day, index) => (
                  <div key={index} className="text-center space-y-2">
                    <div className="text-xs font-medium">{day.day}</div>
                    <div className="text-xs text-muted-foreground">{day.date}</div>
                    <div className="flex justify-center">{weatherIcons[day.weather as keyof typeof weatherIcons]}</div>
                    <div className="text-xs">{day.temperature}°F</div>
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
            </CardContent>
          </Card>
        </div>

        {/* Category Insights Panel */}
        <div className="space-y-6">
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.category}</span>
                    <div className="flex items-center gap-1">
                      {category.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <div className="h-3 w-3 bg-gray-400 rounded-full" />
                      )}
                      <span className="text-xs text-muted-foreground">{category.confidence}%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Current:</span>
                      <div className="font-bold">{category.current}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Forecast:</span>
                      <div className="font-bold text-blue-600">{category.forecast}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.confidence}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Model Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Accuracy</span>
                  <span className="font-bold text-green-600">89.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "89.3%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weather Impact</span>
                  <span className="font-bold text-blue-600">High</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Rain events show 23% demand increase in groceries, 15% decrease in apparel
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Social Trends</span>
                  <span className="font-bold text-purple-600">Medium</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Electronics surge detected from viral social media trend
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Seasonal Factor</span>
                  <span className="font-bold text-orange-600">Very High</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Holiday season driving 40% increase across all categories
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Restock
              </Button>
              <Button className="w-full justify-start" size="sm" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Adjust Pricing
              </Button>
              <Button className="w-full justify-start" size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
