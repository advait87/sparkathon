"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Store, Warehouse, TrendingUp, Loader2, RefreshCw } from "lucide-react"
import { useStores } from "@/hooks/use-dashboard-data"
import { config } from "@/lib/config"

export function GeoMapSection() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"dark" | "fulfillment">("dark")

  const { data: stores, loading, error, lastUpdated, refresh } = useStores({
    refreshInterval: config.realtime.storeRefreshInterval,
    enabled: config.features.enableRealtime
  })

  // Fallback data for when API is not available
  const fallbackStores = [
    {
      id: "1",
      name: "Store #4521",
      type: "dark" as const,
      status: "critical" as const,
      demand: 95,
      stock: 23,
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: "2",
      name: "Store #4522",
      type: "dark" as const,
      status: "warning" as const,
      demand: 78,
      stock: 45,
      lat: 40.7589,
      lng: -73.9851,
    },
    {
      id: "3",
      name: "FC Dallas",
      type: "fulfillment" as const,
      status: "good" as const,
      demand: 65,
      stock: 87,
      lat: 32.7767,
      lng: -96.797,
    },
    { id: "4", name: "Store #4523", type: "dark" as const, status: "good" as const, demand: 45, stock: 92, lat: 40.6782, lng: -73.9442 },
    {
      id: "5",
      name: "FC Atlanta",
      type: "fulfillment" as const,
      status: "warning" as const,
      demand: 82,
      stock: 34,
      lat: 33.749,
      lng: -84.388,
    },
    {
      id: "6",
      name: "Store #4524",
      type: "dark" as const,
      status: "critical" as const,
      demand: 98,
      stock: 12,
      lat: 40.7505,
      lng: -73.9934,
    },
  ]

  const displayStores = stores || fallbackStores

  const filteredStores = displayStores.filter((store) =>
    viewMode === "dark" ? store.type === "dark" : store.type === "fulfillment",
  )

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

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Store Network
            </CardTitle>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-blue-500" />}
            {error && (
              <Badge variant="destructive" className="text-xs">
                API Error
              </Badge>
            )}
            {!loading && !error && config.ui.showLastUpdated && lastUpdated && (
              <Badge variant="outline" className="text-xs">
                Updated {new Date(lastUpdated).toLocaleTimeString()}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={refresh}
              disabled={loading}
              className="h-8"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "dark" | "fulfillment")}>
              <TabsList>
                <TabsTrigger value="dark" className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Dark Stores ({displayStores.filter(s => s.type === "dark").length})
                </TabsTrigger>
                <TabsTrigger value="fulfillment" className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4" />
                  Fulfillment Centers ({displayStores.filter(s => s.type === "fulfillment").length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Simulated Map View */}
          <div className="lg:col-span-2">
            <div className="relative h-80 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-lg border-2 border-dashed border-blue-200 dark:border-slate-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 mx-auto text-blue-500" />
                  <p className="text-sm text-muted-foreground">Interactive Regional Heat Map</p>
                  <p className="text-xs text-muted-foreground">Click stores below to view details</p>
                </div>
              </div>

              {/* Simulated store markers */}
              <div className="absolute top-4 left-4 space-y-2">
                {filteredStores.slice(0, 3).map((store) => (
                  <div key={store.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(store.status)} animate-pulse`}></div>
                    <span className="text-xs font-medium">{store.name}</span>
                  </div>
                ))}
              </div>

              {/* Weather overlay indicator */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 rounded-lg p-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Rain Event Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Grid */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Store Status Grid</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredStores.map((store) => (
                <Card
                  key={store.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedStore === store.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
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

                    {selectedStore === store.id && (
                      <div className="mt-3 pt-3 border-t space-y-2">
                        <div className="text-xs space-y-1">
                          <div className="flex justify-between">
                            <span>Electronics:</span>
                            <span className="font-medium">78% stocked</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Groceries:</span>
                            <span className="font-medium">45% stocked</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Apparel:</span>
                            <span className="font-medium">92% stocked</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          View Shelf Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && config.ui.showErrorMessages && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">
              Unable to fetch real-time store data: {error}. Showing cached data.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
