-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserClient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "activeOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "completedOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "totalOrdersCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_UserClient" ("email", "id", "name", "passwordHash", "phone") SELECT "email", "id", "name", "passwordHash", "phone" FROM "UserClient";
DROP TABLE "UserClient";
ALTER TABLE "new_UserClient" RENAME TO "UserClient";
CREATE UNIQUE INDEX "UserClient_email_key" ON "UserClient"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
