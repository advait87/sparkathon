// Configuration for SmartRetail Twin Dashboard

export const config = {
  api: {
    // Chatbot API endpoint
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://n8n-oayd.onrender.com/webhook/prompt',
    timeout: 30000, // Longer timeout for chatbot responses
    retryAttempts: 2, // Fewer retries for chatbot
    retryDelay: 2000,
  },
  
  realtime: {
    // Adjusted refresh intervals for chatbot API
    defaultRefreshInterval: 60000, // 1 minute (slower for chatbot)
    kpiRefreshInterval: 45000,     // 45 seconds for KPIs
    storeRefreshInterval: 60000,   // 1 minute for store data
    forecastRefreshInterval: 120000, // 2 minutes for forecasts
    maintenanceRefreshInterval: 90000, // 1.5 minutes for maintenance
    healthCheckInterval: 120000,   // 2 minutes for health checks
  },
  
  features: {
    enableRealtime: true,
    enableWebSocket: false, // Set to true if your API supports WebSocket
    enableRetryOnError: true,
    enableOfflineMode: false,
  },
  
  ui: {
    showLoadingStates: true,
    showLastUpdated: true,
    showErrorMessages: true,
    autoRefreshOnFocus: true,
  }
}

// Environment-specific overrides
if (process.env.NODE_ENV === 'development') {
  config.realtime.defaultRefreshInterval = 30000 // Reasonable refresh in dev for chatbot
  config.api.timeout = 30000 // Longer timeout in dev for chatbot
}

if (process.env.NODE_ENV === 'production') {
  config.features.enableRetryOnError = true
  config.features.enableOfflineMode = true
}
