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
    "receiverLng" INTEGER NOT NULL DEFAULT 0,
    "senderAddress" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL DEFAULT -1,
    "receiverAddress" TEXT NOT NULL,
    "receiverId" INTEGER NOT NULL DEFAULT -1,
    "courierId" INTEGER DEFAULT -1,
    "status" TEXT NOT NULL DEFAULT 'ordered',
    CONSTRAINT "Order_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "UserClient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "UserClient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "UserCourier" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("completedAt", "courierId", "description", "id", "orderedAt", "receiverAddress", "receiverId", "receiverLat", "receiverLng", "senderAddress", "senderId", "senderLat", "senderLng", "size", "volume", "weight") SELECT "completedAt", "courierId", "description", "id", "orderedAt", "receiverAddress", "receiverId", "receiverLat", "receiverLng", "senderAddress", "senderId", "senderLat", "senderLng", "size", "volume", "weight" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
