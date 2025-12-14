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
    "totalOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_UserClient" ("activeOrdersCount", "completedOrdersCount", "email", "id", "name", "passwordHash", "phone", "rating", "totalOrdersCount") SELECT "activeOrdersCount", "completedOrdersCount", "email", "id", "name", "passwordHash", "phone", "rating", "totalOrdersCount" FROM "UserClient";
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
    "activeOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "completedOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "totalOrdersCount" INTEGER NOT NULL DEFAULT 0,
    "rating" REAL,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "UserCourier_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserCourier" ("activeOrdersCount", "completedOrdersCount", "email", "id", "name", "passwordHash", "phone", "positionId", "rating", "status", "totalOrdersCount") SELECT "activeOrdersCount", "completedOrdersCount", "email", "id", "name", "passwordHash", "phone", "positionId", "rating", "status", "totalOrdersCount" FROM "UserCourier";
DROP TABLE "UserCourier";
ALTER TABLE "new_UserCourier" RENAME TO "UserCourier";
CREATE UNIQUE INDEX "UserCourier_email_key" ON "UserCourier"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
