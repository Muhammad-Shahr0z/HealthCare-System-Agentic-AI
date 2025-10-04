"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Bot,
  User,
  Send,
  AlertTriangle,
  Heart,
  Activity,
  Thermometer,
  Brain,
  Smile,
  Meh,
  Frown,
  Angry,
  Zap,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
  severity?: "low" | "medium" | "high"
}

interface MoodOption {
  emoji: React.ReactNode
  label: string
  value: string
  color: string
}

const moodOptions: MoodOption[] = [
  { emoji: <Smile className="h-6 w-6" />, label: "Great", value: "great", color: "text-green-500" },
  { emoji: <Meh className="h-6 w-6" />, label: "Okay", value: "okay", color: "text-yellow-500" },
  { emoji: <Frown className="h-6 w-6" />, label: "Not Good", value: "not-good", color: "text-orange-500" },
  { emoji: <Angry className="h-6 w-6" />, label: "Terrible", value: "terrible", color: "text-red-500" },
]

const commonSymptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Sore throat",
  "Stomach pain",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest pain",
  "Back pain",
]

export default function SymptomCheckerPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI health assistant. I can help you understand your symptoms and provide general health guidance. Please describe what you're experiencing, and I'll do my best to help. Remember, this is not a substitute for professional medical advice.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedMood, setSelectedMood] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    let response = ""
    let suggestions: string[] = []
    let severity: "low" | "medium" | "high" = "low"

    // Simple symptom analysis (in real app, this would use actual AI)
    if (lowerMessage.includes("headache")) {
      response =
        "I understand you're experiencing a headache. Headaches can have various causes including stress, dehydration, lack of sleep, or tension. Here are some general suggestions:"
      suggestions = [
        "Stay hydrated by drinking plenty of water",
        "Get adequate rest and sleep",
        "Try gentle neck and shoulder stretches",
        "Consider over-the-counter pain relief if appropriate",
      ]
      severity = "low"
    } else if (lowerMessage.includes("fever")) {
      response =
        "A fever indicates your body is fighting an infection. This could be viral or bacterial. It's important to monitor your temperature and other symptoms."
      suggestions = [
        "Rest and stay hydrated",
        "Monitor your temperature regularly",
        "Consider seeing a doctor if fever persists or is high",
        "Take fever-reducing medication if recommended",
      ]
      severity = "medium"
    } else if (lowerMessage.includes("chest pain")) {
      response =
        "Chest pain can be serious and should not be ignored. While it can have various causes, some require immediate medical attention."
      suggestions = [
        "Seek immediate medical attention if severe",
        "Call emergency services if accompanied by shortness of breath",
        "Avoid physical exertion until evaluated",
        "Consider visiting an emergency room",
      ]
      severity = "high"
    } else if (lowerMessage.includes("cough")) {
      response =
        "Coughs can be caused by various factors including infections, allergies, or irritants. Let me help you understand what might be causing it."
      suggestions = [
        "Stay hydrated with warm liquids",
        "Use a humidifier or breathe steam",
        "Avoid irritants like smoke",
        "Consider honey for soothing (not for children under 1 year)",
      ]
      severity = "low"
    } else {
      response =
        "Thank you for sharing your symptoms. Based on what you've described, I recommend monitoring your condition closely. Here are some general wellness tips:"
      suggestions = [
        "Stay hydrated and get plenty of rest",
        "Monitor your symptoms for any changes",
        "Consider consulting a healthcare professional",
        "Maintain a healthy diet and light exercise if possible",
      ]
      severity = "low"
    }

    return {
      id: Date.now().toString(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      suggestions,
      severity,
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSymptomClick = (symptom: string) => {
    setInputValue(symptom)
  }

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    const moodMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `My mood today is: ${mood}`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, moodMessage])

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: `Thank you for sharing your mood. Feeling ${mood} can affect your physical health too. How can I help you feel better today?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Brain className="h-12 w-12 text-blue-600" />
                <Activity className="h-6 w-6 text-green-500 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Symptom Checker</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Describe your symptoms and get personalized health insights powered by AI. Remember, this is for
              informational purposes only.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Mood Tracker */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    Mood Tracker
                  </CardTitle>
                  <CardDescription>How are you feeling today?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood.value}
                        variant={selectedMood === mood.value ? "default" : "outline"}
                        className={`flex flex-col items-center p-4 h-auto ${
                          selectedMood === mood.value ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50"
                        }`}
                        onClick={() => handleMoodSelect(mood.label)}
                      >
                        <div className={selectedMood === mood.value ? "text-white" : mood.color}>{mood.emoji}</div>
                        <span className="text-xs mt-1">{mood.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Common Symptoms */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Thermometer className="mr-2 h-5 w-5 text-orange-500" />
                    Common Symptoms
                  </CardTitle>
                  <CardDescription>Click to quickly add to your message</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {commonSymptoms.map((symptom) => (
                      <Badge
                        key={symptom}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                        onClick={() => handleSymptomClick(symptom)}
                      >
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="border-0 shadow-lg border-l-4 border-l-yellow-500">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Important Notice</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        This AI assistant provides general information only and is not a substitute for professional
                        medical advice, diagnosis, or treatment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            {/* Alternative Solution - Simple div with overflow */}
<div className="lg:col-span-3">
  <Card className="border-0 shadow-lg h-[600px] flex flex-col">
    <CardHeader className="border-b">
      <CardTitle className="flex items-center">
        <Bot className="mr-2 h-5 w-5 text-blue-600" />
        Health Assistant
      </CardTitle>
      <CardDescription>Chat with our AI to understand your symptoms</CardDescription>
    </CardHeader>

    {/* Simple div with overflow instead of ScrollArea */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
        >
          <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className={message.type === "bot" ? "bg-blue-100" : "bg-green-100"}>
                {message.type === "bot" ? (
                  <Bot className="h-4 w-4 text-blue-600" />
                ) : (
                  <User className="h-4 w-4 text-green-600" />
                )}
              </AvatarFallback>
            </Avatar>
            <div
              className={`rounded-lg p-3 ${
                message.type === "user" 
                  ? "bg-blue-600 text-white rounded-br-none" 
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm break-words">{message.content}</p>
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  <Separator className={message.type === "user" ? "bg-blue-400" : "bg-gray-300"} />
                  <p className="text-xs font-medium">Recommendations:</p>
                  <ul className="text-xs space-y-1">
                    {message.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span className="break-words">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                  {message.severity === "high" && (
                    <div className="flex items-center mt-2 p-2 bg-red-50 rounded border-l-2 border-red-500">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-xs text-red-700 font-medium">
                        Consider seeking immediate medical attention
                      </span>
                    </div>
                  )}
                </div>
              )}
              <p className={`text-xs opacity-70 mt-2 ${message.type === "user" ? "text-blue-200" : "text-gray-500"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-blue-100">
                <Bot className="h-4 w-4 text-blue-600" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>

    {/* Input */}
    <div className="border-t p-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Describe your symptoms..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
</div>
          </div>

          {/* Emergency Notice */}
          <Card className="mt-6 border-0 shadow-lg bg-red-50 border-l-4 border-l-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-900">Emergency Situations</h3>
                  <p className="text-sm text-red-800 mt-1">
                    If you're experiencing severe chest pain, difficulty breathing, severe bleeding, or any
                    life-threatening emergency, call emergency services immediately or visit the nearest emergency room.
                  </p>
                  <Button className="mt-3 bg-red-600 hover:bg-red-700" size="sm">
                    Emergency Services
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
