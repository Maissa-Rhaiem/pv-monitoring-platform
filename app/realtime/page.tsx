"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Zap,
  Thermometer,
  Gauge,
  Battery,
  Sun,
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Shield,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface RealTimeData {
  power: number
  voltage: number
  current: number
  temperature: number
  efficiency: number
  dailyEnergy: number
  irradiance: number
  frequency: number
}

export default function RealTimePage() {
  const router = useRouter()
  const [data, setData] = useState<RealTimeData>({
    power: 4200,
    voltage: 240.5,
    current: 17.5,
    temperature: 45.2,
    efficiency: 94.2,
    dailyEnergy: 28.5,
    irradiance: 850,
    frequency: 50.1,
  })
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
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

  // Simulate real-time data updates
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(() => {
      setData((prev) => ({
        power: prev.power + (Math.random() - 0.5) * 200,
        voltage: prev.voltage + (Math.random() - 0.5) * 5,
        current: prev.current + (Math.random() - 0.5) * 2,
        temperature: prev.temperature + (Math.random() - 0.5) * 3,
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
        dailyEnergy: prev.dailyEnergy + Math.random() * 0.1,
        irradiance: Math.max(0, prev.irradiance + (Math.random() - 0.5) * 50),
        frequency: prev.frequency + (Math.random() - 0.5) * 0.2,
      }))
      setLastUpdate(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value < min || value > max) return "text-red-500"
    if (value < min * 1.1 || value > max * 0.9) return "text-yellow-500"
    return "text-green-500"
  }

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying secure access...</p>
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Real-time Monitoring</h1>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Secure Session
              </Badge>
              <Badge variant={isConnected ? "default" : "destructive"} className="bg-green-500">
                {isConnected ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
              <span className="text-sm text-gray-600">Last update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Current Power</p>
                  <p className="text-2xl font-bold">{data.power.toFixed(0)} W</p>
                  <p className="text-xs text-orange-200">Target: 1100W</p>
                </div>
                <Zap className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Voltage</p>
                  <p className="text-2xl font-bold">{data.voltage.toFixed(1)} V</p>
                  <p className="text-xs text-blue-200">Range: 200-2..V</p>
                </div>
                <Gauge className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Current</p>
                  <p className="text-2xl font-bold">{data.current.toFixed(1)} A</p>
                  <p className="text-xs text-green-200">Max: 5.3 A</p>
                </div>
                <Activity className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Efficiency</p>
                  <p className="text-2xl font-bold">{data.efficiency.toFixed(1)}%</p>
                  <p className="text-xs text-purple-200">Optimal: &gt;90%</p>
                </div>
                <Battery className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Environmental Conditions
              </CardTitle>
              <CardDescription>Temperature and solar irradiance data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Produced Power</span>
                  <span className={`text-sm font-bold ${getStatusColor(data.temperature, 20, 60)}`}>
                    {data.temperature.toFixed(1)}°C
                  </span>
                </div>
                <Progress value={(data.temperature / 80) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Optimal range: 20-60°C</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Solar Irradiance</span>
                  <span className={`text-sm font-bold ${getStatusColor(data.irradiance, 200, 1200)}`}>
                    {data.irradiance.toFixed(0)} W/m²
                  </span>
                </div>
                <Progress value={(data.irradiance / 1200) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Peak conditions: 800-1200 W/m²</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                System Performance
              </CardTitle>
              <CardDescription>Daily energy production and system health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Daily Energy Production</span>
                  <span className="text-sm font-bold text-green-600">{data.dailyEnergy.toFixed(1)} kWh</span>
                </div>
                <Progress value={(data.dailyEnergy / 40) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Daily target: 35 kWh</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Grid Frequency</span>
                  <span className={`text-sm font-bold ${getStatusColor(data.frequency, 49.5, 50.5)}`}>
                    {data.frequency.toFixed(1)} Hz
                  </span>
                </div>
                <Progress value={((data.frequency - 49) / 2) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">Standard: 50 ± 0.5 Hz</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Secure API Connection Status
            </CardTitle>
            <CardDescription>Real-time data feed from inverter systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium text-green-900">Inverter API</p>
                  <p className="text-sm text-green-600">Connected - 2s refresh</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium text-green-900">Weather API</p>
                  <p className="text-sm text-green-600">Connected - 5min refresh</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Activity className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-medium text-blue-900">Data Processing</p>
                  <p className="text-sm text-blue-600">Active - Real-time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
