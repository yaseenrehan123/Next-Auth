import "dotenv/config";
import prisma from "./lib/prisma";

main()
    .then(() => console.log("DATABASE SEEDED!"))
    .catch((e: Error) => console.error(e.message))
    .finally(() => prisma.$disconnect())

async function main() {
    await prisma.verificationToken.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
};
