# API Endpoints Reference

This document describes the expected API endpoints for the SmartRetail Twin Dashboard.

## Base URL
```
http://localhost:3001/api
```

## Endpoints

### Health Check
```
GET /health
```
**Response:**
```json
{
  "data": {
    "status": "ok"
  },
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Dashboard Overview
```
GET /dashboard
```
**Response:** Complete dashboard data including all KPIs, stores, forecasts, etc.

### KPIs
```
GET /kpis
```
**Response:**
```json
{
  "data": [
    {
      "title": "SKUs in Danger Zone",
      "value": "247",
      "total": "12,450",
      "percentage": 85,
      "type": "ring",
      "color": "text-red-600",
      "bgColor": "bg-red-50"
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Stores
```
GET /stores
GET /stores/:storeId
```
**Response:**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Store #4521",
      "type": "dark",
      "status": "critical",
      "demand": 95,
      "stock": 23,
      "lat": 40.7128,
      "lng": -74.006,
      "address": "123 Main St, New York, NY",
      "manager": "John Smith",
      "categories": {
        "electronics": {
          "stock": 12,
          "demand": 98,
          "trend": "up"
        }
      },
      "alerts": [
        {
          "type": "critical",
          "message": "Electronics critically low",
          "time": "5 min ago"
        }
      ]
    }
  ],
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Forecasting
```
GET /forecast/timeline
GET /forecast/categories
```

### War Room
```
GET /warroom/actions
```

### Maintenance
```
GET /maintenance/equipment
GET /logistics/trucks
```

## Data Types

### Store Status
- `critical`: Red indicator, immediate attention needed
- `warning`: Yellow indicator, monitoring required  
- `good`: Green indicator, operating normally

### Store Types
- `dark`: Regular retail store
- `fulfillment`: Distribution/fulfillment center

### Trend Values
- `up`: Increasing trend
- `down`: Decreasing trend
- `stable`: No significant change

## Error Responses

All endpoints should return errors in this format:
```json
{
  "data": null,
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Implementation Notes

1. All responses should include the `ApiResponse<T>` wrapper format
2. Timestamps should be in ISO 8601 format
3. The dashboard will poll these endpoints every 15-60 seconds
4. Implement proper CORS headers for browser access
5. Consider rate limiting for production use
