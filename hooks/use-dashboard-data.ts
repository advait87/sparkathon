// Real-time data hooks for SmartRetail Twin Dashboard

import { useState, useEffect, useCallback, useRef } from 'react'
import { DashboardApiService, ApiError } from '@/lib/api-service'
import { 
  DashboardData, 
  Store, 
  KPIData, 
  ForecastData, 
  CategoryForecast,
  CriticalAction,
  Equipment,
  Truck 
} from '@/lib/types'

interface UseDataOptions {
  refreshInterval?: number // in milliseconds
  enabled?: boolean
  retryOnError?: boolean
}

interface DataState<T> {
  data: T | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

// Generic hook for data fetching with real-time updates
function useRealtimeData<T>(
  fetchFunction: () => Promise<T>,
  options: UseDataOptions = {}
): DataState<T> & { refresh: () => Promise<void> } {
  const {
    refreshInterval = 30000, // 30 seconds default
    enabled = true,
    retryOnError = true
  } = options

  const [state, setState] = useState<DataState<T>>({
    data: null,
    loading: true,
    error: null,
    lastUpdated: null
  })

  const intervalRef = useRef<NodeJS.Timeout>()
  const retryTimeoutRef = useRef<NodeJS.Timeout>()

  const fetchData = useCallback(async () => {
    if (!enabled) return

    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      const data = await fetchFunction()
      setState({
        data,
        loading: false,
        error: null,
        lastUpdated: new Date()
      })
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'An unexpected error occurred'
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }))

      // Retry on error with exponential backoff
      if (retryOnError && error instanceof ApiError && error.status !== 404) {
        retryTimeoutRef.current = setTimeout(() => {
          fetchData()
        }, 5000)
      }
    }
  }, [fetchFunction, enabled, retryOnError])

  const refresh = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    if (!enabled) return

    // Initial fetch
    fetchData()

    // Set up polling
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(fetchData, refreshInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [fetchData, refreshInterval, enabled])

  return { ...state, refresh }
}

// Specific hooks for different data types
export function useDashboardData(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getDashboardData, options)
}

export function useStores(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getStores, options)
}

export function useKPIs(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getKPIs, options)
}

export function useForecastData(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getForecastData, options)
}

export function useCategoryForecasts(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getCategoryForecasts, options)
}

export function useCriticalActions(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getCriticalActions, options)
}

export function useEquipment(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getEquipment, options)
}

export function useTrucks(options?: UseDataOptions) {
  return useRealtimeData(DashboardApiService.getTrucks, options)
}

// Hook for specific store data
export function useStore(storeId: string, options?: UseDataOptions) {
  return useRealtimeData(
    () => DashboardApiService.getStore(storeId), 
    options
  )
}

// Hook for API health status
export function useApiHealth(options?: UseDataOptions) {
  return useRealtimeData(
    DashboardApiService.healthCheck, 
    { refreshInterval: 60000, ...options }
  )
}

// Combined hook for dashboard overview
export function useDashboardOverview(options?: UseDataOptions) {
  const stores = useStores(options)
  const kpis = useKPIs(options)
  const criticalActions = useCriticalActions(options)
  const equipment = useEquipment(options)
  const trucks = useTrucks(options)

  const loading = stores.loading || kpis.loading || criticalActions.loading || 
                  equipment.loading || trucks.loading
  
  const error = stores.error || kpis.error || criticalActions.error || 
                equipment.error || trucks.error

  const refresh = useCallback(async () => {
    await Promise.all([
      stores.refresh(),
      kpis.refresh(),
      criticalActions.refresh(),
      equipment.refresh(),
      trucks.refresh()
    ])
  }, [stores.refresh, kpis.refresh, criticalActions.refresh, equipment.refresh, trucks.refresh])

  return {
    data: {
      stores: stores.data || [],
      kpis: kpis.data || [],
      criticalActions: criticalActions.data || [],
      equipment: equipment.data || [],
      trucks: trucks.data || []
    },
    loading,
    error,
    lastUpdated: Math.max(
      stores.lastUpdated?.getTime() || 0,
      kpis.lastUpdated?.getTime() || 0,
      criticalActions.lastUpdated?.getTime() || 0,
      equipment.lastUpdated?.getTime() || 0,
      trucks.lastUpdated?.getTime() || 0
    ),
    refresh
  }
}
