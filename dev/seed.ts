import "dotenv/config";
import prisma from "../lib/prisma";
import { genSalt, hash } from "bcrypt";

main()
    .then(() => console.log("DATABASE SEEDED!"))
    .catch((e: Error) => console.error(e.message))
    .finally(() => prisma.$disconnect())

async function main() {
    await prisma.verificationToken.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    const salt = await genSalt(10);
    const hashedPassword = await hash("password123", salt);
    const testUser = await prisma.user.create({
        data: {
            name: "TestUser1",
            email: "test@example.com",
            hashedPassword: hashedPassword,
            emailVerified: new Date(),
        }
    });

    console.log("CREATED TEST USER:", testUser);
};
