/*
  Warnings:

  - You are about to drop the column `interests` on the `local_tourist` table. All the data in the column will be lost.
  - You are about to drop the column `contact_email` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `last_active_at` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "local_tourist" DROP COLUMN "interests";

-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "contact_email",
DROP COLUMN "last_active_at";
