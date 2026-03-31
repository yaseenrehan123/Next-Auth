"use client";
import Heading from '@/components/ui/heading';
import { useSession } from 'next-auth/react';
import React from 'react'

const ProfileDetails = () => {
    const { data: session, status } = useSession();

    if (status === "unauthenticated") {
        return <div>User Not Logged In</div>
    }
    return (
        <div className='flex items-center flex-col gap-4'>
            <div className='flex  gap-2   w-screen'>
                <Heading variant='md'>{"Id:" + session?.user.id}</Heading>
            </div>
            <div className='flex  gap-2   w-screen'>
                <Heading variant='md'>{"Username:" + session?.user.name}</Heading>
            </div>
            <div className='flex  gap-2   w-screen'>
                <Heading variant='md'>{"Email:" + session?.user.email}</Heading>
            </div>
            <div className='flex  gap-2   w-screen'>
                <Heading variant='md'>{"CreatedAt:" + session?.user.createdAt}</Heading>
            </div>
            <div className='flex  gap-2   w-screen'>
                <Heading variant='md'>{"UpdatedAt:" + session?.user.updatedAt}</Heading>
            </div>
        </div>
    )
}

export default ProfileDetails