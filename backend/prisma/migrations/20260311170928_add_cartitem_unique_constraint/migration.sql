/*
  Warnings:

  - You are about to drop the `refresh_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cart_id,listing_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "vendors" ALTER COLUMN "clerk_user_id" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "refresh_tokens";

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cart_id_listing_id_key" ON "cart_items"("cart_id", "listing_id");
