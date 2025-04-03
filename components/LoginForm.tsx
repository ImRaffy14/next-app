"use client";

import React from 'react'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react"

const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if(result?.error){
            alert("Invalid credentials")
            setIsLoading(false)
        }else{
            router.push("/dashboard")
        }
    }
  
    return (
        <div className='bg-gray-300 p-10 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <form className='flex flex-col space-y-4' onSubmit={handleLogin}>
                <div>
                    <Label htmlFor="email" className="mb-2">Email</Label>
                    <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='bg-white'/>
                </div>
                <div>
                    <Label htmlFor="password" className="mb-2">Password</Label>
                    <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='bg-white'/>
                </div>
                {isLoading ?
                <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
                </Button> 
                : 
                <Button type="submit">Login</Button> }
            </form>
        </div>
    )
}

export default LoginForm
