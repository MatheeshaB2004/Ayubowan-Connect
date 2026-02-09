-- CreateTable
CREATE TABLE "review_media" (
    "review_media_id" SERIAL NOT NULL,
    "review_id" INTEGER NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "media_url" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_media_pkey" PRIMARY KEY ("review_media_id")
);

-- CreateIndex
CREATE INDEX "review_media_review_id_idx" ON "review_media"("review_id");

-- AddForeignKey
ALTER TABLE "review_media" ADD CONSTRAINT "review_media_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("review_id") ON DELETE CASCADE ON UPDATE CASCADE;
