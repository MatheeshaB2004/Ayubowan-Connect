-- DropIndex
DROP INDEX "cart_items_cart_id_listing_id_key";

-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "booking_id" INTEGER,
ALTER COLUMN "listing_id" DROP NOT NULL;
