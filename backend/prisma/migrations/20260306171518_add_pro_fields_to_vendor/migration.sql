-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "is_pro_user" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pro_subscription_expiry" TIMESTAMP(3);
