-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL DEFAULT '',
    "weight" TEXT NOT NULL DEFAULT '',
    "size" TEXT NOT NULL DEFAULT '',
    "volume" TEXT NOT NULL DEFAULT '',
    "orderedAt" INTEGER NOT NULL DEFAULT -1,
    "completedAt" INTEGER NOT NULL DEFAULT -1,
    "senderLat" INTEGER NOT NULL DEFAULT 0,
    "senderLng" INTEGER NOT NULL DEFAULT 0,
    "receiverLat" INTEGER NOT NULL DEFAULT 0,
    "receiverLng" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Order" ("completedAt", "description", "id", "orderedAt", "size", "volume", "weight") SELECT "completedAt", "description", "id", "orderedAt", "size", "volume", "weight" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
