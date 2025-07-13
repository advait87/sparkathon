# Chatbot API Integration Guide

This guide explains how to set up real-time data integration using your n8n chatbot endpoint for the SmartRetail Twin Dashboard.

## Overview

The dashboard has been updated to work with your chatbot API using a **single comprehensive request** to reduce API load. It includes:

- ✅ **Single comprehensive request** to reduce API load
- ✅ **30-second caching** to minimize repeated requests
- ✅ **Real-time data hooks** with automatic polling
- ✅ **Error handling** and fallback to cached data
- ✅ **Loading states** and refresh controls
- ✅ **TypeScript interfaces** for type safety
- ✅ **Configurable refresh intervals**
- ✅ **Health monitoring** for API connectivity

## Quick Setup

### 1. Activate Your n8n Webhook

Your chatbot endpoint: `https://n8n-oayd.onrender.com/webhook/prompt`

**Important**: Make sure your n8n workflow is active or in test mode. The webhook needs to be running to receive requests.

### 2. Test the Integration

1. Start the dashboard: `npm run dev`
2. Go to **Settings** page in the sidebar
3. Use the **Chatbot API Test** component to verify connection
4. Try the quick test buttons or enter custom prompts

### 3. Request Format

The dashboard sends POST requests to your chatbot with this format:

```json
{
  "prompt": "Your question about retail data...",
  "format": "json",
  "context": "smartretail_dashboard"
}
```

### 4. Response Handling

Since your endpoint returns **plain strings**, the dashboard:
- ✅ **Parses JSON** from string responses automatically
- ✅ **Handles multiple formats** (plain JSON, markdown code blocks, mixed text)
- ✅ **Extracts arrays/objects** using regex patterns
- ✅ **Validates schemas** before using data in UI
- ✅ **Falls back gracefully** if parsing fails

### 4. Expected Data Types

Your chatbot should be able to provide data for:

**KPI Metrics:**
- SKUs in danger zone (count and percentage)
- Fill rate vs forecast
- Urgent alerts count
- Average restock lead time
- Forecast confidence

**Store Data:**
- Store locations and status
- Inventory levels by category
- Weather impacts
- Manager information

**Forecasting:**
- Sales predictions by category
- Weather impact on sales
- Special events affecting demand

**Critical Actions:**
- Restock recommendations
- Equipment maintenance alerts
- Demand spikes requiring response

## Features Implemented

### Real-Time Components Updated

- ✅ **KPI Bar** - Shows live metrics with refresh controls
- ✅ **Store Map** - Real-time store status and inventory
- 🔄 **Forecasting** - Timeline and category forecasts (next)
- 🔄 **War Room** - Critical actions and alerts (next)
- 🔄 **Maintenance** - Equipment and logistics data (next)

### Error Handling

- **Graceful degradation**: Shows cached/fallback data when API is unavailable
- **Retry logic**: Automatic retries with exponential backoff
- **User feedback**: Clear error messages and loading states
- **Health monitoring**: Connection status in header

### Configuration Options

Edit `lib/config.ts` to customize:

```typescript
export const config = {
  api: {
    baseUrl: 'your-api-url',
    timeout: 10000,
    retryAttempts: 3,
  },
  realtime: {
    kpiRefreshInterval: 15000,     // 15 seconds
    storeRefreshInterval: 20000,   // 20 seconds
    forecastRefreshInterval: 60000, // 1 minute
  },
  features: {
    enableRealtime: true,
    enableRetryOnError: true,
  }
}
```

## String Response Parsing

Since your chatbot returns **plain strings**, the dashboard includes robust JSON parsing:

### 📝 **Single Comprehensive Prompt:**

Instead of multiple requests, the dashboard now sends **one comprehensive request** that asks for all data:

```
"Based on product catalogue (Cricket bat: 70%, Water Bottle: 40%, Umbrella: 80%)
and Bangalore trending topics, provide complete dashboard data as JSON:

{
  "kpis": [{"title": "SKUs in Danger Zone", "value": "1", "type": "ring"}],
  "stores": [{"id": "1", "name": "Store #001 - Koramangala", "status": "good"}],
  "forecastData": [{"day": "Mon", "sports": 85, "weather": "sunny"}],
  "criticalActions": [{"id": 1, "title": "Restock Water Bottles"}],
  "equipment": [{"id": 1, "name": "Cooler Unit A1", "status": "good"}],
  "trucks": [{"id": 1, "route": "Bangalore-Koramangala", "eta": "2:30 PM"}]
}"
```

### 🔄 **Request Optimization:**
- ✅ **Single API call** instead of 6+ separate requests
- ✅ **30-second caching** prevents repeated requests
- ✅ **Automatic cache clearing** on manual refresh
- ✅ **Fallback data** if comprehensive request fails

### 🔧 **Automatic Parsing:**
The dashboard handles various response formats:
```
✅ Plain JSON: [{"title": "KPIs", "value": "123"}]
✅ With text: "Here are the KPIs: [{"title": "KPIs", "value": "123"}]"
✅ Code blocks: ```json [{"title": "KPIs"}] ```
✅ Mixed format: "Analysis shows [{"data": "value"}] based on trends"
```

## Testing

### 1. Test with Mock API

Start a simple mock server:

```bash
# Install json-server for quick testing
npm install -g json-server

# Create mock data file
echo '{"kpis": [], "stores": [], "health": {"status": "ok"}}' > mock-data.json

# Start mock server
json-server --watch mock-data.json --port 3001
```

