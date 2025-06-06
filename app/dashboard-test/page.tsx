"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield, Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Input } from "@/components/ui/input"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [taskInput, setTaskInput] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = localStorage.getItem("isAuthenticated")
        if (isAuthenticated !== "true") {
          throw new Error("Unauthorized")
        }
        setUserName(localStorage.getItem("userName") || "Admin User")
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      return response.json()
    },
    enabled: !loading, // Only fetch when auth check is complete
  })

  const handleAddTask = async () => {
    try {
      console.log("Adding task:", taskInput)
      // Add your task submission logic here
      // await axios.post("/api/tasks", { task: taskInput })
      setTaskInput("")
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    )
  }

  const activeUsers = users.filter((u: any) => u.status === "active").length
  const inactiveUsers = users.filter((u: any) => u.status === "inactive").length
  const adminUsers = users.filter((u: any) => u.role === "admin").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {userName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">Registered users in the system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveUsers}</div>
            <p className="text-xs text-muted-foreground">Inactive user accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminUsers}</div>
            <p className="text-xs text-muted-foreground">Users with admin privileges</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Task Management</CardTitle>
          <CardDescription>Add and manage your tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
            <Input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add new task"
              className="flex-1 h-12 px-4 text-base"
              onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 sm:w-auto w-full h-12"
            >
              Add Task
            </button>
          </div>

          {/* Task list */}
          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-600">Example task item - Replace with your task list</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity and Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">User role updated</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System maintenance completed</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <span className="text-sm text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Services</span>
                <span className="text-sm text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Authentication</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-sm text-yellow-600">Warning</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
