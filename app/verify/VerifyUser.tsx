"use client";
import Heading from '@/components/ui/heading';
import { useSearchParams } from 'next/navigation'
import { useMutation } from "@tanstack/react-query"
import React, { useEffect, useState } from 'react'
import { verifyUser } from '@/lib/actions';
import { VerifyUserProps } from '@/lib/types';
import Message from '@/components/ui/message';
import { useRouter } from 'next/navigation';

const VerifyUser = () => {
    const searchParams = useSearchParams();
    const token: string = searchParams.get("token") || "";
    const [email, setEmail] = useState<string>("");
    const router = useRouter();

    const { isError, isPending, isSuccess, error, mutateAsync } = useMutation({
        mutationKey: ["verifyUser"],
        mutationFn: async (data: VerifyUserProps) => {
            return await verifyUser(data);
        },
        onSuccess: () => {
            localStorage.removeItem("verificationEmail");
            router.push('/')
        }
    });

    useEffect(() => {
        const email: string = localStorage.getItem("verificationEmail") || "";
        setEmail(email);
    }, []);

    useEffect(() => {
        console.log("TOKEN:", token);
        console.log("EMAIL:", email);
        if (!token || !email) return;
        mutateAsync({
            token,
            email
        });

    }, [token, email])

    return (
        <div className='w-screen h-screen flex items-center flex-col gap-3 pt-10 text-center'>
            {isPending && <Message variant='loading' content={'Verifying...'} />}
            {isError && <Message variant='error' content={error.message} />}
            {isSuccess && <Message variant='success' content={'Success!'} />}
        </div>
    )
}

export default VerifyUser