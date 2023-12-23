-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "menuCategoryId" INTEGER;

-- CreateTable
CREATE TABLE "MenuCategory" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
