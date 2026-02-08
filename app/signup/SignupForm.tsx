"use client";
import React from 'react'
import Button from '@/components/ui/button'
import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Heading from '@/components/ui/heading'
import { registerUser } from '@/lib/actions'

const SignupForm = () => {
    const onClick = async (formData: FormData) => {
        localStorage.setItem("verificationEmail", formData.get("email") as string || "")
        await registerUser(formData)

    }
    return (
        <FormContainer variant='light'>
            <Heading className='font-anton text-black'>
                Signup
            </Heading>
            <form action={onClick}
                className='flex items-center flex-col gap-3'>
                <FormField
                    type='text'
                    name='username'
                    placeholder='username'
                    variant='large' bg='dark' />
                <FormField
                    type='email'
                    name='email'
                    placeholder='email'
                    variant='large' bg='dark' />
                <FormField
                    type='text'
                    name='password'
                    placeholder='password'
                    variant='large' bg='dark' />
                <FormField
                    type='text'
                    name='confirmPassword'
                    placeholder='confirm password'
                    variant='large' bg='dark' />
                <Button type='submit' variant='default'
                    className='border-2 border-black'>
                    Submit
                </Button>
            </form>
        </FormContainer>
    )
}

export default SignupForm