"use server";
import generateVerificationToken from "@/tokens/generateVerificationToken";
import prisma from "./prisma";
import { hash, genSalt } from "bcrypt";
import { sendMail } from "./resend";
import { VerifyUserProps } from "./types";
import crypto from "crypto";

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

    await sendMail({
        subject: "ACCOUNT VERIFICATION",
        address: email,
        message: `VERIFY YOUR ACCOUNT: ${process.env.CLIENT_URL}/verify?token=${token}`
    })

    console.log("VERIFICATION TOKEN: ", token);

    console.log("FORM DATA:", data);
}

export async function verifyUser({ token, email }: VerifyUserProps) {
    if (!token) {
        throw new Error("TOKEN DOES NOT EXIST!");
    };

    const user = await prisma.user.findUnique({
        where: { email: email },
        include: { verificationToken: true }
    });

    if (!user) {
        throw new Error("USER DOES NOT EXIST!")
    };
    if (user.verified) {
        throw new Error("USER ALREADY VERIFIED!");
    }
    if (!user.verificationToken) {
        throw new Error("NO TOKEN CAN BE FOUND FOR THIS ACCOUNT");
    };
    if (new Date() > user.verificationToken.expiresAt) {
        throw new Error("THE TOKEN HAS EXPIRED!");
    }
    const hashedToken: string = await crypto.createHash("sha256").update(token).digest("hex");

    if (user.verificationToken.hashedToken !== hashedToken) {
        throw new Error("INVALID TOKEN!");
    };

    const verifiedUser = await prisma.user.update({
        where: { email: email },
        data: {
            verified: true
        }
    });

    await prisma.verificationToken.delete({
        where: { id: user.verificationToken.id }
    });

    console.log("USER VERIFIED!");
    console.log(verifiedUser);
}

