/*
  Warnings:

  - Added the required column `userId` to the `ResetPasswordToken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ResetPasswordToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "expires" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_ResetPasswordToken" ("expires", "id", "token") SELECT "expires", "id", "token" FROM "ResetPasswordToken";
DROP TABLE "ResetPasswordToken";
ALTER TABLE "new_ResetPasswordToken" RENAME TO "ResetPasswordToken";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
