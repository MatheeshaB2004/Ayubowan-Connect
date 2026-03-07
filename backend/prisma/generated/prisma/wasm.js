
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  fullName: 'fullName',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  lastLoginAt: 'lastLoginAt',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.LocalTouristScalarFieldEnum = {
  userId: 'userId',
  fullName: 'fullName',
  profilePhotoUrl: 'profilePhotoUrl',
  userType: 'userType',
  nationality: 'nationality',
  dateOfBirth: 'dateOfBirth',
  preferredLanguage: 'preferredLanguage',
  interests: 'interests',
  isProUser: 'isProUser',
  proSubscriptionExpiry: 'proSubscriptionExpiry',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VendorScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  businessName: 'businessName',
  shortTagline: 'shortTagline',
  establishedYear: 'establishedYear',
  ratingAverage: 'ratingAverage',
  ratingCount: 'ratingCount',
  verifiedStatus: 'verifiedStatus',
  profileComplete: 'profileComplete',
  lastActiveAt: 'lastActiveAt',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VendorLocationScalarFieldEnum = {
  id: 'id',
  vendorId: 'vendorId',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  city: 'city',
  district: 'district',
  province: 'province',
  postalCode: 'postalCode',
  latitude: 'latitude',
  longitude: 'longitude',
  isMainLocation: 'isMainLocation'
};

exports.Prisma.ListingCategoryScalarFieldEnum = {
  id: 'id',
  categoryName: 'categoryName',
  isActive: 'isActive'
};

exports.Prisma.ListingScalarFieldEnum = {
  id: 'id',
  vendorId: 'vendorId',
  categoryId: 'categoryId',
  addressId: 'addressId',
  title: 'title',
  shortDescription: 'shortDescription',
  longDescription: 'longDescription',
  priceMin: 'priceMin',
  priceMax: 'priceMax',
  priceNote: 'priceNote',
  duration: 'duration',
  capacity: 'capacity',
  availability: 'availability',
  ratingAverage: 'ratingAverage',
  ratingCount: 'ratingCount',
  viewsCount: 'viewsCount',
  visibilityStatus: 'visibilityStatus',
  isFeatured: 'isFeatured',
  displayPriority: 'displayPriority',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ListingMediaScalarFieldEnum = {
  id: 'id',
  listingId: 'listingId',
  mediaType: 'mediaType',
  mediaUrl: 'mediaUrl',
  caption: 'caption',
  displayOrder: 'displayOrder',
  isPrimary: 'isPrimary',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  revoked: 'revoked',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.ListingSearchIndexScalarFieldEnum = {
  listingId: 'listingId',
  categoryId: 'categoryId',
  priceMin: 'priceMin',
  priceMax: 'priceMax',
  city: 'city',
  district: 'district',
  province: 'province'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.LocalUserType = exports.$Enums.LocalUserType = {
  LOCAL: 'LOCAL',
  TOURIST: 'TOURIST'
};

exports.VerifiedStatus = exports.$Enums.VerifiedStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

exports.VisibilityStatus = exports.$Enums.VisibilityStatus = {
  DRAFT: 'DRAFT',
  PENDING_REVIEW: 'PENDING_REVIEW',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.MediaType = exports.$Enums.MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

exports.Prisma.ModelName = {
  User: 'User',
  LocalTourist: 'LocalTourist',
  Vendor: 'Vendor',
  VendorLocation: 'VendorLocation',
  ListingCategory: 'ListingCategory',
  Listing: 'Listing',
  ListingMedia: 'ListingMedia',
  RefreshToken: 'RefreshToken',
  ListingSearchIndex: 'ListingSearchIndex'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
