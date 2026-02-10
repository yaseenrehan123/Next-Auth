import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { compare } from "bcrypt";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({

            authorize: async (credentials) => {
                const email: string = credentials?.email as string || "";
                const password: string = credentials?.password as string || "";

                const user = await prisma.user.findUnique({
                    where: { email: email }
                });

                if (!user) {
                    return null
                    //throw new Error(`NO USER FOUND! ${email}`);
                };

                const isCorrectPassword: boolean = await compare(password, user.hashedPassword);

                if (!isCorrectPassword) {
                    return null
                    //throw new Error("PASSWORD NOT CORRECT!");
                };

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    }
})