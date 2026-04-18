import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt";

//console.log("DEBUG: Is prisma.user defined?", !!prisma.user);
//console.log("DEBUG: Is prisma.account defined?", !!prisma.account);
//const accounts = await prisma.account.findMany();
const users = await prisma.user.findMany();
//console.log("DEBUG: Accounts? ", accounts);
console.log("DEBUG: Users?", users)
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true
        }),
        Github({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            allowDangerousEmailAccountLinking: true,
            authorization: {
                params: {
                    scope: "read:user user:email",
                }
            }
        }),
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

                const isCorrectPassword: boolean = await compare(password, user.hashedPassword ?? "");

                if (!isCorrectPassword) {
                    return null
                    //throw new Error("PASSWORD NOT CORRECT!");
                };

                return user;
            }
        })
    ],
    events: {
        linkAccount: async ({ user }) => {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
            console.log("EVENT: Google account linked, email marked verified.");
        }
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            console.log("ACCOUNT:", account);
            console.log("ACCOUNT TYPE:", account?.type)
            if (account?.type === "oauth" || account?.type === "oidc") {
                console.log("GOOGLE PROVIDER ON SIGNIN!");
                return true;
            };

            const dbUser = await prisma.user.findUnique({
                where: { id: user.id },
                select: { emailVerified: true }
            });

            if (!dbUser || !dbUser.emailVerified) {
                return false
            }

            return true
        },
        jwt: async ({ token, user }) => {
            if (user && user.id) {
                token.id = user.id;
                token.username = user.name;
                token.email = user.email;
                token.createdAt = user.createdAt;
                token.updatedAt = user.updatedAt;
                console.log("TOKEN CUSTOM FIELDS ASSIGNED!");
                console.log("TOKEN ID:", token.id);
                console.log("TOKEN NAME:", token.username);
                console.log("TOKEN EMAIL:", token.email);
                console.log("TOKEN CREATED AT:", token.createdAt);
                console.log("TOKEN UPDATED AT:", token.updatedAt);
            };
            //console.log("TOKEN ID:", token.id);
            if (!token.id) {
                return null;
            }
            console.log("CHECK 1");
            const dbUser = await prisma.user.findUnique({
                where: { id: token.id as string },
                //select: { id: true, emailVerified: true }
            });

            if (!dbUser) {
                return null
            };
            console.log("CHECK 2");
            const isOAuth = await prisma.account.findFirst({
                where: { userId: dbUser.id }
            })
            //console.log("OAUTH:", isOAuth)
            if (!dbUser.emailVerified && !isOAuth) {
                return null
            }
            //console.log("EMAIL VERIFICATION:", dbUser.emailVerified);
            console.log("CHECK 3");

            token.name = dbUser.name;

            return token;
        },
        session: async ({ session, token }) => {
            if (token.id && session.user) {
                session.user.id = token.id as string
                session.user.username = token.name;
                session.user.email = token.email;
                session.user.createdAt = token.createdAt;
                session.user.updatedAt = token.updatedAt;
                console.log("SESSION CUSTOM FIELDS ASSIGNED!");
                console.log("SESSION ID:", session.user.id);
                console.log("SESSION NAME:", session.user.username);
                console.log("SESSION EMAIL:", session.user.email);
                console.log("SESSION CREATED AT:", session.user.createdAt);
                console.log("SESSION UPDATED AT:", session.user.updatedAt);
            };

            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.AUTH_SECRET,
    //debug: true,
})