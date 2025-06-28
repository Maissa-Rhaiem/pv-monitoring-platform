"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  Calendar,
  Sun,
  CloudRain,
  CheckCircle,
  BarChart3,
  LineChart,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface PredictionData {
  date: string
  predictedPower: number
  confidence: number
  weather: string
  temperature: number
}

export default function PredictivePage() {
  const router = useRouter()
  const [predictions, setPredictions] = useState<PredictionData[]>([])
  const [modelAccuracy, setModelAccuracy] = useState(97.8)
  const [lastModelUpdate, setLastModelUpdate] = useState(new Date())
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication on page load
  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    const userInfo = localStorage.getItem("user")

    if (!authToken || !userInfo) {
      router.push("/")
      return
    }

    try {
      const user = JSON.parse(userInfo)
      if (user.authenticated) {
        setIsAuthenticated(true)
      } else {
        router.push("/")
      }
    } catch (error) {
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    if (!isAuthenticated) return

    // Simulate API data for predictions
    const generatePredictions = () => {
      const days = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"]
      const weatherConditions = ["Sunny", "Partly Cloudy", "Cloudy", "Rainy"]

      return days.map((day, index) => ({
        date: day,
        predictedPower: 25 + Math.random() * 15 + (index === 0 ? 5 : 0),
        confidence: 85 + Math.random() * 12,
        weather: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
        temperature: 20 + Math.random() * 15,
      }))
    }

    setPredictions(generatePredictions())
  }, [isAuthenticated])

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case "Sunny":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "Partly Cloudy":
        return <Sun className="h-4 w-4 text-orange-500" />
      case "Cloudy":
        return <Sun className="h-4 w-4 text-gray-500" />
      case "Rainy":
        return <CloudRain className="h-4 w-4 text-blue-500" />
      default:
        return <Sun className="h-4 w-4" />
    }
  }

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">AI Predictive Analytics</h1>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Authorized Access
              </Badge>
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                <Brain className="h-3 w-3 mr-1" />
                Model Accuracy: {modelAccuracy}%
              </Badge>
              <span className="text-sm text-gray-600">Updated: {lastModelUpdate.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Model Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Model Accuracy</p>
                  <p className="text-2xl font-bold">{modelAccuracy}%</p>
                  <p className="text-xs text-purple-200">Neural Network</p>
                </div>
                <Brain className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Predictions Generated</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-xs text-blue-200">This month</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Forecast Range</p>
                  <p className="text-2xl font-bold">7 Days</p>
                  <p className="text-xs text-green-200">High precision</p>
                </div>
                <Calendar className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Energy Predictions
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Models
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  7-Day Energy Production Forecast
                </CardTitle>
                <CardDescription>
                  AI-powered predictions based on weather data, historical performance, and system analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {predictions.map((prediction, index) => (
                    <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{prediction.date}</h4>
                            {getWeatherIcon(prediction.weather)}
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Predicted Energy:</span>
                              <span className="font-bold text-blue-600">
                                {prediction.predictedPower.toFixed(1)} kWh
                              </span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Confidence:</span>
                              <Badge variant="outline" className="text-xs">
                                {prediction.confidence.toFixed(1)}%
                              </Badge>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Weather:</span>
                              <span className="text-sm">{prediction.weather}</span>
                            </div>

                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Temp:</span>
                              <span className="text-sm">{prediction.temperature.toFixed(1)}°C</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Active AI Models
                  </CardTitle>
                  <CardDescription>Neural networks powering the energy predictions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Energy Prediction Model</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      LSTM Neural Network trained on 2 years of historical data
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500">Accuracy:</span>
                        <span className="font-medium ml-1">97.8%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Training:</span>
                        <span className="font-medium ml-1">Jan 15, 2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Weather Integration Model</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Advanced weather pattern analysis for forecasting</p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500">Accuracy:</span>
                        <span className="font-medium ml-1">95.4%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Training:</span>
                        <span className="font-medium ml-1">Jan 12, 2024</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Integration Status</CardTitle>
                  <CardDescription>External data sources for AI models</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-900">Weather API</p>
                      <p className="text-sm text-green-600">Connected - Real-time data</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-900">Historical Data</p>
                      <p className="text-sm text-green-600">Connected - 2 years of data</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-900">ML Pipeline</p>
                      <p className="text-sm text-green-600">Active - Processing predictions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

