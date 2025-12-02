-- CreateTable
CREATE TABLE "UserCourier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'offline',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    CONSTRAINT "UserCourier_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCourier_email_key" ON "UserCourier"("email");
