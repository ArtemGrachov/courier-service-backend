/*
  Warnings:

  - You are about to drop the column `sessionUuid` on the `UserAdmin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAdmin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);
INSERT INTO "new_UserAdmin" ("email", "id", "passwordHash") SELECT "email", "id", "passwordHash" FROM "UserAdmin";
DROP TABLE "UserAdmin";
ALTER TABLE "new_UserAdmin" RENAME TO "UserAdmin";
CREATE UNIQUE INDEX "UserAdmin_email_key" ON "UserAdmin"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
