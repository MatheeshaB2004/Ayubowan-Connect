-- CreateTable
CREATE TABLE "event_gallery_images" (
    "gallery_image_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_gallery_images_pkey" PRIMARY KEY ("gallery_image_id")
);

-- CreateIndex
CREATE INDEX "event_gallery_images_event_id_idx" ON "event_gallery_images"("event_id");

-- AddForeignKey
ALTER TABLE "event_gallery_images" ADD CONSTRAINT "event_gallery_images_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
