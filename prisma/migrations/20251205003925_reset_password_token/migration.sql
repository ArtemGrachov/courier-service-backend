-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "expires" INTEGER NOT NULL
);
