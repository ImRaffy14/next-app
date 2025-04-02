"use client";

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface FormData {
    email: string;
    name: string;
    password: string;
}

const SignupForm = () => {

    const [formData, setFormData] = useState<FormData>({
        email: "",
        name: "",
        password: ""
    })

    const router = useRouter()

    // Submit FormData
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/api/auth/signup', formData )
                alert(response.data.message)
                router.push('/login')
        } catch (error) {
            if(axios.isAxiosError(error)) {
                if(error.response){
                    alert(`Error: ${error.response.data.error}`)
                }
            }
        }
    }

    return (
        <div className='bg-gray-300 p-10 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4'>Sign up</h1>
            <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email" className="mb-2">Email</Label>
                    <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value = {formData.email}
                    onChange = {(e) => setFormData({...formData, email: e.target.value})}
                    className='bg-white'
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="name" className="mb-2">Name</Label>
                    <Input 
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className='bg-white'
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="password" className="mb-2">Password</Label>
                    <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className='bg-white'
                    required
                    />
                </div>
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignupForm
