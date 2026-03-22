/*
  Warnings:

  - You are about to drop the column `createdAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `events` table. All the data in the column will be lost.
  - Added the required column `start_date` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "createdAt",
DROP COLUMN "endDate",
DROP COLUMN "isPublished",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_free" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "max_participants" INTEGER,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
