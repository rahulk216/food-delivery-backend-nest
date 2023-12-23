/*
  Warnings:

  - Changed the type of `delivery_status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `city` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_status",
ADD COLUMN     "delivery_status" "DELIVERY_STATUS" NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "pincode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
