-- AlterTable
ALTER TABLE "events" ADD COLUMN     "important_info" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "what_you_will_learn" TEXT[] DEFAULT ARRAY[]::TEXT[];
