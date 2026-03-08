-- CreateTable
CREATE TABLE "profile_views" (
    "profile_view_id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_views_pkey" PRIMARY KEY ("profile_view_id")
);

-- CreateIndex
CREATE INDEX "profile_views_vendor_id_idx" ON "profile_views"("vendor_id");

-- CreateIndex
CREATE INDEX "profile_views_user_id_idx" ON "profile_views"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_views_vendor_id_user_id_key" ON "profile_views"("vendor_id", "user_id");

-- AddForeignKey
ALTER TABLE "profile_views" ADD CONSTRAINT "profile_views_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_views" ADD CONSTRAINT "profile_views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
