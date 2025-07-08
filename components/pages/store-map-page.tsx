"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Store, Warehouse, TrendingUp, Search, Filter, Eye, AlertTriangle } from "lucide-react"

export function StoreMapPage() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"dark" | "fulfillment">("dark")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const stores = [
    {
      id: "1",
      name: "Store #4521",
      type: "dark",
      status: "critical",
      demand: 95,
      stock: 23,
      lat: 40.7128,
      lng: -74.006,
      address: "123 Main St, New York, NY",
      manager: "John Smith",
      categories: {
        electronics: { stock: 12, demand: 98, trend: "up" },
        groceries: { stock: 34, demand: 87, trend: "stable" },
        apparel: { stock: 45, demand: 76, trend: "down" },
        pharmacy: { stock: 67, demand: 45, trend: "stable" },
      },
      alerts: [
        { type: "critical", message: "Electronics critically low", time: "5 min ago" },
        { type: "warning", message: "High demand spike detected", time: "12 min ago" },
      ],
    },
    {
      id: "2",
      name: "Store #4522",
      type: "dark",
      status: "warning",
      demand: 78,
      stock: 45,
      lat: 40.7589,
      lng: -73.9851,
      address: "456 Broadway, New York, NY",
      manager: "Sarah Johnson",
      categories: {
        electronics: { stock: 67, demand: 78, trend: "up" },
        groceries: { stock: 23, demand: 92, trend: "up" },
        apparel: { stock: 78, demand: 56, trend: "stable" },
        pharmacy: { stock: 89, demand: 34, trend: "down" },
      },
      alerts: [{ type: "warning", message: "Grocery restock needed", time: "1 hour ago" }],
    },
    {
      id: "3",
      name: "FC Dallas",
      type: "fulfillment",
      status: "good",
      demand: 65,
      stock: 87,
      lat: 32.7767,
      lng: -96.797,
      address: "789 Industrial Blvd, Dallas, TX",
      manager: "Mike Chen",
      categories: {
        electronics: { stock: 89, demand: 67, trend: "stable" },
        groceries: { stock: 92, demand: 54, trend: "down" },
        apparel: { stock: 78, demand: 43, trend: "stable" },
        pharmacy: { stock: 95, demand: 32, trend: "stable" },
      },
      alerts: [],
    },
    {
      id: "4",
      name: "Store #4523",
      type: "dark",
      status: "good",
      demand: 45,
      stock: 92,
      lat: 40.6782,
      lng: -73.9442,
      address: "321 Park Ave, Brooklyn, NY",
      manager: "Lisa Wong",
      categories: {
        electronics: { stock: 94, demand: 45, trend: "stable" },
        groceries: { stock: 89, demand: 52, trend: "stable" },
        apparel: { stock: 96, demand: 38, trend: "down" },
        pharmacy: { stock: 87, demand: 41, trend: "stable" },
      },
      alerts: [],
    },
    {
      id: "5",
      name: "FC Atlanta",
      type: "fulfillment",
      status: "warning",
      demand: 82,
      stock: 34,
      lat: 33.749,
      lng: -84.388,
      address: "555 Commerce Dr, Atlanta, GA",
      manager: "David Brown",
      categories: {
        electronics: { stock: 45, demand: 89, trend: "up" },
        groceries: { stock: 23, demand: 95, trend: "up" },
        apparel: { stock: 56, demand: 67, trend: "stable" },
        pharmacy: { stock: 78, demand: 54, trend: "stable" },
      },
      alerts: [
        { type: "warning", message: "Multiple categories low", time: "30 min ago" },
        { type: "info", message: "Truck delayed by weather", time: "2 hours ago" },
      ],
    },
    {
      id: "6",
      name: "Store #4524",
      type: "dark",
      status: "critical",
      demand: 98,
      stock: 12,
      lat: 40.7505,
      lng: -73.9934,
      address: "777 Times Square, New York, NY",
      manager: "Emma Davis",
      categories: {
        electronics: { stock: 8, demand: 99, trend: "up" },
        groceries: { stock: 15, demand: 96, trend: "up" },
        apparel: { stock: 12, demand: 89, trend: "stable" },
        pharmacy: { stock: 34, demand: 78, trend: "up" },
      },
      alerts: [
        { type: "critical", message: "Multiple critical shortages", time: "2 min ago" },
        { type: "critical", message: "Electronics out of stock", time: "8 min ago" },
        { type: "warning", message: "Customer complaints rising", time: "15 min ago" },
      ],
    },
  ]

  const filteredStores = stores.filter((store) => {
    const matchesType = viewMode === "dark" ? store.type === "dark" : store.type === "fulfillment"
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || store.status === filterStatus
    return matchesType && matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500"
      case "warning":
        return "bg-orange-500"
      case "good":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return <Badge className="bg-orange-500">Warning</Badge>
      case "good":
        return <Badge className="bg-green-500">Good</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />
      default:
        return <div className="h-3 w-3 bg-gray-400 rounded-full" />
    }
  }

  const selectedStoreData = selectedStore ? stores.find((s) => s.id === selectedStore) : null

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Store Network Map</h1>
          <p className="text-muted-foreground">Real-time monitoring of all store locations and inventory levels</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            {filteredStores.length} Stores Active
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {filteredStores.filter((s) => s.status === "critical").length} Critical
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <Card className="glass-card border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "dark" | "fulfillment")}
              className="w-full lg:w-auto"
            >
              <TabsList>
                <TabsTrigger value="dark" className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Dark Stores ({stores.filter((s) => s.type === "dark").length})
                </TabsTrigger>
                <TabsTrigger value="fulfillment" className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4" />
                  Fulfillment Centers ({stores.filter((s) => s.type === "fulfillment").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2 flex-1 lg:flex-initial">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="xl:col-span-2">
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Regional Heat Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-lg border-2 border-dashed border-blue-200 dark:border-slate-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-12 w-12 mx-auto text-blue-500" />
                    <p className="text-sm text-muted-foreground">Interactive Regional Heat Map</p>
                    <p className="text-xs text-muted-foreground">Click stores in the grid to view details</p>
                  </div>
                </div>

                {/* Simulated store markers positioned around the map */}
                <div className="absolute top-4 left-4 space-y-2">
                  {filteredStores.slice(0, 3).map((store) => (
                    <div
                      key={store.id}
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setSelectedStore(store.id)}
                    >
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(store.status)} animate-pulse`}></div>
                      <span className="text-xs font-medium bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded">
                        {store.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Weather overlay */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 rounded-lg p-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Rain Event - Dallas Region</span>
                  </div>
                </div>

                {/* Demand heat zones */}
                <div className="absolute bottom-4 left-4 space-y-1">
                  <div className="text-xs font-medium bg-white/90 dark:bg-slate-800/90 px-2 py-1 rounded">
                    Heat Zones
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-red-400 rounded opacity-60"></div>
                    <span className="bg-white/90 dark:bg-slate-800/90 px-1 rounded">High Demand</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-orange-400 rounded opacity-60"></div>
                    <span className="bg-white/90 dark:bg-slate-800/90 px-1 rounded">Medium Demand</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-green-400 rounded opacity-60"></div>
                    <span className="bg-white/90 dark:bg-slate-800/90 px-1 rounded">Low Demand</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Store Details Panel */}
        <div className="space-y-6">
          {selectedStoreData ? (
            <Card className="glass-card border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {selectedStoreData.type === "dark" ? (
                      <Store className="h-5 w-5" />
                    ) : (
                      <Warehouse className="h-5 w-5" />
                    )}
                    {selectedStoreData.name}
                  </CardTitle>
                  {getStatusBadge(selectedStoreData.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Address:</span>
                    <p className="font-medium">{selectedStoreData.address}</p>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Manager:</span>
                    <p className="font-medium">{selectedStoreData.manager}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedStoreData.demand}%</div>
                    <div className="text-xs text-muted-foreground">Demand</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedStoreData.stock}%</div>
                    <div className="text-xs text-muted-foreground">Stock Level</div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Category Breakdown</h4>
                  {Object.entries(selectedStoreData.categories).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium capitalize">{category}</span>
                          {getTrendIcon(data.trend)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Stock: {data.stock}% | Demand: {data.demand}%
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${data.stock > 50 ? "bg-green-500" : data.stock > 25 ? "bg-orange-500" : "bg-red-500"}`}
                            style={{ width: `${data.stock}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data.demand}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Alerts */}
                {selectedStoreData.alerts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Active Alerts</h4>
                    {selectedStoreData.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-lg text-xs ${
                          alert.type === "critical"
                            ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                            : alert.type === "warning"
                              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200"
                              : "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3" />
                          <span className="font-medium">{alert.message}</span>
                        </div>
                        <div className="text-xs opacity-75 mt-1">{alert.time}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Actions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Select a store from the grid below to view detailed information</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Store Grid */}
      <Card className="glass-card border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Store Grid View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStores.map((store) => (
              <Card
                key={store.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedStore === store.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {store.type === "dark" ? <Store className="h-4 w-4" /> : <Warehouse className="h-4 w-4" />}
                        <span className="font-medium text-sm">{store.name}</span>
                      </div>
                      {getStatusBadge(store.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-blue-500" />
                        <span>Demand: {store.demand}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${store.stock > 50 ? "bg-green-500" : store.stock > 25 ? "bg-orange-500" : "bg-red-500"}`}
                        ></div>
                        <span>Stock: {store.stock}%</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>{store.address}</p>
                      <p>Manager: {store.manager}</p>
                    </div>

                    {store.alerts.length > 0 && (
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        <span className="text-xs text-red-600">
                          {store.alerts.length} alert{store.alerts.length > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
