import prisma from "@/lib/prisma";
import crypto from "crypto";
async function generateVerificationToken(email: string) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        throw new Error("USER NOT FOUND!");
    };

    const token: string = crypto.randomBytes(32).toString("hex");
    const hashedToken: string = await crypto.createHash("sha256").update(token).digest("hex");
    await prisma.user.update({
        where: { email: email },
        data: {
            verificationToken: {
                upsert: {
                    create: {
                        token: hashedToken
                    },
                    update: {
                        token: hashedToken
                    }
                }
            }
        }
    });

    return token;
};

export default generateVerificationToken;