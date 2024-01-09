/*
  Warnings:

  - You are about to drop the column `hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashRt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isVeg` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topItem` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "isVeg" BOOLEAN NOT NULL,
ADD COLUMN     "topItem" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hash",
DROP COLUMN "hashRt",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
