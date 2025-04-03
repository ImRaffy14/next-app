"use client"

import React, { useState, useEffect } from 'react'
import NavDashboard from '@/components/NavDashboard'
import { useRouter } from "next/navigation"
import axios from "axios"
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react' // For loading state

const DashboardPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [taskInput, setTaskInput] = useState('')

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/api/auth/protected")
                if (response.status === 401) {
                    throw new Error("Unauthorized")
                }
            } catch (error) {
                console.error("Auth check failed:", error)
                router.push("/login")
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    const handleAddTask = async () => {
        try {
            // Add your task submission logic here
            console.log("Adding task:", taskInput)
            // await axios.post("/api/tasks", { task: taskInput })
            setTaskInput('')
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

    return (
        <div className='h-screen w-full bg-gray-50'>
            <div className='max-w-screen-2xl mx-auto'>
                <header className='bg-white shadow-sm'>
                    <NavDashboard />
                </header>
                
                <div className='flex flex-col items-center justify-center mt-8 px-4'>
                    <div className='w-full max-w-2xl'>
                        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Task Dashboard</h1>
                        
                        <div className='flex flex-col sm:flex-row gap-3 w-full'>
                            <Input
                                type="text"
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                placeholder='Add new task'
                                className='flex-1 h-12 px-4 text-base'
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                            />
                            <button 
                                onClick={handleAddTask}
                                className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 sm:w-auto w-full h-12'
                            >
                                Add Task
                            </button>
                        </div>

                        {/* Task list would go here */}
                        <div className='mt-8 space-y-3'>
                            {/* Example task item */}
                            <div className='bg-white p-4 rounded-lg shadow'>
                                <p>Example task item</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage