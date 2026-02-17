import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import { compare } from "bcrypt";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
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
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user && user.id) {
                token.id = user.id
            };
            console.log("TOKEN ID:", token.id);
            if (!token.id) {
                return null;
            }
            const dbUser = await prisma.user.findUnique({
                where: { id: token.id as string },
                select: { id: true, verified: true }
            });

            if (!dbUser || !dbUser.verified) {
                return null
            };

            return token;
        },
        session: async ({ session, token }) => {
            if (token.id && session.user) {
                session.user.id = token.id as string
            };

            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    }
})