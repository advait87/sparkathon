"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Layout, Save, Download, Upload, Palette, Monitor } from "lucide-react"

export function SettingsPanel() {
  const [alertThresholds, setAlertThresholds] = useState({
    lowStock: [25],
    highDemand: [80],
    delayRisk: [30],
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    slack: true,
  })

  const savedScenarios = [
    {
      id: 1,
      name: "Heatwave Prep",
      description: "High cooling demand, increased beverage sales",
      lastUsed: "2 days ago",
    },
    { id: 2, name: "Holiday Blitz", description: "Peak shopping season configuration", lastUsed: "1 week ago" },
    { id: 3, name: "Storm Response", description: "Weather emergency protocols", lastUsed: "3 days ago" },
    { id: 4, name: "Back to School", description: "Seasonal demand patterns", lastUsed: "1 month ago" },
  ]

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Settings & Personalization
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="layout" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Dashboard Layout</h4>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-2 border-dashed border-blue-200 cursor-pointer hover:border-blue-400 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Layout className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm font-medium">KPI Bar</p>
                    <p className="text-xs text-muted-foreground">Drag to reorder</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-green-200 cursor-pointer hover:border-green-400 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Layout className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm font-medium">Store Map</p>
                    <p className="text-xs text-muted-foreground">Drag to reorder</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-purple-200 cursor-pointer hover:border-purple-400 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Layout className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-sm font-medium">War Room</p>
                    <p className="text-xs text-muted-foreground">Drag to reorder</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-orange-200 cursor-pointer hover:border-orange-400 transition-colors">
                  <CardContent className="p-4 text-center">
                    <Layout className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-sm font-medium">Forecast</p>
                    <p className="text-xs text-muted-foreground">Drag to reorder</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <Label>Widget Visibility</Label>
                <div className="space-y-2">
                  {["KPI Bar", "Store Map", "War Room", "Forecast Timeline", "Maintenance", "Ops Chat"].map(
                    (widget) => (
                      <div key={widget} className="flex items-center justify-between">
                        <span className="text-sm">{widget}</span>
                        <Switch defaultChecked />
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Layout
                </Button>
                <Button variant="outline" size="sm">
                  Reset to Default
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-6">
              <h4 className="font-semibold text-sm">Alert Thresholds</h4>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Low Stock Alert (%)</Label>
                  <Slider
                    value={alertThresholds.lowStock}
                    onValueChange={(value) => setAlertThresholds({ ...alertThresholds, lowStock: value })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>Current: {alertThresholds.lowStock[0]}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>High Demand Alert (%)</Label>
                  <Slider
                    value={alertThresholds.highDemand}
                    onValueChange={(value) => setAlertThresholds({ ...alertThresholds, highDemand: value })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>Current: {alertThresholds.highDemand[0]}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Delay Risk Alert (minutes)</Label>
                  <Slider
                    value={alertThresholds.delayRisk}
                    onValueChange={(value) => setAlertThresholds({ ...alertThresholds, delayRisk: value })}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 min</span>
                    <span>Current: {alertThresholds.delayRisk[0]} min</span>
                    <span>120 min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Notification Channels</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Alerts</span>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Slack Integration</span>
                    <Switch
                      checked={notifications.slack}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, slack: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
                <Button variant="outline" size="sm">
                  Test Alerts
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Saved Scenarios</h4>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Scenario
                </Button>
              </div>

              <div className="space-y-3">
                {savedScenarios.map((scenario) => (
                  <Card key={scenario.id} className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h5 className="font-medium text-sm">{scenario.name}</h5>
                          <p className="text-xs text-muted-foreground">{scenario.description}</p>
                          <p className="text-xs text-muted-foreground">Last used: {scenario.lastUsed}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Load
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label>Create New Scenario</Label>
                <div className="flex gap-2">
                  <Input placeholder="Scenario name" className="flex-1" />
                  <Button size="sm">Create</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theme" className="space-y-4">
            <div className="space-y-6">
              <h4 className="font-semibold text-sm">Appearance</h4>

              <div className="space-y-3">
                <Label>Theme Mode</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Color Scheme</Label>
                <div className="grid grid-cols-4 gap-2">
                  {["Blue", "Green", "Purple", "Orange"].map((color) => (
                    <Card key={color} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3 text-center">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto mb-2 ${
                            color === "Blue"
                              ? "bg-blue-500"
                              : color === "Green"
                                ? "bg-green-500"
                                : color === "Purple"
                                  ? "bg-purple-500"
                                  : "bg-orange-500"
                          }`}
                        ></div>
                        <p className="text-xs">{color}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>High Contrast Mode</Label>
                  <Switch />
                </div>
                <p className="text-xs text-muted-foreground">
                  Optimized for warehouse environments with bright lighting
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Reduced Motion</Label>
                  <Switch />
                </div>
                <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  Apply Theme
                </Button>
                <Button variant="outline" size="sm">
                  <Monitor className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
