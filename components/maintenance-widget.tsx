"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Wrench, Thermometer, Truck, Clock, AlertTriangle, Calendar, ChevronDown } from "lucide-react"

export function MaintenanceWidget() {
  const [isExpanded, setIsExpanded] = useState(false)

  const equipment = [
    {
      id: 1,
      name: "Cooler Unit A1",
      type: "cooler",
      health: 85,
      status: "good",
      temp: "2.1°C",
      lastMaintenance: "2 days ago",
    },
    {
      id: 2,
      name: "Conveyor Belt B2",
      type: "conveyor",
      health: 45,
      status: "warning",
      speed: "1.2 m/s",
      lastMaintenance: "12 days ago",
    },
    {
      id: 3,
      name: "Forklift FL-003",
      type: "forklift",
      health: 92,
      status: "good",
      battery: "87%",
      lastMaintenance: "1 day ago",
    },
    {
      id: 4,
      name: "Cooler Unit A2",
      type: "cooler",
      health: 23,
      status: "critical",
      temp: "5.8°C",
      lastMaintenance: "18 days ago",
    },
  ]

  const trucks = [
    { id: 1, route: "Route A-Dallas", eta: "14:30", delay: 0, risk: "low", cargo: "Electronics" },
    { id: 2, route: "Route B-Houston", eta: "16:45", delay: 25, risk: "medium", cargo: "Groceries" },
    { id: 3, route: "Route C-Austin", eta: "18:20", delay: 45, risk: "high", cargo: "Mixed" },
  ]

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600"
    if (health >= 50) return "text-orange-600"
    return "text-red-600"
  }

  const getHealthBg = (health: number) => {
    if (health >= 80) return "bg-green-500"
    if (health >= 50) return "bg-orange-500"
    return "bg-red-500"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-500">Good</Badge>
      case "warning":
        return <Badge className="bg-orange-500">Warning</Badge>
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-500">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-orange-500">Medium Risk</Badge>
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getEquipmentIcon = (type: string) => {
    switch (type) {
      case "cooler":
        return <Thermometer className="h-4 w-4" />
      case "conveyor":
        return <Wrench className="h-4 w-4" />
      case "forklift":
        return <Truck className="h-4 w-4" />
      default:
        return <Wrench className="h-4 w-4" />
    }
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className="glass-card border-0 shadow-lg">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                Predictive Maintenance & Logistics
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  2 Critical
                </Badge>
                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            <Tabs defaultValue="equipment" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="equipment">Equipment Health</TabsTrigger>
                <TabsTrigger value="logistics">Fleet Tracking</TabsTrigger>
              </TabsList>

              <TabsContent value="equipment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {equipment.map((item) => (
                    <Card key={item.id} className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getEquipmentIcon(item.type)}
                              <span className="font-medium text-sm">{item.name}</span>
                            </div>
                            {getStatusBadge(item.status)}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>Health Score</span>
                              <span className={`font-bold ${getHealthColor(item.health)}`}>{item.health}%</span>
                            </div>
                            <Progress value={item.health} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">
                                {item.type === "cooler"
                                  ? "Temperature"
                                  : item.type === "conveyor"
                                    ? "Speed"
                                    : "Battery"}
                                :
                              </span>
                              <div className="font-medium">
                                {item.type === "cooler"
                                  ? item.temp
                                  : item.type === "conveyor"
                                    ? item.speed
                                    : item.battery}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Service:</span>
                              <div className="font-medium">{item.lastMaintenance}</div>
                            </div>
                          </div>

                          {item.status === "critical" && (
                            <Button size="sm" variant="destructive" className="w-full">
                              <AlertTriangle className="h-3 w-3 mr-2" />
                              Schedule Emergency Repair
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Auto-Schedule Maintenance
                  </Button>
                  <Button variant="outline">View All Equipment</Button>
                </div>
              </TabsContent>

              <TabsContent value="logistics" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Live Truck ETA Predictor</h4>

                  {trucks.map((truck) => (
                    <Card key={truck.id} className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              <span className="font-medium text-sm">{truck.route}</span>
                            </div>
                            {getRiskBadge(truck.risk)}
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>
                              <span className="text-muted-foreground">ETA:</span>
                              <div className="font-bold text-lg">{truck.eta}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Delay:</span>
                              <div
                                className={`font-bold text-lg ${truck.delay > 0 ? "text-red-600" : "text-green-600"}`}
                              >
                                {truck.delay > 0 ? `+${truck.delay}m` : "On Time"}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Cargo:</span>
                              <div className="font-medium">{truck.cargo}</div>
                            </div>
                          </div>

                          {truck.delay > 30 && (
                            <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded text-xs">
                              <AlertTriangle className="h-3 w-3 text-red-600" />
                              <span>High delay risk - Consider rerouting</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Optimize Routes
                  </Button>
                  <Button variant="outline">Fleet Dashboard</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
