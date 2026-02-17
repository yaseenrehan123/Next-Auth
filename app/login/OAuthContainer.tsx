"use client";
import Button from '@/components/ui/button';
import { loginOAuth } from '@/lib/actions';
import React from 'react'

const OAuthContainer = () => {
    return (
        <div className='flex items-center flex-col gap-2'>
            <Button className='border-2 border-black w-40'
                onClick={() => loginOAuth("google")}>
                Sign In With Google
            </Button>
        </div>
    )
}

export default OAuthContainer