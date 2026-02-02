import Button from '@/components/ui/button'
import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Heading from '@/components/ui/heading'
import { registerUser } from '@/lib/actions'

import React from 'react'

const page = () => {
    return (
        <div className='w-screen h-screen flex items-center flex-col gap-3 pt-10 text-center'>
            <FormContainer variant='light'>
                <Heading className='font-anton text-black'>
                    Signup
                </Heading>
                <form action={registerUser}
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
        </div>
    )
}

export default page