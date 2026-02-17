import Button from '@/components/ui/button'
import FormContainer from '@/components/ui/formContainer'
import FormField from '@/components/ui/formField'
import Heading from '@/components/ui/heading'
import { loginOAuth, loginUser } from '@/lib/actions'
import React from 'react'
import OAuthContainer from './OAuthContainer'

const LoginForm = () => {
    return (
        <FormContainer variant='light' >
            <Heading className='font-anton text-black'>
                Login
            </Heading>
            <form action={loginUser}
                className='flex items-center flex-col gap-3'>
                <FormField
                    name='email'
                    type='text'
                    placeholder='email'
                    variant='large' bg='dark' />
                <FormField
                    name='password'
                    type='text'
                    placeholder='password'
                    variant='large' bg='dark' />
                <Button type='submit'
                    className='border-2 border-black'>
                    Submit
                </Button>
            </form>
            <OAuthContainer />
        </FormContainer>
    )
}

export default LoginForm