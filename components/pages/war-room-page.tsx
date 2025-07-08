"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Brain, TrendingUp, Info, CheckCircle, Calendar, Bell, Clock, Target, Zap, AlertTriangle } from "lucide-react"

export function WarRoomPage() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState("all")

  const criticalActions = [
    {
      id: "1",
      title: "Restock Electronics - Store #4521",
      impact: 9.2,
      urgency: 8.7,
      score: 89,
      category: "restock",
      description: "Critical low stock in high-demand electronics category",
      confidence: 94,
      dataInputs: ["Sales velocity", "Current inventory", "Lead times", "Seasonal trends"],
      estimatedRevenueLoss: "$45,000",
      timeToResolve: "4 hours",
      affectedStores: 1,
      actions: [
        { label: "Approve & Dispatch", type: "primary", icon: CheckCircle, estimated: "2 min" },
        { label: "Schedule Discount", type: "secondary", icon: Calendar, estimated: "5 min" },
        { label: "Notify Ops", type: "outline", icon: Bell, estimated: "1 min" },
      ],
      timeline: [
        { time: "2:34 PM", event: "Low stock alert triggered", type: "alert" },
        { time: "2:35 PM", event: "AI analysis completed", type: "analysis" },
        { time: "2:36 PM", event: "Recommendation generated", type: "recommendation" },
      ],
    },
    {
      id: "2",
      title: "Weather Impact - Dallas Region",
      impact: 7.8,
      urgency: 9.1,
      score: 85,
      category: "weather",
      description: "Incoming storm system affecting 12 stores",
      confidence: 87,
      dataInputs: ["Weather forecast", "Historical patterns", "Store locations", "Supply chain"],
      estimatedRevenueLoss: "$78,000",
      timeToResolve: "6 hours",
      affectedStores: 12,
      actions: [
        { label: "Pre-position Stock", type: "primary", icon: CheckCircle, estimated: "30 min" },
        { label: "Alert Managers", type: "secondary", icon: Bell, estimated: "5 min" },
        { label: "Review Routes", type: "outline", icon: Calendar, estimated: "15 min" },
      ],
      timeline: [
        { time: "1:15 PM", event: "Weather alert received", type: "alert" },
        { time: "1:20 PM", event: "Impact analysis started", type: "analysis" },
        { time: "1:45 PM", event: "Multi-store strategy developed", type: "recommendation" },
      ],
    },
    {
      id: "3",
      title: "Demand Spike - Grocery Category",
      impact: 6.9,
      urgency: 7.3,
      score: 71,
      category: "demand",
      description: "Unexpected 40% increase in grocery demand",
      confidence: 91,
      dataInputs: ["Real-time sales", "Social trends", "Local events", "Competitor analysis"],
      estimatedRevenueLoss: "$23,000",
      timeToResolve: "2 hours",
      affectedStores: 3,
      actions: [
        { label: "Increase Orders", type: "primary", icon: TrendingUp, estimated: "10 min" },
        { label: "Dynamic Pricing", type: "secondary", icon: Calendar, estimated: "15 min" },
        { label: "Staff Alert", type: "outline", icon: Bell, estimated: "2 min" },
      ],
      timeline: [
        { time: "12:30 PM", event: "Demand anomaly detected", type: "alert" },
        { time: "12:35 PM", event: "Social media trend identified", type: "analysis" },
        { time: "12:40 PM", event: "Pricing strategy recommended", type: "recommendation" },
      ],
    },
    {
      id: "4",
      title: "Supply Chain Disruption - FC Atlanta",
      impact: 8.5,
      urgency: 6.2,
      score: 78,
      category: "supply",
      description: "Truck delay causing ripple effects across 8 stores",
      confidence: 89,
      dataInputs: ["GPS tracking", "Traffic data", "Inventory levels", "Delivery schedules"],
      estimatedRevenueLoss: "$34,000",
      timeToResolve: "8 hours",
      affectedStores: 8,
      actions: [
        { label: "Reroute Delivery", type: "primary", icon: CheckCircle, estimated: "20 min" },
        { label: "Emergency Stock", type: "secondary", icon: AlertTriangle, estimated: "45 min" },
        { label: "Customer Comms", type: "outline", icon: Bell, estimated: "10 min" },
      ],
      timeline: [
        { time: "11:00 AM", event: "Delivery delay detected", type: "alert" },
        { time: "11:15 AM", event: "Impact assessment completed", type: "analysis" },
        { time: "11:30 AM", event: "Alternative routes calculated", type: "recommendation" },
      ],
    },
    {
      id: "5",
      title: "Competitor Price War - Electronics",
      impact: 5.8,
      urgency: 8.9,
      score: 69,
      category: "pricing",
      description: "Major competitor dropped prices by 15% on key electronics",
      confidence: 96,
      dataInputs: ["Competitor monitoring", "Price elasticity", "Margin analysis", "Market share"],
      estimatedRevenueLoss: "$67,000",
      timeToResolve: "1 hour",
      affectedStores: 15,
      actions: [
        { label: "Match Prices", type: "primary", icon: TrendingUp, estimated: "5 min" },
        { label: "Bundle Offers", type: "secondary", icon: Calendar, estimated: "15 min" },
        { label: "Marketing Push", type: "outline", icon: Bell, estimated: "30 min" },
      ],
      timeline: [
        { time: "10:45 AM", event: "Price change detected", type: "alert" },
        { time: "10:50 AM", event: "Competitive analysis run", type: "analysis" },
        { time: "10:55 AM", event: "Response strategy generated", type: "recommendation" },
      ],
    },
  ]

  const filteredActions =
    filterCategory === "all" ? criticalActions : criticalActions.filter((action) => action.category === filterCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "restock":
        return "bg-blue-500"
      case "weather":
        return "bg-orange-500"
      case "demand":
        return "bg-green-500"
      case "supply":
        return "bg-purple-500"
      case "pricing":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      restock: "bg-blue-500",
      weather: "bg-orange-500",
      demand: "bg-green-500",
      supply: "bg-purple-500",
      pricing: "bg-red-500",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-500"}>{category}</Badge>
  }

  const selectedActionData = selectedAction ? criticalActions.find((a) => a.id === selectedAction) : null

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI War Room
          </h1>
          <p className="text-muted-foreground">AI-powered critical action center with real-time recommendations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            {criticalActions.length} Active Recommendations
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            $
            {criticalActions
              .reduce((sum, action) => sum + Number.parseInt(action.estimatedRevenueLoss.replace(/[$,]/g, "")), 0)
              .toLocaleString()}{" "}
            at Risk
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{criticalActions.filter((a) => a.score >= 80).length}</div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {criticalActions.filter((a) => a.score >= 60 && a.score < 80).length}
            </div>
            <div className="text-sm text-muted-foreground">Medium Priority</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {criticalActions.reduce((sum, a) => sum + a.affectedStores, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Stores Affected</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(criticalActions.reduce((sum, a) => sum + a.confidence, 0) / criticalActions.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Actions List */}
        <div className="xl:col-span-2">
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Critical Actions Queue</CardTitle>
                <Tabs value={filterCategory} onValueChange={setFilterCategory}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="restock">Restock</TabsTrigger>
                    <TabsTrigger value="weather">Weather</TabsTrigger>
                    <TabsTrigger value="demand">Demand</TabsTrigger>
                    <TabsTrigger value="supply">Supply</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredActions.map((action, index) => (
                <Card
                  key={action.id}
                  className={`border cursor-pointer transition-all hover:shadow-md ${
                    selectedAction === action.id ? "ring-2 ring-purple-500" : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setSelectedAction(selectedAction === action.id ? null : action.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className={`w-2 h-2 rounded-full ${getCategoryColor(action.category)}`}></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Score: {action.score}
                          </Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <div className="space-y-2">
                                  <p className="font-semibold">AI Explanation</p>
                                  <p className="text-xs">{action.description}</p>
                                  <div className="space-y-1">
                                    <p className="text-xs font-medium">Data Inputs:</p>
                                    <ul className="text-xs space-y-1">
                                      {action.dataInputs.map((input, i) => (
                                        <li key={i}>• {input}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <p className="text-xs">
                                    <span className="font-medium">Model Confidence:</span> {action.confidence}%
                                  </p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      {/* Title and Category */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">{action.title}</h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          {getCategoryBadge(action.category)}
                          <span className="text-xs text-muted-foreground">
                            Impact: {action.impact}/10 • Urgency: {action.urgency}/10
                          </span>
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Revenue at Risk:</span>
                          <div className="font-bold text-red-600">{action.estimatedRevenueLoss}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Time to Resolve:</span>
                          <div className="font-bold">{action.timeToResolve}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Stores Affected:</span>
                          <div className="font-bold">{action.affectedStores}</div>
                        </div>
                      </div>

                      {/* Progress Bars */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="w-12">Impact</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${action.impact * 10}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-right">{action.impact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="w-12">Urgency</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${action.urgency * 10}%` }}
                            ></div>
                          </div>
                          <span className="w-8 text-right">{action.urgency}</span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {action.actions.map((btn, i) => (
                          <Button
                            key={i}
                            variant={btn.type as "default" | "secondary" | "outline"}
                            size="sm"
                            className="text-xs"
                          >
                            <btn.icon className="h-3 w-3 mr-1" />
                            {btn.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Action Details Panel */}
        <div className="space-y-6">
          {selectedActionData ? (
            <>
              <Card className="glass-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Action Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{selectedActionData.title}</h4>
                    <p className="text-sm text-muted-foreground">{selectedActionData.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Confidence</span>
                      <span className="font-bold">{selectedActionData.confidence}%</span>
                    </div>
                    <Progress value={selectedActionData.confidence} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Impact Score:</span>
                      <div className="font-bold text-blue-600">{selectedActionData.impact}/10</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Urgency Score:</span>
                      <div className="font-bold text-red-600">{selectedActionData.urgency}/10</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Data Sources:</span>
                    <div className="space-y-1">
                      {selectedActionData.dataInputs.map((input, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          <span>{input}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Action Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedActionData.timeline.map((event, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            event.type === "alert"
                              ? "bg-red-500"
                              : event.type === "analysis"
                                ? "bg-blue-500"
                                : "bg-green-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{event.event}</div>
                          <div className="text-xs text-muted-foreground">{event.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Recommended Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedActionData.actions.map((action, i) => (
                    <Button key={i} className="w-full justify-between" variant={i === 0 ? "default" : "outline"}>
                      <div className="flex items-center gap-2">
                        <action.icon className="h-4 w-4" />
                        {action.label}
                      </div>
                      <span className="text-xs opacity-75">~{action.estimated}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="glass-card border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Select an action from the queue to view detailed analysis and recommendations
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
