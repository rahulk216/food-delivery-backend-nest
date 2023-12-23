/*
  Warnings:

  - Added the required column `menu_img` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "menu_img" TEXT NOT NULL;