### 2. Test Connection

1. Start your dashboard: `npm run dev`
2. Check the header for connection status
3. Use refresh buttons to test manual updates
4. Check browser console for any errors

### 3. Test Error Handling

1. Stop your API server
2. Observe fallback data and error messages
3. Restart API and verify reconnection

## Next Steps

1. **Set up your API endpoints** following the specification in `docs/api-endpoints.md`
2. **Update the API URL** in your `.env.local` file
3. **Test the connection** using the dashboard
4. **Customize refresh intervals** based on your needs
5. **Add more components** (forecasting, war room, maintenance)

## Troubleshooting

### Common Issues

**"API Error" badge showing:**
- Check if your API is running
- Verify the API URL in `.env.local`
- Check browser console for CORS errors

**Data not updating:**
- Verify API endpoints return correct format
- Check refresh intervals in config
- Look for JavaScript errors in console

**CORS errors:**
- Add CORS headers to your API
- For development, you can disable CORS in your API

### Debug Mode

Enable debug logging:

```bash
NEXT_PUBLIC_ENABLE_DEBUG=true
```

This will log API requests and responses to the browser console.

---

## 📋 **API Endpoint Schemas**

If you prefer to use traditional REST API endpoints instead of the chatbot, here are the complete schemas for all endpoints:

### **Base Response Format**
All endpoints follow this wrapper format:
```typescript
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: string
}
```

### **Error Response Format**
```json
{
  "data": null,
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

### **1. GET /api/stores - Store Network Data**

**Request:**
```http
GET /api/stores
```

**Response Schema:**
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

**Example Response:**
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
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### **2. GET /api/forecast - Sales Forecasting Data**

**Request:**
```http
GET /api/forecast
```

**Response Schema:**
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
  weather: "sunny" | "cloudy" | "rainy" | "stormy"
  events: string[]                 // e.g., ["Monsoon Alert"]
  temperature: number              // e.g., 28 (Celsius)
  confidence: number               // 0-100 (forecast confidence)
}
```

**Example Response:**
```json
{
  "data": [
    {
      "day": "Mon",
      "date": "Dec 18",
      "sports": 85,
      "travel": 45,
      "essentials": 120,
      "weather": "sunny",
      "events": [],
      "temperature": 28,
      "confidence": 87
    },
    {
      "day": "Tue",
      "date": "Dec 19",
      "sports": 25,
      "travel": 15,
      "essentials": 180,
      "weather": "rainy",
      "events": ["Monsoon Alert"],
      "temperature": 24,
      "confidence": 92
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### **3. GET /api/actions - Critical Actions**

**Request:**
```http
GET /api/actions
```

**Response Schema:**
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
  score: number                    // 0-100 (calculated priority)
  category: "restock" | "weather" | "demand" | "maintenance"
  description: string
  confidence: number               // 0-100 (confidence in recommendation)
  dataInputs: string[]             // Data sources used
  actions: ActionButton[]
  timeframe: string                // e.g., "Immediate", "Within 24h"
  riskLevel: "low" | "medium" | "high"
}

interface ActionButton {
  label: string                    // e.g., "Order Now"
  type: "primary" | "secondary" | "outline"
  icon?: string                    // Icon name (optional)
}
```

**Example Response:**
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
      "description": "Water bottles critically low across stores",
      "confidence": 95,
      "dataInputs": ["Stock levels", "Weather trends"],
      "timeframe": "Immediate",
      "riskLevel": "high",
      "actions": [
        {
          "label": "Order Now",
          "type": "primary",
          "icon": "shopping-cart"
        },
        {
          "label": "Schedule",
          "type": "secondary",
          "icon": "calendar"
        }
      ]
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### **4. GET /api/equipment - Equipment Status**

**Request:**
```http
GET /api/equipment
```

**Response Schema:**
```typescript
interface EquipmentResponse {
  data: Equipment[]
  success: boolean
  timestamp: string
}

interface Equipment {
  id: number
  name: string
  type: "cooler" | "conveyor" | "forklift"
  health: number                   // 0-100
  status: "good" | "warning" | "critical"
  temp?: string                    // e.g., "4°C" (for coolers)
  speed?: string                   // e.g., "1.2 m/s" (for conveyors)
  battery?: string                 // e.g., "85%" (for forklifts)
  lastMaintenance: string          // e.g., "2 days ago"
}
```

**Example Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Cooler Unit A1",
      "type": "cooler",
      "health": 85,
      "status": "good",
      "temp": "4°C",
      "lastMaintenance": "2 days ago"
    },
    {
      "id": 2,
      "name": "Conveyor Belt B2",
      "type": "conveyor",
      "health": 65,
      "status": "warning",
      "speed": "1.2 m/s",
      "lastMaintenance": "1 week ago"
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---





---

### **6. GET /api/stores/:id - Individual Store Data**

**Request:**
```http
GET /api/stores/1
```

**Response Schema:**
```typescript
interface SingleStoreResponse {
  data: Store  // Same Store interface as stores endpoint
  success: boolean
  timestamp: string
}
```

Returns detailed information for a specific store with the same structure as the stores endpoint.

---

## Support

If you need help:
1. Check the API endpoint specification in `docs/api-endpoints.md`
2. Review the TypeScript interfaces in `lib/types.ts`
3. Look at the example data structures in the fallback data
4. Test with the mock server setup above
