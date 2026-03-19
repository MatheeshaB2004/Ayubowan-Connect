-- CreateUniqueIndex (idempotent — index may already exist from a prior db push)
CREATE UNIQUE INDEX IF NOT EXISTS "reviews_user_id_listing_id_key" ON "reviews"("user_id", "listing_id");
