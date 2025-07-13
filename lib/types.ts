// Data types for the SmartRetail Twin Dashboard

export interface Store {
  id: string
  name: string
  type: "dark" | "fulfillment"
  status: "critical" | "warning" | "good"
  demand: number
  stock: number
  lat: number
  lng: number
  address?: string
  manager?: string
  categories?: {
    electronics: CategoryData
    groceries: CategoryData
    apparel: CategoryData
    pharmacy: CategoryData
  }
  alerts?: Alert[]
}

export interface CategoryData {
  stock: number
  demand: number
  trend: "up" | "down" | "stable"
}

export interface Alert {
  type: "critical" | "warning" | "info"
  message: string
  time: string
}

export interface KPIData {
  title: string
  value: string
  total?: string
  percentage?: number
  change?: string
  trend?: "up" | "down" | "stable"
  unit?: string
  type: "ring" | "sparkline" | "badge" | "metric"
  color: string
  bgColor: string
}

export interface ForecastData {
  day: string
  date: string
  electronics: number
  groceries: number
  apparel: number
  pharmacy: number
  weather: string
  events: string[]
  temperature: number
}

export interface CategoryForecast {
  category: string
  current: number
  forecast: number
  confidence: number
  trend: "up" | "down" | "stable"
}

export interface CriticalAction {
  id: number
  title: string
  impact: number
  urgency: number
  score: number
  category: "restock" | "weather" | "demand" | "maintenance"
  description: string
  confidence: number
  dataInputs: string[]
  actions: ActionButton[]
}

export interface ActionButton {
  label: string
  type: "primary" | "secondary" | "outline"
  icon: any // React component
}

export interface Equipment {
  id: number
  name: string
  type: "cooler" | "conveyor" | "forklift"
  health: number
  status: "good" | "warning" | "critical"
  temp?: string
  speed?: string
  battery?: string
  lastMaintenance: string
}

export interface Truck {
  id: number
  route: string
  eta: string
  delay: number
  risk: "low" | "medium" | "high"
  cargo: string
}

export interface DashboardData {
  stores: Store[]
  kpis: KPIData[]
  forecastData: ForecastData[]
  categoryForecasts: CategoryForecast[]
  criticalActions: CriticalAction[]
  equipment: Equipment[]
  trucks: Truck[]
  lastUpdated: string
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}
