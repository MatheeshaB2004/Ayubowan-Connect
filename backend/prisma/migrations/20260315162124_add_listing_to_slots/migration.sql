/*
  Warnings:

  - Added the required column `listingId` to the `AvailabilitySlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailabilitySlot" ADD COLUMN     "listingId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "AvailabilitySlot_listingId_idx" ON "AvailabilitySlot"("listingId");

-- AddForeignKey
ALTER TABLE "AvailabilitySlot" ADD CONSTRAINT "AvailabilitySlot_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "listings"("listing_id") ON DELETE RESTRICT ON UPDATE CASCADE;
