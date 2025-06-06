"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users, LayoutDashboard, Settings, LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "Admin User")
    setUserEmail(localStorage.getItem("userEmail") || "admin@example.com")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/login")
  }

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                )}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-gray-700 p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <User className="h-8 w-8 text-gray-400" />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-gray-400">{userEmail}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-white">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
