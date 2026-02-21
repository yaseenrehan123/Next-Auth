import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prismaClientSingleton = () => {
    return new PrismaClient({ adapter });
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;