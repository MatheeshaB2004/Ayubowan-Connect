-- CreateTable
CREATE TABLE "goals" (
    "goal_id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "target" INTEGER NOT NULL,
    "baseline_bookings" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("goal_id")
);

-- CreateIndex
CREATE INDEX "goals_vendor_id_idx" ON "goals"("vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "goals_vendor_id_is_active_key" ON "goals"("vendor_id", "is_active");

-- AddForeignKey
ALTER TABLE "goals" ADD CONSTRAINT "goals_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;
