# GET /api/stores/:id - Individual Store Data

## Request
```http
GET /api/stores/1
```

## Response Schema
```typescript
interface SingleStoreResponse {
  data: Store  // Same Store interface as stores endpoint
  success: boolean
  timestamp: string
}

interface Store {
  id: string
  name: string
  type: "dark" | "fulfillment"
  status: "critical" | "warning" | "good"
  demand: number                   // 0-100
  stock: number                    // 0-100
  lat: number                      // Latitude
  lng: number                      // Longitude
  address?: string
  manager?: string
  categories?: {
    sports?: CategoryData
    travel?: CategoryData
    essentials?: CategoryData
    electronics?: CategoryData
    groceries?: CategoryData
    apparel?: CategoryData
    pharmacy?: CategoryData
  }
  alerts?: Alert[]
  // Additional detailed fields for single store
  operatingHours?: string
  lastInventoryUpdate?: string
  totalCapacity?: number
  utilizationRate?: number
  staffCount?: number
  monthlyRevenue?: number
  topProducts?: ProductInfo[]
}

interface CategoryData {
  stock: number                    // 0-100
  demand: number                   // 0-100
  trend: "up" | "down" | "stable"
  lastRestocked?: string
  averageTurnover?: number
}

interface Alert {
  type: "critical" | "warning" | "info"
  message: string
  time: string
  priority?: number
  actionRequired?: boolean
}

interface ProductInfo {
  id: string
  name: string
  category: string
  stock: number
  demand: number
  revenue: number
}
```

## Example Response
```json
{
  "data": {
    "id": "1",
    "name": "Store #001 - Koramangala",
    "type": "dark",
    "status": "warning",
    "demand": 78,
    "stock": 45,
    "lat": 12.9352,
    "lng": 77.6245,
    "address": "Koramangala, Bangalore",
    "manager": "Rajesh Kumar",
    "operatingHours": "24/7",
    "lastInventoryUpdate": "2024-01-15T08:30:00Z",
    "totalCapacity": 10000,
    "utilizationRate": 67,
    "staffCount": 12,
    "monthlyRevenue": 450000,
    "categories": {
      "sports": { 
        "stock": 70, 
        "demand": 85, 
        "trend": "up",
        "lastRestocked": "2024-01-14T10:00:00Z",
        "averageTurnover": 3.2
      },
      "travel": { 
        "stock": 40, 
        "demand": 92, 
        "trend": "up",
        "lastRestocked": "2024-01-13T14:30:00Z",
        "averageTurnover": 4.1
      },
      "essentials": { 
        "stock": 80, 
        "demand": 65, 
        "trend": "stable",
        "lastRestocked": "2024-01-15T06:00:00Z",
        "averageTurnover": 2.8
      }
    },
    "alerts": [
      {
        "type": "warning",
        "message": "Water bottles running low",
        "time": "15 min ago",
        "priority": 7,
        "actionRequired": true
      }
    ],
    "topProducts": [
      {
        "id": "P001",
        "name": "Water Bottle 500ml",
        "category": "essentials",
        "stock": 40,
        "demand": 92,
        "revenue": 15000
      },
      {
        "id": "P002",
        "name": "Cricket Bat Premium",
        "category": "sports",
        "stock": 70,
        "demand": 85,
        "revenue": 12000
      }
    ]
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```
