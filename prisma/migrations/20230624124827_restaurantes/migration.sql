/*
  Warnings:

  - You are about to drop the `Tokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restauranteId` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tokens";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "restaurantes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "restaurantes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restauranteId" TEXT NOT NULL,
    CONSTRAINT "categorias_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_categorias" ("created_at", "descricao", "id", "imagem", "nome") SELECT "created_at", "descricao", "id", "imagem", "nome" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "restaurantes_nome_key" ON "restaurantes"("nome");
