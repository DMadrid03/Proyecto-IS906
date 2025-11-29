-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gasto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "monto" REAL NOT NULL,
    "fechaPago" INTEGER NOT NULL,
    "frecuencia" TEXT NOT NULL DEFAULT 'MONTHLY'
);
INSERT INTO "new_Gasto" ("descripcion", "fechaPago", "id", "monto") SELECT "descripcion", "fechaPago", "id", "monto" FROM "Gasto";
DROP TABLE "Gasto";
ALTER TABLE "new_Gasto" RENAME TO "Gasto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
