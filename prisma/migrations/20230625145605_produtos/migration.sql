-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categorias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restauranteId" TEXT NOT NULL,
    CONSTRAINT "categorias_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_categorias" ("created_at", "descricao", "id", "imagem", "nome", "restauranteId") SELECT "created_at", "descricao", "id", "imagem", "nome", "restauranteId" FROM "categorias";
DROP TABLE "categorias";
ALTER TABLE "new_categorias" RENAME TO "categorias";
CREATE TABLE "new_produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "nomesAdd" TEXT,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "precosAdd" TEXT,
    "imagem" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoriaId" TEXT NOT NULL,
    CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_produtos" ("categoriaId", "created_at", "descricao", "id", "imagem", "nome", "preco") SELECT "categoriaId", "created_at", "descricao", "id", "imagem", "nome", "preco" FROM "produtos";
DROP TABLE "produtos";
ALTER TABLE "new_produtos" RENAME TO "produtos";
CREATE TABLE "new_restaurantes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "restaurantes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_restaurantes" ("id", "nome", "userId") SELECT "id", "nome", "userId" FROM "restaurantes";
DROP TABLE "restaurantes";
ALTER TABLE "new_restaurantes" RENAME TO "restaurantes";
CREATE UNIQUE INDEX "restaurantes_nome_key" ON "restaurantes"("nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
