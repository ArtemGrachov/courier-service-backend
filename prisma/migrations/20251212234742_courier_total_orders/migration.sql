-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "UserCourier_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserCourier" ("activeOrdersCount", "completedOrdersCount", "email", "id", "name", "passwordHash", "phone", "positionId", "status") SELECT "activeOrdersCount", "completedOrdersCount", "email", "id", "name", "passwordHash", "phone", "positionId", "status" FROM "UserCourier";
DROP TABLE "UserCourier";
ALTER TABLE "new_UserCourier" RENAME TO "UserCourier";
CREATE UNIQUE INDEX "UserCourier_email_key" ON "UserCourier"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
