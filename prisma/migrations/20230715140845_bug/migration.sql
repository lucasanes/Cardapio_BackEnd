/*
  Warnings:

  - Added the required column `imagem` to the `restaurantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurantes" ADD COLUMN     "imagem" TEXT NOT NULL;
