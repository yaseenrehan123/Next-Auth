"use server";
import prisma from "./prisma";
import { hash, genSalt } from "bcrypt";
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
        if (hashedPassword !== user.hashedPassword) {
            /*USER POTENTIALLY TRIED TO SIGNUP AGAIN AND WITH DIFFERENT PASSWORD
            ACCOUNT NOT VERIFIED YET*/
            await prisma.user.update({
                where: { email: email },
                data: {
                    hashedPassword: hashedPassword
                }
            });
            console.log(user);
            return;
        }
        console.log("USER ALREADY EXISTS!");
        return
    }

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            hashedPassword

        }
    });

    console.log(newUser);

    console.log("FORM DATA:", data);
}