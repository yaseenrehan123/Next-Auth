"use client";
import Button from '@/components/ui/button';
import FormField from '@/components/ui/formField';
import Heading from '@/components/ui/heading';
import Message from '@/components/ui/message';
import { setProfileData } from '@/lib/actions';
import { EditProfileFields } from '@/lib/types';
import editProfileSchema from '@/schemas/editProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const ProfileDetails = () => {
    const { data: session, status } = useSession();
    const [editing, setEditing] = useState<boolean>(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm<EditProfileFields>({
        resolver: zodResolver(editProfileSchema),
        mode: "onChange"
    });
    if (status === "unauthenticated") {
        return <div>User Not Logged In</div>
    }
    const onConfirm = async (formData: EditProfileFields) => {
        console.log("EDIT FORM SUBMIT!")
        await setProfileData(formData);
        setEditing(false);
        reset()
    }
    return (
        <form className='flex items-center flex-col gap-4'
            onSubmit={handleSubmit(onConfirm, (errors) => console.log(errors))}>
            <div className='flex  gap-2   w-screen'>
                <Heading variant='md'>{"Id:" + session?.user.id}</Heading>
            </div>
            <div className='flex  gap-2   w-screen'>
                {editing ?
                    <div className='flex items-center flex-col gap-2'>
                        <FormField
                            placeholder='Username' defaultValue={session?.user.name}
                            {...register("username")} />
                        {errors.username && <Message content={errors.username.message} variant='error' />}
                    </div>

                    :
                    <Heading variant='md'>{"Username:" + session?.user.name}</Heading>
                }
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
            <div className='flex  gap-2   w-screen'>
                <Button className='bg-blue-500 text-white'
                    onClick={() => setEditing((prev) => !prev)}
                    type="button">
                    {editing ? "Cancel" : "Edit"}
                </Button>
                {editing && <Button className='bg-blue-500 text-white'
                    type='submit'
                    disabled={false}>
                    Confirm
                </Button>}
            </div>

        </form>

    )
}

export default ProfileDetails