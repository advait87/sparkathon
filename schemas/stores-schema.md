# GET /api/stores - Store Network Data

## Request
```http
GET /api/stores
```

## Response Schema
```typescript
interface StoreResponse {
  data: Store[]
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
}

interface CategoryData {
  stock: number                    // 0-100
  demand: number                   // 0-100
  trend: "up" | "down" | "stable"
}

interface Alert {
  type: "critical" | "warning" | "info"
  message: string
  time: string                     // e.g., "15 min ago"
}
```

## Example Response
```json
{
  "data": [
    {
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
      "categories": {
        "sports": { "stock": 70, "demand": 85, "trend": "up" },
        "travel": { "stock": 40, "demand": 92, "trend": "up" },
        "essentials": { "stock": 80, "demand": 65, "trend": "stable" }
      },
      "alerts": [
        {
          "type": "warning",
          "message": "Water bottles running low",
          "time": "15 min ago"
        }
      ]
    },
    {
      "id": "2",
      "name": "Store #002 - Whitefield",
      "type": "dark",
      "status": "good",
      "demand": 65,
      "stock": 78,
      "lat": 12.9698,
      "lng": 77.7500,
      "address": "Whitefield, Bangalore",
      "manager": "Priya Sharma",
      "categories": {
        "sports": { "stock": 75, "demand": 60, "trend": "stable" },
        "travel": { "stock": 55, "demand": 70, "trend": "up" },
        "essentials": { "stock": 85, "demand": 50, "trend": "down" }
      },
      "alerts": []
    },
    {
      "id": "3",
      "name": "FC Bangalore Central",
      "type": "fulfillment",
      "status": "critical",
      "demand": 95,
      "stock": 25,
      "lat": 12.9716,
      "lng": 77.5946,
      "address": "Central Bangalore",
      "manager": "Amit Patel",
      "categories": {
        "sports": { "stock": 30, "demand": 98, "trend": "up" },
        "travel": { "stock": 20, "demand": 95, "trend": "up" },
        "essentials": { "stock": 25, "demand": 90, "trend": "up" }
      },
      "alerts": [
        {
          "type": "critical",
          "message": "Multiple items critically low",
          "time": "5 min ago"
        }
      ]
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Field Descriptions
- **id**: Unique store identifier
- **name**: Store display name with location
- **type**: Store type (dark store or fulfillment center)
- **status**: Overall store health status
- **demand**: Current demand level (0-100)
- **stock**: Current stock level (0-100)
- **lat/lng**: GPS coordinates for mapping
- **address**: Full store address
- **manager**: Store manager name
- **categories**: Stock and demand by product category
- **alerts**: Current alerts and notifications
