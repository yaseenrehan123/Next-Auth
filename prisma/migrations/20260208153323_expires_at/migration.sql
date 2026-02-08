/*
  Warnings:

  - You are about to drop the column `token` on the `VerificationToken` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedToken` to the `VerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP COLUMN "token",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hashedToken" TEXT NOT NULL;
