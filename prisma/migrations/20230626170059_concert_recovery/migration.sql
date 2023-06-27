/*
  Warnings:

  - You are about to drop the column `userId` on the `recoveries` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `recoveries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recoveries" DROP CONSTRAINT "recoveries_userId_fkey";

-- AlterTable
ALTER TABLE "recoveries" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "recoveries" ADD CONSTRAINT "recoveries_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
