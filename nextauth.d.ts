import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string,
        username?: string | null,
        email?: string | null,
        emailVerified?: Date | null
        createdAt?: Date,
        updatedAt?: Date,
    }
    interface Session {
        user: {
            id: string,
            username?: string | null,
            email?: string | null,
            emailVerified?: Date | null,
            createdAt?: Date,
            updatedAt?: Date,
        } & DefaultSession['user'];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username?: string,
        email?: string,
        emailVerified?: Date | null
        createdAt?: Date;
        updatedAt?: Date,
    }
}