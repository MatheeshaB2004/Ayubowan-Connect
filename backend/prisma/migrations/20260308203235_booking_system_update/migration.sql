-- AlterTable
ALTER TABLE "AvailabilitySlot" ADD COLUMN     "bookedGuests" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxGuests" INTEGER NOT NULL DEFAULT 35;

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "rejectedAt" TIMESTAMP(3),
ADD COLUMN     "slotId" INTEGER;

-- AlterTable
ALTER TABLE "listings" ADD COLUMN     "stock" INTEGER;

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;
