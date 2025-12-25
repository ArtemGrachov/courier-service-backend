/*
  Warnings:

  - Changed the type of `expires` on the `ResetPasswordToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResetPasswordToken" DROP COLUMN "expires",
ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL;
