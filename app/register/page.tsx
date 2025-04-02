import React from 'react'
import Link from "next/link";
import SignupForm from '@/components/SignupForm';


const page = () => {

    return (
        <div className="h-screen w-full">
            <div className='flex flex-col items-center justify-center h-full'>
                <SignupForm/>
                <div>
                    <p className='mt-4'>Already have an account? <Link href="/login" className='text-blue-500'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default page
