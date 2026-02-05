-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unverifiedUserId" TEXT NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_unverifiedUserId_key" ON "VerificationToken"("unverifiedUserId");

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_unverifiedUserId_fkey" FOREIGN KEY ("unverifiedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
