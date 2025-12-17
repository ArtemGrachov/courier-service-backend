/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `UserAdmin` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `UserAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAdmin" DROP COLUMN "passwordHash",
ADD COLUMN     "password_hash" TEXT NOT NULL;
