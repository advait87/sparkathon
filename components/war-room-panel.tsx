"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Brain, TrendingUp, Info, CheckCircle, Calendar, Bell } from "lucide-react"

export function WarRoomPanel() {
  const criticalActions = [
    {
      id: 1,
      title: "Restock Electronics - Store #4521",
      impact: 9.2,
      urgency: 8.7,
      score: 89,
      category: "restock",
      description: "Critical low stock in high-demand electronics category",
      confidence: 94,
      dataInputs: ["Sales velocity", "Current inventory", "Lead times", "Seasonal trends"],
      actions: [
        { label: "Approve & Dispatch", type: "primary", icon: CheckCircle },
        { label: "Schedule Discount", type: "secondary", icon: Calendar },
        { label: "Notify Ops", type: "outline", icon: Bell },
      ],
    },
    {
      id: 2,
      title: "Weather Impact - Dallas Region",
      impact: 7.8,
      urgency: 9.1,
      score: 85,
      category: "weather",
      description: "Incoming storm system affecting 12 stores",
      confidence: 87,
      dataInputs: ["Weather forecast", "Historical patterns", "Store locations", "Supply chain"],
      actions: [
        { label: "Pre-position Stock", type: "primary", icon: CheckCircle },
        { label: "Alert Managers", type: "secondary", icon: Bell },
        { label: "Review Routes", type: "outline", icon: Calendar },
      ],
    },
    {
      id: 3,
      title: "Demand Spike - Grocery Category",
      impact: 6.9,
      urgency: 7.3,
      score: 71,
      category: "demand",
      description: "Unexpected 40% increase in grocery demand",
      confidence: 91,
      dataInputs: ["Real-time sales", "Social trends", "Local events", "Competitor analysis"],
      actions: [
        { label: "Increase Orders", type: "primary", icon: TrendingUp },
        { label: "Dynamic Pricing", type: "secondary", icon: Calendar },
        { label: "Staff Alert", type: "outline", icon: Bell },
      ],
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "restock":
        return "bg-blue-500"
      case "weather":
        return "bg-orange-500"
      case "demand":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "restock":
        return <Badge className="bg-blue-500">Restock</Badge>
      case "weather":
        return <Badge className="bg-orange-500">Weather</Badge>
      case "demand":
        return <Badge className="bg-green-500">Demand</Badge>
      default:
        return <Badge variant="secondary">Other</Badge>
    }
  }

  return (
    <Card className="glass-card border-0 shadow-lg h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          AI War Room
          <Badge variant="outline" className="ml-auto bg-purple-50 text-purple-700">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground mb-4">Top 3 Critical Actions ranked by Impact × Urgency</div>

        {criticalActions.map((action, index) => (
          <Card key={action.id} className="border border-gray-200 dark:border-gray-700">
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
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(action.category)}
                    <span className="text-xs text-muted-foreground">
                      Impact: {action.impact}/10 • Urgency: {action.urgency}/10
                    </span>
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

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {action.actions.map((btn, i) => (
                    <Button
                      key={i}
                      variant={btn.type as "default" | "secondary" | "outline"}
                      size="sm"
                      className="justify-start"
                    >
                      <btn.icon className="h-4 w-4 mr-2" />
                      {btn.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
