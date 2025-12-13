/*
  Warnings:

  - The primary key for the `CourierRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CourierRate` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CourierRate" (
    "rating" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "courierId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    PRIMARY KEY ("clientId", "courierId", "orderId"),
    CONSTRAINT "CourierRate_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "UserClient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourierRate_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "UserCourier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourierRate_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CourierRate" ("clientId", "courierId", "orderId", "rating") SELECT "clientId", "courierId", "orderId", "rating" FROM "CourierRate";
DROP TABLE "CourierRate";
ALTER TABLE "new_CourierRate" RENAME TO "CourierRate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
