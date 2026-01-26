import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Heading from '@/components/ui/heading'

import React from 'react'

const page = () => {
    return (
        <div className='w-screen h-screen flex items-center flex-col gap-3 pt-10 text-center'>
            <FormContainer variant='light'>
                <Heading className='font-anton text-black'>
                    Signup
                </Heading>
                <form action=""
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
                        name='confirm-password'
                        placeholder='confirm password'
                        variant='large' bg='dark' />
                </form>
            </FormContainer>
        </div>
    )
}

export default page