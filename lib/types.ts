import signupSchema from "@/schemas/signupSchema"
import { z } from "zod";
//SHADCN PROPS
export type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    variant?: 'default' | 'small' | 'large',
    bg?: "light" | "dark"
}
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default'
}
export type FormContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'light' | 'dark'
};
export type HeadingProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'sm' | 'md' | 'lg' | 'xl'
}
export type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'success' | 'loading' | 'error',
    disableOnContent?: 'never' | 'sm' | 'md' | 'lg',
    content?: String
}
//FUNC PROPS
export type SendMailProps = {
    subject: string,
    address: string,
    message: string
}
//ACTION PROPS
export type VerifyUserProps = {
    token: string,
    email: string
}
//INFERS
export type SignUpFormFields = z.infer<typeof signupSchema>