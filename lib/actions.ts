"use server";
import generateVerificationToken from "@/tokens/generateVerificationToken";
import prisma from "./prisma";
import { hash, genSalt } from "bcrypt";
import { Resend } from "resend";
export async function registerUser(formData: FormData) {
    const signupSchema = (await import("@/schemas/signupSchema")).default;
    if (!signupSchema) {
        throw new Error("FAILED TO IMPORT SIGNUP SCHEMA!");
    }
    const rawData = Object.fromEntries(formData.entries());
    const result = signupSchema.safeParse(rawData);
    if (!result.success) {
        throw new Error(result.error.message);
    };
    const data = result.data!;
    const { username, email, password, confirmPassword } = data

    if (password !== confirmPassword) {
        throw new Error("PASSWORD AND CONFIRM PASSWORD MUST MATCH!");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (user) {
        if (user.verified) {
            throw new Error("ACCOUNT ALREADY EXISTS");
        }
        await prisma.user.update({
            where: { email: email },
            data: {
                hashedPassword: hashedPassword
            }
        });
        console.log(user);
    }
    else {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword

            }
        });
        console.log(newUser);

    }
    const token: string = await generateVerificationToken(email);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [email],
        subject: "Signup Verification",
        html: `
        Click the link to verify: ${process.env.CLIENT_URL}/verify?token=${token}
`
    });

    if (error) {
        throw new Error(error.message);
    }

    console.log("VERIFICATION TOKEN: ", token);

    console.log("FORM DATA:", data);
}



