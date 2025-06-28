"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sun,
  Zap,
  Brain,
  Activity,
  TrendingUp,
  Database,
  Wifi,
  LogOut,
  BarChart3,
  LineChart,
  Eye,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())
  const [userMode, setUserMode] = useState<"demo" | "admin">("demo")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Update time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString())
    }, 1000)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    // Check authentication
    const authToken = localStorage.getItem("authToken")
    const userInfo = localStorage.getItem("user")

    if (!authToken || !userInfo) {
      router.push("/")
      return
    }

    try {
      const user = JSON.parse(userInfo)
      if (user.authenticated) {
        setUserMode(user.mode || "demo")
        setIsAuthenticated(true)
      } else {
        router.push("/")
      }
    } catch (error) {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    router.push("/")
  }

  const navigateToRealTime = () => {
    router.push("/realtime")
  }

  const navigateToPredictive = () => {
    router.push("/predictive")
  }

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                  PV Monitor Pro
                </h1>
                <p className="text-xs text-gray-500">HTWK Laboratory - ENIS</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge
                variant="outline"
                className={userMode === "demo" ? "text-green-600 border-green-200" : "text-blue-600 border-blue-200"}
              >
                {userMode === "demo" ? <Eye className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                {userMode === "demo" ? "Demo Mode" : "Developer"}
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </Badge>
              <span className="text-sm text-gray-600">{currentTime}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {userMode === "demo" ? "Welcome to the Demo! 🌟" : "Welcome back, Maissa! 👋"}
          </h2>
          <p className="text-gray-600">
            {userMode === "demo"
              ? "Explore this photovoltaic monitoring platform with advanced AI-powered analytics"
              : "Monitor your photovoltaic systems with advanced AI-powered analytics"}
          </p>
          {userMode === "demo" && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                🎓 <strong>This is a graduation project demo</strong> - Developed by Maissa Rhaiem (ENIS) for HTWK
                Laboratory. All features are fully functional with simulated data.
              </p>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Current Power</p>
                  <p className="text-2xl font-bold">4.2 kW</p>
                </div>
                <Zap className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Daily Energy</p>
                  <p className="text-2xl font-bold">28.5 kWh</p>
                </div>
                <Activity className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Efficiency</p>
                  <p className="text-2xl font-bold">94.2%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">AI Accuracy</p>
                  <p className="text-2xl font-bold">97.8%</p>
                </div>
                <Brain className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Real-time Monitoring */}
          <Card
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-200"
            onClick={navigateToRealTime}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Real-time Data Monitoring</CardTitle>
                  <CardDescription>Live data from PV inverters {userMode === "demo" && "(Simulated)"}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Access live data streams from photovoltaic inverters including power generation, voltage levels,
                  current measurements, and system performance metrics.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600 font-medium">Live Updates</p>
                    <p className="text-xs text-gray-600">Every 2 seconds</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Data Points</p>
                    <p className="text-xs text-gray-600">15+ metrics</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group-hover:scale-105 transition-transform">
                  <Activity className="h-4 w-4 mr-2" />
                  View Real-time Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Predictive Analytics */}
          <Card
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200"
            onClick={navigateToPredictive}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:scale-110 transition-transform">
                  <LineChart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">AI Predictive Analytics</CardTitle>
                  <CardDescription>
                    Machine learning powered forecasts {userMode === "demo" && "(Demo)"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Advanced AI algorithms analyze historical data, weather patterns, and system performance to provide
                  accurate predictions for energy generation and maintenance needs.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Forecast Range</p>
                    <p className="text-xs text-gray-600">Up to 7 days</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">ML Models</p>
                    <p className="text-xs text-gray-600">Neural Networks</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 group-hover:scale-105 transition-transform">
                  <Brain className="h-4 w-4 mr-2" />
                  View AI Predictions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Information */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">👩‍🎓 Student Information</h4>
                <p className="text-sm text-gray-600">
                  <strong>Name:</strong> Maissa Rhaiem
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Institution:</strong> ENIS (École Nationale d'Ingénieurs de Sfax)
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Project Type:</strong> Graduation Project
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🔬 Laboratory</h4>
                <p className="text-sm text-gray-600">
                  <strong>Lab:</strong> HTWK Laboratory
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Focus:</strong> Renewable Energy & AI
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Technology:</strong> Next.js, TypeScript, AI
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🌐 Demo Status</h4>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Platform: Online</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Data Simulation: Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">AI Models: Operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

