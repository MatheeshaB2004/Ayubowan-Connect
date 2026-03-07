/*
  Warnings:

  - You are about to drop the column `user_id` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `local_tourist_id` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor_id` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_user_id_fkey";

-- DropIndex
DROP INDEX "bookings_user_id_idx";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "user_id",
ADD COLUMN     "local_tourist_id" INTEGER NOT NULL,
ADD COLUMN     "vendor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_local_tourist_id_fkey" FOREIGN KEY ("local_tourist_id") REFERENCES "local_tourist"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
