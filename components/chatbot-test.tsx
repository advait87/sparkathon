"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Loader2, Send, MessageSquare } from "lucide-react"
import { DashboardApiService } from "@/lib/api-service"

export function ChatbotTest() {
  const [cacheStatus, setCacheStatus] = useState<{cached: boolean; age: number} | null>(null)
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testPrompts = [
    "What data do you have access to?",
    "Based on product data (Cricket bat: 70% stock, Water Bottle: 40% stock, Umbrella: 80% stock), how many are below 50% stock?",
    "What's the weather trend in Bangalore affecting umbrella sales?",
    `Return KPI data as JSON array starting with [ and ending with ]: [{"title": "SKUs in Danger Zone", "value": "1"}]`,
    `Return 2 Bangalore stores as JSON array: [{"id": "1", "name": "Store #001 - Koramangala", "status": "good"}]`
  ]

  const handleSubmit = async (testPrompt?: string) => {
    const promptToUse = testPrompt || prompt
    if (!promptToUse.trim()) return

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      // Direct API call to test the chatbot
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const result = await fetch('https://n8n-oayd.onrender.com/webhook/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptToUse,
          format: 'json',
          context: 'smartretail_dashboard'
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!result.ok) {
        throw new Error(`HTTP ${result.status}: ${result.statusText}`)
      }

      const data = await result.json()

      // Try to parse JSON if it's in the response
      if (Array.isArray(data) && data[0]?.output) {
        const output = data[0].output

        // Import the parser function
        const parseJsonFromString = (text: string) => {
          try {
            return JSON.parse(text.trim())
          } catch {
            const arrayMatch = text.match(/\[[\s\S]*\]/s)
            if (arrayMatch) {
              return JSON.parse(arrayMatch[0])
            }
            const objectMatch = text.match(/\{[\s\S]*\}/s)
            if (objectMatch) {
              return JSON.parse(objectMatch[0])
            }
            return null
          }
        }

        try {
          const parsed = parseJsonFromString(output)
          if (parsed) {
            setResponse({
              parsed_json: parsed,
              raw_response: data,
              output_text: output
            })
          } else {
            setResponse({
              raw_response: data,
              output_text: output,
              parse_error: "Could not extract JSON"
            })
          }
        } catch (e) {
          setResponse({
            raw_response: data,
            output_text: output,
            parse_error: e instanceof Error ? e.message : 'Unknown parse error'
          })
        }
      } else {
        setResponse(data)
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out after 30 seconds')
      } else {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    } finally {
      setLoading(false)
    }
  }

  const testKPIData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await DashboardApiService.getKPIs()
      setResponse(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Chatbot API Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick test buttons */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Quick Tests:</h4>
          <div className="flex flex-wrap gap-2">
            {testPrompts.map((testPrompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSubmit(testPrompt)}
                disabled={loading}
              >
                {testPrompt}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={testKPIData}
              disabled={loading}
              className="bg-blue-50"
            >
              Test KPI Service
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                DashboardApiService.clearCache()
                setCacheStatus(DashboardApiService.getCacheStatus())
              }}
              className="bg-yellow-50"
            >
              Clear Cache
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCacheStatus(DashboardApiService.getCacheStatus())}
              className="bg-green-50"
            >
              Check Cache
            </Button>
          </div>
        </div>

        {/* Custom prompt input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={loading}
          />
          <Button onClick={() => handleSubmit()} disabled={loading || !prompt.trim()}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>

        {/* Status */}
        {loading && (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Querying chatbot...</span>
          </div>
        )}

        {error && (
          <Badge variant="destructive" className="w-full justify-start">
            Error: {error}
          </Badge>
        )}

        {cacheStatus && (
          <div className="flex items-center gap-2">
            <Badge variant={cacheStatus.cached ? "default" : "outline"} className="text-xs">
              Cache: {cacheStatus.cached ? `Active (${Math.round(cacheStatus.age / 1000)}s old)` : 'Empty'}
            </Badge>
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Response:</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 max-h-96 overflow-auto">
              <pre className="text-xs whitespace-pre-wrap">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
