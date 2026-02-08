"use client";
import Heading from '@/components/ui/heading';
import { useSearchParams } from 'next/navigation'
import React from 'react'

const VerifyUser = () => {
    const searchParams = useSearchParams();
    const token: string = searchParams.get("token") || "";
    if (!token) {
        return (<div>
            <Heading variant='md'
                className='text-red-500' >
                No token found!
            </Heading>
        </div>)
    }
    return (
        <div>

        </div>
    )
}

export default VerifyUser