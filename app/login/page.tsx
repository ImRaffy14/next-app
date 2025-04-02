import React from 'react'
import Link from "next/link";
import LoginForm from '@/components/LoginForm';

const page = () => {
    return (
        <div className="h-screen w-full">
            <div className='flex flex-col items-center justify-center h-full'>
                <LoginForm />   
                <div className='mt-4'>
                    <p>Don't have an account? <Link href="/register" className='text-blue-500'>Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default page
