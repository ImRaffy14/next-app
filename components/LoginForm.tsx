"use client";

import React from 'react'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
    return (
        <div className='bg-gray-300 p-10 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <form className='flex flex-col space-y-4'>
                <div>
                    <Label htmlFor="email" className="mb-2">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" className='bg-white'/>
                </div>
                <div>
                    <Label htmlFor="password" className="mb-2">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" className='bg-white'/>
                </div>
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}

export default LoginForm
