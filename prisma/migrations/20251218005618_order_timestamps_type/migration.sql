/*
  Warnings:

  - The `completed_at` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ordered_at` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "completed_at",
ADD COLUMN     "completed_at" TIMESTAMP(3),
DROP COLUMN "ordered_at",
ADD COLUMN     "ordered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
