"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Sun, Zap, Brain, Shield, Eye, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [accessMode, setAccessMode] = useState<"demo" | "admin">("demo")
  const router = useRouter()

  const handleDemoAccess = () => {
    setIsLoading(true)
    // Allow demo access without credentials
    setTimeout(() => {
      localStorage.setItem("authToken", "demo-access")
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: "demo@visitor",
          loginTime: new Date().toISOString(),
          authenticated: true,
          mode: "demo",
        }),
      )
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Admin credentials for developer
    const isAdmin = email === "maissa.rhaiem@enis.tn" && password === "HTWK2024!"

    setTimeout(() => {
      if (isAdmin) {
        localStorage.setItem("authToken", "admin-access")
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            loginTime: new Date().toISOString(),
            authenticated: true,
            mode: "admin",
          }),
        )
        setIsLoading(false)
        router.push("/dashboard")
      } else {
        alert("Invalid admin credentials")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
                PV Monitor Pro
              </h1>
            </div>
            <p className="text-xl text-gray-600">Advanced Photovoltaic Monitoring & AI Analytics Platform</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <Zap className="h-8 w-8 text-orange-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Real-time Data</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <Brain className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">AI Predictions</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <Shield className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">Public Demo</span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600 bg-white/30 p-4 rounded-lg">
            <p>
              <strong>🎓 Developed by:</strong> Maissa Rhaiem
            </p>
            <p>
              <strong>🏫 Institution:</strong> ENIS (École Nationale d'Ingénieurs de Sfax)
            </p>
            <p>
              <strong>🔬 Laboratory:</strong> HTWK Laboratory
            </p>
            <p>
              <strong>📋 Project:</strong> Graduation Project - PV Monitoring System
            </p>
            <p className="text-blue-600 font-medium">
              <strong>🌐 Public Demo:</strong> Available for everyone to explore
            </p>
          </div>
        </div>

        {/* Right side - Access Options */}
        <div className="space-y-4">
          {/* Demo Access Card */}
          <Card className="w-full max-w-md mx-auto shadow-2xl border-2 border-green-200 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-green-700 flex items-center justify-center gap-2">
                <Eye className="h-6 w-6" />
                Public Demo Access
              </CardTitle>
              <CardDescription>Explore the platform - No credentials required</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleDemoAccess}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg"
                disabled={isLoading && accessMode === "demo"}
              >
                {isLoading && accessMode === "demo" ? "Loading Demo..." : "🚀 Enter Demo Platform"}
              </Button>
              <p className="text-center text-sm text-gray-600 mt-3">✨ Full access to all features and interfaces</p>
            </CardContent>
          </Card>

          {/* Admin Access Card */}
          <Card className="w-full max-w-md mx-auto shadow-xl border border-gray-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-lg font-bold text-gray-700 flex items-center justify-center gap-2">
                <User className="h-5 w-5" />
                Developer Access
              </CardTitle>
              <CardDescription className="text-sm">For Maissa Rhaiem (Developer Only)</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Developer email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Developer password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-10 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-sm"
                  disabled={isLoading && accessMode === "admin"}
                  onClick={() => setAccessMode("admin")}
                >
                  {isLoading && accessMode === "admin" ? "Authenticating..." : "Admin Login"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="w-full max-w-md mx-auto bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-blue-900">🌟 Welcome Visitors!</h4>
                <p className="text-sm text-blue-700">
                  This is a live demonstration of a photovoltaic monitoring platform developed as a graduation project.
                  Feel free to explore all features!
                </p>
                <div className="flex justify-center gap-4 text-xs text-blue-600 mt-3">
                  <span>📊 Real-time Data</span>
                  <span>🤖 AI Predictions</span>
                  <span>📱 Responsive Design</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

