"use client";
import React, { useState } from 'react'
import Button from '@/components/ui/button'
import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Heading from '@/components/ui/heading'
import { registerUser } from '@/lib/actions'
import { useForm } from "react-hook-form";
import { SignUpFormFields } from '@/lib/types';
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from '@/schemas/signupSchema';
import Message from '@/components/ui/message';

const SignupForm = () => {
    const [message, setMessage] = useState<string>("");
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted, } } = useForm<SignUpFormFields>({
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async (formData: SignUpFormFields) => {
        localStorage.setItem("verificationEmail", formData.email)
        await registerUser(formData)
    }
    return (
        <FormContainer variant='light'>
            <Heading className='font-anton text-black'>
                Signup
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}
                className='flex items-center flex-col gap-3'>
                <div className='flex items-center flex-col gap-1.5'>
                    <FormField
                        type='text'
                        //name='username'
                        {...register("username")}
                        placeholder='username'
                        variant='large' bg='dark' />
                    <Message variant='error' content={errors.username?.message} />
                </div>
                <div className='flex items-center flex-col gap-1.5'>
                    <FormField
                        type='email'
                        //name='email'
                        {...register("email")}
                        placeholder='email'
                        variant='large' bg='dark' />
                    <Message variant='error' content={errors.email?.message} />
                </div>
                <div className='flex items-center flex-col gap-1.5'>
                    <FormField
                        type='text'
                        //name='password'
                        {...register("password")}
                        placeholder='password'
                        variant='large' bg='dark' />
                    <Message variant='error' content={errors.password?.message} />
                </div>
                <div className='flex items-center flex-col gap-1.5'>
                    <FormField
                        type='text'
                        //name='confirmPassword'
                        {...register("confirmPassword")}
                        placeholder='confirm password'
                        variant='large' bg='dark' />
                    <Message variant='error' content={errors.confirmPassword?.message} />
                </div>
                <Button type='submit' variant='default'
                    className={`border-2 border-black ${isSubmitting ? "opacity-90" : "opacity-100"}`}
                    disabled={isSubmitting}>
                    {isSubmitting ? "Loading" : "Submit"}
                </Button>
            </form>
        </FormContainer>
    )
}

export default SignupForm