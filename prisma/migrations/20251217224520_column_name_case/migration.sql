/*
  Warnings:

  - The primary key for the `ClientRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `ClientRate` table. All the data in the column will be lost.
  - You are about to drop the column `courierId` on the `ClientRate` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `ClientRate` table. All the data in the column will be lost.
  - The primary key for the `CourierRate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientId` on the `CourierRate` table. All the data in the column will be lost.
  - You are about to drop the column `courierId` on the `CourierRate` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `CourierRate` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `courierId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `receiverAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `receiverLat` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `receiverLng` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `senderAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `senderLat` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `senderLng` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `ResetPasswordToken` table. All the data in the column will be lost.
  - You are about to drop the column `activeOrdersCount` on the `UserClient` table. All the data in the column will be lost.
  - You are about to drop the column `completedOrdersCount` on the `UserClient` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `UserClient` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `UserClient` table. All the data in the column will be lost.
  - You are about to drop the column `totalOrdersCount` on the `UserClient` table. All the data in the column will be lost.
  - You are about to drop the column `activeOrdersCount` on the `UserCourier` table. All the data in the column will be lost.
  - You are about to drop the column `completedOrdersCount` on the `UserCourier` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `UserCourier` table. All the data in the column will be lost.
  - You are about to drop the column `positionId` on the `UserCourier` table. All the data in the column will be lost.
  - You are about to drop the column `ratingCount` on the `UserCourier` table. All the data in the column will be lost.
  - You are about to drop the column `totalOrdersCount` on the `UserCourier` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `ClientRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_id` to the `ClientRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `ClientRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `CourierRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier_id` to the `CourierRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `CourierRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `ResetPasswordToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `UserClient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `UserCourier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position_id` to the `UserCourier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClientRate" DROP CONSTRAINT "ClientRate_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientRate" DROP CONSTRAINT "ClientRate_courierId_fkey";

-- DropForeignKey
ALTER TABLE "ClientRate" DROP CONSTRAINT "ClientRate_orderId_fkey";

-- DropForeignKey
ALTER TABLE "CourierRate" DROP CONSTRAINT "CourierRate_clientId_fkey";

-- DropForeignKey
ALTER TABLE "CourierRate" DROP CONSTRAINT "CourierRate_courierId_fkey";

-- DropForeignKey
ALTER TABLE "CourierRate" DROP CONSTRAINT "CourierRate_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_courierId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_senderId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourier" DROP CONSTRAINT "UserCourier_positionId_fkey";

-- AlterTable
ALTER TABLE "ClientRate" DROP CONSTRAINT "ClientRate_pkey",
DROP COLUMN "clientId",
DROP COLUMN "courierId",
DROP COLUMN "orderId",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD COLUMN     "courier_id" INTEGER NOT NULL,
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD CONSTRAINT "ClientRate_pkey" PRIMARY KEY ("client_id", "courier_id", "order_id");

-- AlterTable
ALTER TABLE "CourierRate" DROP CONSTRAINT "CourierRate_pkey",
DROP COLUMN "clientId",
DROP COLUMN "courierId",
DROP COLUMN "orderId",
ADD COLUMN     "client_id" INTEGER NOT NULL,
ADD COLUMN     "courier_id" INTEGER NOT NULL,
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD CONSTRAINT "CourierRate_pkey" PRIMARY KEY ("client_id", "courier_id", "order_id");

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "completedAt",
DROP COLUMN "courierId",
DROP COLUMN "orderedAt",
DROP COLUMN "receiverAddress",
DROP COLUMN "receiverId",
DROP COLUMN "receiverLat",
DROP COLUMN "receiverLng",
DROP COLUMN "senderAddress",
DROP COLUMN "senderId",
DROP COLUMN "senderLat",
DROP COLUMN "senderLng",
ADD COLUMN     "completed_at" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "courier_id" INTEGER DEFAULT -1,
ADD COLUMN     "ordered_at" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "receiver_address" TEXT NOT NULL,
ADD COLUMN     "receiver_id" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "receiver_lat" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "receiver_lng" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sender_address" TEXT NOT NULL,
ADD COLUMN     "sender_id" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "sender_lat" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sender_lng" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ResetPasswordToken" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserClient" DROP COLUMN "activeOrdersCount",
DROP COLUMN "completedOrdersCount",
DROP COLUMN "passwordHash",
DROP COLUMN "ratingCount",
DROP COLUMN "totalOrdersCount",
ADD COLUMN     "active_orders_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "completed_orders_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "rating_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_orders_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "UserCourier" DROP COLUMN "activeOrdersCount",
DROP COLUMN "completedOrdersCount",
DROP COLUMN "passwordHash",
DROP COLUMN "positionId",
DROP COLUMN "ratingCount",
DROP COLUMN "totalOrdersCount",
ADD COLUMN     "active_orders_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "completed_orders_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "position_id" INTEGER NOT NULL,
ADD COLUMN     "rating_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_orders_count" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "UserCourier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourier" ADD CONSTRAINT "UserCourier_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRate" ADD CONSTRAINT "ClientRate_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRate" ADD CONSTRAINT "ClientRate_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "UserCourier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientRate" ADD CONSTRAINT "ClientRate_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourierRate" ADD CONSTRAINT "CourierRate_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourierRate" ADD CONSTRAINT "CourierRate_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "UserCourier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourierRate" ADD CONSTRAINT "CourierRate_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
