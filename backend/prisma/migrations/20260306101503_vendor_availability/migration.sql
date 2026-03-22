-- CreateTable
CREATE TABLE "VendorAvailability" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorAvailability_vendorId_date_key" ON "VendorAvailability"("vendorId", "date");

-- AddForeignKey
ALTER TABLE "VendorAvailability" ADD CONSTRAINT "VendorAvailability_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
