/*
  Warnings:

  - The `nomesAdd` column on the `produtos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `precosAdd` column on the `produtos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "nomesAdd",
ADD COLUMN     "nomesAdd" TEXT[],
DROP COLUMN "precosAdd",
ADD COLUMN     "precosAdd" DOUBLE PRECISION[];
