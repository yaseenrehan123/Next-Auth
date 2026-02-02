import { email, object, string } from "zod";

const signupSchema = object({
    username: string().min(8).max(15),
    email: email(),
    password: string().min(8).max(15),
    confirmPassword: string().min(8).max(15)
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must patch",
    path: ["confirmPassword"]
});

export default signupSchema;
