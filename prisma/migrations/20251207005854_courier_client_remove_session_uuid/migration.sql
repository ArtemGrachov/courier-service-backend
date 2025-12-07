/*
  Warnings:

  - You are about to drop the column `sessionUuid` on the `UserClient` table. All the data in the column will be lost.
  - You are about to drop the column `sessionUuid` on the `UserCourier` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserClient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_UserClient" ("email", "id", "name", "passwordHash", "phone") SELECT "email", "id", "name", "passwordHash", "phone" FROM "UserClient";
DROP TABLE "UserClient";
ALTER TABLE "new_UserClient" RENAME TO "UserClient";
CREATE UNIQUE INDEX "UserClient_email_key" ON "UserClient"("email");
CREATE TABLE "new_UserCourier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'offline',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    CONSTRAINT "UserCourier_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserCourier" ("email", "id", "name", "passwordHash", "phone", "positionId", "status") SELECT "email", "id", "name", "passwordHash", "phone", "positionId", "status" FROM "UserCourier";
DROP TABLE "UserCourier";
ALTER TABLE "new_UserCourier" RENAME TO "UserCourier";
CREATE UNIQUE INDEX "UserCourier_email_key" ON "UserCourier"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
