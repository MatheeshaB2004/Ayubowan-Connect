-- AlterTable
ALTER TABLE "events" ADD COLUMN     "vendorId" INTEGER;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;
