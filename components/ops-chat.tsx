"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OpsChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "🤖 AI Alert: Low stock detected in Electronics - Store #4521. Suggested action: Immediate restock from FC Dallas.",
      timestamp: "2:34 PM",
      actionable: true,
      action: "Create Restock Task",
    },
    {
      id: 2,
      type: "user",
      content: "What's causing the low-stock alerts in Dallas region?",
      timestamp: "2:35 PM",
      user: "Mike Chen",
    },
    {
      id: 3,
      type: "ai",
      content:
        "📊 Analysis: Dallas region alerts caused by: 1) 40% demand spike in electronics (social media trend), 2) Delayed truck from supplier (weather), 3) Higher than forecasted weekend sales. Confidence: 94%",
      timestamp: "2:35 PM",
      actionable: true,
      action: "View Detailed Analysis",
    },
    {
      id: 4,
      type: "user",
      content: "Approved the restock for Store #4521. ETA 4 hours.",
      timestamp: "2:38 PM",
      user: "Sarah Johnson",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user" as const,
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        user: "You",
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai" as const,
          content:
            "🤖 I'm analyzing your request. Based on current data patterns, I recommend checking inventory levels and recent sales velocity. Would you like me to generate a detailed report?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionable: true,
          action: "Generate Report",
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleCreateTask = (messageContent: string) => {
    // Simulate task creation
    const taskMessage = {
      id: messages.length + 1,
      type: "system" as const,
      content: `✅ Task created: "${messageContent.slice(0, 50)}..." assigned to Operations Team. Due: Today 6:00 PM`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages([...messages, taskMessage])
  }

  return (
    <Card className="glass-card border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Ops Chat - Store Network
          <Badge variant="outline" className="ml-auto bg-green-50 text-green-700">
            12 Active
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <ScrollArea className="h-64 w-full border rounded-lg p-4 bg-white/50 dark:bg-slate-800/50">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={`flex items-start gap-3 ${msg.type === "user" && msg.user === "You" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      className={`text-xs ${
                        msg.type === "ai"
                          ? "bg-blue-100 text-blue-700"
                          : msg.type === "system"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {msg.type === "ai" ? (
                        <Bot className="h-4 w-4" />
                      ) : msg.type === "system" ? (
                        "⚙️"
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`flex-1 space-y-1 ${msg.type === "user" && msg.user === "You" ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2">
                      {msg.type === "user" && (
                        <span className="text-xs font-medium text-muted-foreground">{msg.user}</span>
                      )}
                      {msg.type === "ai" && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                          AI Assistant
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`p-3 rounded-lg text-sm ${
                        msg.type === "ai"
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : msg.type === "system"
                            ? "bg-gray-50 dark:bg-gray-800"
                            : msg.user === "You"
                              ? "bg-green-50 dark:bg-green-900/20"
                              : "bg-white dark:bg-slate-700"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {msg.actionable && (
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => handleCreateTask(msg.content)}>
                          {msg.action}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask AI about store operations..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSendMessage} size="sm">
            Send
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 text-xs">
          <Button variant="ghost" size="sm" onClick={() => setMessage("What's causing the low-stock alerts?")}>
            Stock Analysis
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMessage("Show me today's critical tasks")}>
            Critical Tasks
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMessage("Generate maintenance report")}>
            Maintenance Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
