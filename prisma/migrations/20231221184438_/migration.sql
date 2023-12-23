/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('SUCCESS', 'FAILED', 'PROCESSING');

-- CreateEnum
CREATE TYPE "DELIVERY_STATUS" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELAYED', 'DELIVERED', 'CANCEL', 'RETURNED', 'ON_HOLD', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ORDER_TYPE" AS ENUM ('CASH_ON_DELIVERY', 'ONLINE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "restaurant_name" TEXT NOT NULL,
    "restaurant_address" TEXT NOT NULL,
    "restaurant_phone" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "menu_name" TEXT NOT NULL,
    "menu_rating" INTEGER NOT NULL,
    "menu_price" DECIMAL(10,2),
    "menu_description" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "order_total" DECIMAL(10,2),
    "delivery_status" TEXT NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "order_type" "ORDER_TYPE" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "payment_status" "PAYMENT_STATUS" NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_order_id_key" ON "Payment"("order_id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
