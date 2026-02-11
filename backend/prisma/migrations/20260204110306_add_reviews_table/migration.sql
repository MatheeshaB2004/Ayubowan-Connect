-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "LocalUserType" AS ENUM ('LOCAL', 'TOURIST');

-- CreateEnum
CREATE TYPE "VerifiedStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VisibilityStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('EXPERIENCE', 'PRODUCT');

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "last_login_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "local_tourist" (
    "user_id" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "profile_photo_url" TEXT,
    "user_type" "LocalUserType" NOT NULL,
    "nationality" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "preferred_language" TEXT NOT NULL DEFAULT 'en',
    "interests" JSONB,
    "is_pro_user" BOOLEAN NOT NULL DEFAULT false,
    "pro_subscription_expiry" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "local_tourist_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "vendors" (
    "vendor_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "business_name" TEXT NOT NULL,
    "short_tagline" TEXT,
    "established_year" INTEGER,
    "rating_average" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "verified_status" "VerifiedStatus" NOT NULL DEFAULT 'PENDING',
    "profile_complete" BOOLEAN NOT NULL DEFAULT false,
    "last_active_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("vendor_id")
);

-- CreateTable
CREATE TABLE "vendor_locations" (
    "location_id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postal_code" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "is_main_location" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "vendor_locations_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "listing_categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "listing_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "listings" (
    "listing_id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "listing_type" "ListingType" NOT NULL DEFAULT 'EXPERIENCE',
    "title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT,
    "price_min" DOUBLE PRECISION NOT NULL,
    "price_max" DOUBLE PRECISION,
    "price_note" TEXT,
    "duration" TEXT,
    "capacity" INTEGER,
    "availability" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "inclusions" JSONB,
    "specs" JSONB,
    "rating_average" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "views_count" INTEGER NOT NULL DEFAULT 0,
    "visibility_status" "VisibilityStatus" NOT NULL DEFAULT 'DRAFT',
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "display_priority" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "listings_pkey" PRIMARY KEY ("listing_id")
);

-- CreateTable
CREATE TABLE "listing_media" (
    "media_id" SERIAL NOT NULL,
    "listing_id" INTEGER NOT NULL,
    "media_type" "MediaType" NOT NULL,
    "media_url" TEXT NOT NULL,
    "caption" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_media_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "listing_search_index" (
    "listing_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "price_min" DOUBLE PRECISION NOT NULL,
    "price_max" DOUBLE PRECISION,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "listing_search_index_pkey" PRIMARY KEY ("listing_id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "listing_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_user_id_key" ON "vendors"("user_id");

-- CreateIndex
CREATE INDEX "vendor_locations_vendor_id_idx" ON "vendor_locations"("vendor_id");

-- CreateIndex
CREATE INDEX "vendor_locations_city_idx" ON "vendor_locations"("city");

-- CreateIndex
CREATE INDEX "vendor_locations_district_idx" ON "vendor_locations"("district");

-- CreateIndex
CREATE INDEX "vendor_locations_province_idx" ON "vendor_locations"("province");

-- CreateIndex
CREATE UNIQUE INDEX "listing_categories_category_name_key" ON "listing_categories"("category_name");

-- CreateIndex
CREATE INDEX "listings_vendor_id_idx" ON "listings"("vendor_id");

-- CreateIndex
CREATE INDEX "listings_category_id_idx" ON "listings"("category_id");

-- CreateIndex
CREATE INDEX "listings_visibility_status_idx" ON "listings"("visibility_status");

-- CreateIndex
CREATE INDEX "listings_price_min_idx" ON "listings"("price_min");

-- CreateIndex
CREATE INDEX "listings_price_max_idx" ON "listings"("price_max");

-- CreateIndex
CREATE INDEX "listing_search_index_category_id_idx" ON "listing_search_index"("category_id");

-- CreateIndex
CREATE INDEX "listing_search_index_price_min_idx" ON "listing_search_index"("price_min");

-- CreateIndex
CREATE INDEX "listing_search_index_price_max_idx" ON "listing_search_index"("price_max");

-- CreateIndex
CREATE INDEX "listing_search_index_city_idx" ON "listing_search_index"("city");

-- CreateIndex
CREATE INDEX "listing_search_index_district_idx" ON "listing_search_index"("district");

-- CreateIndex
CREATE INDEX "listing_search_index_province_idx" ON "listing_search_index"("province");

-- CreateIndex
CREATE INDEX "reviews_listing_id_idx" ON "reviews"("listing_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- AddForeignKey
ALTER TABLE "local_tourist" ADD CONSTRAINT "local_tourist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_locations" ADD CONSTRAINT "vendor_locations_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "vendor_locations"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "listing_categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listings" ADD CONSTRAINT "listings_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_media" ADD CONSTRAINT "listing_media_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("listing_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listing_search_index" ADD CONSTRAINT "listing_search_index_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("listing_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_listing_id_fkey" FOREIGN KEY ("listing_id") REFERENCES "listings"("listing_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
