# GET /api/actions - Critical Actions

## Request
```http
GET /api/actions
```

## Response Schema
```typescript
interface ActionsResponse {
  data: CriticalAction[]
  success: boolean
  timestamp: string
}

interface CriticalAction {
  id: number
  title: string
  impact: number                   // 0-100 (business impact)
  urgency: number                  // 0-100 (time sensitivity)
  score: number                    // 0-100 (calculated priority score)
  category: "restock" | "weather" | "demand" | "maintenance" | "logistics" | "pricing"
  description: string
  confidence: number               // 0-100 (confidence in recommendation)
  dataInputs: string[]             // Data sources used for this action
  actions: ActionButton[]
  estimatedCost?: number           // Estimated cost in currency
  estimatedRevenue?: number        // Estimated revenue impact
  timeframe: string                // e.g., "Immediate", "Within 24h", "This week"
  affectedStores?: string[]        // Store IDs affected
  riskLevel: "low" | "medium" | "high"
  dependencies?: string[]          // Other actions this depends on
}

interface ActionButton {
  label: string                    // e.g., "Order Now", "Schedule"
  type: "primary" | "secondary" | "outline" | "danger"
  icon?: string                    // Icon name (optional)
  action?: string                  // Action identifier for API calls
}
```

## Example Response
```json
{
  "data": [
    {
      "id": 1,
      "title": "Restock Water Bottles",
      "impact": 85,
      "urgency": 90,
      "score": 87,
      "category": "restock",
      "description": "Water bottles critically low across stores. Current stock at 40% with high demand (92%) due to weather trends.",
      "confidence": 95,
      "dataInputs": ["Stock levels", "Weather trends", "Sales velocity", "Supplier availability"],
      "estimatedCost": 15000,
      "estimatedRevenue": 45000,
      "timeframe": "Immediate",
      "affectedStores": ["1", "3"],
      "riskLevel": "high",
      "actions": [
        {
          "label": "Order Now",
          "type": "primary",
          "icon": "shopping-cart",
          "action": "restock_immediate"
        },
        {
          "label": "Schedule Delivery",
          "type": "secondary",
          "icon": "calendar",
          "action": "schedule_restock"
        },
        {
          "label": "Find Alternative Supplier",
          "type": "outline",
          "icon": "search",
          "action": "find_supplier"
        }
      ]
    },
    {
      "id": 2,
      "title": "Monsoon Preparation",
      "impact": 75,
      "urgency": 70,
      "score": 72,
      "category": "weather",
      "description": "Increase umbrella and rain gear stock for upcoming monsoon season. Weather forecast shows 80% chance of rain.",
      "confidence": 88,
      "dataInputs": ["Weather forecast", "Trending topics", "Historical sales", "Seasonal patterns"],
      "estimatedCost": 8000,
      "estimatedRevenue": 25000,
      "timeframe": "Within 24h",
      "affectedStores": ["1", "2", "3"],
      "riskLevel": "medium",
      "actions": [
        {
          "label": "Increase Stock",
          "type": "primary",
          "icon": "trending-up",
          "action": "increase_umbrella_stock"
        },
        {
          "label": "Adjust Pricing",
          "type": "secondary",
          "icon": "dollar-sign",
          "action": "dynamic_pricing"
        }
      ]
    },
    {
      "id": 3,
      "title": "Equipment Maintenance Alert",
      "impact": 60,
      "urgency": 80,
      "score": 70,
      "category": "maintenance",
      "description": "Conveyor Belt B2 showing warning signs. Health score dropped to 65%. Preventive maintenance recommended.",
      "confidence": 92,
      "dataInputs": ["Equipment sensors", "Maintenance logs", "Performance metrics"],
      "estimatedCost": 5000,
      "estimatedRevenue": 0,
      "timeframe": "This week",
      "affectedStores": ["2"],
      "riskLevel": "medium",
      "dependencies": ["Schedule maintenance window"],
      "actions": [
        {
          "label": "Schedule Maintenance",
          "type": "primary",
          "icon": "tool",
          "action": "schedule_maintenance"
        },
        {
          "label": "Order Parts",
          "type": "secondary",
          "icon": "package",
          "action": "order_parts"
        },
        {
          "label": "Monitor Closely",
          "type": "outline",
          "icon": "eye",
          "action": "increase_monitoring"
        }
      ]
    },
    {
      "id": 4,
      "title": "Optimize Delivery Routes",
      "impact": 45,
      "urgency": 40,
      "score": 42,
      "category": "logistics",
      "description": "Current delivery routes showing 15-minute average delays. Route optimization could improve efficiency.",
      "confidence": 78,
      "dataInputs": ["GPS tracking", "Traffic patterns", "Delivery times", "Fuel costs"],
      "estimatedCost": 2000,
      "estimatedRevenue": 8000,
      "timeframe": "This week",
      "affectedStores": ["1", "2"],
      "riskLevel": "low",
      "actions": [
        {
          "label": "Optimize Routes",
          "type": "primary",
          "icon": "map",
          "action": "optimize_routes"
        },
        {
          "label": "Analyze Traffic",
          "type": "secondary",
          "icon": "activity",
          "action": "traffic_analysis"
        }
      ]
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Field Descriptions
- **impact**: Business impact score (revenue, customer satisfaction)
- **urgency**: Time sensitivity (how quickly action is needed)
- **score**: Overall priority score (calculated from impact + urgency)
- **category**: Type of action required
- **confidence**: AI confidence in the recommendation
- **dataInputs**: Data sources used to generate this recommendation
- **estimatedCost**: Expected cost to implement action
- **estimatedRevenue**: Expected revenue impact
- **timeframe**: When action should be taken
- **riskLevel**: Risk if action is not taken
- **dependencies**: Prerequisites for this action
