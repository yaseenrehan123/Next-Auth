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
//FUNC PROPS
export type SendMailProps = {
    subject: string,
    address: string,
    message: string
}