# Vendor Management - Fixed Categories, Types & Locations

## Overview
The system now enforces **fixed categories, listing types, and locations** for vendors. Vendors can only select from predefined options and cannot create new ones.

## API Endpoints

### 1. Get Available Categories (Fixed List)
```
GET /vendor/categories
```
Returns all active categories vendors can choose from.

**Response:**
```json
[
  { "id": 1, "categoryName": "Culture" },
  { "id": 2, "categoryName": "Nature" },
  { "id": 3, "categoryName": "Food" },
  { "id": 4, "categoryName": "Wildlife" },
  { "id": 5, "categoryName": "Adventure" },
  { "id": 6, "categoryName": "Historical Sites" },
  { "id": 7, "categoryName": "Wellness/Spa" },
  { "id": 8, "categoryName": "Handicrafts & Textiles" },
  { "id": 9, "categoryName": "Gemstones & Jewelry" },
  { "id": 10, "categoryName": "Tea & Spices" }
]
```

### 2. Get Available Listing Types (Fixed Enum)
```
GET /vendor/listing-types
```
Returns the two fixed listing types.

**Response:**
```json
[
  { "value": "EXPERIENCE", "label": "Experience" },
  { "value": "PRODUCT", "label": "Product" }
]
```

### 3. Get Vendor Locations (Fixed Per Vendor)
```
GET /vendor/:vendorId/locations
```
Returns only the locations registered for this specific vendor.

**Response:**
```json
[
  {
    "id": 1,
    "city": "Kandy",
    "district": "Kandy",
    "province": "Central",
    "isMainLocation": true
  }
]
```

### 4. Create a Listing (Validated)
```
POST /vendor/:vendorId/listings
```

**Request Body:**
```json
{
  "categoryId": 6,  // Must be a valid category ID from /vendor/categories
  "addressId": 1,   // Must be a valid location ID from /vendor/:vendorId/locations
  "listingType": "EXPERIENCE",  // Must be either "EXPERIENCE" or "PRODUCT"
  "title": "Ancient City Tour",
  "shortDescription": "Explore ancient ruins",
  "longDescription": "...",
  "priceMin": 5500,
  "priceMax": 7000,
  "duration": "4 hours",
  "capacity": 10,
  "tags": ["History", "Culture"],
  "inclusions": {...},
  "specs": {...}
}
```

**Validation Rules:**
- `categoryId`: Must exist in the ListingCategory table and be active
- `addressId`: Must exist and belong to the vendor making the request
- `listingType`: Must be either "EXPERIENCE" or "PRODUCT" (enum)
- All other fields validated for type and length

**Error Responses:**
```json
// Invalid category
{
  "statusCode": 400,
  "message": "Invalid category. Please select from available categories."
}

// Invalid location
{
  "statusCode": 400,
  "message": "Invalid location. Please select from your registered locations."
}

// Location doesn't belong to vendor
{
  "statusCode": 400,
  "message": "You can only create listings for your own locations."
}
```

### 5. Update a Listing (Validated)
```
PUT /vendor/:vendorId/listings/:listingId
```
Same validation rules apply. Only the vendor who owns the listing can update it.

### 6. Get Vendor Listings
```
GET /vendor/:vendorId/listings
```

### 7. Delete a Listing
```
DELETE /vendor/:vendorId/listings/:listingId
```

## Database Constraints

### Categories (Fixed via Database)
- Stored in `listing_categories` table
- Vendors reference via foreign key `categoryId`
- Only active categories are available
- Controlled by admins only

### Listing Types (Fixed via Enum)
- Database enum: `EXPERIENCE` or `PRODUCT`
- Cannot add new types without database migration
- Enforced at database and application level

### Locations (Fixed Per Vendor)
- Stored in `vendor_locations` table
- Each vendor has their own set of locations
- Vendors can only use their own locations
- Controlled by vendor registration process

## How to Add New Categories (Admin Only)

1. Insert into database:
```sql
INSERT INTO listing_categories (category_name, is_active) 
VALUES ('New Category', true);
```

2. Or add to seed file and re-run seed:
```typescript
// In prisma/seed.ts, add to listingSeed array
{
  category: 'New Category',
  // ... other fields
}
```

## Frontend Integration

The frontend filter automatically fetches categories from `/marketplace/filters`, which returns all active categories. No frontend changes needed when adding new categories.

For vendor forms, use these endpoints:
1. Fetch categories: `GET /vendor/categories`
2. Fetch listing types: `GET /vendor/listing-types`
3. Fetch vendor locations: `GET /vendor/:vendorId/locations`

Display as dropdown selects - users cannot enter custom values.

## Benefits

✅ **Data Integrity**: Categories, types, and locations are controlled and consistent
✅ **No Duplicates**: Prevents vendors from creating duplicate categories with typos
✅ **Better Filtering**: Consistent naming enables accurate search and filtering
✅ **Maintainability**: Admins control the taxonomy
✅ **Validation**: Automatic validation at API level prevents invalid data
