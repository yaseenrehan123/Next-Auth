import { HeadingProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'

const Heading = ({ children, variant, className, ...props }: HeadingProps) => {
    return (
        <div{...props} className={cn(variants({ variant }), className)}>
            {children}
        </div>
    )
}

const variants = cva('font-bold', {
    variants: {
        variant: {
            sm: "text-2xl",
            md: "text-3xl",
            lg: "text-4xl",
            xl: "text-5xl"
        }
    },
    defaultVariants: {
        variant: 'sm'
    }
});

export default Heading