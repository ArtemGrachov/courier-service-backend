/*
  Warnings:

  - The primary key for the `ClientRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ClientRate` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientRate" (
    "rating" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "courierId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    PRIMARY KEY ("clientId", "courierId", "orderId"),
    CONSTRAINT "ClientRate_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "UserClient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClientRate_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "UserCourier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClientRate_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientRate" ("clientId", "courierId", "orderId", "rating") SELECT "clientId", "courierId", "orderId", "rating" FROM "ClientRate";
DROP TABLE "ClientRate";
ALTER TABLE "new_ClientRate" RENAME TO "ClientRate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
