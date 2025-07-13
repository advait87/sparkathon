// Schema parser utilities for chatbot responses

export function parseJsonFromResponse(response: any): any {
  // Handle array response format from n8n
  if (Array.isArray(response)) {
    const output = response[0]?.output || response[0]
    if (typeof output === 'string') {
      return parseJsonFromString(output)
    }
    return output
  }
  
  // Handle direct response
  if (typeof response === 'string') {
    return parseJsonFromString(response)
  }
  
  return response
}

export function parseJsonFromString(text: string): any {
  if (!text || typeof text !== 'string') {
    return null
  }

  // Clean the text first
  const cleanText = text.trim()

  try {
    // Try to parse the entire text as JSON first
    return JSON.parse(cleanText)
  } catch {
    try {
      // Look for JSON array in the text (more aggressive pattern)
      const arrayMatches = [
        cleanText.match(/\[[\s\S]*\]/s),
        cleanText.match(/```json\s*(\[[\s\S]*?\])\s*```/s),
        cleanText.match(/```\s*(\[[\s\S]*?\])\s*```/s),
        cleanText.match(/(\[[\s\S]*?\])/s)
      ]

      for (const match of arrayMatches) {
        if (match) {
          try {
            const jsonStr = match[1] || match[0]
            return JSON.parse(jsonStr)
          } catch (e) {
            continue
          }
        }
      }

      // Look for JSON object in the text
      const objectMatches = [
        cleanText.match(/\{[\s\S]*\}/s),
        cleanText.match(/```json\s*(\{[\s\S]*?\})\s*```/s),
        cleanText.match(/```\s*(\{[\s\S]*?\})\s*```/s),
        cleanText.match(/(\{[\s\S]*?\})/s)
      ]

      for (const match of objectMatches) {
        if (match) {
          try {
            const jsonStr = match[1] || match[0]
            return JSON.parse(jsonStr)
          } catch (e) {
            continue
          }
        }
      }

    } catch (e) {
      console.error('Failed to parse JSON from text:', e, 'Text preview:', text.substring(0, 200))
    }
  }

  return null
}

export function validateKPISchema(data: any): boolean {
  if (!Array.isArray(data)) return false
  
  return data.every(item => 
    typeof item === 'object' &&
    typeof item.title === 'string' &&
    typeof item.value === 'string' &&
    typeof item.type === 'string' &&
    typeof item.color === 'string' &&
    typeof item.bgColor === 'string'
  )
}

export function validateStoreSchema(data: any): boolean {
  if (!Array.isArray(data)) return false
  
  return data.every(item =>
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.type === 'string' &&
    typeof item.status === 'string' &&
    typeof item.lat === 'number' &&
    typeof item.lng === 'number'
  )
}

export function validateForecastSchema(data: any): boolean {
  if (!Array.isArray(data)) return false
  
  return data.every(item =>
    typeof item === 'object' &&
    typeof item.day === 'string' &&
    typeof item.date === 'string' &&
    typeof item.weather === 'string' &&
    Array.isArray(item.events)
  )
}

// Enhanced prompt builder with schema enforcement
export function buildSchemaPrompt(
  basePrompt: string,
  schema: object,
  requirements: string[] = []
): string {
  return `${basePrompt}

CRITICAL: You MUST respond with ONLY a valid JSON following this exact schema. Do not include any explanatory text, markdown formatting, or additional content.

JSON Schema:
${JSON.stringify(schema, null, 2)}

Requirements:
${requirements.map(req => `- ${req}`).join('\n')}

Respond with ONLY the JSON, no other text.`
}

// Example schemas
export const KPI_SCHEMA = [
  {
    "title": "string",
    "value": "string", 
    "total": "string (optional)",
    "percentage": "number (optional)",
    "change": "string (optional)",
    "trend": "up|down|stable (optional)",
    "unit": "string (optional)",
    "type": "ring|sparkline|badge|metric|percentage",
    "color": "text-{color}-600",
    "bgColor": "bg-{color}-50"
  }
]

export const STORE_SCHEMA = [
  {
    "id": "string",
    "name": "string",
    "type": "dark|fulfillment", 
    "status": "critical|warning|good",
    "demand": "number",
    "stock": "number",
    "lat": "number",
    "lng": "number",
    "address": "string",
    "manager": "string",
    "categories": {
      "sports": {"stock": "number", "demand": "number", "trend": "up|down|stable"},
      "travel": {"stock": "number", "demand": "number", "trend": "up|down|stable"},
      "essentials": {"stock": "number", "demand": "number", "trend": "up|down|stable"}
    },
    "alerts": [
      {"type": "critical|warning|info", "message": "string", "time": "string"}
    ]
  }
]

export const FORECAST_SCHEMA = [
  {
    "day": "string",
    "date": "string",
    "sports": "number",
    "travel": "number", 
    "essentials": "number",
    "weather": "sunny|cloudy|rainy",
    "events": ["string"],
    "temperature": "number"
  }
]
