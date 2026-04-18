import signupSchema from "@/schemas/signupSchema"
import deleteAccountConfirmationSchema from "@/schemas/deleteAccountConfirmationSchema";
import { LinkProps } from "next/link";
import { z } from "zod";
import editProfileSchema from "@/schemas/editProfileSchema";
//STORES
export type SidebarStore = {
    enabled: boolean,
    setEnabled: (newVal: boolean) => void
}
export type AuthStore = {
    accessToken: string,
    setAccessToken: (newVal: string) => void,
    loggedIn: boolean,
    setLoggedIn: (newVal: boolean) => void,
    refreshToken: string,
    setRefreshToken: (newVal: string) => void
}
export type ProfileStore = {
    id: string,
    username: string,
    email: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    setId: (newVal: string) => void,
    setUsername: (newVal: string) => void
    setEmail: (newVal: string) => void
    setCreatedAt: (newVal: Date | null) => void,
    setUpdatedAt: (newVal: Date | null) => void
}
export type DeleteAccountConfirmationStore = {
    enabled: boolean,
    setEnabled: (val: boolean) => void
}
//SHADCN VARIANTS
export type ResponsiveVariants = {
    display?: 'block' | 'inline' | 'inlineBlock' | 'flex' | 'inlineFlex' | 'grid' | 'hidden',
    sm?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
    md?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
    lg?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
}
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
export type NavlinkProps = React.HTMLAttributes<HTMLDivElement> & Partial<LinkProps> & {
    variant?: 'mainbar' | 'sidebar',
    navigateRoute?: boolean
}
export type ResponsiveProps = React.HTMLAttributes<HTMLDivElement> & ResponsiveVariants;
export type ProfileAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'sidebar' | 'mainbar',
    username?: string,
    avatarUrl?: string,
}
export type ColumnDividerProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'thin' | 'medium' | 'thick'
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
//COMPONENT PROPS
export type ProfileIconProps = {
    avatarProps: ProfileAvatarProps
}
//INFERS
export type SignUpFormFields = z.infer<typeof signupSchema>
export type DeleteAccountConfirmationFields = z.infer<typeof deleteAccountConfirmationSchema>
export type EditProfileFields = z.infer<typeof editProfileSchema>