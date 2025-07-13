# GET /api/forecast - Sales Forecasting Data

## Request
```http
GET /api/forecast
```

## Response Schema
```typescript
interface ForecastResponse {
  data: ForecastData[]
  success: boolean
  timestamp: string
}

interface ForecastData {
  day: string                      // e.g., "Mon", "Tue"
  date: string                     // e.g., "Dec 18"
  sports: number                   // Sales forecast number
  travel: number
  essentials: number
  electronics?: number
  groceries?: number
  apparel?: number
  pharmacy?: number
  weather: "sunny" | "cloudy" | "rainy" | "stormy"
  events: string[]                 // e.g., ["Monsoon Alert", "Festival"]
  temperature: number              // e.g., 28 (Celsius)
  humidity?: number                // e.g., 65 (percentage)
  windSpeed?: number               // e.g., 12 (km/h)
  confidence: number               // 0-100 (forecast confidence)
  factors?: ForecastFactor[]       // Factors affecting forecast
}

interface ForecastFactor {
  name: string                     // e.g., "Weather Impact"
  impact: number                   // -100 to +100
  description: string
}
```

## Example Response
```json
{
  "data": [
    {
      "day": "Mon",
      "date": "Dec 18",
      "sports": 85,
      "travel": 45,
      "essentials": 120,
      "electronics": 65,
      "groceries": 200,
      "weather": "sunny",
      "events": [],
      "temperature": 28,
      "humidity": 60,
      "windSpeed": 8,
      "confidence": 87,
      "factors": [
        {
          "name": "Weather Impact",
          "impact": 15,
          "description": "Sunny weather increases outdoor activity"
        },
        {
          "name": "Day of Week",
          "impact": -5,
          "description": "Monday typically has lower sales"
        }
      ]
    },
    {
      "day": "Tue",
      "date": "Dec 19",
      "sports": 25,
      "travel": 15,
      "essentials": 180,
      "electronics": 40,
      "groceries": 160,
      "weather": "rainy",
      "events": ["Monsoon Alert"],
      "temperature": 24,
      "humidity": 85,
      "windSpeed": 15,
      "confidence": 92,
      "factors": [
        {
          "name": "Rain Impact",
          "impact": -60,
          "description": "Heavy rain reduces outdoor activities"
        },
        {
          "name": "Umbrella Demand",
          "impact": 120,
          "description": "High demand for rain protection items"
        }
      ]
    },
    {
      "day": "Wed",
      "date": "Dec 20",
      "sports": 30,
      "travel": 20,
      "essentials": 160,
      "electronics": 50,
      "groceries": 180,
      "weather": "cloudy",
      "events": ["Mid-week Sale"],
      "temperature": 26,
      "humidity": 70,
      "windSpeed": 10,
      "confidence": 78,
      "factors": [
        {
          "name": "Promotional Event",
          "impact": 25,
          "description": "Mid-week sale boosts demand"
        }
      ]
    },
    {
      "day": "Thu",
      "date": "Dec 21",
      "sports": 105,
      "travel": 42,
      "essentials": 95,
      "electronics": 80,
      "groceries": 190,
      "weather": "sunny",
      "events": [],
      "temperature": 29,
      "humidity": 55,
      "windSpeed": 6,
      "confidence": 85
    },
    {
      "day": "Fri",
      "date": "Dec 22",
      "sports": 130,
      "travel": 55,
      "essentials": 110,
      "electronics": 95,
      "groceries": 220,
      "weather": "sunny",
      "events": ["Weekend Prep"],
      "temperature": 30,
      "humidity": 50,
      "windSpeed": 5,
      "confidence": 90,
      "factors": [
        {
          "name": "Weekend Preparation",
          "impact": 35,
          "description": "Friday shopping for weekend activities"
        }
      ]
    },
    {
      "day": "Sat",
      "date": "Dec 23",
      "sports": 145,
      "travel": 65,
      "essentials": 160,
      "electronics": 110,
      "groceries": 250,
      "weather": "sunny",
      "events": ["Weekend Rush"],
      "temperature": 31,
      "humidity": 45,
      "windSpeed": 4,
      "confidence": 88
    },
    {
      "day": "Sun",
      "date": "Dec 24",
      "sports": 110,
      "travel": 48,
      "essentials": 135,
      "electronics": 85,
      "groceries": 200,
      "weather": "cloudy",
      "events": ["Christmas Eve"],
      "temperature": 27,
      "humidity": 65,
      "windSpeed": 8,
      "confidence": 82
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Field Descriptions
- **day**: Day of the week abbreviation
- **date**: Date in readable format
- **Category numbers**: Forecasted sales volume for each category
- **weather**: Weather condition affecting sales
- **events**: Special events or alerts affecting demand
- **temperature**: Temperature in Celsius
- **confidence**: Forecast accuracy confidence (0-100)
- **factors**: Specific factors influencing the forecast
