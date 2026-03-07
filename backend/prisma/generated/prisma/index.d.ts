
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model LocalTourist
 * 
 */
export type LocalTourist = $Result.DefaultSelection<Prisma.$LocalTouristPayload>
/**
 * Model Vendor
 * 
 */
export type Vendor = $Result.DefaultSelection<Prisma.$VendorPayload>
/**
 * Model VendorLocation
 * 
 */
export type VendorLocation = $Result.DefaultSelection<Prisma.$VendorLocationPayload>
/**
 * Model ListingCategory
 * 
 */
export type ListingCategory = $Result.DefaultSelection<Prisma.$ListingCategoryPayload>
/**
 * Model Listing
 * 
 */
export type Listing = $Result.DefaultSelection<Prisma.$ListingPayload>
/**
 * Model ListingMedia
 * 
 */
export type ListingMedia = $Result.DefaultSelection<Prisma.$ListingMediaPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model ListingSearchIndex
 * 
 */
export type ListingSearchIndex = $Result.DefaultSelection<Prisma.$ListingSearchIndexPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const LocalUserType: {
  LOCAL: 'LOCAL',
  TOURIST: 'TOURIST'
};

export type LocalUserType = (typeof LocalUserType)[keyof typeof LocalUserType]


export const VerifiedStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

export type VerifiedStatus = (typeof VerifiedStatus)[keyof typeof VerifiedStatus]


export const VisibilityStatus: {
  DRAFT: 'DRAFT',
  PENDING_REVIEW: 'PENDING_REVIEW',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

export type VisibilityStatus = (typeof VisibilityStatus)[keyof typeof VisibilityStatus]


export const MediaType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type LocalUserType = $Enums.LocalUserType

export const LocalUserType: typeof $Enums.LocalUserType

export type VerifiedStatus = $Enums.VerifiedStatus

export const VerifiedStatus: typeof $Enums.VerifiedStatus

export type VisibilityStatus = $Enums.VisibilityStatus

export const VisibilityStatus: typeof $Enums.VisibilityStatus

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.localTourist`: Exposes CRUD operations for the **LocalTourist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LocalTourists
    * const localTourists = await prisma.localTourist.findMany()
    * ```
    */
  get localTourist(): Prisma.LocalTouristDelegate<ExtArgs>;

  /**
   * `prisma.vendor`: Exposes CRUD operations for the **Vendor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vendors
    * const vendors = await prisma.vendor.findMany()
    * ```
    */
  get vendor(): Prisma.VendorDelegate<ExtArgs>;

  /**
   * `prisma.vendorLocation`: Exposes CRUD operations for the **VendorLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VendorLocations
    * const vendorLocations = await prisma.vendorLocation.findMany()
    * ```
    */
  get vendorLocation(): Prisma.VendorLocationDelegate<ExtArgs>;

  /**
   * `prisma.listingCategory`: Exposes CRUD operations for the **ListingCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListingCategories
    * const listingCategories = await prisma.listingCategory.findMany()
    * ```
    */
  get listingCategory(): Prisma.ListingCategoryDelegate<ExtArgs>;

  /**
   * `prisma.listing`: Exposes CRUD operations for the **Listing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Listings
    * const listings = await prisma.listing.findMany()
    * ```
    */
  get listing(): Prisma.ListingDelegate<ExtArgs>;

  /**
   * `prisma.listingMedia`: Exposes CRUD operations for the **ListingMedia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListingMedias
    * const listingMedias = await prisma.listingMedia.findMany()
    * ```
    */
  get listingMedia(): Prisma.ListingMediaDelegate<ExtArgs>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs>;

  /**
   * `prisma.listingSearchIndex`: Exposes CRUD operations for the **ListingSearchIndex** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListingSearchIndices
    * const listingSearchIndices = await prisma.listingSearchIndex.findMany()
    * ```
    */
  get listingSearchIndex(): Prisma.ListingSearchIndexDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "localTourist" | "vendor" | "vendorLocation" | "listingCategory" | "listing" | "listingMedia" | "refreshToken" | "listingSearchIndex"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      LocalTourist: {
        payload: Prisma.$LocalTouristPayload<ExtArgs>
        fields: Prisma.LocalTouristFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocalTouristFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocalTouristFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>
          }
          findFirst: {
            args: Prisma.LocalTouristFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocalTouristFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>
          }
          findMany: {
            args: Prisma.LocalTouristFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>[]
          }
          create: {
            args: Prisma.LocalTouristCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>
          }
          createMany: {
            args: Prisma.LocalTouristCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocalTouristCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>[]
          }
          delete: {
            args: Prisma.LocalTouristDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>
          }
          update: {
            args: Prisma.LocalTouristUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>
          }
          deleteMany: {
            args: Prisma.LocalTouristDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocalTouristUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LocalTouristUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalTouristPayload>
          }
          aggregate: {
            args: Prisma.LocalTouristAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocalTourist>
          }
          groupBy: {
            args: Prisma.LocalTouristGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocalTouristGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocalTouristCountArgs<ExtArgs>
            result: $Utils.Optional<LocalTouristCountAggregateOutputType> | number
          }
        }
      }
      Vendor: {
        payload: Prisma.$VendorPayload<ExtArgs>
        fields: Prisma.VendorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findFirst: {
            args: Prisma.VendorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          findMany: {
            args: Prisma.VendorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          create: {
            args: Prisma.VendorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          createMany: {
            args: Prisma.VendorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>[]
          }
          delete: {
            args: Prisma.VendorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          update: {
            args: Prisma.VendorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          deleteMany: {
            args: Prisma.VendorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VendorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorPayload>
          }
          aggregate: {
            args: Prisma.VendorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendor>
          }
          groupBy: {
            args: Prisma.VendorGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorCountArgs<ExtArgs>
            result: $Utils.Optional<VendorCountAggregateOutputType> | number
          }
        }
      }
      VendorLocation: {
        payload: Prisma.$VendorLocationPayload<ExtArgs>
        fields: Prisma.VendorLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VendorLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VendorLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>
          }
          findFirst: {
            args: Prisma.VendorLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VendorLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>
          }
          findMany: {
            args: Prisma.VendorLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>[]
          }
          create: {
            args: Prisma.VendorLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>
          }
          createMany: {
            args: Prisma.VendorLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VendorLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>[]
          }
          delete: {
            args: Prisma.VendorLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>
          }
          update: {
            args: Prisma.VendorLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>
          }
          deleteMany: {
            args: Prisma.VendorLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VendorLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VendorLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VendorLocationPayload>
          }
          aggregate: {
            args: Prisma.VendorLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVendorLocation>
          }
          groupBy: {
            args: Prisma.VendorLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VendorLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VendorLocationCountArgs<ExtArgs>
            result: $Utils.Optional<VendorLocationCountAggregateOutputType> | number
          }
        }
      }
      ListingCategory: {
        payload: Prisma.$ListingCategoryPayload<ExtArgs>
        fields: Prisma.ListingCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>
          }
          findFirst: {
            args: Prisma.ListingCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>
          }
          findMany: {
            args: Prisma.ListingCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>[]
          }
          create: {
            args: Prisma.ListingCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>
          }
          createMany: {
            args: Prisma.ListingCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>[]
          }
          delete: {
            args: Prisma.ListingCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>
          }
          update: {
            args: Prisma.ListingCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ListingCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListingCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingCategoryPayload>
          }
          aggregate: {
            args: Prisma.ListingCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListingCategory>
          }
          groupBy: {
            args: Prisma.ListingCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCategoryCountAggregateOutputType> | number
          }
        }
      }
      Listing: {
        payload: Prisma.$ListingPayload<ExtArgs>
        fields: Prisma.ListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findFirst: {
            args: Prisma.ListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          findMany: {
            args: Prisma.ListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          create: {
            args: Prisma.ListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          createMany: {
            args: Prisma.ListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>[]
          }
          delete: {
            args: Prisma.ListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          update: {
            args: Prisma.ListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          deleteMany: {
            args: Prisma.ListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingPayload>
          }
          aggregate: {
            args: Prisma.ListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListing>
          }
          groupBy: {
            args: Prisma.ListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingCountArgs<ExtArgs>
            result: $Utils.Optional<ListingCountAggregateOutputType> | number
          }
        }
      }
      ListingMedia: {
        payload: Prisma.$ListingMediaPayload<ExtArgs>
        fields: Prisma.ListingMediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingMediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingMediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>
          }
          findFirst: {
            args: Prisma.ListingMediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingMediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>
          }
          findMany: {
            args: Prisma.ListingMediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>[]
          }
          create: {
            args: Prisma.ListingMediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>
          }
          createMany: {
            args: Prisma.ListingMediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingMediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>[]
          }
          delete: {
            args: Prisma.ListingMediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>
          }
          update: {
            args: Prisma.ListingMediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>
          }
          deleteMany: {
            args: Prisma.ListingMediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingMediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListingMediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingMediaPayload>
          }
          aggregate: {
            args: Prisma.ListingMediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListingMedia>
          }
          groupBy: {
            args: Prisma.ListingMediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingMediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingMediaCountArgs<ExtArgs>
            result: $Utils.Optional<ListingMediaCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      ListingSearchIndex: {
        payload: Prisma.$ListingSearchIndexPayload<ExtArgs>
        fields: Prisma.ListingSearchIndexFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListingSearchIndexFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListingSearchIndexFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>
          }
          findFirst: {
            args: Prisma.ListingSearchIndexFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListingSearchIndexFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>
          }
          findMany: {
            args: Prisma.ListingSearchIndexFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>[]
          }
          create: {
            args: Prisma.ListingSearchIndexCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>
          }
          createMany: {
            args: Prisma.ListingSearchIndexCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListingSearchIndexCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>[]
          }
          delete: {
            args: Prisma.ListingSearchIndexDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>
          }
          update: {
            args: Prisma.ListingSearchIndexUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>
          }
          deleteMany: {
            args: Prisma.ListingSearchIndexDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListingSearchIndexUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ListingSearchIndexUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListingSearchIndexPayload>
          }
          aggregate: {
            args: Prisma.ListingSearchIndexAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListingSearchIndex>
          }
          groupBy: {
            args: Prisma.ListingSearchIndexGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListingSearchIndexGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListingSearchIndexCountArgs<ExtArgs>
            result: $Utils.Optional<ListingSearchIndexCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type VendorCountOutputType
   */

  export type VendorCountOutputType = {
    locations: number
    listings: number
  }

  export type VendorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | VendorCountOutputTypeCountLocationsArgs
    listings?: boolean | VendorCountOutputTypeCountListingsArgs
  }

  // Custom InputTypes
  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorCountOutputType
     */
    select?: VendorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorLocationWhereInput
  }

  /**
   * VendorCountOutputType without action
   */
  export type VendorCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }


  /**
   * Count Type VendorLocationCountOutputType
   */

  export type VendorLocationCountOutputType = {
    listings: number
  }

  export type VendorLocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | VendorLocationCountOutputTypeCountListingsArgs
  }

  // Custom InputTypes
  /**
   * VendorLocationCountOutputType without action
   */
  export type VendorLocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocationCountOutputType
     */
    select?: VendorLocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VendorLocationCountOutputType without action
   */
  export type VendorLocationCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }


  /**
   * Count Type ListingCategoryCountOutputType
   */

  export type ListingCategoryCountOutputType = {
    listings: number
  }

  export type ListingCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | ListingCategoryCountOutputTypeCountListingsArgs
  }

  // Custom InputTypes
  /**
   * ListingCategoryCountOutputType without action
   */
  export type ListingCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategoryCountOutputType
     */
    select?: ListingCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListingCategoryCountOutputType without action
   */
  export type ListingCategoryCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
  }


  /**
   * Count Type ListingCountOutputType
   */

  export type ListingCountOutputType = {
    media: number
  }

  export type ListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | ListingCountOutputTypeCountMediaArgs
  }

  // Custom InputTypes
  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCountOutputType
     */
    select?: ListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListingCountOutputType without action
   */
  export type ListingCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingMediaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    fullName: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    lastLoginAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    fullName: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    lastLoginAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    passwordHash: number
    role: number
    lastLoginAt: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    passwordHash?: true
    role?: true
    lastLoginAt?: true
    isActive?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    passwordHash?: true
    role?: true
    lastLoginAt?: true
    isActive?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    passwordHash?: true
    role?: true
    lastLoginAt?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    fullName: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    lastLoginAt: Date | null
    isActive: boolean
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLoginAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    vendor?: boolean | User$vendorArgs<ExtArgs>
    localTourist?: boolean | User$localTouristArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLoginAt?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLoginAt?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | User$vendorArgs<ExtArgs>
    localTourist?: boolean | User$localTouristArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      vendor: Prisma.$VendorPayload<ExtArgs> | null
      localTourist: Prisma.$LocalTouristPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fullName: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      lastLoginAt: Date | null
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends User$vendorArgs<ExtArgs> = {}>(args?: Subset<T, User$vendorArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    localTourist<T extends User$localTouristArgs<ExtArgs> = {}>(args?: Subset<T, User$localTouristArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.vendor
   */
  export type User$vendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    where?: VendorWhereInput
  }

  /**
   * User.localTourist
   */
  export type User$localTouristArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    where?: LocalTouristWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model LocalTourist
   */

  export type AggregateLocalTourist = {
    _count: LocalTouristCountAggregateOutputType | null
    _avg: LocalTouristAvgAggregateOutputType | null
    _sum: LocalTouristSumAggregateOutputType | null
    _min: LocalTouristMinAggregateOutputType | null
    _max: LocalTouristMaxAggregateOutputType | null
  }

  export type LocalTouristAvgAggregateOutputType = {
    userId: number | null
  }

  export type LocalTouristSumAggregateOutputType = {
    userId: number | null
  }

  export type LocalTouristMinAggregateOutputType = {
    userId: number | null
    fullName: string | null
    profilePhotoUrl: string | null
    userType: $Enums.LocalUserType | null
    nationality: string | null
    dateOfBirth: Date | null
    preferredLanguage: string | null
    isProUser: boolean | null
    proSubscriptionExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocalTouristMaxAggregateOutputType = {
    userId: number | null
    fullName: string | null
    profilePhotoUrl: string | null
    userType: $Enums.LocalUserType | null
    nationality: string | null
    dateOfBirth: Date | null
    preferredLanguage: string | null
    isProUser: boolean | null
    proSubscriptionExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LocalTouristCountAggregateOutputType = {
    userId: number
    fullName: number
    profilePhotoUrl: number
    userType: number
    nationality: number
    dateOfBirth: number
    preferredLanguage: number
    interests: number
    isProUser: number
    proSubscriptionExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LocalTouristAvgAggregateInputType = {
    userId?: true
  }

  export type LocalTouristSumAggregateInputType = {
    userId?: true
  }

  export type LocalTouristMinAggregateInputType = {
    userId?: true
    fullName?: true
    profilePhotoUrl?: true
    userType?: true
    nationality?: true
    dateOfBirth?: true
    preferredLanguage?: true
    isProUser?: true
    proSubscriptionExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocalTouristMaxAggregateInputType = {
    userId?: true
    fullName?: true
    profilePhotoUrl?: true
    userType?: true
    nationality?: true
    dateOfBirth?: true
    preferredLanguage?: true
    isProUser?: true
    proSubscriptionExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LocalTouristCountAggregateInputType = {
    userId?: true
    fullName?: true
    profilePhotoUrl?: true
    userType?: true
    nationality?: true
    dateOfBirth?: true
    preferredLanguage?: true
    interests?: true
    isProUser?: true
    proSubscriptionExpiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LocalTouristAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocalTourist to aggregate.
     */
    where?: LocalTouristWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalTourists to fetch.
     */
    orderBy?: LocalTouristOrderByWithRelationInput | LocalTouristOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocalTouristWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalTourists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalTourists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LocalTourists
    **/
    _count?: true | LocalTouristCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocalTouristAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocalTouristSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocalTouristMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocalTouristMaxAggregateInputType
  }

  export type GetLocalTouristAggregateType<T extends LocalTouristAggregateArgs> = {
        [P in keyof T & keyof AggregateLocalTourist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocalTourist[P]>
      : GetScalarType<T[P], AggregateLocalTourist[P]>
  }




  export type LocalTouristGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocalTouristWhereInput
    orderBy?: LocalTouristOrderByWithAggregationInput | LocalTouristOrderByWithAggregationInput[]
    by: LocalTouristScalarFieldEnum[] | LocalTouristScalarFieldEnum
    having?: LocalTouristScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocalTouristCountAggregateInputType | true
    _avg?: LocalTouristAvgAggregateInputType
    _sum?: LocalTouristSumAggregateInputType
    _min?: LocalTouristMinAggregateInputType
    _max?: LocalTouristMaxAggregateInputType
  }

  export type LocalTouristGroupByOutputType = {
    userId: number
    fullName: string
    profilePhotoUrl: string | null
    userType: $Enums.LocalUserType
    nationality: string | null
    dateOfBirth: Date | null
    preferredLanguage: string
    interests: JsonValue | null
    isProUser: boolean
    proSubscriptionExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: LocalTouristCountAggregateOutputType | null
    _avg: LocalTouristAvgAggregateOutputType | null
    _sum: LocalTouristSumAggregateOutputType | null
    _min: LocalTouristMinAggregateOutputType | null
    _max: LocalTouristMaxAggregateOutputType | null
  }

  type GetLocalTouristGroupByPayload<T extends LocalTouristGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocalTouristGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocalTouristGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocalTouristGroupByOutputType[P]>
            : GetScalarType<T[P], LocalTouristGroupByOutputType[P]>
        }
      >
    >


  export type LocalTouristSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    fullName?: boolean
    profilePhotoUrl?: boolean
    userType?: boolean
    nationality?: boolean
    dateOfBirth?: boolean
    preferredLanguage?: boolean
    interests?: boolean
    isProUser?: boolean
    proSubscriptionExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["localTourist"]>

  export type LocalTouristSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    fullName?: boolean
    profilePhotoUrl?: boolean
    userType?: boolean
    nationality?: boolean
    dateOfBirth?: boolean
    preferredLanguage?: boolean
    interests?: boolean
    isProUser?: boolean
    proSubscriptionExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["localTourist"]>

  export type LocalTouristSelectScalar = {
    userId?: boolean
    fullName?: boolean
    profilePhotoUrl?: boolean
    userType?: boolean
    nationality?: boolean
    dateOfBirth?: boolean
    preferredLanguage?: boolean
    interests?: boolean
    isProUser?: boolean
    proSubscriptionExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LocalTouristInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LocalTouristIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LocalTouristPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LocalTourist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      fullName: string
      profilePhotoUrl: string | null
      userType: $Enums.LocalUserType
      nationality: string | null
      dateOfBirth: Date | null
      preferredLanguage: string
      interests: Prisma.JsonValue | null
      isProUser: boolean
      proSubscriptionExpiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["localTourist"]>
    composites: {}
  }

  type LocalTouristGetPayload<S extends boolean | null | undefined | LocalTouristDefaultArgs> = $Result.GetResult<Prisma.$LocalTouristPayload, S>

  type LocalTouristCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LocalTouristFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LocalTouristCountAggregateInputType | true
    }

  export interface LocalTouristDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LocalTourist'], meta: { name: 'LocalTourist' } }
    /**
     * Find zero or one LocalTourist that matches the filter.
     * @param {LocalTouristFindUniqueArgs} args - Arguments to find a LocalTourist
     * @example
     * // Get one LocalTourist
     * const localTourist = await prisma.localTourist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocalTouristFindUniqueArgs>(args: SelectSubset<T, LocalTouristFindUniqueArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LocalTourist that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LocalTouristFindUniqueOrThrowArgs} args - Arguments to find a LocalTourist
     * @example
     * // Get one LocalTourist
     * const localTourist = await prisma.localTourist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocalTouristFindUniqueOrThrowArgs>(args: SelectSubset<T, LocalTouristFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LocalTourist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalTouristFindFirstArgs} args - Arguments to find a LocalTourist
     * @example
     * // Get one LocalTourist
     * const localTourist = await prisma.localTourist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocalTouristFindFirstArgs>(args?: SelectSubset<T, LocalTouristFindFirstArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LocalTourist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalTouristFindFirstOrThrowArgs} args - Arguments to find a LocalTourist
     * @example
     * // Get one LocalTourist
     * const localTourist = await prisma.localTourist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocalTouristFindFirstOrThrowArgs>(args?: SelectSubset<T, LocalTouristFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LocalTourists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalTouristFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocalTourists
     * const localTourists = await prisma.localTourist.findMany()
     * 
     * // Get first 10 LocalTourists
     * const localTourists = await prisma.localTourist.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const localTouristWithUserIdOnly = await prisma.localTourist.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends LocalTouristFindManyArgs>(args?: SelectSubset<T, LocalTouristFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LocalTourist.
     * @param {LocalTouristCreateArgs} args - Arguments to create a LocalTourist.
     * @example
     * // Create one LocalTourist
     * const LocalTourist = await prisma.localTourist.create({
     *   data: {
     *     // ... data to create a LocalTourist
     *   }
     * })
     * 
     */
    create<T extends LocalTouristCreateArgs>(args: SelectSubset<T, LocalTouristCreateArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LocalTourists.
     * @param {LocalTouristCreateManyArgs} args - Arguments to create many LocalTourists.
     * @example
     * // Create many LocalTourists
     * const localTourist = await prisma.localTourist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocalTouristCreateManyArgs>(args?: SelectSubset<T, LocalTouristCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LocalTourists and returns the data saved in the database.
     * @param {LocalTouristCreateManyAndReturnArgs} args - Arguments to create many LocalTourists.
     * @example
     * // Create many LocalTourists
     * const localTourist = await prisma.localTourist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LocalTourists and only return the `userId`
     * const localTouristWithUserIdOnly = await prisma.localTourist.createManyAndReturn({ 
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocalTouristCreateManyAndReturnArgs>(args?: SelectSubset<T, LocalTouristCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LocalTourist.
     * @param {LocalTouristDeleteArgs} args - Arguments to delete one LocalTourist.
     * @example
     * // Delete one LocalTourist
     * const LocalTourist = await prisma.localTourist.delete({
     *   where: {
     *     // ... filter to delete one LocalTourist
     *   }
     * })
     * 
     */
    delete<T extends LocalTouristDeleteArgs>(args: SelectSubset<T, LocalTouristDeleteArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LocalTourist.
     * @param {LocalTouristUpdateArgs} args - Arguments to update one LocalTourist.
     * @example
     * // Update one LocalTourist
     * const localTourist = await prisma.localTourist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocalTouristUpdateArgs>(args: SelectSubset<T, LocalTouristUpdateArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LocalTourists.
     * @param {LocalTouristDeleteManyArgs} args - Arguments to filter LocalTourists to delete.
     * @example
     * // Delete a few LocalTourists
     * const { count } = await prisma.localTourist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocalTouristDeleteManyArgs>(args?: SelectSubset<T, LocalTouristDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocalTourists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalTouristUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocalTourists
     * const localTourist = await prisma.localTourist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocalTouristUpdateManyArgs>(args: SelectSubset<T, LocalTouristUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LocalTourist.
     * @param {LocalTouristUpsertArgs} args - Arguments to update or create a LocalTourist.
     * @example
     * // Update or create a LocalTourist
     * const localTourist = await prisma.localTourist.upsert({
     *   create: {
     *     // ... data to create a LocalTourist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocalTourist we want to update
     *   }
     * })
     */
    upsert<T extends LocalTouristUpsertArgs>(args: SelectSubset<T, LocalTouristUpsertArgs<ExtArgs>>): Prisma__LocalTouristClient<$Result.GetResult<Prisma.$LocalTouristPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LocalTourists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalTouristCountArgs} args - Arguments to filter LocalTourists to count.
     * @example
     * // Count the number of LocalTourists
     * const count = await prisma.localTourist.count({
     *   where: {
     *     // ... the filter for the LocalTourists we want to count
     *   }
     * })
    **/
    count<T extends LocalTouristCountArgs>(
      args?: Subset<T, LocalTouristCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocalTouristCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LocalTourist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalTouristAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocalTouristAggregateArgs>(args: Subset<T, LocalTouristAggregateArgs>): Prisma.PrismaPromise<GetLocalTouristAggregateType<T>>

    /**
     * Group by LocalTourist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalTouristGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocalTouristGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocalTouristGroupByArgs['orderBy'] }
        : { orderBy?: LocalTouristGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocalTouristGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocalTouristGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LocalTourist model
   */
  readonly fields: LocalTouristFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LocalTourist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocalTouristClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LocalTourist model
   */ 
  interface LocalTouristFieldRefs {
    readonly userId: FieldRef<"LocalTourist", 'Int'>
    readonly fullName: FieldRef<"LocalTourist", 'String'>
    readonly profilePhotoUrl: FieldRef<"LocalTourist", 'String'>
    readonly userType: FieldRef<"LocalTourist", 'LocalUserType'>
    readonly nationality: FieldRef<"LocalTourist", 'String'>
    readonly dateOfBirth: FieldRef<"LocalTourist", 'DateTime'>
    readonly preferredLanguage: FieldRef<"LocalTourist", 'String'>
    readonly interests: FieldRef<"LocalTourist", 'Json'>
    readonly isProUser: FieldRef<"LocalTourist", 'Boolean'>
    readonly proSubscriptionExpiry: FieldRef<"LocalTourist", 'DateTime'>
    readonly createdAt: FieldRef<"LocalTourist", 'DateTime'>
    readonly updatedAt: FieldRef<"LocalTourist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LocalTourist findUnique
   */
  export type LocalTouristFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * Filter, which LocalTourist to fetch.
     */
    where: LocalTouristWhereUniqueInput
  }

  /**
   * LocalTourist findUniqueOrThrow
   */
  export type LocalTouristFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * Filter, which LocalTourist to fetch.
     */
    where: LocalTouristWhereUniqueInput
  }

  /**
   * LocalTourist findFirst
   */
  export type LocalTouristFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * Filter, which LocalTourist to fetch.
     */
    where?: LocalTouristWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalTourists to fetch.
     */
    orderBy?: LocalTouristOrderByWithRelationInput | LocalTouristOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocalTourists.
     */
    cursor?: LocalTouristWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalTourists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalTourists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocalTourists.
     */
    distinct?: LocalTouristScalarFieldEnum | LocalTouristScalarFieldEnum[]
  }

  /**
   * LocalTourist findFirstOrThrow
   */
  export type LocalTouristFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * Filter, which LocalTourist to fetch.
     */
    where?: LocalTouristWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalTourists to fetch.
     */
    orderBy?: LocalTouristOrderByWithRelationInput | LocalTouristOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocalTourists.
     */
    cursor?: LocalTouristWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalTourists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalTourists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocalTourists.
     */
    distinct?: LocalTouristScalarFieldEnum | LocalTouristScalarFieldEnum[]
  }

  /**
   * LocalTourist findMany
   */
  export type LocalTouristFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * Filter, which LocalTourists to fetch.
     */
    where?: LocalTouristWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalTourists to fetch.
     */
    orderBy?: LocalTouristOrderByWithRelationInput | LocalTouristOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LocalTourists.
     */
    cursor?: LocalTouristWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalTourists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalTourists.
     */
    skip?: number
    distinct?: LocalTouristScalarFieldEnum | LocalTouristScalarFieldEnum[]
  }

  /**
   * LocalTourist create
   */
  export type LocalTouristCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * The data needed to create a LocalTourist.
     */
    data: XOR<LocalTouristCreateInput, LocalTouristUncheckedCreateInput>
  }

  /**
   * LocalTourist createMany
   */
  export type LocalTouristCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocalTourists.
     */
    data: LocalTouristCreateManyInput | LocalTouristCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocalTourist createManyAndReturn
   */
  export type LocalTouristCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LocalTourists.
     */
    data: LocalTouristCreateManyInput | LocalTouristCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LocalTourist update
   */
  export type LocalTouristUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * The data needed to update a LocalTourist.
     */
    data: XOR<LocalTouristUpdateInput, LocalTouristUncheckedUpdateInput>
    /**
     * Choose, which LocalTourist to update.
     */
    where: LocalTouristWhereUniqueInput
  }

  /**
   * LocalTourist updateMany
   */
  export type LocalTouristUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LocalTourists.
     */
    data: XOR<LocalTouristUpdateManyMutationInput, LocalTouristUncheckedUpdateManyInput>
    /**
     * Filter which LocalTourists to update
     */
    where?: LocalTouristWhereInput
  }

  /**
   * LocalTourist upsert
   */
  export type LocalTouristUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * The filter to search for the LocalTourist to update in case it exists.
     */
    where: LocalTouristWhereUniqueInput
    /**
     * In case the LocalTourist found by the `where` argument doesn't exist, create a new LocalTourist with this data.
     */
    create: XOR<LocalTouristCreateInput, LocalTouristUncheckedCreateInput>
    /**
     * In case the LocalTourist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocalTouristUpdateInput, LocalTouristUncheckedUpdateInput>
  }

  /**
   * LocalTourist delete
   */
  export type LocalTouristDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
    /**
     * Filter which LocalTourist to delete.
     */
    where: LocalTouristWhereUniqueInput
  }

  /**
   * LocalTourist deleteMany
   */
  export type LocalTouristDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocalTourists to delete
     */
    where?: LocalTouristWhereInput
  }

  /**
   * LocalTourist without action
   */
  export type LocalTouristDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalTourist
     */
    select?: LocalTouristSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocalTouristInclude<ExtArgs> | null
  }


  /**
   * Model Vendor
   */

  export type AggregateVendor = {
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  export type VendorAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    establishedYear: number | null
    ratingAverage: number | null
    ratingCount: number | null
  }

  export type VendorSumAggregateOutputType = {
    id: number | null
    userId: number | null
    establishedYear: number | null
    ratingAverage: number | null
    ratingCount: number | null
  }

  export type VendorMinAggregateOutputType = {
    id: number | null
    userId: number | null
    businessName: string | null
    shortTagline: string | null
    establishedYear: number | null
    ratingAverage: number | null
    ratingCount: number | null
    verifiedStatus: $Enums.VerifiedStatus | null
    profileComplete: boolean | null
    lastActiveAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VendorMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    businessName: string | null
    shortTagline: string | null
    establishedYear: number | null
    ratingAverage: number | null
    ratingCount: number | null
    verifiedStatus: $Enums.VerifiedStatus | null
    profileComplete: boolean | null
    lastActiveAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VendorCountAggregateOutputType = {
    id: number
    userId: number
    businessName: number
    shortTagline: number
    establishedYear: number
    ratingAverage: number
    ratingCount: number
    verifiedStatus: number
    profileComplete: number
    lastActiveAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VendorAvgAggregateInputType = {
    id?: true
    userId?: true
    establishedYear?: true
    ratingAverage?: true
    ratingCount?: true
  }

  export type VendorSumAggregateInputType = {
    id?: true
    userId?: true
    establishedYear?: true
    ratingAverage?: true
    ratingCount?: true
  }

  export type VendorMinAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    shortTagline?: true
    establishedYear?: true
    ratingAverage?: true
    ratingCount?: true
    verifiedStatus?: true
    profileComplete?: true
    lastActiveAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VendorMaxAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    shortTagline?: true
    establishedYear?: true
    ratingAverage?: true
    ratingCount?: true
    verifiedStatus?: true
    profileComplete?: true
    lastActiveAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VendorCountAggregateInputType = {
    id?: true
    userId?: true
    businessName?: true
    shortTagline?: true
    establishedYear?: true
    ratingAverage?: true
    ratingCount?: true
    verifiedStatus?: true
    profileComplete?: true
    lastActiveAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VendorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendor to aggregate.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vendors
    **/
    _count?: true | VendorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorMaxAggregateInputType
  }

  export type GetVendorAggregateType<T extends VendorAggregateArgs> = {
        [P in keyof T & keyof AggregateVendor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendor[P]>
      : GetScalarType<T[P], AggregateVendor[P]>
  }




  export type VendorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorWhereInput
    orderBy?: VendorOrderByWithAggregationInput | VendorOrderByWithAggregationInput[]
    by: VendorScalarFieldEnum[] | VendorScalarFieldEnum
    having?: VendorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorCountAggregateInputType | true
    _avg?: VendorAvgAggregateInputType
    _sum?: VendorSumAggregateInputType
    _min?: VendorMinAggregateInputType
    _max?: VendorMaxAggregateInputType
  }

  export type VendorGroupByOutputType = {
    id: number
    userId: number
    businessName: string
    shortTagline: string | null
    establishedYear: number | null
    ratingAverage: number
    ratingCount: number
    verifiedStatus: $Enums.VerifiedStatus
    profileComplete: boolean
    lastActiveAt: Date | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: VendorCountAggregateOutputType | null
    _avg: VendorAvgAggregateOutputType | null
    _sum: VendorSumAggregateOutputType | null
    _min: VendorMinAggregateOutputType | null
    _max: VendorMaxAggregateOutputType | null
  }

  type GetVendorGroupByPayload<T extends VendorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorGroupByOutputType[P]>
            : GetScalarType<T[P], VendorGroupByOutputType[P]>
        }
      >
    >


  export type VendorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    shortTagline?: boolean
    establishedYear?: boolean
    ratingAverage?: boolean
    ratingCount?: boolean
    verifiedStatus?: boolean
    profileComplete?: boolean
    lastActiveAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    locations?: boolean | Vendor$locationsArgs<ExtArgs>
    listings?: boolean | Vendor$listingsArgs<ExtArgs>
    _count?: boolean | VendorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    businessName?: boolean
    shortTagline?: boolean
    establishedYear?: boolean
    ratingAverage?: boolean
    ratingCount?: boolean
    verifiedStatus?: boolean
    profileComplete?: boolean
    lastActiveAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendor"]>

  export type VendorSelectScalar = {
    id?: boolean
    userId?: boolean
    businessName?: boolean
    shortTagline?: boolean
    establishedYear?: boolean
    ratingAverage?: boolean
    ratingCount?: boolean
    verifiedStatus?: boolean
    profileComplete?: boolean
    lastActiveAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VendorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    locations?: boolean | Vendor$locationsArgs<ExtArgs>
    listings?: boolean | Vendor$listingsArgs<ExtArgs>
    _count?: boolean | VendorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VendorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vendor"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      locations: Prisma.$VendorLocationPayload<ExtArgs>[]
      listings: Prisma.$ListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      businessName: string
      shortTagline: string | null
      establishedYear: number | null
      ratingAverage: number
      ratingCount: number
      verifiedStatus: $Enums.VerifiedStatus
      profileComplete: boolean
      lastActiveAt: Date | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vendor"]>
    composites: {}
  }

  type VendorGetPayload<S extends boolean | null | undefined | VendorDefaultArgs> = $Result.GetResult<Prisma.$VendorPayload, S>

  type VendorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VendorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VendorCountAggregateInputType | true
    }

  export interface VendorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vendor'], meta: { name: 'Vendor' } }
    /**
     * Find zero or one Vendor that matches the filter.
     * @param {VendorFindUniqueArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorFindUniqueArgs>(args: SelectSubset<T, VendorFindUniqueArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Vendor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VendorFindUniqueOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Vendor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorFindFirstArgs>(args?: SelectSubset<T, VendorFindFirstArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Vendor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindFirstOrThrowArgs} args - Arguments to find a Vendor
     * @example
     * // Get one Vendor
     * const vendor = await prisma.vendor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Vendors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vendors
     * const vendors = await prisma.vendor.findMany()
     * 
     * // Get first 10 Vendors
     * const vendors = await prisma.vendor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorWithIdOnly = await prisma.vendor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorFindManyArgs>(args?: SelectSubset<T, VendorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Vendor.
     * @param {VendorCreateArgs} args - Arguments to create a Vendor.
     * @example
     * // Create one Vendor
     * const Vendor = await prisma.vendor.create({
     *   data: {
     *     // ... data to create a Vendor
     *   }
     * })
     * 
     */
    create<T extends VendorCreateArgs>(args: SelectSubset<T, VendorCreateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Vendors.
     * @param {VendorCreateManyArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorCreateManyArgs>(args?: SelectSubset<T, VendorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vendors and returns the data saved in the database.
     * @param {VendorCreateManyAndReturnArgs} args - Arguments to create many Vendors.
     * @example
     * // Create many Vendors
     * const vendor = await prisma.vendor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vendors and only return the `id`
     * const vendorWithIdOnly = await prisma.vendor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Vendor.
     * @param {VendorDeleteArgs} args - Arguments to delete one Vendor.
     * @example
     * // Delete one Vendor
     * const Vendor = await prisma.vendor.delete({
     *   where: {
     *     // ... filter to delete one Vendor
     *   }
     * })
     * 
     */
    delete<T extends VendorDeleteArgs>(args: SelectSubset<T, VendorDeleteArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Vendor.
     * @param {VendorUpdateArgs} args - Arguments to update one Vendor.
     * @example
     * // Update one Vendor
     * const vendor = await prisma.vendor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorUpdateArgs>(args: SelectSubset<T, VendorUpdateArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Vendors.
     * @param {VendorDeleteManyArgs} args - Arguments to filter Vendors to delete.
     * @example
     * // Delete a few Vendors
     * const { count } = await prisma.vendor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorDeleteManyArgs>(args?: SelectSubset<T, VendorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vendors
     * const vendor = await prisma.vendor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorUpdateManyArgs>(args: SelectSubset<T, VendorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vendor.
     * @param {VendorUpsertArgs} args - Arguments to update or create a Vendor.
     * @example
     * // Update or create a Vendor
     * const vendor = await prisma.vendor.upsert({
     *   create: {
     *     // ... data to create a Vendor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vendor we want to update
     *   }
     * })
     */
    upsert<T extends VendorUpsertArgs>(args: SelectSubset<T, VendorUpsertArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Vendors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorCountArgs} args - Arguments to filter Vendors to count.
     * @example
     * // Count the number of Vendors
     * const count = await prisma.vendor.count({
     *   where: {
     *     // ... the filter for the Vendors we want to count
     *   }
     * })
    **/
    count<T extends VendorCountArgs>(
      args?: Subset<T, VendorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorAggregateArgs>(args: Subset<T, VendorAggregateArgs>): Prisma.PrismaPromise<GetVendorAggregateType<T>>

    /**
     * Group by Vendor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorGroupByArgs['orderBy'] }
        : { orderBy?: VendorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vendor model
   */
  readonly fields: VendorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vendor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    locations<T extends Vendor$locationsArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "findMany"> | Null>
    listings<T extends Vendor$listingsArgs<ExtArgs> = {}>(args?: Subset<T, Vendor$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vendor model
   */ 
  interface VendorFieldRefs {
    readonly id: FieldRef<"Vendor", 'Int'>
    readonly userId: FieldRef<"Vendor", 'Int'>
    readonly businessName: FieldRef<"Vendor", 'String'>
    readonly shortTagline: FieldRef<"Vendor", 'String'>
    readonly establishedYear: FieldRef<"Vendor", 'Int'>
    readonly ratingAverage: FieldRef<"Vendor", 'Float'>
    readonly ratingCount: FieldRef<"Vendor", 'Int'>
    readonly verifiedStatus: FieldRef<"Vendor", 'VerifiedStatus'>
    readonly profileComplete: FieldRef<"Vendor", 'Boolean'>
    readonly lastActiveAt: FieldRef<"Vendor", 'DateTime'>
    readonly isActive: FieldRef<"Vendor", 'Boolean'>
    readonly createdAt: FieldRef<"Vendor", 'DateTime'>
    readonly updatedAt: FieldRef<"Vendor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vendor findUnique
   */
  export type VendorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findUniqueOrThrow
   */
  export type VendorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor findFirst
   */
  export type VendorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findFirstOrThrow
   */
  export type VendorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendor to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vendors.
     */
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor findMany
   */
  export type VendorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter, which Vendors to fetch.
     */
    where?: VendorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vendors to fetch.
     */
    orderBy?: VendorOrderByWithRelationInput | VendorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vendors.
     */
    cursor?: VendorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vendors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vendors.
     */
    skip?: number
    distinct?: VendorScalarFieldEnum | VendorScalarFieldEnum[]
  }

  /**
   * Vendor create
   */
  export type VendorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to create a Vendor.
     */
    data: XOR<VendorCreateInput, VendorUncheckedCreateInput>
  }

  /**
   * Vendor createMany
   */
  export type VendorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vendor createManyAndReturn
   */
  export type VendorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Vendors.
     */
    data: VendorCreateManyInput | VendorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vendor update
   */
  export type VendorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The data needed to update a Vendor.
     */
    data: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
    /**
     * Choose, which Vendor to update.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor updateMany
   */
  export type VendorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vendors.
     */
    data: XOR<VendorUpdateManyMutationInput, VendorUncheckedUpdateManyInput>
    /**
     * Filter which Vendors to update
     */
    where?: VendorWhereInput
  }

  /**
   * Vendor upsert
   */
  export type VendorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * The filter to search for the Vendor to update in case it exists.
     */
    where: VendorWhereUniqueInput
    /**
     * In case the Vendor found by the `where` argument doesn't exist, create a new Vendor with this data.
     */
    create: XOR<VendorCreateInput, VendorUncheckedCreateInput>
    /**
     * In case the Vendor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorUpdateInput, VendorUncheckedUpdateInput>
  }

  /**
   * Vendor delete
   */
  export type VendorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
    /**
     * Filter which Vendor to delete.
     */
    where: VendorWhereUniqueInput
  }

  /**
   * Vendor deleteMany
   */
  export type VendorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vendors to delete
     */
    where?: VendorWhereInput
  }

  /**
   * Vendor.locations
   */
  export type Vendor$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    where?: VendorLocationWhereInput
    orderBy?: VendorLocationOrderByWithRelationInput | VendorLocationOrderByWithRelationInput[]
    cursor?: VendorLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VendorLocationScalarFieldEnum | VendorLocationScalarFieldEnum[]
  }

  /**
   * Vendor.listings
   */
  export type Vendor$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Vendor without action
   */
  export type VendorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vendor
     */
    select?: VendorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorInclude<ExtArgs> | null
  }


  /**
   * Model VendorLocation
   */

  export type AggregateVendorLocation = {
    _count: VendorLocationCountAggregateOutputType | null
    _avg: VendorLocationAvgAggregateOutputType | null
    _sum: VendorLocationSumAggregateOutputType | null
    _min: VendorLocationMinAggregateOutputType | null
    _max: VendorLocationMaxAggregateOutputType | null
  }

  export type VendorLocationAvgAggregateOutputType = {
    id: number | null
    vendorId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type VendorLocationSumAggregateOutputType = {
    id: number | null
    vendorId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type VendorLocationMinAggregateOutputType = {
    id: number | null
    vendorId: number | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    district: string | null
    province: string | null
    postalCode: string | null
    latitude: number | null
    longitude: number | null
    isMainLocation: boolean | null
  }

  export type VendorLocationMaxAggregateOutputType = {
    id: number | null
    vendorId: number | null
    addressLine1: string | null
    addressLine2: string | null
    city: string | null
    district: string | null
    province: string | null
    postalCode: string | null
    latitude: number | null
    longitude: number | null
    isMainLocation: boolean | null
  }

  export type VendorLocationCountAggregateOutputType = {
    id: number
    vendorId: number
    addressLine1: number
    addressLine2: number
    city: number
    district: number
    province: number
    postalCode: number
    latitude: number
    longitude: number
    isMainLocation: number
    _all: number
  }


  export type VendorLocationAvgAggregateInputType = {
    id?: true
    vendorId?: true
    latitude?: true
    longitude?: true
  }

  export type VendorLocationSumAggregateInputType = {
    id?: true
    vendorId?: true
    latitude?: true
    longitude?: true
  }

  export type VendorLocationMinAggregateInputType = {
    id?: true
    vendorId?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    district?: true
    province?: true
    postalCode?: true
    latitude?: true
    longitude?: true
    isMainLocation?: true
  }

  export type VendorLocationMaxAggregateInputType = {
    id?: true
    vendorId?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    district?: true
    province?: true
    postalCode?: true
    latitude?: true
    longitude?: true
    isMainLocation?: true
  }

  export type VendorLocationCountAggregateInputType = {
    id?: true
    vendorId?: true
    addressLine1?: true
    addressLine2?: true
    city?: true
    district?: true
    province?: true
    postalCode?: true
    latitude?: true
    longitude?: true
    isMainLocation?: true
    _all?: true
  }

  export type VendorLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorLocation to aggregate.
     */
    where?: VendorLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorLocations to fetch.
     */
    orderBy?: VendorLocationOrderByWithRelationInput | VendorLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VendorLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VendorLocations
    **/
    _count?: true | VendorLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VendorLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VendorLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VendorLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VendorLocationMaxAggregateInputType
  }

  export type GetVendorLocationAggregateType<T extends VendorLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateVendorLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVendorLocation[P]>
      : GetScalarType<T[P], AggregateVendorLocation[P]>
  }




  export type VendorLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VendorLocationWhereInput
    orderBy?: VendorLocationOrderByWithAggregationInput | VendorLocationOrderByWithAggregationInput[]
    by: VendorLocationScalarFieldEnum[] | VendorLocationScalarFieldEnum
    having?: VendorLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VendorLocationCountAggregateInputType | true
    _avg?: VendorLocationAvgAggregateInputType
    _sum?: VendorLocationSumAggregateInputType
    _min?: VendorLocationMinAggregateInputType
    _max?: VendorLocationMaxAggregateInputType
  }

  export type VendorLocationGroupByOutputType = {
    id: number
    vendorId: number
    addressLine1: string
    addressLine2: string | null
    city: string
    district: string
    province: string
    postalCode: string | null
    latitude: number | null
    longitude: number | null
    isMainLocation: boolean
    _count: VendorLocationCountAggregateOutputType | null
    _avg: VendorLocationAvgAggregateOutputType | null
    _sum: VendorLocationSumAggregateOutputType | null
    _min: VendorLocationMinAggregateOutputType | null
    _max: VendorLocationMaxAggregateOutputType | null
  }

  type GetVendorLocationGroupByPayload<T extends VendorLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VendorLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VendorLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VendorLocationGroupByOutputType[P]>
            : GetScalarType<T[P], VendorLocationGroupByOutputType[P]>
        }
      >
    >


  export type VendorLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    district?: boolean
    province?: boolean
    postalCode?: boolean
    latitude?: boolean
    longitude?: boolean
    isMainLocation?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    listings?: boolean | VendorLocation$listingsArgs<ExtArgs>
    _count?: boolean | VendorLocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorLocation"]>

  export type VendorLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    district?: boolean
    province?: boolean
    postalCode?: boolean
    latitude?: boolean
    longitude?: boolean
    isMainLocation?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vendorLocation"]>

  export type VendorLocationSelectScalar = {
    id?: boolean
    vendorId?: boolean
    addressLine1?: boolean
    addressLine2?: boolean
    city?: boolean
    district?: boolean
    province?: boolean
    postalCode?: boolean
    latitude?: boolean
    longitude?: boolean
    isMainLocation?: boolean
  }

  export type VendorLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    listings?: boolean | VendorLocation$listingsArgs<ExtArgs>
    _count?: boolean | VendorLocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VendorLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
  }

  export type $VendorLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VendorLocation"
    objects: {
      vendor: Prisma.$VendorPayload<ExtArgs>
      listings: Prisma.$ListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      vendorId: number
      addressLine1: string
      addressLine2: string | null
      city: string
      district: string
      province: string
      postalCode: string | null
      latitude: number | null
      longitude: number | null
      isMainLocation: boolean
    }, ExtArgs["result"]["vendorLocation"]>
    composites: {}
  }

  type VendorLocationGetPayload<S extends boolean | null | undefined | VendorLocationDefaultArgs> = $Result.GetResult<Prisma.$VendorLocationPayload, S>

  type VendorLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VendorLocationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VendorLocationCountAggregateInputType | true
    }

  export interface VendorLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VendorLocation'], meta: { name: 'VendorLocation' } }
    /**
     * Find zero or one VendorLocation that matches the filter.
     * @param {VendorLocationFindUniqueArgs} args - Arguments to find a VendorLocation
     * @example
     * // Get one VendorLocation
     * const vendorLocation = await prisma.vendorLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VendorLocationFindUniqueArgs>(args: SelectSubset<T, VendorLocationFindUniqueArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VendorLocation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VendorLocationFindUniqueOrThrowArgs} args - Arguments to find a VendorLocation
     * @example
     * // Get one VendorLocation
     * const vendorLocation = await prisma.vendorLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VendorLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, VendorLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VendorLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorLocationFindFirstArgs} args - Arguments to find a VendorLocation
     * @example
     * // Get one VendorLocation
     * const vendorLocation = await prisma.vendorLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VendorLocationFindFirstArgs>(args?: SelectSubset<T, VendorLocationFindFirstArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VendorLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorLocationFindFirstOrThrowArgs} args - Arguments to find a VendorLocation
     * @example
     * // Get one VendorLocation
     * const vendorLocation = await prisma.vendorLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VendorLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, VendorLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VendorLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VendorLocations
     * const vendorLocations = await prisma.vendorLocation.findMany()
     * 
     * // Get first 10 VendorLocations
     * const vendorLocations = await prisma.vendorLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vendorLocationWithIdOnly = await prisma.vendorLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VendorLocationFindManyArgs>(args?: SelectSubset<T, VendorLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VendorLocation.
     * @param {VendorLocationCreateArgs} args - Arguments to create a VendorLocation.
     * @example
     * // Create one VendorLocation
     * const VendorLocation = await prisma.vendorLocation.create({
     *   data: {
     *     // ... data to create a VendorLocation
     *   }
     * })
     * 
     */
    create<T extends VendorLocationCreateArgs>(args: SelectSubset<T, VendorLocationCreateArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VendorLocations.
     * @param {VendorLocationCreateManyArgs} args - Arguments to create many VendorLocations.
     * @example
     * // Create many VendorLocations
     * const vendorLocation = await prisma.vendorLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VendorLocationCreateManyArgs>(args?: SelectSubset<T, VendorLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VendorLocations and returns the data saved in the database.
     * @param {VendorLocationCreateManyAndReturnArgs} args - Arguments to create many VendorLocations.
     * @example
     * // Create many VendorLocations
     * const vendorLocation = await prisma.vendorLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VendorLocations and only return the `id`
     * const vendorLocationWithIdOnly = await prisma.vendorLocation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VendorLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, VendorLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VendorLocation.
     * @param {VendorLocationDeleteArgs} args - Arguments to delete one VendorLocation.
     * @example
     * // Delete one VendorLocation
     * const VendorLocation = await prisma.vendorLocation.delete({
     *   where: {
     *     // ... filter to delete one VendorLocation
     *   }
     * })
     * 
     */
    delete<T extends VendorLocationDeleteArgs>(args: SelectSubset<T, VendorLocationDeleteArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VendorLocation.
     * @param {VendorLocationUpdateArgs} args - Arguments to update one VendorLocation.
     * @example
     * // Update one VendorLocation
     * const vendorLocation = await prisma.vendorLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VendorLocationUpdateArgs>(args: SelectSubset<T, VendorLocationUpdateArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VendorLocations.
     * @param {VendorLocationDeleteManyArgs} args - Arguments to filter VendorLocations to delete.
     * @example
     * // Delete a few VendorLocations
     * const { count } = await prisma.vendorLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VendorLocationDeleteManyArgs>(args?: SelectSubset<T, VendorLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VendorLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VendorLocations
     * const vendorLocation = await prisma.vendorLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VendorLocationUpdateManyArgs>(args: SelectSubset<T, VendorLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VendorLocation.
     * @param {VendorLocationUpsertArgs} args - Arguments to update or create a VendorLocation.
     * @example
     * // Update or create a VendorLocation
     * const vendorLocation = await prisma.vendorLocation.upsert({
     *   create: {
     *     // ... data to create a VendorLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VendorLocation we want to update
     *   }
     * })
     */
    upsert<T extends VendorLocationUpsertArgs>(args: SelectSubset<T, VendorLocationUpsertArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VendorLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorLocationCountArgs} args - Arguments to filter VendorLocations to count.
     * @example
     * // Count the number of VendorLocations
     * const count = await prisma.vendorLocation.count({
     *   where: {
     *     // ... the filter for the VendorLocations we want to count
     *   }
     * })
    **/
    count<T extends VendorLocationCountArgs>(
      args?: Subset<T, VendorLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VendorLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VendorLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VendorLocationAggregateArgs>(args: Subset<T, VendorLocationAggregateArgs>): Prisma.PrismaPromise<GetVendorLocationAggregateType<T>>

    /**
     * Group by VendorLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VendorLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VendorLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VendorLocationGroupByArgs['orderBy'] }
        : { orderBy?: VendorLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VendorLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVendorLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VendorLocation model
   */
  readonly fields: VendorLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VendorLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VendorLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends VendorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorDefaultArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    listings<T extends VendorLocation$listingsArgs<ExtArgs> = {}>(args?: Subset<T, VendorLocation$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VendorLocation model
   */ 
  interface VendorLocationFieldRefs {
    readonly id: FieldRef<"VendorLocation", 'Int'>
    readonly vendorId: FieldRef<"VendorLocation", 'Int'>
    readonly addressLine1: FieldRef<"VendorLocation", 'String'>
    readonly addressLine2: FieldRef<"VendorLocation", 'String'>
    readonly city: FieldRef<"VendorLocation", 'String'>
    readonly district: FieldRef<"VendorLocation", 'String'>
    readonly province: FieldRef<"VendorLocation", 'String'>
    readonly postalCode: FieldRef<"VendorLocation", 'String'>
    readonly latitude: FieldRef<"VendorLocation", 'Float'>
    readonly longitude: FieldRef<"VendorLocation", 'Float'>
    readonly isMainLocation: FieldRef<"VendorLocation", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * VendorLocation findUnique
   */
  export type VendorLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * Filter, which VendorLocation to fetch.
     */
    where: VendorLocationWhereUniqueInput
  }

  /**
   * VendorLocation findUniqueOrThrow
   */
  export type VendorLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * Filter, which VendorLocation to fetch.
     */
    where: VendorLocationWhereUniqueInput
  }

  /**
   * VendorLocation findFirst
   */
  export type VendorLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * Filter, which VendorLocation to fetch.
     */
    where?: VendorLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorLocations to fetch.
     */
    orderBy?: VendorLocationOrderByWithRelationInput | VendorLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorLocations.
     */
    cursor?: VendorLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorLocations.
     */
    distinct?: VendorLocationScalarFieldEnum | VendorLocationScalarFieldEnum[]
  }

  /**
   * VendorLocation findFirstOrThrow
   */
  export type VendorLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * Filter, which VendorLocation to fetch.
     */
    where?: VendorLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorLocations to fetch.
     */
    orderBy?: VendorLocationOrderByWithRelationInput | VendorLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VendorLocations.
     */
    cursor?: VendorLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VendorLocations.
     */
    distinct?: VendorLocationScalarFieldEnum | VendorLocationScalarFieldEnum[]
  }

  /**
   * VendorLocation findMany
   */
  export type VendorLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * Filter, which VendorLocations to fetch.
     */
    where?: VendorLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VendorLocations to fetch.
     */
    orderBy?: VendorLocationOrderByWithRelationInput | VendorLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VendorLocations.
     */
    cursor?: VendorLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VendorLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VendorLocations.
     */
    skip?: number
    distinct?: VendorLocationScalarFieldEnum | VendorLocationScalarFieldEnum[]
  }

  /**
   * VendorLocation create
   */
  export type VendorLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a VendorLocation.
     */
    data: XOR<VendorLocationCreateInput, VendorLocationUncheckedCreateInput>
  }

  /**
   * VendorLocation createMany
   */
  export type VendorLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VendorLocations.
     */
    data: VendorLocationCreateManyInput | VendorLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VendorLocation createManyAndReturn
   */
  export type VendorLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VendorLocations.
     */
    data: VendorLocationCreateManyInput | VendorLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VendorLocation update
   */
  export type VendorLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a VendorLocation.
     */
    data: XOR<VendorLocationUpdateInput, VendorLocationUncheckedUpdateInput>
    /**
     * Choose, which VendorLocation to update.
     */
    where: VendorLocationWhereUniqueInput
  }

  /**
   * VendorLocation updateMany
   */
  export type VendorLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VendorLocations.
     */
    data: XOR<VendorLocationUpdateManyMutationInput, VendorLocationUncheckedUpdateManyInput>
    /**
     * Filter which VendorLocations to update
     */
    where?: VendorLocationWhereInput
  }

  /**
   * VendorLocation upsert
   */
  export type VendorLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the VendorLocation to update in case it exists.
     */
    where: VendorLocationWhereUniqueInput
    /**
     * In case the VendorLocation found by the `where` argument doesn't exist, create a new VendorLocation with this data.
     */
    create: XOR<VendorLocationCreateInput, VendorLocationUncheckedCreateInput>
    /**
     * In case the VendorLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VendorLocationUpdateInput, VendorLocationUncheckedUpdateInput>
  }

  /**
   * VendorLocation delete
   */
  export type VendorLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
    /**
     * Filter which VendorLocation to delete.
     */
    where: VendorLocationWhereUniqueInput
  }

  /**
   * VendorLocation deleteMany
   */
  export type VendorLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VendorLocations to delete
     */
    where?: VendorLocationWhereInput
  }

  /**
   * VendorLocation.listings
   */
  export type VendorLocation$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * VendorLocation without action
   */
  export type VendorLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VendorLocation
     */
    select?: VendorLocationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VendorLocationInclude<ExtArgs> | null
  }


  /**
   * Model ListingCategory
   */

  export type AggregateListingCategory = {
    _count: ListingCategoryCountAggregateOutputType | null
    _avg: ListingCategoryAvgAggregateOutputType | null
    _sum: ListingCategorySumAggregateOutputType | null
    _min: ListingCategoryMinAggregateOutputType | null
    _max: ListingCategoryMaxAggregateOutputType | null
  }

  export type ListingCategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type ListingCategorySumAggregateOutputType = {
    id: number | null
  }

  export type ListingCategoryMinAggregateOutputType = {
    id: number | null
    categoryName: string | null
    isActive: boolean | null
  }

  export type ListingCategoryMaxAggregateOutputType = {
    id: number | null
    categoryName: string | null
    isActive: boolean | null
  }

  export type ListingCategoryCountAggregateOutputType = {
    id: number
    categoryName: number
    isActive: number
    _all: number
  }


  export type ListingCategoryAvgAggregateInputType = {
    id?: true
  }

  export type ListingCategorySumAggregateInputType = {
    id?: true
  }

  export type ListingCategoryMinAggregateInputType = {
    id?: true
    categoryName?: true
    isActive?: true
  }

  export type ListingCategoryMaxAggregateInputType = {
    id?: true
    categoryName?: true
    isActive?: true
  }

  export type ListingCategoryCountAggregateInputType = {
    id?: true
    categoryName?: true
    isActive?: true
    _all?: true
  }

  export type ListingCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingCategory to aggregate.
     */
    where?: ListingCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingCategories to fetch.
     */
    orderBy?: ListingCategoryOrderByWithRelationInput | ListingCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListingCategories
    **/
    _count?: true | ListingCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingCategoryMaxAggregateInputType
  }

  export type GetListingCategoryAggregateType<T extends ListingCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateListingCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListingCategory[P]>
      : GetScalarType<T[P], AggregateListingCategory[P]>
  }




  export type ListingCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingCategoryWhereInput
    orderBy?: ListingCategoryOrderByWithAggregationInput | ListingCategoryOrderByWithAggregationInput[]
    by: ListingCategoryScalarFieldEnum[] | ListingCategoryScalarFieldEnum
    having?: ListingCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCategoryCountAggregateInputType | true
    _avg?: ListingCategoryAvgAggregateInputType
    _sum?: ListingCategorySumAggregateInputType
    _min?: ListingCategoryMinAggregateInputType
    _max?: ListingCategoryMaxAggregateInputType
  }

  export type ListingCategoryGroupByOutputType = {
    id: number
    categoryName: string
    isActive: boolean
    _count: ListingCategoryCountAggregateOutputType | null
    _avg: ListingCategoryAvgAggregateOutputType | null
    _sum: ListingCategorySumAggregateOutputType | null
    _min: ListingCategoryMinAggregateOutputType | null
    _max: ListingCategoryMaxAggregateOutputType | null
  }

  type GetListingCategoryGroupByPayload<T extends ListingCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ListingCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ListingCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryName?: boolean
    isActive?: boolean
    listings?: boolean | ListingCategory$listingsArgs<ExtArgs>
    _count?: boolean | ListingCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingCategory"]>

  export type ListingCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    categoryName?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["listingCategory"]>

  export type ListingCategorySelectScalar = {
    id?: boolean
    categoryName?: boolean
    isActive?: boolean
  }

  export type ListingCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | ListingCategory$listingsArgs<ExtArgs>
    _count?: boolean | ListingCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListingCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ListingCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListingCategory"
    objects: {
      listings: Prisma.$ListingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      categoryName: string
      isActive: boolean
    }, ExtArgs["result"]["listingCategory"]>
    composites: {}
  }

  type ListingCategoryGetPayload<S extends boolean | null | undefined | ListingCategoryDefaultArgs> = $Result.GetResult<Prisma.$ListingCategoryPayload, S>

  type ListingCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ListingCategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ListingCategoryCountAggregateInputType | true
    }

  export interface ListingCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListingCategory'], meta: { name: 'ListingCategory' } }
    /**
     * Find zero or one ListingCategory that matches the filter.
     * @param {ListingCategoryFindUniqueArgs} args - Arguments to find a ListingCategory
     * @example
     * // Get one ListingCategory
     * const listingCategory = await prisma.listingCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingCategoryFindUniqueArgs>(args: SelectSubset<T, ListingCategoryFindUniqueArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ListingCategory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ListingCategoryFindUniqueOrThrowArgs} args - Arguments to find a ListingCategory
     * @example
     * // Get one ListingCategory
     * const listingCategory = await prisma.listingCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ListingCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCategoryFindFirstArgs} args - Arguments to find a ListingCategory
     * @example
     * // Get one ListingCategory
     * const listingCategory = await prisma.listingCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingCategoryFindFirstArgs>(args?: SelectSubset<T, ListingCategoryFindFirstArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ListingCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCategoryFindFirstOrThrowArgs} args - Arguments to find a ListingCategory
     * @example
     * // Get one ListingCategory
     * const listingCategory = await prisma.listingCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ListingCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListingCategories
     * const listingCategories = await prisma.listingCategory.findMany()
     * 
     * // Get first 10 ListingCategories
     * const listingCategories = await prisma.listingCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingCategoryWithIdOnly = await prisma.listingCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingCategoryFindManyArgs>(args?: SelectSubset<T, ListingCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ListingCategory.
     * @param {ListingCategoryCreateArgs} args - Arguments to create a ListingCategory.
     * @example
     * // Create one ListingCategory
     * const ListingCategory = await prisma.listingCategory.create({
     *   data: {
     *     // ... data to create a ListingCategory
     *   }
     * })
     * 
     */
    create<T extends ListingCategoryCreateArgs>(args: SelectSubset<T, ListingCategoryCreateArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ListingCategories.
     * @param {ListingCategoryCreateManyArgs} args - Arguments to create many ListingCategories.
     * @example
     * // Create many ListingCategories
     * const listingCategory = await prisma.listingCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCategoryCreateManyArgs>(args?: SelectSubset<T, ListingCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListingCategories and returns the data saved in the database.
     * @param {ListingCategoryCreateManyAndReturnArgs} args - Arguments to create many ListingCategories.
     * @example
     * // Create many ListingCategories
     * const listingCategory = await prisma.listingCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListingCategories and only return the `id`
     * const listingCategoryWithIdOnly = await prisma.listingCategory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ListingCategory.
     * @param {ListingCategoryDeleteArgs} args - Arguments to delete one ListingCategory.
     * @example
     * // Delete one ListingCategory
     * const ListingCategory = await prisma.listingCategory.delete({
     *   where: {
     *     // ... filter to delete one ListingCategory
     *   }
     * })
     * 
     */
    delete<T extends ListingCategoryDeleteArgs>(args: SelectSubset<T, ListingCategoryDeleteArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ListingCategory.
     * @param {ListingCategoryUpdateArgs} args - Arguments to update one ListingCategory.
     * @example
     * // Update one ListingCategory
     * const listingCategory = await prisma.listingCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingCategoryUpdateArgs>(args: SelectSubset<T, ListingCategoryUpdateArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ListingCategories.
     * @param {ListingCategoryDeleteManyArgs} args - Arguments to filter ListingCategories to delete.
     * @example
     * // Delete a few ListingCategories
     * const { count } = await prisma.listingCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingCategoryDeleteManyArgs>(args?: SelectSubset<T, ListingCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListingCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListingCategories
     * const listingCategory = await prisma.listingCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingCategoryUpdateManyArgs>(args: SelectSubset<T, ListingCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ListingCategory.
     * @param {ListingCategoryUpsertArgs} args - Arguments to update or create a ListingCategory.
     * @example
     * // Update or create a ListingCategory
     * const listingCategory = await prisma.listingCategory.upsert({
     *   create: {
     *     // ... data to create a ListingCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListingCategory we want to update
     *   }
     * })
     */
    upsert<T extends ListingCategoryUpsertArgs>(args: SelectSubset<T, ListingCategoryUpsertArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ListingCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCategoryCountArgs} args - Arguments to filter ListingCategories to count.
     * @example
     * // Count the number of ListingCategories
     * const count = await prisma.listingCategory.count({
     *   where: {
     *     // ... the filter for the ListingCategories we want to count
     *   }
     * })
    **/
    count<T extends ListingCategoryCountArgs>(
      args?: Subset<T, ListingCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListingCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingCategoryAggregateArgs>(args: Subset<T, ListingCategoryAggregateArgs>): Prisma.PrismaPromise<GetListingCategoryAggregateType<T>>

    /**
     * Group by ListingCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ListingCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListingCategory model
   */
  readonly fields: ListingCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListingCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listings<T extends ListingCategory$listingsArgs<ExtArgs> = {}>(args?: Subset<T, ListingCategory$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListingCategory model
   */ 
  interface ListingCategoryFieldRefs {
    readonly id: FieldRef<"ListingCategory", 'Int'>
    readonly categoryName: FieldRef<"ListingCategory", 'String'>
    readonly isActive: FieldRef<"ListingCategory", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ListingCategory findUnique
   */
  export type ListingCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ListingCategory to fetch.
     */
    where: ListingCategoryWhereUniqueInput
  }

  /**
   * ListingCategory findUniqueOrThrow
   */
  export type ListingCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ListingCategory to fetch.
     */
    where: ListingCategoryWhereUniqueInput
  }

  /**
   * ListingCategory findFirst
   */
  export type ListingCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ListingCategory to fetch.
     */
    where?: ListingCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingCategories to fetch.
     */
    orderBy?: ListingCategoryOrderByWithRelationInput | ListingCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingCategories.
     */
    cursor?: ListingCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingCategories.
     */
    distinct?: ListingCategoryScalarFieldEnum | ListingCategoryScalarFieldEnum[]
  }

  /**
   * ListingCategory findFirstOrThrow
   */
  export type ListingCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ListingCategory to fetch.
     */
    where?: ListingCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingCategories to fetch.
     */
    orderBy?: ListingCategoryOrderByWithRelationInput | ListingCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingCategories.
     */
    cursor?: ListingCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingCategories.
     */
    distinct?: ListingCategoryScalarFieldEnum | ListingCategoryScalarFieldEnum[]
  }

  /**
   * ListingCategory findMany
   */
  export type ListingCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ListingCategories to fetch.
     */
    where?: ListingCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingCategories to fetch.
     */
    orderBy?: ListingCategoryOrderByWithRelationInput | ListingCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListingCategories.
     */
    cursor?: ListingCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingCategories.
     */
    skip?: number
    distinct?: ListingCategoryScalarFieldEnum | ListingCategoryScalarFieldEnum[]
  }

  /**
   * ListingCategory create
   */
  export type ListingCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ListingCategory.
     */
    data: XOR<ListingCategoryCreateInput, ListingCategoryUncheckedCreateInput>
  }

  /**
   * ListingCategory createMany
   */
  export type ListingCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListingCategories.
     */
    data: ListingCategoryCreateManyInput | ListingCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListingCategory createManyAndReturn
   */
  export type ListingCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ListingCategories.
     */
    data: ListingCategoryCreateManyInput | ListingCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListingCategory update
   */
  export type ListingCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ListingCategory.
     */
    data: XOR<ListingCategoryUpdateInput, ListingCategoryUncheckedUpdateInput>
    /**
     * Choose, which ListingCategory to update.
     */
    where: ListingCategoryWhereUniqueInput
  }

  /**
   * ListingCategory updateMany
   */
  export type ListingCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListingCategories.
     */
    data: XOR<ListingCategoryUpdateManyMutationInput, ListingCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ListingCategories to update
     */
    where?: ListingCategoryWhereInput
  }

  /**
   * ListingCategory upsert
   */
  export type ListingCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ListingCategory to update in case it exists.
     */
    where: ListingCategoryWhereUniqueInput
    /**
     * In case the ListingCategory found by the `where` argument doesn't exist, create a new ListingCategory with this data.
     */
    create: XOR<ListingCategoryCreateInput, ListingCategoryUncheckedCreateInput>
    /**
     * In case the ListingCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingCategoryUpdateInput, ListingCategoryUncheckedUpdateInput>
  }

  /**
   * ListingCategory delete
   */
  export type ListingCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
    /**
     * Filter which ListingCategory to delete.
     */
    where: ListingCategoryWhereUniqueInput
  }

  /**
   * ListingCategory deleteMany
   */
  export type ListingCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingCategories to delete
     */
    where?: ListingCategoryWhereInput
  }

  /**
   * ListingCategory.listings
   */
  export type ListingCategory$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    cursor?: ListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * ListingCategory without action
   */
  export type ListingCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingCategory
     */
    select?: ListingCategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Listing
   */

  export type AggregateListing = {
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  export type ListingAvgAggregateOutputType = {
    id: number | null
    vendorId: number | null
    categoryId: number | null
    addressId: number | null
    priceMin: number | null
    priceMax: number | null
    capacity: number | null
    ratingAverage: number | null
    ratingCount: number | null
    viewsCount: number | null
    displayPriority: number | null
  }

  export type ListingSumAggregateOutputType = {
    id: number | null
    vendorId: number | null
    categoryId: number | null
    addressId: number | null
    priceMin: number | null
    priceMax: number | null
    capacity: number | null
    ratingAverage: number | null
    ratingCount: number | null
    viewsCount: number | null
    displayPriority: number | null
  }

  export type ListingMinAggregateOutputType = {
    id: number | null
    vendorId: number | null
    categoryId: number | null
    addressId: number | null
    title: string | null
    shortDescription: string | null
    longDescription: string | null
    priceMin: number | null
    priceMax: number | null
    priceNote: string | null
    duration: string | null
    capacity: number | null
    availability: string | null
    ratingAverage: number | null
    ratingCount: number | null
    viewsCount: number | null
    visibilityStatus: $Enums.VisibilityStatus | null
    isFeatured: boolean | null
    displayPriority: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingMaxAggregateOutputType = {
    id: number | null
    vendorId: number | null
    categoryId: number | null
    addressId: number | null
    title: string | null
    shortDescription: string | null
    longDescription: string | null
    priceMin: number | null
    priceMax: number | null
    priceNote: string | null
    duration: string | null
    capacity: number | null
    availability: string | null
    ratingAverage: number | null
    ratingCount: number | null
    viewsCount: number | null
    visibilityStatus: $Enums.VisibilityStatus | null
    isFeatured: boolean | null
    displayPriority: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ListingCountAggregateOutputType = {
    id: number
    vendorId: number
    categoryId: number
    addressId: number
    title: number
    shortDescription: number
    longDescription: number
    priceMin: number
    priceMax: number
    priceNote: number
    duration: number
    capacity: number
    availability: number
    ratingAverage: number
    ratingCount: number
    viewsCount: number
    visibilityStatus: number
    isFeatured: number
    displayPriority: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ListingAvgAggregateInputType = {
    id?: true
    vendorId?: true
    categoryId?: true
    addressId?: true
    priceMin?: true
    priceMax?: true
    capacity?: true
    ratingAverage?: true
    ratingCount?: true
    viewsCount?: true
    displayPriority?: true
  }

  export type ListingSumAggregateInputType = {
    id?: true
    vendorId?: true
    categoryId?: true
    addressId?: true
    priceMin?: true
    priceMax?: true
    capacity?: true
    ratingAverage?: true
    ratingCount?: true
    viewsCount?: true
    displayPriority?: true
  }

  export type ListingMinAggregateInputType = {
    id?: true
    vendorId?: true
    categoryId?: true
    addressId?: true
    title?: true
    shortDescription?: true
    longDescription?: true
    priceMin?: true
    priceMax?: true
    priceNote?: true
    duration?: true
    capacity?: true
    availability?: true
    ratingAverage?: true
    ratingCount?: true
    viewsCount?: true
    visibilityStatus?: true
    isFeatured?: true
    displayPriority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingMaxAggregateInputType = {
    id?: true
    vendorId?: true
    categoryId?: true
    addressId?: true
    title?: true
    shortDescription?: true
    longDescription?: true
    priceMin?: true
    priceMax?: true
    priceNote?: true
    duration?: true
    capacity?: true
    availability?: true
    ratingAverage?: true
    ratingCount?: true
    viewsCount?: true
    visibilityStatus?: true
    isFeatured?: true
    displayPriority?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ListingCountAggregateInputType = {
    id?: true
    vendorId?: true
    categoryId?: true
    addressId?: true
    title?: true
    shortDescription?: true
    longDescription?: true
    priceMin?: true
    priceMax?: true
    priceNote?: true
    duration?: true
    capacity?: true
    availability?: true
    ratingAverage?: true
    ratingCount?: true
    viewsCount?: true
    visibilityStatus?: true
    isFeatured?: true
    displayPriority?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listing to aggregate.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Listings
    **/
    _count?: true | ListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMaxAggregateInputType
  }

  export type GetListingAggregateType<T extends ListingAggregateArgs> = {
        [P in keyof T & keyof AggregateListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListing[P]>
      : GetScalarType<T[P], AggregateListing[P]>
  }




  export type ListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingWhereInput
    orderBy?: ListingOrderByWithAggregationInput | ListingOrderByWithAggregationInput[]
    by: ListingScalarFieldEnum[] | ListingScalarFieldEnum
    having?: ListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingCountAggregateInputType | true
    _avg?: ListingAvgAggregateInputType
    _sum?: ListingSumAggregateInputType
    _min?: ListingMinAggregateInputType
    _max?: ListingMaxAggregateInputType
  }

  export type ListingGroupByOutputType = {
    id: number
    vendorId: number
    categoryId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription: string | null
    priceMin: number
    priceMax: number | null
    priceNote: string | null
    duration: string | null
    capacity: number | null
    availability: string | null
    ratingAverage: number
    ratingCount: number
    viewsCount: number
    visibilityStatus: $Enums.VisibilityStatus
    isFeatured: boolean
    displayPriority: number
    createdAt: Date
    updatedAt: Date
    _count: ListingCountAggregateOutputType | null
    _avg: ListingAvgAggregateOutputType | null
    _sum: ListingSumAggregateOutputType | null
    _min: ListingMinAggregateOutputType | null
    _max: ListingMaxAggregateOutputType | null
  }

  type GetListingGroupByPayload<T extends ListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingGroupByOutputType[P]>
            : GetScalarType<T[P], ListingGroupByOutputType[P]>
        }
      >
    >


  export type ListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    categoryId?: boolean
    addressId?: boolean
    title?: boolean
    shortDescription?: boolean
    longDescription?: boolean
    priceMin?: boolean
    priceMax?: boolean
    priceNote?: boolean
    duration?: boolean
    capacity?: boolean
    availability?: boolean
    ratingAverage?: boolean
    ratingCount?: boolean
    viewsCount?: boolean
    visibilityStatus?: boolean
    isFeatured?: boolean
    displayPriority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    category?: boolean | ListingCategoryDefaultArgs<ExtArgs>
    location?: boolean | VendorLocationDefaultArgs<ExtArgs>
    media?: boolean | Listing$mediaArgs<ExtArgs>
    search?: boolean | Listing$searchArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    vendorId?: boolean
    categoryId?: boolean
    addressId?: boolean
    title?: boolean
    shortDescription?: boolean
    longDescription?: boolean
    priceMin?: boolean
    priceMax?: boolean
    priceNote?: boolean
    duration?: boolean
    capacity?: boolean
    availability?: boolean
    ratingAverage?: boolean
    ratingCount?: boolean
    viewsCount?: boolean
    visibilityStatus?: boolean
    isFeatured?: boolean
    displayPriority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    category?: boolean | ListingCategoryDefaultArgs<ExtArgs>
    location?: boolean | VendorLocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listing"]>

  export type ListingSelectScalar = {
    id?: boolean
    vendorId?: boolean
    categoryId?: boolean
    addressId?: boolean
    title?: boolean
    shortDescription?: boolean
    longDescription?: boolean
    priceMin?: boolean
    priceMax?: boolean
    priceNote?: boolean
    duration?: boolean
    capacity?: boolean
    availability?: boolean
    ratingAverage?: boolean
    ratingCount?: boolean
    viewsCount?: boolean
    visibilityStatus?: boolean
    isFeatured?: boolean
    displayPriority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    category?: boolean | ListingCategoryDefaultArgs<ExtArgs>
    location?: boolean | VendorLocationDefaultArgs<ExtArgs>
    media?: boolean | Listing$mediaArgs<ExtArgs>
    search?: boolean | Listing$searchArgs<ExtArgs>
    _count?: boolean | ListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vendor?: boolean | VendorDefaultArgs<ExtArgs>
    category?: boolean | ListingCategoryDefaultArgs<ExtArgs>
    location?: boolean | VendorLocationDefaultArgs<ExtArgs>
  }

  export type $ListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Listing"
    objects: {
      vendor: Prisma.$VendorPayload<ExtArgs>
      category: Prisma.$ListingCategoryPayload<ExtArgs>
      location: Prisma.$VendorLocationPayload<ExtArgs>
      media: Prisma.$ListingMediaPayload<ExtArgs>[]
      search: Prisma.$ListingSearchIndexPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      vendorId: number
      categoryId: number
      addressId: number
      title: string
      shortDescription: string
      longDescription: string | null
      priceMin: number
      priceMax: number | null
      priceNote: string | null
      duration: string | null
      capacity: number | null
      availability: string | null
      ratingAverage: number
      ratingCount: number
      viewsCount: number
      visibilityStatus: $Enums.VisibilityStatus
      isFeatured: boolean
      displayPriority: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["listing"]>
    composites: {}
  }

  type ListingGetPayload<S extends boolean | null | undefined | ListingDefaultArgs> = $Result.GetResult<Prisma.$ListingPayload, S>

  type ListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ListingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ListingCountAggregateInputType | true
    }

  export interface ListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Listing'], meta: { name: 'Listing' } }
    /**
     * Find zero or one Listing that matches the filter.
     * @param {ListingFindUniqueArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingFindUniqueArgs>(args: SelectSubset<T, ListingFindUniqueArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Listing that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ListingFindUniqueOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Listing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingFindFirstArgs>(args?: SelectSubset<T, ListingFindFirstArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Listing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindFirstOrThrowArgs} args - Arguments to find a Listing
     * @example
     * // Get one Listing
     * const listing = await prisma.listing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Listings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Listings
     * const listings = await prisma.listing.findMany()
     * 
     * // Get first 10 Listings
     * const listings = await prisma.listing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingWithIdOnly = await prisma.listing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingFindManyArgs>(args?: SelectSubset<T, ListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Listing.
     * @param {ListingCreateArgs} args - Arguments to create a Listing.
     * @example
     * // Create one Listing
     * const Listing = await prisma.listing.create({
     *   data: {
     *     // ... data to create a Listing
     *   }
     * })
     * 
     */
    create<T extends ListingCreateArgs>(args: SelectSubset<T, ListingCreateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Listings.
     * @param {ListingCreateManyArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingCreateManyArgs>(args?: SelectSubset<T, ListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Listings and returns the data saved in the database.
     * @param {ListingCreateManyAndReturnArgs} args - Arguments to create many Listings.
     * @example
     * // Create many Listings
     * const listing = await prisma.listing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Listings and only return the `id`
     * const listingWithIdOnly = await prisma.listing.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Listing.
     * @param {ListingDeleteArgs} args - Arguments to delete one Listing.
     * @example
     * // Delete one Listing
     * const Listing = await prisma.listing.delete({
     *   where: {
     *     // ... filter to delete one Listing
     *   }
     * })
     * 
     */
    delete<T extends ListingDeleteArgs>(args: SelectSubset<T, ListingDeleteArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Listing.
     * @param {ListingUpdateArgs} args - Arguments to update one Listing.
     * @example
     * // Update one Listing
     * const listing = await prisma.listing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingUpdateArgs>(args: SelectSubset<T, ListingUpdateArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Listings.
     * @param {ListingDeleteManyArgs} args - Arguments to filter Listings to delete.
     * @example
     * // Delete a few Listings
     * const { count } = await prisma.listing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingDeleteManyArgs>(args?: SelectSubset<T, ListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Listings
     * const listing = await prisma.listing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingUpdateManyArgs>(args: SelectSubset<T, ListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Listing.
     * @param {ListingUpsertArgs} args - Arguments to update or create a Listing.
     * @example
     * // Update or create a Listing
     * const listing = await prisma.listing.upsert({
     *   create: {
     *     // ... data to create a Listing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Listing we want to update
     *   }
     * })
     */
    upsert<T extends ListingUpsertArgs>(args: SelectSubset<T, ListingUpsertArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Listings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingCountArgs} args - Arguments to filter Listings to count.
     * @example
     * // Count the number of Listings
     * const count = await prisma.listing.count({
     *   where: {
     *     // ... the filter for the Listings we want to count
     *   }
     * })
    **/
    count<T extends ListingCountArgs>(
      args?: Subset<T, ListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingAggregateArgs>(args: Subset<T, ListingAggregateArgs>): Prisma.PrismaPromise<GetListingAggregateType<T>>

    /**
     * Group by Listing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingGroupByArgs['orderBy'] }
        : { orderBy?: ListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Listing model
   */
  readonly fields: ListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Listing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vendor<T extends VendorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorDefaultArgs<ExtArgs>>): Prisma__VendorClient<$Result.GetResult<Prisma.$VendorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    category<T extends ListingCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingCategoryDefaultArgs<ExtArgs>>): Prisma__ListingCategoryClient<$Result.GetResult<Prisma.$ListingCategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    location<T extends VendorLocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VendorLocationDefaultArgs<ExtArgs>>): Prisma__VendorLocationClient<$Result.GetResult<Prisma.$VendorLocationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    media<T extends Listing$mediaArgs<ExtArgs> = {}>(args?: Subset<T, Listing$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "findMany"> | Null>
    search<T extends Listing$searchArgs<ExtArgs> = {}>(args?: Subset<T, Listing$searchArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Listing model
   */ 
  interface ListingFieldRefs {
    readonly id: FieldRef<"Listing", 'Int'>
    readonly vendorId: FieldRef<"Listing", 'Int'>
    readonly categoryId: FieldRef<"Listing", 'Int'>
    readonly addressId: FieldRef<"Listing", 'Int'>
    readonly title: FieldRef<"Listing", 'String'>
    readonly shortDescription: FieldRef<"Listing", 'String'>
    readonly longDescription: FieldRef<"Listing", 'String'>
    readonly priceMin: FieldRef<"Listing", 'Float'>
    readonly priceMax: FieldRef<"Listing", 'Float'>
    readonly priceNote: FieldRef<"Listing", 'String'>
    readonly duration: FieldRef<"Listing", 'String'>
    readonly capacity: FieldRef<"Listing", 'Int'>
    readonly availability: FieldRef<"Listing", 'String'>
    readonly ratingAverage: FieldRef<"Listing", 'Float'>
    readonly ratingCount: FieldRef<"Listing", 'Int'>
    readonly viewsCount: FieldRef<"Listing", 'Int'>
    readonly visibilityStatus: FieldRef<"Listing", 'VisibilityStatus'>
    readonly isFeatured: FieldRef<"Listing", 'Boolean'>
    readonly displayPriority: FieldRef<"Listing", 'Int'>
    readonly createdAt: FieldRef<"Listing", 'DateTime'>
    readonly updatedAt: FieldRef<"Listing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Listing findUnique
   */
  export type ListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findUniqueOrThrow
   */
  export type ListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing findFirst
   */
  export type ListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findFirstOrThrow
   */
  export type ListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listing to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Listings.
     */
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing findMany
   */
  export type ListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter, which Listings to fetch.
     */
    where?: ListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Listings to fetch.
     */
    orderBy?: ListingOrderByWithRelationInput | ListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Listings.
     */
    cursor?: ListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Listings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Listings.
     */
    skip?: number
    distinct?: ListingScalarFieldEnum | ListingScalarFieldEnum[]
  }

  /**
   * Listing create
   */
  export type ListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to create a Listing.
     */
    data: XOR<ListingCreateInput, ListingUncheckedCreateInput>
  }

  /**
   * Listing createMany
   */
  export type ListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Listing createManyAndReturn
   */
  export type ListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Listings.
     */
    data: ListingCreateManyInput | ListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Listing update
   */
  export type ListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The data needed to update a Listing.
     */
    data: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
    /**
     * Choose, which Listing to update.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing updateMany
   */
  export type ListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Listings.
     */
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyInput>
    /**
     * Filter which Listings to update
     */
    where?: ListingWhereInput
  }

  /**
   * Listing upsert
   */
  export type ListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * The filter to search for the Listing to update in case it exists.
     */
    where: ListingWhereUniqueInput
    /**
     * In case the Listing found by the `where` argument doesn't exist, create a new Listing with this data.
     */
    create: XOR<ListingCreateInput, ListingUncheckedCreateInput>
    /**
     * In case the Listing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingUpdateInput, ListingUncheckedUpdateInput>
  }

  /**
   * Listing delete
   */
  export type ListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
    /**
     * Filter which Listing to delete.
     */
    where: ListingWhereUniqueInput
  }

  /**
   * Listing deleteMany
   */
  export type ListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Listings to delete
     */
    where?: ListingWhereInput
  }

  /**
   * Listing.media
   */
  export type Listing$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    where?: ListingMediaWhereInput
    orderBy?: ListingMediaOrderByWithRelationInput | ListingMediaOrderByWithRelationInput[]
    cursor?: ListingMediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListingMediaScalarFieldEnum | ListingMediaScalarFieldEnum[]
  }

  /**
   * Listing.search
   */
  export type Listing$searchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    where?: ListingSearchIndexWhereInput
  }

  /**
   * Listing without action
   */
  export type ListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Listing
     */
    select?: ListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingInclude<ExtArgs> | null
  }


  /**
   * Model ListingMedia
   */

  export type AggregateListingMedia = {
    _count: ListingMediaCountAggregateOutputType | null
    _avg: ListingMediaAvgAggregateOutputType | null
    _sum: ListingMediaSumAggregateOutputType | null
    _min: ListingMediaMinAggregateOutputType | null
    _max: ListingMediaMaxAggregateOutputType | null
  }

  export type ListingMediaAvgAggregateOutputType = {
    id: number | null
    listingId: number | null
    displayOrder: number | null
  }

  export type ListingMediaSumAggregateOutputType = {
    id: number | null
    listingId: number | null
    displayOrder: number | null
  }

  export type ListingMediaMinAggregateOutputType = {
    id: number | null
    listingId: number | null
    mediaType: $Enums.MediaType | null
    mediaUrl: string | null
    caption: string | null
    displayOrder: number | null
    isPrimary: boolean | null
    uploadedAt: Date | null
  }

  export type ListingMediaMaxAggregateOutputType = {
    id: number | null
    listingId: number | null
    mediaType: $Enums.MediaType | null
    mediaUrl: string | null
    caption: string | null
    displayOrder: number | null
    isPrimary: boolean | null
    uploadedAt: Date | null
  }

  export type ListingMediaCountAggregateOutputType = {
    id: number
    listingId: number
    mediaType: number
    mediaUrl: number
    caption: number
    displayOrder: number
    isPrimary: number
    uploadedAt: number
    _all: number
  }


  export type ListingMediaAvgAggregateInputType = {
    id?: true
    listingId?: true
    displayOrder?: true
  }

  export type ListingMediaSumAggregateInputType = {
    id?: true
    listingId?: true
    displayOrder?: true
  }

  export type ListingMediaMinAggregateInputType = {
    id?: true
    listingId?: true
    mediaType?: true
    mediaUrl?: true
    caption?: true
    displayOrder?: true
    isPrimary?: true
    uploadedAt?: true
  }

  export type ListingMediaMaxAggregateInputType = {
    id?: true
    listingId?: true
    mediaType?: true
    mediaUrl?: true
    caption?: true
    displayOrder?: true
    isPrimary?: true
    uploadedAt?: true
  }

  export type ListingMediaCountAggregateInputType = {
    id?: true
    listingId?: true
    mediaType?: true
    mediaUrl?: true
    caption?: true
    displayOrder?: true
    isPrimary?: true
    uploadedAt?: true
    _all?: true
  }

  export type ListingMediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingMedia to aggregate.
     */
    where?: ListingMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingMedias to fetch.
     */
    orderBy?: ListingMediaOrderByWithRelationInput | ListingMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListingMedias
    **/
    _count?: true | ListingMediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingMediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingMediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingMediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingMediaMaxAggregateInputType
  }

  export type GetListingMediaAggregateType<T extends ListingMediaAggregateArgs> = {
        [P in keyof T & keyof AggregateListingMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListingMedia[P]>
      : GetScalarType<T[P], AggregateListingMedia[P]>
  }




  export type ListingMediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingMediaWhereInput
    orderBy?: ListingMediaOrderByWithAggregationInput | ListingMediaOrderByWithAggregationInput[]
    by: ListingMediaScalarFieldEnum[] | ListingMediaScalarFieldEnum
    having?: ListingMediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingMediaCountAggregateInputType | true
    _avg?: ListingMediaAvgAggregateInputType
    _sum?: ListingMediaSumAggregateInputType
    _min?: ListingMediaMinAggregateInputType
    _max?: ListingMediaMaxAggregateInputType
  }

  export type ListingMediaGroupByOutputType = {
    id: number
    listingId: number
    mediaType: $Enums.MediaType
    mediaUrl: string
    caption: string | null
    displayOrder: number
    isPrimary: boolean
    uploadedAt: Date
    _count: ListingMediaCountAggregateOutputType | null
    _avg: ListingMediaAvgAggregateOutputType | null
    _sum: ListingMediaSumAggregateOutputType | null
    _min: ListingMediaMinAggregateOutputType | null
    _max: ListingMediaMaxAggregateOutputType | null
  }

  type GetListingMediaGroupByPayload<T extends ListingMediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingMediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingMediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingMediaGroupByOutputType[P]>
            : GetScalarType<T[P], ListingMediaGroupByOutputType[P]>
        }
      >
    >


  export type ListingMediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    mediaType?: boolean
    mediaUrl?: boolean
    caption?: boolean
    displayOrder?: boolean
    isPrimary?: boolean
    uploadedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingMedia"]>

  export type ListingMediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listingId?: boolean
    mediaType?: boolean
    mediaUrl?: boolean
    caption?: boolean
    displayOrder?: boolean
    isPrimary?: boolean
    uploadedAt?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingMedia"]>

  export type ListingMediaSelectScalar = {
    id?: boolean
    listingId?: boolean
    mediaType?: boolean
    mediaUrl?: boolean
    caption?: boolean
    displayOrder?: boolean
    isPrimary?: boolean
    uploadedAt?: boolean
  }

  export type ListingMediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type ListingMediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $ListingMediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListingMedia"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      listingId: number
      mediaType: $Enums.MediaType
      mediaUrl: string
      caption: string | null
      displayOrder: number
      isPrimary: boolean
      uploadedAt: Date
    }, ExtArgs["result"]["listingMedia"]>
    composites: {}
  }

  type ListingMediaGetPayload<S extends boolean | null | undefined | ListingMediaDefaultArgs> = $Result.GetResult<Prisma.$ListingMediaPayload, S>

  type ListingMediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ListingMediaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ListingMediaCountAggregateInputType | true
    }

  export interface ListingMediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListingMedia'], meta: { name: 'ListingMedia' } }
    /**
     * Find zero or one ListingMedia that matches the filter.
     * @param {ListingMediaFindUniqueArgs} args - Arguments to find a ListingMedia
     * @example
     * // Get one ListingMedia
     * const listingMedia = await prisma.listingMedia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingMediaFindUniqueArgs>(args: SelectSubset<T, ListingMediaFindUniqueArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ListingMedia that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ListingMediaFindUniqueOrThrowArgs} args - Arguments to find a ListingMedia
     * @example
     * // Get one ListingMedia
     * const listingMedia = await prisma.listingMedia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingMediaFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingMediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ListingMedia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingMediaFindFirstArgs} args - Arguments to find a ListingMedia
     * @example
     * // Get one ListingMedia
     * const listingMedia = await prisma.listingMedia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingMediaFindFirstArgs>(args?: SelectSubset<T, ListingMediaFindFirstArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ListingMedia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingMediaFindFirstOrThrowArgs} args - Arguments to find a ListingMedia
     * @example
     * // Get one ListingMedia
     * const listingMedia = await prisma.listingMedia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingMediaFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingMediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ListingMedias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingMediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListingMedias
     * const listingMedias = await prisma.listingMedia.findMany()
     * 
     * // Get first 10 ListingMedias
     * const listingMedias = await prisma.listingMedia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listingMediaWithIdOnly = await prisma.listingMedia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListingMediaFindManyArgs>(args?: SelectSubset<T, ListingMediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ListingMedia.
     * @param {ListingMediaCreateArgs} args - Arguments to create a ListingMedia.
     * @example
     * // Create one ListingMedia
     * const ListingMedia = await prisma.listingMedia.create({
     *   data: {
     *     // ... data to create a ListingMedia
     *   }
     * })
     * 
     */
    create<T extends ListingMediaCreateArgs>(args: SelectSubset<T, ListingMediaCreateArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ListingMedias.
     * @param {ListingMediaCreateManyArgs} args - Arguments to create many ListingMedias.
     * @example
     * // Create many ListingMedias
     * const listingMedia = await prisma.listingMedia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingMediaCreateManyArgs>(args?: SelectSubset<T, ListingMediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListingMedias and returns the data saved in the database.
     * @param {ListingMediaCreateManyAndReturnArgs} args - Arguments to create many ListingMedias.
     * @example
     * // Create many ListingMedias
     * const listingMedia = await prisma.listingMedia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListingMedias and only return the `id`
     * const listingMediaWithIdOnly = await prisma.listingMedia.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingMediaCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingMediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ListingMedia.
     * @param {ListingMediaDeleteArgs} args - Arguments to delete one ListingMedia.
     * @example
     * // Delete one ListingMedia
     * const ListingMedia = await prisma.listingMedia.delete({
     *   where: {
     *     // ... filter to delete one ListingMedia
     *   }
     * })
     * 
     */
    delete<T extends ListingMediaDeleteArgs>(args: SelectSubset<T, ListingMediaDeleteArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ListingMedia.
     * @param {ListingMediaUpdateArgs} args - Arguments to update one ListingMedia.
     * @example
     * // Update one ListingMedia
     * const listingMedia = await prisma.listingMedia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingMediaUpdateArgs>(args: SelectSubset<T, ListingMediaUpdateArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ListingMedias.
     * @param {ListingMediaDeleteManyArgs} args - Arguments to filter ListingMedias to delete.
     * @example
     * // Delete a few ListingMedias
     * const { count } = await prisma.listingMedia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingMediaDeleteManyArgs>(args?: SelectSubset<T, ListingMediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListingMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingMediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListingMedias
     * const listingMedia = await prisma.listingMedia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingMediaUpdateManyArgs>(args: SelectSubset<T, ListingMediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ListingMedia.
     * @param {ListingMediaUpsertArgs} args - Arguments to update or create a ListingMedia.
     * @example
     * // Update or create a ListingMedia
     * const listingMedia = await prisma.listingMedia.upsert({
     *   create: {
     *     // ... data to create a ListingMedia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListingMedia we want to update
     *   }
     * })
     */
    upsert<T extends ListingMediaUpsertArgs>(args: SelectSubset<T, ListingMediaUpsertArgs<ExtArgs>>): Prisma__ListingMediaClient<$Result.GetResult<Prisma.$ListingMediaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ListingMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingMediaCountArgs} args - Arguments to filter ListingMedias to count.
     * @example
     * // Count the number of ListingMedias
     * const count = await prisma.listingMedia.count({
     *   where: {
     *     // ... the filter for the ListingMedias we want to count
     *   }
     * })
    **/
    count<T extends ListingMediaCountArgs>(
      args?: Subset<T, ListingMediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingMediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListingMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingMediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingMediaAggregateArgs>(args: Subset<T, ListingMediaAggregateArgs>): Prisma.PrismaPromise<GetListingMediaAggregateType<T>>

    /**
     * Group by ListingMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingMediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingMediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingMediaGroupByArgs['orderBy'] }
        : { orderBy?: ListingMediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingMediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListingMedia model
   */
  readonly fields: ListingMediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListingMedia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingMediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListingMedia model
   */ 
  interface ListingMediaFieldRefs {
    readonly id: FieldRef<"ListingMedia", 'Int'>
    readonly listingId: FieldRef<"ListingMedia", 'Int'>
    readonly mediaType: FieldRef<"ListingMedia", 'MediaType'>
    readonly mediaUrl: FieldRef<"ListingMedia", 'String'>
    readonly caption: FieldRef<"ListingMedia", 'String'>
    readonly displayOrder: FieldRef<"ListingMedia", 'Int'>
    readonly isPrimary: FieldRef<"ListingMedia", 'Boolean'>
    readonly uploadedAt: FieldRef<"ListingMedia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ListingMedia findUnique
   */
  export type ListingMediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * Filter, which ListingMedia to fetch.
     */
    where: ListingMediaWhereUniqueInput
  }

  /**
   * ListingMedia findUniqueOrThrow
   */
  export type ListingMediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * Filter, which ListingMedia to fetch.
     */
    where: ListingMediaWhereUniqueInput
  }

  /**
   * ListingMedia findFirst
   */
  export type ListingMediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * Filter, which ListingMedia to fetch.
     */
    where?: ListingMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingMedias to fetch.
     */
    orderBy?: ListingMediaOrderByWithRelationInput | ListingMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingMedias.
     */
    cursor?: ListingMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingMedias.
     */
    distinct?: ListingMediaScalarFieldEnum | ListingMediaScalarFieldEnum[]
  }

  /**
   * ListingMedia findFirstOrThrow
   */
  export type ListingMediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * Filter, which ListingMedia to fetch.
     */
    where?: ListingMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingMedias to fetch.
     */
    orderBy?: ListingMediaOrderByWithRelationInput | ListingMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingMedias.
     */
    cursor?: ListingMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingMedias.
     */
    distinct?: ListingMediaScalarFieldEnum | ListingMediaScalarFieldEnum[]
  }

  /**
   * ListingMedia findMany
   */
  export type ListingMediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * Filter, which ListingMedias to fetch.
     */
    where?: ListingMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingMedias to fetch.
     */
    orderBy?: ListingMediaOrderByWithRelationInput | ListingMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListingMedias.
     */
    cursor?: ListingMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingMedias.
     */
    skip?: number
    distinct?: ListingMediaScalarFieldEnum | ListingMediaScalarFieldEnum[]
  }

  /**
   * ListingMedia create
   */
  export type ListingMediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * The data needed to create a ListingMedia.
     */
    data: XOR<ListingMediaCreateInput, ListingMediaUncheckedCreateInput>
  }

  /**
   * ListingMedia createMany
   */
  export type ListingMediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListingMedias.
     */
    data: ListingMediaCreateManyInput | ListingMediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListingMedia createManyAndReturn
   */
  export type ListingMediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ListingMedias.
     */
    data: ListingMediaCreateManyInput | ListingMediaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListingMedia update
   */
  export type ListingMediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * The data needed to update a ListingMedia.
     */
    data: XOR<ListingMediaUpdateInput, ListingMediaUncheckedUpdateInput>
    /**
     * Choose, which ListingMedia to update.
     */
    where: ListingMediaWhereUniqueInput
  }

  /**
   * ListingMedia updateMany
   */
  export type ListingMediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListingMedias.
     */
    data: XOR<ListingMediaUpdateManyMutationInput, ListingMediaUncheckedUpdateManyInput>
    /**
     * Filter which ListingMedias to update
     */
    where?: ListingMediaWhereInput
  }

  /**
   * ListingMedia upsert
   */
  export type ListingMediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * The filter to search for the ListingMedia to update in case it exists.
     */
    where: ListingMediaWhereUniqueInput
    /**
     * In case the ListingMedia found by the `where` argument doesn't exist, create a new ListingMedia with this data.
     */
    create: XOR<ListingMediaCreateInput, ListingMediaUncheckedCreateInput>
    /**
     * In case the ListingMedia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingMediaUpdateInput, ListingMediaUncheckedUpdateInput>
  }

  /**
   * ListingMedia delete
   */
  export type ListingMediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
    /**
     * Filter which ListingMedia to delete.
     */
    where: ListingMediaWhereUniqueInput
  }

  /**
   * ListingMedia deleteMany
   */
  export type ListingMediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingMedias to delete
     */
    where?: ListingMediaWhereInput
  }

  /**
   * ListingMedia without action
   */
  export type ListingMediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingMedia
     */
    select?: ListingMediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingMediaInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type RefreshTokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    userId: number | null
    revoked: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    userId: number | null
    revoked: boolean | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    revoked: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type RefreshTokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    revoked?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    revoked?: true
    expiresAt?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    revoked?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefreshTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefreshTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _avg?: RefreshTokenAvgAggregateInputType
    _sum?: RefreshTokenSumAggregateInputType
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: number
    token: string
    userId: number
    revoked: boolean
    expiresAt: Date
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    revoked?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    revoked?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    revoked?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }


  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      token: string
      userId: number
      revoked: boolean
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */ 
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'Int'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'Int'>
    readonly revoked: FieldRef<"RefreshToken", 'Boolean'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
  }


  /**
   * Model ListingSearchIndex
   */

  export type AggregateListingSearchIndex = {
    _count: ListingSearchIndexCountAggregateOutputType | null
    _avg: ListingSearchIndexAvgAggregateOutputType | null
    _sum: ListingSearchIndexSumAggregateOutputType | null
    _min: ListingSearchIndexMinAggregateOutputType | null
    _max: ListingSearchIndexMaxAggregateOutputType | null
  }

  export type ListingSearchIndexAvgAggregateOutputType = {
    listingId: number | null
    categoryId: number | null
    priceMin: number | null
    priceMax: number | null
  }

  export type ListingSearchIndexSumAggregateOutputType = {
    listingId: number | null
    categoryId: number | null
    priceMin: number | null
    priceMax: number | null
  }

  export type ListingSearchIndexMinAggregateOutputType = {
    listingId: number | null
    categoryId: number | null
    priceMin: number | null
    priceMax: number | null
    city: string | null
    district: string | null
    province: string | null
  }

  export type ListingSearchIndexMaxAggregateOutputType = {
    listingId: number | null
    categoryId: number | null
    priceMin: number | null
    priceMax: number | null
    city: string | null
    district: string | null
    province: string | null
  }

  export type ListingSearchIndexCountAggregateOutputType = {
    listingId: number
    categoryId: number
    priceMin: number
    priceMax: number
    city: number
    district: number
    province: number
    _all: number
  }


  export type ListingSearchIndexAvgAggregateInputType = {
    listingId?: true
    categoryId?: true
    priceMin?: true
    priceMax?: true
  }

  export type ListingSearchIndexSumAggregateInputType = {
    listingId?: true
    categoryId?: true
    priceMin?: true
    priceMax?: true
  }

  export type ListingSearchIndexMinAggregateInputType = {
    listingId?: true
    categoryId?: true
    priceMin?: true
    priceMax?: true
    city?: true
    district?: true
    province?: true
  }

  export type ListingSearchIndexMaxAggregateInputType = {
    listingId?: true
    categoryId?: true
    priceMin?: true
    priceMax?: true
    city?: true
    district?: true
    province?: true
  }

  export type ListingSearchIndexCountAggregateInputType = {
    listingId?: true
    categoryId?: true
    priceMin?: true
    priceMax?: true
    city?: true
    district?: true
    province?: true
    _all?: true
  }

  export type ListingSearchIndexAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingSearchIndex to aggregate.
     */
    where?: ListingSearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingSearchIndices to fetch.
     */
    orderBy?: ListingSearchIndexOrderByWithRelationInput | ListingSearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListingSearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingSearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingSearchIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListingSearchIndices
    **/
    _count?: true | ListingSearchIndexCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListingSearchIndexAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListingSearchIndexSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListingSearchIndexMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListingSearchIndexMaxAggregateInputType
  }

  export type GetListingSearchIndexAggregateType<T extends ListingSearchIndexAggregateArgs> = {
        [P in keyof T & keyof AggregateListingSearchIndex]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListingSearchIndex[P]>
      : GetScalarType<T[P], AggregateListingSearchIndex[P]>
  }




  export type ListingSearchIndexGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListingSearchIndexWhereInput
    orderBy?: ListingSearchIndexOrderByWithAggregationInput | ListingSearchIndexOrderByWithAggregationInput[]
    by: ListingSearchIndexScalarFieldEnum[] | ListingSearchIndexScalarFieldEnum
    having?: ListingSearchIndexScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListingSearchIndexCountAggregateInputType | true
    _avg?: ListingSearchIndexAvgAggregateInputType
    _sum?: ListingSearchIndexSumAggregateInputType
    _min?: ListingSearchIndexMinAggregateInputType
    _max?: ListingSearchIndexMaxAggregateInputType
  }

  export type ListingSearchIndexGroupByOutputType = {
    listingId: number
    categoryId: number
    priceMin: number
    priceMax: number | null
    city: string
    district: string
    province: string
    _count: ListingSearchIndexCountAggregateOutputType | null
    _avg: ListingSearchIndexAvgAggregateOutputType | null
    _sum: ListingSearchIndexSumAggregateOutputType | null
    _min: ListingSearchIndexMinAggregateOutputType | null
    _max: ListingSearchIndexMaxAggregateOutputType | null
  }

  type GetListingSearchIndexGroupByPayload<T extends ListingSearchIndexGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListingSearchIndexGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListingSearchIndexGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListingSearchIndexGroupByOutputType[P]>
            : GetScalarType<T[P], ListingSearchIndexGroupByOutputType[P]>
        }
      >
    >


  export type ListingSearchIndexSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    listingId?: boolean
    categoryId?: boolean
    priceMin?: boolean
    priceMax?: boolean
    city?: boolean
    district?: boolean
    province?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingSearchIndex"]>

  export type ListingSearchIndexSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    listingId?: boolean
    categoryId?: boolean
    priceMin?: boolean
    priceMax?: boolean
    city?: boolean
    district?: boolean
    province?: boolean
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listingSearchIndex"]>

  export type ListingSearchIndexSelectScalar = {
    listingId?: boolean
    categoryId?: boolean
    priceMin?: boolean
    priceMax?: boolean
    city?: boolean
    district?: boolean
    province?: boolean
  }

  export type ListingSearchIndexInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }
  export type ListingSearchIndexIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listing?: boolean | ListingDefaultArgs<ExtArgs>
  }

  export type $ListingSearchIndexPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListingSearchIndex"
    objects: {
      listing: Prisma.$ListingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      listingId: number
      categoryId: number
      priceMin: number
      priceMax: number | null
      city: string
      district: string
      province: string
    }, ExtArgs["result"]["listingSearchIndex"]>
    composites: {}
  }

  type ListingSearchIndexGetPayload<S extends boolean | null | undefined | ListingSearchIndexDefaultArgs> = $Result.GetResult<Prisma.$ListingSearchIndexPayload, S>

  type ListingSearchIndexCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ListingSearchIndexFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ListingSearchIndexCountAggregateInputType | true
    }

  export interface ListingSearchIndexDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListingSearchIndex'], meta: { name: 'ListingSearchIndex' } }
    /**
     * Find zero or one ListingSearchIndex that matches the filter.
     * @param {ListingSearchIndexFindUniqueArgs} args - Arguments to find a ListingSearchIndex
     * @example
     * // Get one ListingSearchIndex
     * const listingSearchIndex = await prisma.listingSearchIndex.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListingSearchIndexFindUniqueArgs>(args: SelectSubset<T, ListingSearchIndexFindUniqueArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ListingSearchIndex that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ListingSearchIndexFindUniqueOrThrowArgs} args - Arguments to find a ListingSearchIndex
     * @example
     * // Get one ListingSearchIndex
     * const listingSearchIndex = await prisma.listingSearchIndex.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListingSearchIndexFindUniqueOrThrowArgs>(args: SelectSubset<T, ListingSearchIndexFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ListingSearchIndex that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingSearchIndexFindFirstArgs} args - Arguments to find a ListingSearchIndex
     * @example
     * // Get one ListingSearchIndex
     * const listingSearchIndex = await prisma.listingSearchIndex.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListingSearchIndexFindFirstArgs>(args?: SelectSubset<T, ListingSearchIndexFindFirstArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ListingSearchIndex that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingSearchIndexFindFirstOrThrowArgs} args - Arguments to find a ListingSearchIndex
     * @example
     * // Get one ListingSearchIndex
     * const listingSearchIndex = await prisma.listingSearchIndex.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListingSearchIndexFindFirstOrThrowArgs>(args?: SelectSubset<T, ListingSearchIndexFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ListingSearchIndices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingSearchIndexFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListingSearchIndices
     * const listingSearchIndices = await prisma.listingSearchIndex.findMany()
     * 
     * // Get first 10 ListingSearchIndices
     * const listingSearchIndices = await prisma.listingSearchIndex.findMany({ take: 10 })
     * 
     * // Only select the `listingId`
     * const listingSearchIndexWithListingIdOnly = await prisma.listingSearchIndex.findMany({ select: { listingId: true } })
     * 
     */
    findMany<T extends ListingSearchIndexFindManyArgs>(args?: SelectSubset<T, ListingSearchIndexFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ListingSearchIndex.
     * @param {ListingSearchIndexCreateArgs} args - Arguments to create a ListingSearchIndex.
     * @example
     * // Create one ListingSearchIndex
     * const ListingSearchIndex = await prisma.listingSearchIndex.create({
     *   data: {
     *     // ... data to create a ListingSearchIndex
     *   }
     * })
     * 
     */
    create<T extends ListingSearchIndexCreateArgs>(args: SelectSubset<T, ListingSearchIndexCreateArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ListingSearchIndices.
     * @param {ListingSearchIndexCreateManyArgs} args - Arguments to create many ListingSearchIndices.
     * @example
     * // Create many ListingSearchIndices
     * const listingSearchIndex = await prisma.listingSearchIndex.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListingSearchIndexCreateManyArgs>(args?: SelectSubset<T, ListingSearchIndexCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListingSearchIndices and returns the data saved in the database.
     * @param {ListingSearchIndexCreateManyAndReturnArgs} args - Arguments to create many ListingSearchIndices.
     * @example
     * // Create many ListingSearchIndices
     * const listingSearchIndex = await prisma.listingSearchIndex.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListingSearchIndices and only return the `listingId`
     * const listingSearchIndexWithListingIdOnly = await prisma.listingSearchIndex.createManyAndReturn({ 
     *   select: { listingId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListingSearchIndexCreateManyAndReturnArgs>(args?: SelectSubset<T, ListingSearchIndexCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ListingSearchIndex.
     * @param {ListingSearchIndexDeleteArgs} args - Arguments to delete one ListingSearchIndex.
     * @example
     * // Delete one ListingSearchIndex
     * const ListingSearchIndex = await prisma.listingSearchIndex.delete({
     *   where: {
     *     // ... filter to delete one ListingSearchIndex
     *   }
     * })
     * 
     */
    delete<T extends ListingSearchIndexDeleteArgs>(args: SelectSubset<T, ListingSearchIndexDeleteArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ListingSearchIndex.
     * @param {ListingSearchIndexUpdateArgs} args - Arguments to update one ListingSearchIndex.
     * @example
     * // Update one ListingSearchIndex
     * const listingSearchIndex = await prisma.listingSearchIndex.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListingSearchIndexUpdateArgs>(args: SelectSubset<T, ListingSearchIndexUpdateArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ListingSearchIndices.
     * @param {ListingSearchIndexDeleteManyArgs} args - Arguments to filter ListingSearchIndices to delete.
     * @example
     * // Delete a few ListingSearchIndices
     * const { count } = await prisma.listingSearchIndex.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListingSearchIndexDeleteManyArgs>(args?: SelectSubset<T, ListingSearchIndexDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListingSearchIndices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingSearchIndexUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListingSearchIndices
     * const listingSearchIndex = await prisma.listingSearchIndex.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListingSearchIndexUpdateManyArgs>(args: SelectSubset<T, ListingSearchIndexUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ListingSearchIndex.
     * @param {ListingSearchIndexUpsertArgs} args - Arguments to update or create a ListingSearchIndex.
     * @example
     * // Update or create a ListingSearchIndex
     * const listingSearchIndex = await prisma.listingSearchIndex.upsert({
     *   create: {
     *     // ... data to create a ListingSearchIndex
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListingSearchIndex we want to update
     *   }
     * })
     */
    upsert<T extends ListingSearchIndexUpsertArgs>(args: SelectSubset<T, ListingSearchIndexUpsertArgs<ExtArgs>>): Prisma__ListingSearchIndexClient<$Result.GetResult<Prisma.$ListingSearchIndexPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ListingSearchIndices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingSearchIndexCountArgs} args - Arguments to filter ListingSearchIndices to count.
     * @example
     * // Count the number of ListingSearchIndices
     * const count = await prisma.listingSearchIndex.count({
     *   where: {
     *     // ... the filter for the ListingSearchIndices we want to count
     *   }
     * })
    **/
    count<T extends ListingSearchIndexCountArgs>(
      args?: Subset<T, ListingSearchIndexCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListingSearchIndexCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListingSearchIndex.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingSearchIndexAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListingSearchIndexAggregateArgs>(args: Subset<T, ListingSearchIndexAggregateArgs>): Prisma.PrismaPromise<GetListingSearchIndexAggregateType<T>>

    /**
     * Group by ListingSearchIndex.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListingSearchIndexGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListingSearchIndexGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListingSearchIndexGroupByArgs['orderBy'] }
        : { orderBy?: ListingSearchIndexGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListingSearchIndexGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListingSearchIndexGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListingSearchIndex model
   */
  readonly fields: ListingSearchIndexFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListingSearchIndex.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListingSearchIndexClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listing<T extends ListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListingDefaultArgs<ExtArgs>>): Prisma__ListingClient<$Result.GetResult<Prisma.$ListingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListingSearchIndex model
   */ 
  interface ListingSearchIndexFieldRefs {
    readonly listingId: FieldRef<"ListingSearchIndex", 'Int'>
    readonly categoryId: FieldRef<"ListingSearchIndex", 'Int'>
    readonly priceMin: FieldRef<"ListingSearchIndex", 'Float'>
    readonly priceMax: FieldRef<"ListingSearchIndex", 'Float'>
    readonly city: FieldRef<"ListingSearchIndex", 'String'>
    readonly district: FieldRef<"ListingSearchIndex", 'String'>
    readonly province: FieldRef<"ListingSearchIndex", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ListingSearchIndex findUnique
   */
  export type ListingSearchIndexFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * Filter, which ListingSearchIndex to fetch.
     */
    where: ListingSearchIndexWhereUniqueInput
  }

  /**
   * ListingSearchIndex findUniqueOrThrow
   */
  export type ListingSearchIndexFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * Filter, which ListingSearchIndex to fetch.
     */
    where: ListingSearchIndexWhereUniqueInput
  }

  /**
   * ListingSearchIndex findFirst
   */
  export type ListingSearchIndexFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * Filter, which ListingSearchIndex to fetch.
     */
    where?: ListingSearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingSearchIndices to fetch.
     */
    orderBy?: ListingSearchIndexOrderByWithRelationInput | ListingSearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingSearchIndices.
     */
    cursor?: ListingSearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingSearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingSearchIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingSearchIndices.
     */
    distinct?: ListingSearchIndexScalarFieldEnum | ListingSearchIndexScalarFieldEnum[]
  }

  /**
   * ListingSearchIndex findFirstOrThrow
   */
  export type ListingSearchIndexFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * Filter, which ListingSearchIndex to fetch.
     */
    where?: ListingSearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingSearchIndices to fetch.
     */
    orderBy?: ListingSearchIndexOrderByWithRelationInput | ListingSearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListingSearchIndices.
     */
    cursor?: ListingSearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingSearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingSearchIndices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListingSearchIndices.
     */
    distinct?: ListingSearchIndexScalarFieldEnum | ListingSearchIndexScalarFieldEnum[]
  }

  /**
   * ListingSearchIndex findMany
   */
  export type ListingSearchIndexFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * Filter, which ListingSearchIndices to fetch.
     */
    where?: ListingSearchIndexWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListingSearchIndices to fetch.
     */
    orderBy?: ListingSearchIndexOrderByWithRelationInput | ListingSearchIndexOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListingSearchIndices.
     */
    cursor?: ListingSearchIndexWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListingSearchIndices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListingSearchIndices.
     */
    skip?: number
    distinct?: ListingSearchIndexScalarFieldEnum | ListingSearchIndexScalarFieldEnum[]
  }

  /**
   * ListingSearchIndex create
   */
  export type ListingSearchIndexCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * The data needed to create a ListingSearchIndex.
     */
    data: XOR<ListingSearchIndexCreateInput, ListingSearchIndexUncheckedCreateInput>
  }

  /**
   * ListingSearchIndex createMany
   */
  export type ListingSearchIndexCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListingSearchIndices.
     */
    data: ListingSearchIndexCreateManyInput | ListingSearchIndexCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListingSearchIndex createManyAndReturn
   */
  export type ListingSearchIndexCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ListingSearchIndices.
     */
    data: ListingSearchIndexCreateManyInput | ListingSearchIndexCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListingSearchIndex update
   */
  export type ListingSearchIndexUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * The data needed to update a ListingSearchIndex.
     */
    data: XOR<ListingSearchIndexUpdateInput, ListingSearchIndexUncheckedUpdateInput>
    /**
     * Choose, which ListingSearchIndex to update.
     */
    where: ListingSearchIndexWhereUniqueInput
  }

  /**
   * ListingSearchIndex updateMany
   */
  export type ListingSearchIndexUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListingSearchIndices.
     */
    data: XOR<ListingSearchIndexUpdateManyMutationInput, ListingSearchIndexUncheckedUpdateManyInput>
    /**
     * Filter which ListingSearchIndices to update
     */
    where?: ListingSearchIndexWhereInput
  }

  /**
   * ListingSearchIndex upsert
   */
  export type ListingSearchIndexUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * The filter to search for the ListingSearchIndex to update in case it exists.
     */
    where: ListingSearchIndexWhereUniqueInput
    /**
     * In case the ListingSearchIndex found by the `where` argument doesn't exist, create a new ListingSearchIndex with this data.
     */
    create: XOR<ListingSearchIndexCreateInput, ListingSearchIndexUncheckedCreateInput>
    /**
     * In case the ListingSearchIndex was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListingSearchIndexUpdateInput, ListingSearchIndexUncheckedUpdateInput>
  }

  /**
   * ListingSearchIndex delete
   */
  export type ListingSearchIndexDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
    /**
     * Filter which ListingSearchIndex to delete.
     */
    where: ListingSearchIndexWhereUniqueInput
  }

  /**
   * ListingSearchIndex deleteMany
   */
  export type ListingSearchIndexDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListingSearchIndices to delete
     */
    where?: ListingSearchIndexWhereInput
  }

  /**
   * ListingSearchIndex without action
   */
  export type ListingSearchIndexDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListingSearchIndex
     */
    select?: ListingSearchIndexSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListingSearchIndexInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    lastLoginAt: 'lastLoginAt',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const LocalTouristScalarFieldEnum: {
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

  export type LocalTouristScalarFieldEnum = (typeof LocalTouristScalarFieldEnum)[keyof typeof LocalTouristScalarFieldEnum]


  export const VendorScalarFieldEnum: {
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

  export type VendorScalarFieldEnum = (typeof VendorScalarFieldEnum)[keyof typeof VendorScalarFieldEnum]


  export const VendorLocationScalarFieldEnum: {
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

  export type VendorLocationScalarFieldEnum = (typeof VendorLocationScalarFieldEnum)[keyof typeof VendorLocationScalarFieldEnum]


  export const ListingCategoryScalarFieldEnum: {
    id: 'id',
    categoryName: 'categoryName',
    isActive: 'isActive'
  };

  export type ListingCategoryScalarFieldEnum = (typeof ListingCategoryScalarFieldEnum)[keyof typeof ListingCategoryScalarFieldEnum]


  export const ListingScalarFieldEnum: {
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

  export type ListingScalarFieldEnum = (typeof ListingScalarFieldEnum)[keyof typeof ListingScalarFieldEnum]


  export const ListingMediaScalarFieldEnum: {
    id: 'id',
    listingId: 'listingId',
    mediaType: 'mediaType',
    mediaUrl: 'mediaUrl',
    caption: 'caption',
    displayOrder: 'displayOrder',
    isPrimary: 'isPrimary',
    uploadedAt: 'uploadedAt'
  };

  export type ListingMediaScalarFieldEnum = (typeof ListingMediaScalarFieldEnum)[keyof typeof ListingMediaScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    revoked: 'revoked',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const ListingSearchIndexScalarFieldEnum: {
    listingId: 'listingId',
    categoryId: 'categoryId',
    priceMin: 'priceMin',
    priceMax: 'priceMax',
    city: 'city',
    district: 'district',
    province: 'province'
  };

  export type ListingSearchIndexScalarFieldEnum = (typeof ListingSearchIndexScalarFieldEnum)[keyof typeof ListingSearchIndexScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'LocalUserType'
   */
  export type EnumLocalUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LocalUserType'>
    


  /**
   * Reference to a field of type 'LocalUserType[]'
   */
  export type ListEnumLocalUserTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LocalUserType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'VerifiedStatus'
   */
  export type EnumVerifiedStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerifiedStatus'>
    


  /**
   * Reference to a field of type 'VerifiedStatus[]'
   */
  export type ListEnumVerifiedStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VerifiedStatus[]'>
    


  /**
   * Reference to a field of type 'VisibilityStatus'
   */
  export type EnumVisibilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisibilityStatus'>
    


  /**
   * Reference to a field of type 'VisibilityStatus[]'
   */
  export type ListEnumVisibilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VisibilityStatus[]'>
    


  /**
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'MediaType[]'
   */
  export type ListEnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    vendor?: XOR<VendorNullableRelationFilter, VendorWhereInput> | null
    localTourist?: XOR<LocalTouristNullableRelationFilter, LocalTouristWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    vendor?: VendorOrderByWithRelationInput
    localTourist?: LocalTouristOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    vendor?: XOR<VendorNullableRelationFilter, VendorWhereInput> | null
    localTourist?: XOR<LocalTouristNullableRelationFilter, LocalTouristWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    fullName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type LocalTouristWhereInput = {
    AND?: LocalTouristWhereInput | LocalTouristWhereInput[]
    OR?: LocalTouristWhereInput[]
    NOT?: LocalTouristWhereInput | LocalTouristWhereInput[]
    userId?: IntFilter<"LocalTourist"> | number
    fullName?: StringFilter<"LocalTourist"> | string
    profilePhotoUrl?: StringNullableFilter<"LocalTourist"> | string | null
    userType?: EnumLocalUserTypeFilter<"LocalTourist"> | $Enums.LocalUserType
    nationality?: StringNullableFilter<"LocalTourist"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"LocalTourist"> | Date | string | null
    preferredLanguage?: StringFilter<"LocalTourist"> | string
    interests?: JsonNullableFilter<"LocalTourist">
    isProUser?: BoolFilter<"LocalTourist"> | boolean
    proSubscriptionExpiry?: DateTimeNullableFilter<"LocalTourist"> | Date | string | null
    createdAt?: DateTimeFilter<"LocalTourist"> | Date | string
    updatedAt?: DateTimeFilter<"LocalTourist"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type LocalTouristOrderByWithRelationInput = {
    userId?: SortOrder
    fullName?: SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    userType?: SortOrder
    nationality?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    preferredLanguage?: SortOrder
    interests?: SortOrderInput | SortOrder
    isProUser?: SortOrder
    proSubscriptionExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LocalTouristWhereUniqueInput = Prisma.AtLeast<{
    userId?: number
    AND?: LocalTouristWhereInput | LocalTouristWhereInput[]
    OR?: LocalTouristWhereInput[]
    NOT?: LocalTouristWhereInput | LocalTouristWhereInput[]
    fullName?: StringFilter<"LocalTourist"> | string
    profilePhotoUrl?: StringNullableFilter<"LocalTourist"> | string | null
    userType?: EnumLocalUserTypeFilter<"LocalTourist"> | $Enums.LocalUserType
    nationality?: StringNullableFilter<"LocalTourist"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"LocalTourist"> | Date | string | null
    preferredLanguage?: StringFilter<"LocalTourist"> | string
    interests?: JsonNullableFilter<"LocalTourist">
    isProUser?: BoolFilter<"LocalTourist"> | boolean
    proSubscriptionExpiry?: DateTimeNullableFilter<"LocalTourist"> | Date | string | null
    createdAt?: DateTimeFilter<"LocalTourist"> | Date | string
    updatedAt?: DateTimeFilter<"LocalTourist"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "userId">

  export type LocalTouristOrderByWithAggregationInput = {
    userId?: SortOrder
    fullName?: SortOrder
    profilePhotoUrl?: SortOrderInput | SortOrder
    userType?: SortOrder
    nationality?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    preferredLanguage?: SortOrder
    interests?: SortOrderInput | SortOrder
    isProUser?: SortOrder
    proSubscriptionExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LocalTouristCountOrderByAggregateInput
    _avg?: LocalTouristAvgOrderByAggregateInput
    _max?: LocalTouristMaxOrderByAggregateInput
    _min?: LocalTouristMinOrderByAggregateInput
    _sum?: LocalTouristSumOrderByAggregateInput
  }

  export type LocalTouristScalarWhereWithAggregatesInput = {
    AND?: LocalTouristScalarWhereWithAggregatesInput | LocalTouristScalarWhereWithAggregatesInput[]
    OR?: LocalTouristScalarWhereWithAggregatesInput[]
    NOT?: LocalTouristScalarWhereWithAggregatesInput | LocalTouristScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"LocalTourist"> | number
    fullName?: StringWithAggregatesFilter<"LocalTourist"> | string
    profilePhotoUrl?: StringNullableWithAggregatesFilter<"LocalTourist"> | string | null
    userType?: EnumLocalUserTypeWithAggregatesFilter<"LocalTourist"> | $Enums.LocalUserType
    nationality?: StringNullableWithAggregatesFilter<"LocalTourist"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"LocalTourist"> | Date | string | null
    preferredLanguage?: StringWithAggregatesFilter<"LocalTourist"> | string
    interests?: JsonNullableWithAggregatesFilter<"LocalTourist">
    isProUser?: BoolWithAggregatesFilter<"LocalTourist"> | boolean
    proSubscriptionExpiry?: DateTimeNullableWithAggregatesFilter<"LocalTourist"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LocalTourist"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LocalTourist"> | Date | string
  }

  export type VendorWhereInput = {
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    id?: IntFilter<"Vendor"> | number
    userId?: IntFilter<"Vendor"> | number
    businessName?: StringFilter<"Vendor"> | string
    shortTagline?: StringNullableFilter<"Vendor"> | string | null
    establishedYear?: IntNullableFilter<"Vendor"> | number | null
    ratingAverage?: FloatFilter<"Vendor"> | number
    ratingCount?: IntFilter<"Vendor"> | number
    verifiedStatus?: EnumVerifiedStatusFilter<"Vendor"> | $Enums.VerifiedStatus
    profileComplete?: BoolFilter<"Vendor"> | boolean
    lastActiveAt?: DateTimeNullableFilter<"Vendor"> | Date | string | null
    isActive?: BoolFilter<"Vendor"> | boolean
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeFilter<"Vendor"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    locations?: VendorLocationListRelationFilter
    listings?: ListingListRelationFilter
  }

  export type VendorOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    shortTagline?: SortOrderInput | SortOrder
    establishedYear?: SortOrderInput | SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    verifiedStatus?: SortOrder
    profileComplete?: SortOrder
    lastActiveAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    locations?: VendorLocationOrderByRelationAggregateInput
    listings?: ListingOrderByRelationAggregateInput
  }

  export type VendorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: VendorWhereInput | VendorWhereInput[]
    OR?: VendorWhereInput[]
    NOT?: VendorWhereInput | VendorWhereInput[]
    businessName?: StringFilter<"Vendor"> | string
    shortTagline?: StringNullableFilter<"Vendor"> | string | null
    establishedYear?: IntNullableFilter<"Vendor"> | number | null
    ratingAverage?: FloatFilter<"Vendor"> | number
    ratingCount?: IntFilter<"Vendor"> | number
    verifiedStatus?: EnumVerifiedStatusFilter<"Vendor"> | $Enums.VerifiedStatus
    profileComplete?: BoolFilter<"Vendor"> | boolean
    lastActiveAt?: DateTimeNullableFilter<"Vendor"> | Date | string | null
    isActive?: BoolFilter<"Vendor"> | boolean
    createdAt?: DateTimeFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeFilter<"Vendor"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    locations?: VendorLocationListRelationFilter
    listings?: ListingListRelationFilter
  }, "id" | "userId">

  export type VendorOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    shortTagline?: SortOrderInput | SortOrder
    establishedYear?: SortOrderInput | SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    verifiedStatus?: SortOrder
    profileComplete?: SortOrder
    lastActiveAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VendorCountOrderByAggregateInput
    _avg?: VendorAvgOrderByAggregateInput
    _max?: VendorMaxOrderByAggregateInput
    _min?: VendorMinOrderByAggregateInput
    _sum?: VendorSumOrderByAggregateInput
  }

  export type VendorScalarWhereWithAggregatesInput = {
    AND?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    OR?: VendorScalarWhereWithAggregatesInput[]
    NOT?: VendorScalarWhereWithAggregatesInput | VendorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vendor"> | number
    userId?: IntWithAggregatesFilter<"Vendor"> | number
    businessName?: StringWithAggregatesFilter<"Vendor"> | string
    shortTagline?: StringNullableWithAggregatesFilter<"Vendor"> | string | null
    establishedYear?: IntNullableWithAggregatesFilter<"Vendor"> | number | null
    ratingAverage?: FloatWithAggregatesFilter<"Vendor"> | number
    ratingCount?: IntWithAggregatesFilter<"Vendor"> | number
    verifiedStatus?: EnumVerifiedStatusWithAggregatesFilter<"Vendor"> | $Enums.VerifiedStatus
    profileComplete?: BoolWithAggregatesFilter<"Vendor"> | boolean
    lastActiveAt?: DateTimeNullableWithAggregatesFilter<"Vendor"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"Vendor"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vendor"> | Date | string
  }

  export type VendorLocationWhereInput = {
    AND?: VendorLocationWhereInput | VendorLocationWhereInput[]
    OR?: VendorLocationWhereInput[]
    NOT?: VendorLocationWhereInput | VendorLocationWhereInput[]
    id?: IntFilter<"VendorLocation"> | number
    vendorId?: IntFilter<"VendorLocation"> | number
    addressLine1?: StringFilter<"VendorLocation"> | string
    addressLine2?: StringNullableFilter<"VendorLocation"> | string | null
    city?: StringFilter<"VendorLocation"> | string
    district?: StringFilter<"VendorLocation"> | string
    province?: StringFilter<"VendorLocation"> | string
    postalCode?: StringNullableFilter<"VendorLocation"> | string | null
    latitude?: FloatNullableFilter<"VendorLocation"> | number | null
    longitude?: FloatNullableFilter<"VendorLocation"> | number | null
    isMainLocation?: BoolFilter<"VendorLocation"> | boolean
    vendor?: XOR<VendorRelationFilter, VendorWhereInput>
    listings?: ListingListRelationFilter
  }

  export type VendorLocationOrderByWithRelationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
    postalCode?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    isMainLocation?: SortOrder
    vendor?: VendorOrderByWithRelationInput
    listings?: ListingOrderByRelationAggregateInput
  }

  export type VendorLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VendorLocationWhereInput | VendorLocationWhereInput[]
    OR?: VendorLocationWhereInput[]
    NOT?: VendorLocationWhereInput | VendorLocationWhereInput[]
    vendorId?: IntFilter<"VendorLocation"> | number
    addressLine1?: StringFilter<"VendorLocation"> | string
    addressLine2?: StringNullableFilter<"VendorLocation"> | string | null
    city?: StringFilter<"VendorLocation"> | string
    district?: StringFilter<"VendorLocation"> | string
    province?: StringFilter<"VendorLocation"> | string
    postalCode?: StringNullableFilter<"VendorLocation"> | string | null
    latitude?: FloatNullableFilter<"VendorLocation"> | number | null
    longitude?: FloatNullableFilter<"VendorLocation"> | number | null
    isMainLocation?: BoolFilter<"VendorLocation"> | boolean
    vendor?: XOR<VendorRelationFilter, VendorWhereInput>
    listings?: ListingListRelationFilter
  }, "id">

  export type VendorLocationOrderByWithAggregationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
    postalCode?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    isMainLocation?: SortOrder
    _count?: VendorLocationCountOrderByAggregateInput
    _avg?: VendorLocationAvgOrderByAggregateInput
    _max?: VendorLocationMaxOrderByAggregateInput
    _min?: VendorLocationMinOrderByAggregateInput
    _sum?: VendorLocationSumOrderByAggregateInput
  }

  export type VendorLocationScalarWhereWithAggregatesInput = {
    AND?: VendorLocationScalarWhereWithAggregatesInput | VendorLocationScalarWhereWithAggregatesInput[]
    OR?: VendorLocationScalarWhereWithAggregatesInput[]
    NOT?: VendorLocationScalarWhereWithAggregatesInput | VendorLocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"VendorLocation"> | number
    vendorId?: IntWithAggregatesFilter<"VendorLocation"> | number
    addressLine1?: StringWithAggregatesFilter<"VendorLocation"> | string
    addressLine2?: StringNullableWithAggregatesFilter<"VendorLocation"> | string | null
    city?: StringWithAggregatesFilter<"VendorLocation"> | string
    district?: StringWithAggregatesFilter<"VendorLocation"> | string
    province?: StringWithAggregatesFilter<"VendorLocation"> | string
    postalCode?: StringNullableWithAggregatesFilter<"VendorLocation"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"VendorLocation"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"VendorLocation"> | number | null
    isMainLocation?: BoolWithAggregatesFilter<"VendorLocation"> | boolean
  }

  export type ListingCategoryWhereInput = {
    AND?: ListingCategoryWhereInput | ListingCategoryWhereInput[]
    OR?: ListingCategoryWhereInput[]
    NOT?: ListingCategoryWhereInput | ListingCategoryWhereInput[]
    id?: IntFilter<"ListingCategory"> | number
    categoryName?: StringFilter<"ListingCategory"> | string
    isActive?: BoolFilter<"ListingCategory"> | boolean
    listings?: ListingListRelationFilter
  }

  export type ListingCategoryOrderByWithRelationInput = {
    id?: SortOrder
    categoryName?: SortOrder
    isActive?: SortOrder
    listings?: ListingOrderByRelationAggregateInput
  }

  export type ListingCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    categoryName?: string
    AND?: ListingCategoryWhereInput | ListingCategoryWhereInput[]
    OR?: ListingCategoryWhereInput[]
    NOT?: ListingCategoryWhereInput | ListingCategoryWhereInput[]
    isActive?: BoolFilter<"ListingCategory"> | boolean
    listings?: ListingListRelationFilter
  }, "id" | "categoryName">

  export type ListingCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    categoryName?: SortOrder
    isActive?: SortOrder
    _count?: ListingCategoryCountOrderByAggregateInput
    _avg?: ListingCategoryAvgOrderByAggregateInput
    _max?: ListingCategoryMaxOrderByAggregateInput
    _min?: ListingCategoryMinOrderByAggregateInput
    _sum?: ListingCategorySumOrderByAggregateInput
  }

  export type ListingCategoryScalarWhereWithAggregatesInput = {
    AND?: ListingCategoryScalarWhereWithAggregatesInput | ListingCategoryScalarWhereWithAggregatesInput[]
    OR?: ListingCategoryScalarWhereWithAggregatesInput[]
    NOT?: ListingCategoryScalarWhereWithAggregatesInput | ListingCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ListingCategory"> | number
    categoryName?: StringWithAggregatesFilter<"ListingCategory"> | string
    isActive?: BoolWithAggregatesFilter<"ListingCategory"> | boolean
  }

  export type ListingWhereInput = {
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    id?: IntFilter<"Listing"> | number
    vendorId?: IntFilter<"Listing"> | number
    categoryId?: IntFilter<"Listing"> | number
    addressId?: IntFilter<"Listing"> | number
    title?: StringFilter<"Listing"> | string
    shortDescription?: StringFilter<"Listing"> | string
    longDescription?: StringNullableFilter<"Listing"> | string | null
    priceMin?: FloatFilter<"Listing"> | number
    priceMax?: FloatNullableFilter<"Listing"> | number | null
    priceNote?: StringNullableFilter<"Listing"> | string | null
    duration?: StringNullableFilter<"Listing"> | string | null
    capacity?: IntNullableFilter<"Listing"> | number | null
    availability?: StringNullableFilter<"Listing"> | string | null
    ratingAverage?: FloatFilter<"Listing"> | number
    ratingCount?: IntFilter<"Listing"> | number
    viewsCount?: IntFilter<"Listing"> | number
    visibilityStatus?: EnumVisibilityStatusFilter<"Listing"> | $Enums.VisibilityStatus
    isFeatured?: BoolFilter<"Listing"> | boolean
    displayPriority?: IntFilter<"Listing"> | number
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    vendor?: XOR<VendorRelationFilter, VendorWhereInput>
    category?: XOR<ListingCategoryRelationFilter, ListingCategoryWhereInput>
    location?: XOR<VendorLocationRelationFilter, VendorLocationWhereInput>
    media?: ListingMediaListRelationFilter
    search?: XOR<ListingSearchIndexNullableRelationFilter, ListingSearchIndexWhereInput> | null
  }

  export type ListingOrderByWithRelationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    addressId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrderInput | SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrderInput | SortOrder
    priceNote?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    viewsCount?: SortOrder
    visibilityStatus?: SortOrder
    isFeatured?: SortOrder
    displayPriority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vendor?: VendorOrderByWithRelationInput
    category?: ListingCategoryOrderByWithRelationInput
    location?: VendorLocationOrderByWithRelationInput
    media?: ListingMediaOrderByRelationAggregateInput
    search?: ListingSearchIndexOrderByWithRelationInput
  }

  export type ListingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ListingWhereInput | ListingWhereInput[]
    OR?: ListingWhereInput[]
    NOT?: ListingWhereInput | ListingWhereInput[]
    vendorId?: IntFilter<"Listing"> | number
    categoryId?: IntFilter<"Listing"> | number
    addressId?: IntFilter<"Listing"> | number
    title?: StringFilter<"Listing"> | string
    shortDescription?: StringFilter<"Listing"> | string
    longDescription?: StringNullableFilter<"Listing"> | string | null
    priceMin?: FloatFilter<"Listing"> | number
    priceMax?: FloatNullableFilter<"Listing"> | number | null
    priceNote?: StringNullableFilter<"Listing"> | string | null
    duration?: StringNullableFilter<"Listing"> | string | null
    capacity?: IntNullableFilter<"Listing"> | number | null
    availability?: StringNullableFilter<"Listing"> | string | null
    ratingAverage?: FloatFilter<"Listing"> | number
    ratingCount?: IntFilter<"Listing"> | number
    viewsCount?: IntFilter<"Listing"> | number
    visibilityStatus?: EnumVisibilityStatusFilter<"Listing"> | $Enums.VisibilityStatus
    isFeatured?: BoolFilter<"Listing"> | boolean
    displayPriority?: IntFilter<"Listing"> | number
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
    vendor?: XOR<VendorRelationFilter, VendorWhereInput>
    category?: XOR<ListingCategoryRelationFilter, ListingCategoryWhereInput>
    location?: XOR<VendorLocationRelationFilter, VendorLocationWhereInput>
    media?: ListingMediaListRelationFilter
    search?: XOR<ListingSearchIndexNullableRelationFilter, ListingSearchIndexWhereInput> | null
  }, "id">

  export type ListingOrderByWithAggregationInput = {
    id?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    addressId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrderInput | SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrderInput | SortOrder
    priceNote?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    capacity?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    viewsCount?: SortOrder
    visibilityStatus?: SortOrder
    isFeatured?: SortOrder
    displayPriority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ListingCountOrderByAggregateInput
    _avg?: ListingAvgOrderByAggregateInput
    _max?: ListingMaxOrderByAggregateInput
    _min?: ListingMinOrderByAggregateInput
    _sum?: ListingSumOrderByAggregateInput
  }

  export type ListingScalarWhereWithAggregatesInput = {
    AND?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    OR?: ListingScalarWhereWithAggregatesInput[]
    NOT?: ListingScalarWhereWithAggregatesInput | ListingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Listing"> | number
    vendorId?: IntWithAggregatesFilter<"Listing"> | number
    categoryId?: IntWithAggregatesFilter<"Listing"> | number
    addressId?: IntWithAggregatesFilter<"Listing"> | number
    title?: StringWithAggregatesFilter<"Listing"> | string
    shortDescription?: StringWithAggregatesFilter<"Listing"> | string
    longDescription?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    priceMin?: FloatWithAggregatesFilter<"Listing"> | number
    priceMax?: FloatNullableWithAggregatesFilter<"Listing"> | number | null
    priceNote?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    duration?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    capacity?: IntNullableWithAggregatesFilter<"Listing"> | number | null
    availability?: StringNullableWithAggregatesFilter<"Listing"> | string | null
    ratingAverage?: FloatWithAggregatesFilter<"Listing"> | number
    ratingCount?: IntWithAggregatesFilter<"Listing"> | number
    viewsCount?: IntWithAggregatesFilter<"Listing"> | number
    visibilityStatus?: EnumVisibilityStatusWithAggregatesFilter<"Listing"> | $Enums.VisibilityStatus
    isFeatured?: BoolWithAggregatesFilter<"Listing"> | boolean
    displayPriority?: IntWithAggregatesFilter<"Listing"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Listing"> | Date | string
  }

  export type ListingMediaWhereInput = {
    AND?: ListingMediaWhereInput | ListingMediaWhereInput[]
    OR?: ListingMediaWhereInput[]
    NOT?: ListingMediaWhereInput | ListingMediaWhereInput[]
    id?: IntFilter<"ListingMedia"> | number
    listingId?: IntFilter<"ListingMedia"> | number
    mediaType?: EnumMediaTypeFilter<"ListingMedia"> | $Enums.MediaType
    mediaUrl?: StringFilter<"ListingMedia"> | string
    caption?: StringNullableFilter<"ListingMedia"> | string | null
    displayOrder?: IntFilter<"ListingMedia"> | number
    isPrimary?: BoolFilter<"ListingMedia"> | boolean
    uploadedAt?: DateTimeFilter<"ListingMedia"> | Date | string
    listing?: XOR<ListingRelationFilter, ListingWhereInput>
  }

  export type ListingMediaOrderByWithRelationInput = {
    id?: SortOrder
    listingId?: SortOrder
    mediaType?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    isPrimary?: SortOrder
    uploadedAt?: SortOrder
    listing?: ListingOrderByWithRelationInput
  }

  export type ListingMediaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ListingMediaWhereInput | ListingMediaWhereInput[]
    OR?: ListingMediaWhereInput[]
    NOT?: ListingMediaWhereInput | ListingMediaWhereInput[]
    listingId?: IntFilter<"ListingMedia"> | number
    mediaType?: EnumMediaTypeFilter<"ListingMedia"> | $Enums.MediaType
    mediaUrl?: StringFilter<"ListingMedia"> | string
    caption?: StringNullableFilter<"ListingMedia"> | string | null
    displayOrder?: IntFilter<"ListingMedia"> | number
    isPrimary?: BoolFilter<"ListingMedia"> | boolean
    uploadedAt?: DateTimeFilter<"ListingMedia"> | Date | string
    listing?: XOR<ListingRelationFilter, ListingWhereInput>
  }, "id">

  export type ListingMediaOrderByWithAggregationInput = {
    id?: SortOrder
    listingId?: SortOrder
    mediaType?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrderInput | SortOrder
    displayOrder?: SortOrder
    isPrimary?: SortOrder
    uploadedAt?: SortOrder
    _count?: ListingMediaCountOrderByAggregateInput
    _avg?: ListingMediaAvgOrderByAggregateInput
    _max?: ListingMediaMaxOrderByAggregateInput
    _min?: ListingMediaMinOrderByAggregateInput
    _sum?: ListingMediaSumOrderByAggregateInput
  }

  export type ListingMediaScalarWhereWithAggregatesInput = {
    AND?: ListingMediaScalarWhereWithAggregatesInput | ListingMediaScalarWhereWithAggregatesInput[]
    OR?: ListingMediaScalarWhereWithAggregatesInput[]
    NOT?: ListingMediaScalarWhereWithAggregatesInput | ListingMediaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ListingMedia"> | number
    listingId?: IntWithAggregatesFilter<"ListingMedia"> | number
    mediaType?: EnumMediaTypeWithAggregatesFilter<"ListingMedia"> | $Enums.MediaType
    mediaUrl?: StringWithAggregatesFilter<"ListingMedia"> | string
    caption?: StringNullableWithAggregatesFilter<"ListingMedia"> | string | null
    displayOrder?: IntWithAggregatesFilter<"ListingMedia"> | number
    isPrimary?: BoolWithAggregatesFilter<"ListingMedia"> | boolean
    uploadedAt?: DateTimeWithAggregatesFilter<"ListingMedia"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: IntFilter<"RefreshToken"> | number
    token?: StringFilter<"RefreshToken"> | string
    userId?: IntFilter<"RefreshToken"> | number
    revoked?: BoolFilter<"RefreshToken"> | boolean
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    revoked?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: IntFilter<"RefreshToken"> | number
    revoked?: BoolFilter<"RefreshToken"> | boolean
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    revoked?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _avg?: RefreshTokenAvgOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
    _sum?: RefreshTokenSumOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RefreshToken"> | number
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: IntWithAggregatesFilter<"RefreshToken"> | number
    revoked?: BoolWithAggregatesFilter<"RefreshToken"> | boolean
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type ListingSearchIndexWhereInput = {
    AND?: ListingSearchIndexWhereInput | ListingSearchIndexWhereInput[]
    OR?: ListingSearchIndexWhereInput[]
    NOT?: ListingSearchIndexWhereInput | ListingSearchIndexWhereInput[]
    listingId?: IntFilter<"ListingSearchIndex"> | number
    categoryId?: IntFilter<"ListingSearchIndex"> | number
    priceMin?: FloatFilter<"ListingSearchIndex"> | number
    priceMax?: FloatNullableFilter<"ListingSearchIndex"> | number | null
    city?: StringFilter<"ListingSearchIndex"> | string
    district?: StringFilter<"ListingSearchIndex"> | string
    province?: StringFilter<"ListingSearchIndex"> | string
    listing?: XOR<ListingRelationFilter, ListingWhereInput>
  }

  export type ListingSearchIndexOrderByWithRelationInput = {
    listingId?: SortOrder
    categoryId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
    listing?: ListingOrderByWithRelationInput
  }

  export type ListingSearchIndexWhereUniqueInput = Prisma.AtLeast<{
    listingId?: number
    AND?: ListingSearchIndexWhereInput | ListingSearchIndexWhereInput[]
    OR?: ListingSearchIndexWhereInput[]
    NOT?: ListingSearchIndexWhereInput | ListingSearchIndexWhereInput[]
    categoryId?: IntFilter<"ListingSearchIndex"> | number
    priceMin?: FloatFilter<"ListingSearchIndex"> | number
    priceMax?: FloatNullableFilter<"ListingSearchIndex"> | number | null
    city?: StringFilter<"ListingSearchIndex"> | string
    district?: StringFilter<"ListingSearchIndex"> | string
    province?: StringFilter<"ListingSearchIndex"> | string
    listing?: XOR<ListingRelationFilter, ListingWhereInput>
  }, "listingId">

  export type ListingSearchIndexOrderByWithAggregationInput = {
    listingId?: SortOrder
    categoryId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrderInput | SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
    _count?: ListingSearchIndexCountOrderByAggregateInput
    _avg?: ListingSearchIndexAvgOrderByAggregateInput
    _max?: ListingSearchIndexMaxOrderByAggregateInput
    _min?: ListingSearchIndexMinOrderByAggregateInput
    _sum?: ListingSearchIndexSumOrderByAggregateInput
  }

  export type ListingSearchIndexScalarWhereWithAggregatesInput = {
    AND?: ListingSearchIndexScalarWhereWithAggregatesInput | ListingSearchIndexScalarWhereWithAggregatesInput[]
    OR?: ListingSearchIndexScalarWhereWithAggregatesInput[]
    NOT?: ListingSearchIndexScalarWhereWithAggregatesInput | ListingSearchIndexScalarWhereWithAggregatesInput[]
    listingId?: IntWithAggregatesFilter<"ListingSearchIndex"> | number
    categoryId?: IntWithAggregatesFilter<"ListingSearchIndex"> | number
    priceMin?: FloatWithAggregatesFilter<"ListingSearchIndex"> | number
    priceMax?: FloatNullableWithAggregatesFilter<"ListingSearchIndex"> | number | null
    city?: StringWithAggregatesFilter<"ListingSearchIndex"> | string
    district?: StringWithAggregatesFilter<"ListingSearchIndex"> | string
    province?: StringWithAggregatesFilter<"ListingSearchIndex"> | string
  }

  export type UserCreateInput = {
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    lastLoginAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    vendor?: VendorCreateNestedOneWithoutUserInput
    localTourist?: LocalTouristCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    lastLoginAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    vendor?: VendorUncheckedCreateNestedOneWithoutUserInput
    localTourist?: LocalTouristUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneWithoutUserNestedInput
    localTourist?: LocalTouristUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUncheckedUpdateOneWithoutUserNestedInput
    localTourist?: LocalTouristUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    lastLoginAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalTouristCreateInput = {
    fullName: string
    profilePhotoUrl?: string | null
    userType: $Enums.LocalUserType
    nationality?: string | null
    dateOfBirth?: Date | string | null
    preferredLanguage?: string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: boolean
    proSubscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLocalTouristInput
  }

  export type LocalTouristUncheckedCreateInput = {
    userId: number
    fullName: string
    profilePhotoUrl?: string | null
    userType: $Enums.LocalUserType
    nationality?: string | null
    dateOfBirth?: Date | string | null
    preferredLanguage?: string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: boolean
    proSubscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocalTouristUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumLocalUserTypeFieldUpdateOperationsInput | $Enums.LocalUserType
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: BoolFieldUpdateOperationsInput | boolean
    proSubscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLocalTouristNestedInput
  }

  export type LocalTouristUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumLocalUserTypeFieldUpdateOperationsInput | $Enums.LocalUserType
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: BoolFieldUpdateOperationsInput | boolean
    proSubscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalTouristCreateManyInput = {
    userId: number
    fullName: string
    profilePhotoUrl?: string | null
    userType: $Enums.LocalUserType
    nationality?: string | null
    dateOfBirth?: Date | string | null
    preferredLanguage?: string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: boolean
    proSubscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocalTouristUpdateManyMutationInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumLocalUserTypeFieldUpdateOperationsInput | $Enums.LocalUserType
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: BoolFieldUpdateOperationsInput | boolean
    proSubscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalTouristUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumLocalUserTypeFieldUpdateOperationsInput | $Enums.LocalUserType
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: BoolFieldUpdateOperationsInput | boolean
    proSubscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorCreateInput = {
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVendorInput
    locations?: VendorLocationCreateNestedManyWithoutVendorInput
    listings?: ListingCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateInput = {
    id?: number
    userId: number
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VendorLocationUncheckedCreateNestedManyWithoutVendorInput
    listings?: ListingUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorUpdateInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVendorNestedInput
    locations?: VendorLocationUpdateManyWithoutVendorNestedInput
    listings?: ListingUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VendorLocationUncheckedUpdateManyWithoutVendorNestedInput
    listings?: ListingUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type VendorCreateManyInput = {
    id?: number
    userId: number
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendorUpdateManyMutationInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VendorLocationCreateInput = {
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
    vendor: VendorCreateNestedOneWithoutLocationsInput
    listings?: ListingCreateNestedManyWithoutLocationInput
  }

  export type VendorLocationUncheckedCreateInput = {
    id?: number
    vendorId: number
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
    listings?: ListingUncheckedCreateNestedManyWithoutLocationInput
  }

  export type VendorLocationUpdateInput = {
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
    vendor?: VendorUpdateOneRequiredWithoutLocationsNestedInput
    listings?: ListingUpdateManyWithoutLocationNestedInput
  }

  export type VendorLocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type VendorLocationCreateManyInput = {
    id?: number
    vendorId: number
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
  }

  export type VendorLocationUpdateManyMutationInput = {
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VendorLocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingCategoryCreateInput = {
    categoryName: string
    isActive?: boolean
    listings?: ListingCreateNestedManyWithoutCategoryInput
  }

  export type ListingCategoryUncheckedCreateInput = {
    id?: number
    categoryName: string
    isActive?: boolean
    listings?: ListingUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ListingCategoryUpdateInput = {
    categoryName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUpdateManyWithoutCategoryNestedInput
  }

  export type ListingCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ListingCategoryCreateManyInput = {
    id?: number
    categoryName: string
    isActive?: boolean
  }

  export type ListingCategoryUpdateManyMutationInput = {
    categoryName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingCreateInput = {
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor: VendorCreateNestedOneWithoutListingsInput
    category: ListingCategoryCreateNestedOneWithoutListingsInput
    location: VendorLocationCreateNestedOneWithoutListingsInput
    media?: ListingMediaCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexCreateNestedOneWithoutListingInput
  }

  export type ListingUncheckedCreateInput = {
    id?: number
    vendorId: number
    categoryId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: ListingMediaUncheckedCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexUncheckedCreateNestedOneWithoutListingInput
  }

  export type ListingUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneRequiredWithoutListingsNestedInput
    category?: ListingCategoryUpdateOneRequiredWithoutListingsNestedInput
    location?: VendorLocationUpdateOneRequiredWithoutListingsNestedInput
    media?: ListingMediaUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: ListingMediaUncheckedUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUncheckedUpdateOneWithoutListingNestedInput
  }

  export type ListingCreateManyInput = {
    id?: number
    vendorId: number
    categoryId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingMediaCreateInput = {
    mediaType: $Enums.MediaType
    mediaUrl: string
    caption?: string | null
    displayOrder?: number
    isPrimary?: boolean
    uploadedAt?: Date | string
    listing: ListingCreateNestedOneWithoutMediaInput
  }

  export type ListingMediaUncheckedCreateInput = {
    id?: number
    listingId: number
    mediaType: $Enums.MediaType
    mediaUrl: string
    caption?: string | null
    displayOrder?: number
    isPrimary?: boolean
    uploadedAt?: Date | string
  }

  export type ListingMediaUpdateInput = {
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ListingUpdateOneRequiredWithoutMediaNestedInput
  }

  export type ListingMediaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingMediaCreateManyInput = {
    id?: number
    listingId: number
    mediaType: $Enums.MediaType
    mediaUrl: string
    caption?: string | null
    displayOrder?: number
    isPrimary?: boolean
    uploadedAt?: Date | string
  }

  export type ListingMediaUpdateManyMutationInput = {
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingMediaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    listingId?: IntFieldUpdateOperationsInput | number
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    token: string
    userId: number
    revoked?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: number
    token: string
    userId: number
    revoked?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    revoked?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    revoked?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: number
    token: string
    userId: number
    revoked?: boolean
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    revoked?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    revoked?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingSearchIndexCreateInput = {
    categoryId: number
    priceMin: number
    priceMax?: number | null
    city: string
    district: string
    province: string
    listing: ListingCreateNestedOneWithoutSearchInput
  }

  export type ListingSearchIndexUncheckedCreateInput = {
    listingId: number
    categoryId: number
    priceMin: number
    priceMax?: number | null
    city: string
    district: string
    province: string
  }

  export type ListingSearchIndexUpdateInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    listing?: ListingUpdateOneRequiredWithoutSearchNestedInput
  }

  export type ListingSearchIndexUncheckedUpdateInput = {
    listingId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
  }

  export type ListingSearchIndexCreateManyInput = {
    listingId: number
    categoryId: number
    priceMin: number
    priceMax?: number | null
    city: string
    district: string
    province: string
  }

  export type ListingSearchIndexUpdateManyMutationInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
  }

  export type ListingSearchIndexUncheckedUpdateManyInput = {
    listingId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VendorNullableRelationFilter = {
    is?: VendorWhereInput | null
    isNot?: VendorWhereInput | null
  }

  export type LocalTouristNullableRelationFilter = {
    is?: LocalTouristWhereInput | null
    isNot?: LocalTouristWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLoginAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLoginAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLoginAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumLocalUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LocalUserType | EnumLocalUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocalUserTypeFilter<$PrismaModel> | $Enums.LocalUserType
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LocalTouristCountOrderByAggregateInput = {
    userId?: SortOrder
    fullName?: SortOrder
    profilePhotoUrl?: SortOrder
    userType?: SortOrder
    nationality?: SortOrder
    dateOfBirth?: SortOrder
    preferredLanguage?: SortOrder
    interests?: SortOrder
    isProUser?: SortOrder
    proSubscriptionExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocalTouristAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type LocalTouristMaxOrderByAggregateInput = {
    userId?: SortOrder
    fullName?: SortOrder
    profilePhotoUrl?: SortOrder
    userType?: SortOrder
    nationality?: SortOrder
    dateOfBirth?: SortOrder
    preferredLanguage?: SortOrder
    isProUser?: SortOrder
    proSubscriptionExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocalTouristMinOrderByAggregateInput = {
    userId?: SortOrder
    fullName?: SortOrder
    profilePhotoUrl?: SortOrder
    userType?: SortOrder
    nationality?: SortOrder
    dateOfBirth?: SortOrder
    preferredLanguage?: SortOrder
    isProUser?: SortOrder
    proSubscriptionExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LocalTouristSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumLocalUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocalUserType | EnumLocalUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocalUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.LocalUserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocalUserTypeFilter<$PrismaModel>
    _max?: NestedEnumLocalUserTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumVerifiedStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifiedStatus | EnumVerifiedStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifiedStatusFilter<$PrismaModel> | $Enums.VerifiedStatus
  }

  export type VendorLocationListRelationFilter = {
    every?: VendorLocationWhereInput
    some?: VendorLocationWhereInput
    none?: VendorLocationWhereInput
  }

  export type ListingListRelationFilter = {
    every?: ListingWhereInput
    some?: ListingWhereInput
    none?: ListingWhereInput
  }

  export type VendorLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VendorCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    shortTagline?: SortOrder
    establishedYear?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    verifiedStatus?: SortOrder
    profileComplete?: SortOrder
    lastActiveAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendorAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    establishedYear?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
  }

  export type VendorMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    shortTagline?: SortOrder
    establishedYear?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    verifiedStatus?: SortOrder
    profileComplete?: SortOrder
    lastActiveAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendorMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    businessName?: SortOrder
    shortTagline?: SortOrder
    establishedYear?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    verifiedStatus?: SortOrder
    profileComplete?: SortOrder
    lastActiveAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VendorSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    establishedYear?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumVerifiedStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifiedStatus | EnumVerifiedStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifiedStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerifiedStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerifiedStatusFilter<$PrismaModel>
    _max?: NestedEnumVerifiedStatusFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type VendorRelationFilter = {
    is?: VendorWhereInput
    isNot?: VendorWhereInput
  }

  export type VendorLocationCountOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    isMainLocation?: SortOrder
  }

  export type VendorLocationAvgOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type VendorLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    isMainLocation?: SortOrder
  }

  export type VendorLocationMinOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    addressLine1?: SortOrder
    addressLine2?: SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
    postalCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    isMainLocation?: SortOrder
  }

  export type VendorLocationSumOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ListingCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    categoryName?: SortOrder
    isActive?: SortOrder
  }

  export type ListingCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ListingCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    categoryName?: SortOrder
    isActive?: SortOrder
  }

  export type ListingCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    categoryName?: SortOrder
    isActive?: SortOrder
  }

  export type ListingCategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumVisibilityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VisibilityStatus | EnumVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityStatusFilter<$PrismaModel> | $Enums.VisibilityStatus
  }

  export type ListingCategoryRelationFilter = {
    is?: ListingCategoryWhereInput
    isNot?: ListingCategoryWhereInput
  }

  export type VendorLocationRelationFilter = {
    is?: VendorLocationWhereInput
    isNot?: VendorLocationWhereInput
  }

  export type ListingMediaListRelationFilter = {
    every?: ListingMediaWhereInput
    some?: ListingMediaWhereInput
    none?: ListingMediaWhereInput
  }

  export type ListingSearchIndexNullableRelationFilter = {
    is?: ListingSearchIndexWhereInput | null
    isNot?: ListingSearchIndexWhereInput | null
  }

  export type ListingMediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListingCountOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    addressId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    priceNote?: SortOrder
    duration?: SortOrder
    capacity?: SortOrder
    availability?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    viewsCount?: SortOrder
    visibilityStatus?: SortOrder
    isFeatured?: SortOrder
    displayPriority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingAvgOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    addressId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    capacity?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    viewsCount?: SortOrder
    displayPriority?: SortOrder
  }

  export type ListingMaxOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    addressId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    priceNote?: SortOrder
    duration?: SortOrder
    capacity?: SortOrder
    availability?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    viewsCount?: SortOrder
    visibilityStatus?: SortOrder
    isFeatured?: SortOrder
    displayPriority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingMinOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    addressId?: SortOrder
    title?: SortOrder
    shortDescription?: SortOrder
    longDescription?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    priceNote?: SortOrder
    duration?: SortOrder
    capacity?: SortOrder
    availability?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    viewsCount?: SortOrder
    visibilityStatus?: SortOrder
    isFeatured?: SortOrder
    displayPriority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ListingSumOrderByAggregateInput = {
    id?: SortOrder
    vendorId?: SortOrder
    categoryId?: SortOrder
    addressId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    capacity?: SortOrder
    ratingAverage?: SortOrder
    ratingCount?: SortOrder
    viewsCount?: SortOrder
    displayPriority?: SortOrder
  }

  export type EnumVisibilityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VisibilityStatus | EnumVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityStatusWithAggregatesFilter<$PrismaModel> | $Enums.VisibilityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityStatusFilter<$PrismaModel>
    _max?: NestedEnumVisibilityStatusFilter<$PrismaModel>
  }

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type ListingRelationFilter = {
    is?: ListingWhereInput
    isNot?: ListingWhereInput
  }

  export type ListingMediaCountOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    mediaType?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrder
    displayOrder?: SortOrder
    isPrimary?: SortOrder
    uploadedAt?: SortOrder
  }

  export type ListingMediaAvgOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    displayOrder?: SortOrder
  }

  export type ListingMediaMaxOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    mediaType?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrder
    displayOrder?: SortOrder
    isPrimary?: SortOrder
    uploadedAt?: SortOrder
  }

  export type ListingMediaMinOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    mediaType?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrder
    displayOrder?: SortOrder
    isPrimary?: SortOrder
    uploadedAt?: SortOrder
  }

  export type ListingMediaSumOrderByAggregateInput = {
    id?: SortOrder
    listingId?: SortOrder
    displayOrder?: SortOrder
  }

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    revoked?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    revoked?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    revoked?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ListingSearchIndexCountOrderByAggregateInput = {
    listingId?: SortOrder
    categoryId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
  }

  export type ListingSearchIndexAvgOrderByAggregateInput = {
    listingId?: SortOrder
    categoryId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
  }

  export type ListingSearchIndexMaxOrderByAggregateInput = {
    listingId?: SortOrder
    categoryId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
  }

  export type ListingSearchIndexMinOrderByAggregateInput = {
    listingId?: SortOrder
    categoryId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
    city?: SortOrder
    district?: SortOrder
    province?: SortOrder
  }

  export type ListingSearchIndexSumOrderByAggregateInput = {
    listingId?: SortOrder
    categoryId?: SortOrder
    priceMin?: SortOrder
    priceMax?: SortOrder
  }

  export type VendorCreateNestedOneWithoutUserInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput
    connect?: VendorWhereUniqueInput
  }

  export type LocalTouristCreateNestedOneWithoutUserInput = {
    create?: XOR<LocalTouristCreateWithoutUserInput, LocalTouristUncheckedCreateWithoutUserInput>
    connectOrCreate?: LocalTouristCreateOrConnectWithoutUserInput
    connect?: LocalTouristWhereUniqueInput
  }

  export type VendorUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput
    connect?: VendorWhereUniqueInput
  }

  export type LocalTouristUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<LocalTouristCreateWithoutUserInput, LocalTouristUncheckedCreateWithoutUserInput>
    connectOrCreate?: LocalTouristCreateOrConnectWithoutUserInput
    connect?: LocalTouristWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VendorUpdateOneWithoutUserNestedInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput
    upsert?: VendorUpsertWithoutUserInput
    disconnect?: VendorWhereInput | boolean
    delete?: VendorWhereInput | boolean
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutUserInput, VendorUpdateWithoutUserInput>, VendorUncheckedUpdateWithoutUserInput>
  }

  export type LocalTouristUpdateOneWithoutUserNestedInput = {
    create?: XOR<LocalTouristCreateWithoutUserInput, LocalTouristUncheckedCreateWithoutUserInput>
    connectOrCreate?: LocalTouristCreateOrConnectWithoutUserInput
    upsert?: LocalTouristUpsertWithoutUserInput
    disconnect?: LocalTouristWhereInput | boolean
    delete?: LocalTouristWhereInput | boolean
    connect?: LocalTouristWhereUniqueInput
    update?: XOR<XOR<LocalTouristUpdateToOneWithWhereWithoutUserInput, LocalTouristUpdateWithoutUserInput>, LocalTouristUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VendorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
    connectOrCreate?: VendorCreateOrConnectWithoutUserInput
    upsert?: VendorUpsertWithoutUserInput
    disconnect?: VendorWhereInput | boolean
    delete?: VendorWhereInput | boolean
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutUserInput, VendorUpdateWithoutUserInput>, VendorUncheckedUpdateWithoutUserInput>
  }

  export type LocalTouristUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<LocalTouristCreateWithoutUserInput, LocalTouristUncheckedCreateWithoutUserInput>
    connectOrCreate?: LocalTouristCreateOrConnectWithoutUserInput
    upsert?: LocalTouristUpsertWithoutUserInput
    disconnect?: LocalTouristWhereInput | boolean
    delete?: LocalTouristWhereInput | boolean
    connect?: LocalTouristWhereUniqueInput
    update?: XOR<XOR<LocalTouristUpdateToOneWithWhereWithoutUserInput, LocalTouristUpdateWithoutUserInput>, LocalTouristUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutLocalTouristInput = {
    create?: XOR<UserCreateWithoutLocalTouristInput, UserUncheckedCreateWithoutLocalTouristInput>
    connectOrCreate?: UserCreateOrConnectWithoutLocalTouristInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumLocalUserTypeFieldUpdateOperationsInput = {
    set?: $Enums.LocalUserType
  }

  export type UserUpdateOneRequiredWithoutLocalTouristNestedInput = {
    create?: XOR<UserCreateWithoutLocalTouristInput, UserUncheckedCreateWithoutLocalTouristInput>
    connectOrCreate?: UserCreateOrConnectWithoutLocalTouristInput
    upsert?: UserUpsertWithoutLocalTouristInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLocalTouristInput, UserUpdateWithoutLocalTouristInput>, UserUncheckedUpdateWithoutLocalTouristInput>
  }

  export type UserCreateNestedOneWithoutVendorInput = {
    create?: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
    connectOrCreate?: UserCreateOrConnectWithoutVendorInput
    connect?: UserWhereUniqueInput
  }

  export type VendorLocationCreateNestedManyWithoutVendorInput = {
    create?: XOR<VendorLocationCreateWithoutVendorInput, VendorLocationUncheckedCreateWithoutVendorInput> | VendorLocationCreateWithoutVendorInput[] | VendorLocationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorLocationCreateOrConnectWithoutVendorInput | VendorLocationCreateOrConnectWithoutVendorInput[]
    createMany?: VendorLocationCreateManyVendorInputEnvelope
    connect?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
  }

  export type ListingCreateNestedManyWithoutVendorInput = {
    create?: XOR<ListingCreateWithoutVendorInput, ListingUncheckedCreateWithoutVendorInput> | ListingCreateWithoutVendorInput[] | ListingUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutVendorInput | ListingCreateOrConnectWithoutVendorInput[]
    createMany?: ListingCreateManyVendorInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type VendorLocationUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<VendorLocationCreateWithoutVendorInput, VendorLocationUncheckedCreateWithoutVendorInput> | VendorLocationCreateWithoutVendorInput[] | VendorLocationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorLocationCreateOrConnectWithoutVendorInput | VendorLocationCreateOrConnectWithoutVendorInput[]
    createMany?: VendorLocationCreateManyVendorInputEnvelope
    connect?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutVendorInput = {
    create?: XOR<ListingCreateWithoutVendorInput, ListingUncheckedCreateWithoutVendorInput> | ListingCreateWithoutVendorInput[] | ListingUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutVendorInput | ListingCreateOrConnectWithoutVendorInput[]
    createMany?: ListingCreateManyVendorInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumVerifiedStatusFieldUpdateOperationsInput = {
    set?: $Enums.VerifiedStatus
  }

  export type UserUpdateOneRequiredWithoutVendorNestedInput = {
    create?: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
    connectOrCreate?: UserCreateOrConnectWithoutVendorInput
    upsert?: UserUpsertWithoutVendorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVendorInput, UserUpdateWithoutVendorInput>, UserUncheckedUpdateWithoutVendorInput>
  }

  export type VendorLocationUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VendorLocationCreateWithoutVendorInput, VendorLocationUncheckedCreateWithoutVendorInput> | VendorLocationCreateWithoutVendorInput[] | VendorLocationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorLocationCreateOrConnectWithoutVendorInput | VendorLocationCreateOrConnectWithoutVendorInput[]
    upsert?: VendorLocationUpsertWithWhereUniqueWithoutVendorInput | VendorLocationUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VendorLocationCreateManyVendorInputEnvelope
    set?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    disconnect?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    delete?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    connect?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    update?: VendorLocationUpdateWithWhereUniqueWithoutVendorInput | VendorLocationUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VendorLocationUpdateManyWithWhereWithoutVendorInput | VendorLocationUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VendorLocationScalarWhereInput | VendorLocationScalarWhereInput[]
  }

  export type ListingUpdateManyWithoutVendorNestedInput = {
    create?: XOR<ListingCreateWithoutVendorInput, ListingUncheckedCreateWithoutVendorInput> | ListingCreateWithoutVendorInput[] | ListingUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutVendorInput | ListingCreateOrConnectWithoutVendorInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutVendorInput | ListingUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: ListingCreateManyVendorInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutVendorInput | ListingUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutVendorInput | ListingUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type VendorLocationUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<VendorLocationCreateWithoutVendorInput, VendorLocationUncheckedCreateWithoutVendorInput> | VendorLocationCreateWithoutVendorInput[] | VendorLocationUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: VendorLocationCreateOrConnectWithoutVendorInput | VendorLocationCreateOrConnectWithoutVendorInput[]
    upsert?: VendorLocationUpsertWithWhereUniqueWithoutVendorInput | VendorLocationUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: VendorLocationCreateManyVendorInputEnvelope
    set?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    disconnect?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    delete?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    connect?: VendorLocationWhereUniqueInput | VendorLocationWhereUniqueInput[]
    update?: VendorLocationUpdateWithWhereUniqueWithoutVendorInput | VendorLocationUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: VendorLocationUpdateManyWithWhereWithoutVendorInput | VendorLocationUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: VendorLocationScalarWhereInput | VendorLocationScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutVendorNestedInput = {
    create?: XOR<ListingCreateWithoutVendorInput, ListingUncheckedCreateWithoutVendorInput> | ListingCreateWithoutVendorInput[] | ListingUncheckedCreateWithoutVendorInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutVendorInput | ListingCreateOrConnectWithoutVendorInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutVendorInput | ListingUpsertWithWhereUniqueWithoutVendorInput[]
    createMany?: ListingCreateManyVendorInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutVendorInput | ListingUpdateWithWhereUniqueWithoutVendorInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutVendorInput | ListingUpdateManyWithWhereWithoutVendorInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type VendorCreateNestedOneWithoutLocationsInput = {
    create?: XOR<VendorCreateWithoutLocationsInput, VendorUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutLocationsInput
    connect?: VendorWhereUniqueInput
  }

  export type ListingCreateNestedManyWithoutLocationInput = {
    create?: XOR<ListingCreateWithoutLocationInput, ListingUncheckedCreateWithoutLocationInput> | ListingCreateWithoutLocationInput[] | ListingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutLocationInput | ListingCreateOrConnectWithoutLocationInput[]
    createMany?: ListingCreateManyLocationInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<ListingCreateWithoutLocationInput, ListingUncheckedCreateWithoutLocationInput> | ListingCreateWithoutLocationInput[] | ListingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutLocationInput | ListingCreateOrConnectWithoutLocationInput[]
    createMany?: ListingCreateManyLocationInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VendorUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<VendorCreateWithoutLocationsInput, VendorUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutLocationsInput
    upsert?: VendorUpsertWithoutLocationsInput
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutLocationsInput, VendorUpdateWithoutLocationsInput>, VendorUncheckedUpdateWithoutLocationsInput>
  }

  export type ListingUpdateManyWithoutLocationNestedInput = {
    create?: XOR<ListingCreateWithoutLocationInput, ListingUncheckedCreateWithoutLocationInput> | ListingCreateWithoutLocationInput[] | ListingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutLocationInput | ListingCreateOrConnectWithoutLocationInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutLocationInput | ListingUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: ListingCreateManyLocationInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutLocationInput | ListingUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutLocationInput | ListingUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<ListingCreateWithoutLocationInput, ListingUncheckedCreateWithoutLocationInput> | ListingCreateWithoutLocationInput[] | ListingUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutLocationInput | ListingCreateOrConnectWithoutLocationInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutLocationInput | ListingUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: ListingCreateManyLocationInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutLocationInput | ListingUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutLocationInput | ListingUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ListingCreateWithoutCategoryInput, ListingUncheckedCreateWithoutCategoryInput> | ListingCreateWithoutCategoryInput[] | ListingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutCategoryInput | ListingCreateOrConnectWithoutCategoryInput[]
    createMany?: ListingCreateManyCategoryInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ListingCreateWithoutCategoryInput, ListingUncheckedCreateWithoutCategoryInput> | ListingCreateWithoutCategoryInput[] | ListingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutCategoryInput | ListingCreateOrConnectWithoutCategoryInput[]
    createMany?: ListingCreateManyCategoryInputEnvelope
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
  }

  export type ListingUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ListingCreateWithoutCategoryInput, ListingUncheckedCreateWithoutCategoryInput> | ListingCreateWithoutCategoryInput[] | ListingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutCategoryInput | ListingCreateOrConnectWithoutCategoryInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutCategoryInput | ListingUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ListingCreateManyCategoryInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutCategoryInput | ListingUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutCategoryInput | ListingUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type ListingUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ListingCreateWithoutCategoryInput, ListingUncheckedCreateWithoutCategoryInput> | ListingCreateWithoutCategoryInput[] | ListingUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ListingCreateOrConnectWithoutCategoryInput | ListingCreateOrConnectWithoutCategoryInput[]
    upsert?: ListingUpsertWithWhereUniqueWithoutCategoryInput | ListingUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ListingCreateManyCategoryInputEnvelope
    set?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    disconnect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    delete?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    connect?: ListingWhereUniqueInput | ListingWhereUniqueInput[]
    update?: ListingUpdateWithWhereUniqueWithoutCategoryInput | ListingUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ListingUpdateManyWithWhereWithoutCategoryInput | ListingUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ListingScalarWhereInput | ListingScalarWhereInput[]
  }

  export type VendorCreateNestedOneWithoutListingsInput = {
    create?: XOR<VendorCreateWithoutListingsInput, VendorUncheckedCreateWithoutListingsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutListingsInput
    connect?: VendorWhereUniqueInput
  }

  export type ListingCategoryCreateNestedOneWithoutListingsInput = {
    create?: XOR<ListingCategoryCreateWithoutListingsInput, ListingCategoryUncheckedCreateWithoutListingsInput>
    connectOrCreate?: ListingCategoryCreateOrConnectWithoutListingsInput
    connect?: ListingCategoryWhereUniqueInput
  }

  export type VendorLocationCreateNestedOneWithoutListingsInput = {
    create?: XOR<VendorLocationCreateWithoutListingsInput, VendorLocationUncheckedCreateWithoutListingsInput>
    connectOrCreate?: VendorLocationCreateOrConnectWithoutListingsInput
    connect?: VendorLocationWhereUniqueInput
  }

  export type ListingMediaCreateNestedManyWithoutListingInput = {
    create?: XOR<ListingMediaCreateWithoutListingInput, ListingMediaUncheckedCreateWithoutListingInput> | ListingMediaCreateWithoutListingInput[] | ListingMediaUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingMediaCreateOrConnectWithoutListingInput | ListingMediaCreateOrConnectWithoutListingInput[]
    createMany?: ListingMediaCreateManyListingInputEnvelope
    connect?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
  }

  export type ListingSearchIndexCreateNestedOneWithoutListingInput = {
    create?: XOR<ListingSearchIndexCreateWithoutListingInput, ListingSearchIndexUncheckedCreateWithoutListingInput>
    connectOrCreate?: ListingSearchIndexCreateOrConnectWithoutListingInput
    connect?: ListingSearchIndexWhereUniqueInput
  }

  export type ListingMediaUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ListingMediaCreateWithoutListingInput, ListingMediaUncheckedCreateWithoutListingInput> | ListingMediaCreateWithoutListingInput[] | ListingMediaUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingMediaCreateOrConnectWithoutListingInput | ListingMediaCreateOrConnectWithoutListingInput[]
    createMany?: ListingMediaCreateManyListingInputEnvelope
    connect?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
  }

  export type ListingSearchIndexUncheckedCreateNestedOneWithoutListingInput = {
    create?: XOR<ListingSearchIndexCreateWithoutListingInput, ListingSearchIndexUncheckedCreateWithoutListingInput>
    connectOrCreate?: ListingSearchIndexCreateOrConnectWithoutListingInput
    connect?: ListingSearchIndexWhereUniqueInput
  }

  export type EnumVisibilityStatusFieldUpdateOperationsInput = {
    set?: $Enums.VisibilityStatus
  }

  export type VendorUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<VendorCreateWithoutListingsInput, VendorUncheckedCreateWithoutListingsInput>
    connectOrCreate?: VendorCreateOrConnectWithoutListingsInput
    upsert?: VendorUpsertWithoutListingsInput
    connect?: VendorWhereUniqueInput
    update?: XOR<XOR<VendorUpdateToOneWithWhereWithoutListingsInput, VendorUpdateWithoutListingsInput>, VendorUncheckedUpdateWithoutListingsInput>
  }

  export type ListingCategoryUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<ListingCategoryCreateWithoutListingsInput, ListingCategoryUncheckedCreateWithoutListingsInput>
    connectOrCreate?: ListingCategoryCreateOrConnectWithoutListingsInput
    upsert?: ListingCategoryUpsertWithoutListingsInput
    connect?: ListingCategoryWhereUniqueInput
    update?: XOR<XOR<ListingCategoryUpdateToOneWithWhereWithoutListingsInput, ListingCategoryUpdateWithoutListingsInput>, ListingCategoryUncheckedUpdateWithoutListingsInput>
  }

  export type VendorLocationUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<VendorLocationCreateWithoutListingsInput, VendorLocationUncheckedCreateWithoutListingsInput>
    connectOrCreate?: VendorLocationCreateOrConnectWithoutListingsInput
    upsert?: VendorLocationUpsertWithoutListingsInput
    connect?: VendorLocationWhereUniqueInput
    update?: XOR<XOR<VendorLocationUpdateToOneWithWhereWithoutListingsInput, VendorLocationUpdateWithoutListingsInput>, VendorLocationUncheckedUpdateWithoutListingsInput>
  }

  export type ListingMediaUpdateManyWithoutListingNestedInput = {
    create?: XOR<ListingMediaCreateWithoutListingInput, ListingMediaUncheckedCreateWithoutListingInput> | ListingMediaCreateWithoutListingInput[] | ListingMediaUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingMediaCreateOrConnectWithoutListingInput | ListingMediaCreateOrConnectWithoutListingInput[]
    upsert?: ListingMediaUpsertWithWhereUniqueWithoutListingInput | ListingMediaUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ListingMediaCreateManyListingInputEnvelope
    set?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    disconnect?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    delete?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    connect?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    update?: ListingMediaUpdateWithWhereUniqueWithoutListingInput | ListingMediaUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ListingMediaUpdateManyWithWhereWithoutListingInput | ListingMediaUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ListingMediaScalarWhereInput | ListingMediaScalarWhereInput[]
  }

  export type ListingSearchIndexUpdateOneWithoutListingNestedInput = {
    create?: XOR<ListingSearchIndexCreateWithoutListingInput, ListingSearchIndexUncheckedCreateWithoutListingInput>
    connectOrCreate?: ListingSearchIndexCreateOrConnectWithoutListingInput
    upsert?: ListingSearchIndexUpsertWithoutListingInput
    disconnect?: ListingSearchIndexWhereInput | boolean
    delete?: ListingSearchIndexWhereInput | boolean
    connect?: ListingSearchIndexWhereUniqueInput
    update?: XOR<XOR<ListingSearchIndexUpdateToOneWithWhereWithoutListingInput, ListingSearchIndexUpdateWithoutListingInput>, ListingSearchIndexUncheckedUpdateWithoutListingInput>
  }

  export type ListingMediaUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ListingMediaCreateWithoutListingInput, ListingMediaUncheckedCreateWithoutListingInput> | ListingMediaCreateWithoutListingInput[] | ListingMediaUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ListingMediaCreateOrConnectWithoutListingInput | ListingMediaCreateOrConnectWithoutListingInput[]
    upsert?: ListingMediaUpsertWithWhereUniqueWithoutListingInput | ListingMediaUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ListingMediaCreateManyListingInputEnvelope
    set?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    disconnect?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    delete?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    connect?: ListingMediaWhereUniqueInput | ListingMediaWhereUniqueInput[]
    update?: ListingMediaUpdateWithWhereUniqueWithoutListingInput | ListingMediaUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ListingMediaUpdateManyWithWhereWithoutListingInput | ListingMediaUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ListingMediaScalarWhereInput | ListingMediaScalarWhereInput[]
  }

  export type ListingSearchIndexUncheckedUpdateOneWithoutListingNestedInput = {
    create?: XOR<ListingSearchIndexCreateWithoutListingInput, ListingSearchIndexUncheckedCreateWithoutListingInput>
    connectOrCreate?: ListingSearchIndexCreateOrConnectWithoutListingInput
    upsert?: ListingSearchIndexUpsertWithoutListingInput
    disconnect?: ListingSearchIndexWhereInput | boolean
    delete?: ListingSearchIndexWhereInput | boolean
    connect?: ListingSearchIndexWhereUniqueInput
    update?: XOR<XOR<ListingSearchIndexUpdateToOneWithWhereWithoutListingInput, ListingSearchIndexUpdateWithoutListingInput>, ListingSearchIndexUncheckedUpdateWithoutListingInput>
  }

  export type ListingCreateNestedOneWithoutMediaInput = {
    create?: XOR<ListingCreateWithoutMediaInput, ListingUncheckedCreateWithoutMediaInput>
    connectOrCreate?: ListingCreateOrConnectWithoutMediaInput
    connect?: ListingWhereUniqueInput
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type ListingUpdateOneRequiredWithoutMediaNestedInput = {
    create?: XOR<ListingCreateWithoutMediaInput, ListingUncheckedCreateWithoutMediaInput>
    connectOrCreate?: ListingCreateOrConnectWithoutMediaInput
    upsert?: ListingUpsertWithoutMediaInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutMediaInput, ListingUpdateWithoutMediaInput>, ListingUncheckedUpdateWithoutMediaInput>
  }

  export type ListingCreateNestedOneWithoutSearchInput = {
    create?: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput>
    connectOrCreate?: ListingCreateOrConnectWithoutSearchInput
    connect?: ListingWhereUniqueInput
  }

  export type ListingUpdateOneRequiredWithoutSearchNestedInput = {
    create?: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput>
    connectOrCreate?: ListingCreateOrConnectWithoutSearchInput
    upsert?: ListingUpsertWithoutSearchInput
    connect?: ListingWhereUniqueInput
    update?: XOR<XOR<ListingUpdateToOneWithWhereWithoutSearchInput, ListingUpdateWithoutSearchInput>, ListingUncheckedUpdateWithoutSearchInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumLocalUserTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LocalUserType | EnumLocalUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocalUserTypeFilter<$PrismaModel> | $Enums.LocalUserType
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumLocalUserTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LocalUserType | EnumLocalUserTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LocalUserType[] | ListEnumLocalUserTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLocalUserTypeWithAggregatesFilter<$PrismaModel> | $Enums.LocalUserType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLocalUserTypeFilter<$PrismaModel>
    _max?: NestedEnumLocalUserTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumVerifiedStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifiedStatus | EnumVerifiedStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifiedStatusFilter<$PrismaModel> | $Enums.VerifiedStatus
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumVerifiedStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VerifiedStatus | EnumVerifiedStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VerifiedStatus[] | ListEnumVerifiedStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVerifiedStatusWithAggregatesFilter<$PrismaModel> | $Enums.VerifiedStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVerifiedStatusFilter<$PrismaModel>
    _max?: NestedEnumVerifiedStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumVisibilityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VisibilityStatus | EnumVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityStatusFilter<$PrismaModel> | $Enums.VisibilityStatus
  }

  export type NestedEnumVisibilityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VisibilityStatus | EnumVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.VisibilityStatus[] | ListEnumVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumVisibilityStatusWithAggregatesFilter<$PrismaModel> | $Enums.VisibilityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumVisibilityStatusFilter<$PrismaModel>
    _max?: NestedEnumVisibilityStatusFilter<$PrismaModel>
  }

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type VendorCreateWithoutUserInput = {
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VendorLocationCreateNestedManyWithoutVendorInput
    listings?: ListingCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutUserInput = {
    id?: number
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VendorLocationUncheckedCreateNestedManyWithoutVendorInput
    listings?: ListingUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutUserInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
  }

  export type LocalTouristCreateWithoutUserInput = {
    fullName: string
    profilePhotoUrl?: string | null
    userType: $Enums.LocalUserType
    nationality?: string | null
    dateOfBirth?: Date | string | null
    preferredLanguage?: string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: boolean
    proSubscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocalTouristUncheckedCreateWithoutUserInput = {
    fullName: string
    profilePhotoUrl?: string | null
    userType: $Enums.LocalUserType
    nationality?: string | null
    dateOfBirth?: Date | string | null
    preferredLanguage?: string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: boolean
    proSubscriptionExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LocalTouristCreateOrConnectWithoutUserInput = {
    where: LocalTouristWhereUniqueInput
    create: XOR<LocalTouristCreateWithoutUserInput, LocalTouristUncheckedCreateWithoutUserInput>
  }

  export type VendorUpsertWithoutUserInput = {
    update: XOR<VendorUpdateWithoutUserInput, VendorUncheckedUpdateWithoutUserInput>
    create: XOR<VendorCreateWithoutUserInput, VendorUncheckedCreateWithoutUserInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutUserInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutUserInput, VendorUncheckedUpdateWithoutUserInput>
  }

  export type VendorUpdateWithoutUserInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VendorLocationUpdateManyWithoutVendorNestedInput
    listings?: ListingUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VendorLocationUncheckedUpdateManyWithoutVendorNestedInput
    listings?: ListingUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type LocalTouristUpsertWithoutUserInput = {
    update: XOR<LocalTouristUpdateWithoutUserInput, LocalTouristUncheckedUpdateWithoutUserInput>
    create: XOR<LocalTouristCreateWithoutUserInput, LocalTouristUncheckedCreateWithoutUserInput>
    where?: LocalTouristWhereInput
  }

  export type LocalTouristUpdateToOneWithWhereWithoutUserInput = {
    where?: LocalTouristWhereInput
    data: XOR<LocalTouristUpdateWithoutUserInput, LocalTouristUncheckedUpdateWithoutUserInput>
  }

  export type LocalTouristUpdateWithoutUserInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumLocalUserTypeFieldUpdateOperationsInput | $Enums.LocalUserType
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: BoolFieldUpdateOperationsInput | boolean
    proSubscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalTouristUncheckedUpdateWithoutUserInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    profilePhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userType?: EnumLocalUserTypeFieldUpdateOperationsInput | $Enums.LocalUserType
    nationality?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredLanguage?: StringFieldUpdateOperationsInput | string
    interests?: NullableJsonNullValueInput | InputJsonValue
    isProUser?: BoolFieldUpdateOperationsInput | boolean
    proSubscriptionExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutLocalTouristInput = {
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    lastLoginAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    vendor?: VendorCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLocalTouristInput = {
    id?: number
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    lastLoginAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    vendor?: VendorUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLocalTouristInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLocalTouristInput, UserUncheckedCreateWithoutLocalTouristInput>
  }

  export type UserUpsertWithoutLocalTouristInput = {
    update: XOR<UserUpdateWithoutLocalTouristInput, UserUncheckedUpdateWithoutLocalTouristInput>
    create: XOR<UserCreateWithoutLocalTouristInput, UserUncheckedCreateWithoutLocalTouristInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLocalTouristInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLocalTouristInput, UserUncheckedUpdateWithoutLocalTouristInput>
  }

  export type UserUpdateWithoutLocalTouristInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLocalTouristInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutVendorInput = {
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    lastLoginAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    localTourist?: LocalTouristCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutVendorInput = {
    id?: number
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.UserRole
    lastLoginAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    localTourist?: LocalTouristUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutVendorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
  }

  export type VendorLocationCreateWithoutVendorInput = {
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
    listings?: ListingCreateNestedManyWithoutLocationInput
  }

  export type VendorLocationUncheckedCreateWithoutVendorInput = {
    id?: number
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
    listings?: ListingUncheckedCreateNestedManyWithoutLocationInput
  }

  export type VendorLocationCreateOrConnectWithoutVendorInput = {
    where: VendorLocationWhereUniqueInput
    create: XOR<VendorLocationCreateWithoutVendorInput, VendorLocationUncheckedCreateWithoutVendorInput>
  }

  export type VendorLocationCreateManyVendorInputEnvelope = {
    data: VendorLocationCreateManyVendorInput | VendorLocationCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type ListingCreateWithoutVendorInput = {
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ListingCategoryCreateNestedOneWithoutListingsInput
    location: VendorLocationCreateNestedOneWithoutListingsInput
    media?: ListingMediaCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexCreateNestedOneWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutVendorInput = {
    id?: number
    categoryId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: ListingMediaUncheckedCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexUncheckedCreateNestedOneWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutVendorInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutVendorInput, ListingUncheckedCreateWithoutVendorInput>
  }

  export type ListingCreateManyVendorInputEnvelope = {
    data: ListingCreateManyVendorInput | ListingCreateManyVendorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutVendorInput = {
    update: XOR<UserUpdateWithoutVendorInput, UserUncheckedUpdateWithoutVendorInput>
    create: XOR<UserCreateWithoutVendorInput, UserUncheckedCreateWithoutVendorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVendorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVendorInput, UserUncheckedUpdateWithoutVendorInput>
  }

  export type UserUpdateWithoutVendorInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    localTourist?: LocalTouristUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    localTourist?: LocalTouristUncheckedUpdateOneWithoutUserNestedInput
  }

  export type VendorLocationUpsertWithWhereUniqueWithoutVendorInput = {
    where: VendorLocationWhereUniqueInput
    update: XOR<VendorLocationUpdateWithoutVendorInput, VendorLocationUncheckedUpdateWithoutVendorInput>
    create: XOR<VendorLocationCreateWithoutVendorInput, VendorLocationUncheckedCreateWithoutVendorInput>
  }

  export type VendorLocationUpdateWithWhereUniqueWithoutVendorInput = {
    where: VendorLocationWhereUniqueInput
    data: XOR<VendorLocationUpdateWithoutVendorInput, VendorLocationUncheckedUpdateWithoutVendorInput>
  }

  export type VendorLocationUpdateManyWithWhereWithoutVendorInput = {
    where: VendorLocationScalarWhereInput
    data: XOR<VendorLocationUpdateManyMutationInput, VendorLocationUncheckedUpdateManyWithoutVendorInput>
  }

  export type VendorLocationScalarWhereInput = {
    AND?: VendorLocationScalarWhereInput | VendorLocationScalarWhereInput[]
    OR?: VendorLocationScalarWhereInput[]
    NOT?: VendorLocationScalarWhereInput | VendorLocationScalarWhereInput[]
    id?: IntFilter<"VendorLocation"> | number
    vendorId?: IntFilter<"VendorLocation"> | number
    addressLine1?: StringFilter<"VendorLocation"> | string
    addressLine2?: StringNullableFilter<"VendorLocation"> | string | null
    city?: StringFilter<"VendorLocation"> | string
    district?: StringFilter<"VendorLocation"> | string
    province?: StringFilter<"VendorLocation"> | string
    postalCode?: StringNullableFilter<"VendorLocation"> | string | null
    latitude?: FloatNullableFilter<"VendorLocation"> | number | null
    longitude?: FloatNullableFilter<"VendorLocation"> | number | null
    isMainLocation?: BoolFilter<"VendorLocation"> | boolean
  }

  export type ListingUpsertWithWhereUniqueWithoutVendorInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutVendorInput, ListingUncheckedUpdateWithoutVendorInput>
    create: XOR<ListingCreateWithoutVendorInput, ListingUncheckedCreateWithoutVendorInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutVendorInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutVendorInput, ListingUncheckedUpdateWithoutVendorInput>
  }

  export type ListingUpdateManyWithWhereWithoutVendorInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutVendorInput>
  }

  export type ListingScalarWhereInput = {
    AND?: ListingScalarWhereInput | ListingScalarWhereInput[]
    OR?: ListingScalarWhereInput[]
    NOT?: ListingScalarWhereInput | ListingScalarWhereInput[]
    id?: IntFilter<"Listing"> | number
    vendorId?: IntFilter<"Listing"> | number
    categoryId?: IntFilter<"Listing"> | number
    addressId?: IntFilter<"Listing"> | number
    title?: StringFilter<"Listing"> | string
    shortDescription?: StringFilter<"Listing"> | string
    longDescription?: StringNullableFilter<"Listing"> | string | null
    priceMin?: FloatFilter<"Listing"> | number
    priceMax?: FloatNullableFilter<"Listing"> | number | null
    priceNote?: StringNullableFilter<"Listing"> | string | null
    duration?: StringNullableFilter<"Listing"> | string | null
    capacity?: IntNullableFilter<"Listing"> | number | null
    availability?: StringNullableFilter<"Listing"> | string | null
    ratingAverage?: FloatFilter<"Listing"> | number
    ratingCount?: IntFilter<"Listing"> | number
    viewsCount?: IntFilter<"Listing"> | number
    visibilityStatus?: EnumVisibilityStatusFilter<"Listing"> | $Enums.VisibilityStatus
    isFeatured?: BoolFilter<"Listing"> | boolean
    displayPriority?: IntFilter<"Listing"> | number
    createdAt?: DateTimeFilter<"Listing"> | Date | string
    updatedAt?: DateTimeFilter<"Listing"> | Date | string
  }

  export type VendorCreateWithoutLocationsInput = {
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVendorInput
    listings?: ListingCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutLocationsInput = {
    id?: number
    userId: number
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ListingUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutLocationsInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutLocationsInput, VendorUncheckedCreateWithoutLocationsInput>
  }

  export type ListingCreateWithoutLocationInput = {
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor: VendorCreateNestedOneWithoutListingsInput
    category: ListingCategoryCreateNestedOneWithoutListingsInput
    media?: ListingMediaCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexCreateNestedOneWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutLocationInput = {
    id?: number
    vendorId: number
    categoryId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: ListingMediaUncheckedCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexUncheckedCreateNestedOneWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutLocationInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutLocationInput, ListingUncheckedCreateWithoutLocationInput>
  }

  export type ListingCreateManyLocationInputEnvelope = {
    data: ListingCreateManyLocationInput | ListingCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type VendorUpsertWithoutLocationsInput = {
    update: XOR<VendorUpdateWithoutLocationsInput, VendorUncheckedUpdateWithoutLocationsInput>
    create: XOR<VendorCreateWithoutLocationsInput, VendorUncheckedCreateWithoutLocationsInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutLocationsInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutLocationsInput, VendorUncheckedUpdateWithoutLocationsInput>
  }

  export type VendorUpdateWithoutLocationsInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVendorNestedInput
    listings?: ListingUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutLocationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ListingUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type ListingUpsertWithWhereUniqueWithoutLocationInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutLocationInput, ListingUncheckedUpdateWithoutLocationInput>
    create: XOR<ListingCreateWithoutLocationInput, ListingUncheckedCreateWithoutLocationInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutLocationInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutLocationInput, ListingUncheckedUpdateWithoutLocationInput>
  }

  export type ListingUpdateManyWithWhereWithoutLocationInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutLocationInput>
  }

  export type ListingCreateWithoutCategoryInput = {
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor: VendorCreateNestedOneWithoutListingsInput
    location: VendorLocationCreateNestedOneWithoutListingsInput
    media?: ListingMediaCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexCreateNestedOneWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutCategoryInput = {
    id?: number
    vendorId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: ListingMediaUncheckedCreateNestedManyWithoutListingInput
    search?: ListingSearchIndexUncheckedCreateNestedOneWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutCategoryInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutCategoryInput, ListingUncheckedCreateWithoutCategoryInput>
  }

  export type ListingCreateManyCategoryInputEnvelope = {
    data: ListingCreateManyCategoryInput | ListingCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ListingUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ListingWhereUniqueInput
    update: XOR<ListingUpdateWithoutCategoryInput, ListingUncheckedUpdateWithoutCategoryInput>
    create: XOR<ListingCreateWithoutCategoryInput, ListingUncheckedCreateWithoutCategoryInput>
  }

  export type ListingUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ListingWhereUniqueInput
    data: XOR<ListingUpdateWithoutCategoryInput, ListingUncheckedUpdateWithoutCategoryInput>
  }

  export type ListingUpdateManyWithWhereWithoutCategoryInput = {
    where: ListingScalarWhereInput
    data: XOR<ListingUpdateManyMutationInput, ListingUncheckedUpdateManyWithoutCategoryInput>
  }

  export type VendorCreateWithoutListingsInput = {
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutVendorInput
    locations?: VendorLocationCreateNestedManyWithoutVendorInput
  }

  export type VendorUncheckedCreateWithoutListingsInput = {
    id?: number
    userId: number
    businessName: string
    shortTagline?: string | null
    establishedYear?: number | null
    ratingAverage?: number
    ratingCount?: number
    verifiedStatus?: $Enums.VerifiedStatus
    profileComplete?: boolean
    lastActiveAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: VendorLocationUncheckedCreateNestedManyWithoutVendorInput
  }

  export type VendorCreateOrConnectWithoutListingsInput = {
    where: VendorWhereUniqueInput
    create: XOR<VendorCreateWithoutListingsInput, VendorUncheckedCreateWithoutListingsInput>
  }

  export type ListingCategoryCreateWithoutListingsInput = {
    categoryName: string
    isActive?: boolean
  }

  export type ListingCategoryUncheckedCreateWithoutListingsInput = {
    id?: number
    categoryName: string
    isActive?: boolean
  }

  export type ListingCategoryCreateOrConnectWithoutListingsInput = {
    where: ListingCategoryWhereUniqueInput
    create: XOR<ListingCategoryCreateWithoutListingsInput, ListingCategoryUncheckedCreateWithoutListingsInput>
  }

  export type VendorLocationCreateWithoutListingsInput = {
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
    vendor: VendorCreateNestedOneWithoutLocationsInput
  }

  export type VendorLocationUncheckedCreateWithoutListingsInput = {
    id?: number
    vendorId: number
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
  }

  export type VendorLocationCreateOrConnectWithoutListingsInput = {
    where: VendorLocationWhereUniqueInput
    create: XOR<VendorLocationCreateWithoutListingsInput, VendorLocationUncheckedCreateWithoutListingsInput>
  }

  export type ListingMediaCreateWithoutListingInput = {
    mediaType: $Enums.MediaType
    mediaUrl: string
    caption?: string | null
    displayOrder?: number
    isPrimary?: boolean
    uploadedAt?: Date | string
  }

  export type ListingMediaUncheckedCreateWithoutListingInput = {
    id?: number
    mediaType: $Enums.MediaType
    mediaUrl: string
    caption?: string | null
    displayOrder?: number
    isPrimary?: boolean
    uploadedAt?: Date | string
  }

  export type ListingMediaCreateOrConnectWithoutListingInput = {
    where: ListingMediaWhereUniqueInput
    create: XOR<ListingMediaCreateWithoutListingInput, ListingMediaUncheckedCreateWithoutListingInput>
  }

  export type ListingMediaCreateManyListingInputEnvelope = {
    data: ListingMediaCreateManyListingInput | ListingMediaCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type ListingSearchIndexCreateWithoutListingInput = {
    categoryId: number
    priceMin: number
    priceMax?: number | null
    city: string
    district: string
    province: string
  }

  export type ListingSearchIndexUncheckedCreateWithoutListingInput = {
    categoryId: number
    priceMin: number
    priceMax?: number | null
    city: string
    district: string
    province: string
  }

  export type ListingSearchIndexCreateOrConnectWithoutListingInput = {
    where: ListingSearchIndexWhereUniqueInput
    create: XOR<ListingSearchIndexCreateWithoutListingInput, ListingSearchIndexUncheckedCreateWithoutListingInput>
  }

  export type VendorUpsertWithoutListingsInput = {
    update: XOR<VendorUpdateWithoutListingsInput, VendorUncheckedUpdateWithoutListingsInput>
    create: XOR<VendorCreateWithoutListingsInput, VendorUncheckedCreateWithoutListingsInput>
    where?: VendorWhereInput
  }

  export type VendorUpdateToOneWithWhereWithoutListingsInput = {
    where?: VendorWhereInput
    data: XOR<VendorUpdateWithoutListingsInput, VendorUncheckedUpdateWithoutListingsInput>
  }

  export type VendorUpdateWithoutListingsInput = {
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutVendorNestedInput
    locations?: VendorLocationUpdateManyWithoutVendorNestedInput
  }

  export type VendorUncheckedUpdateWithoutListingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    businessName?: StringFieldUpdateOperationsInput | string
    shortTagline?: NullableStringFieldUpdateOperationsInput | string | null
    establishedYear?: NullableIntFieldUpdateOperationsInput | number | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    verifiedStatus?: EnumVerifiedStatusFieldUpdateOperationsInput | $Enums.VerifiedStatus
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    lastActiveAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: VendorLocationUncheckedUpdateManyWithoutVendorNestedInput
  }

  export type ListingCategoryUpsertWithoutListingsInput = {
    update: XOR<ListingCategoryUpdateWithoutListingsInput, ListingCategoryUncheckedUpdateWithoutListingsInput>
    create: XOR<ListingCategoryCreateWithoutListingsInput, ListingCategoryUncheckedCreateWithoutListingsInput>
    where?: ListingCategoryWhereInput
  }

  export type ListingCategoryUpdateToOneWithWhereWithoutListingsInput = {
    where?: ListingCategoryWhereInput
    data: XOR<ListingCategoryUpdateWithoutListingsInput, ListingCategoryUncheckedUpdateWithoutListingsInput>
  }

  export type ListingCategoryUpdateWithoutListingsInput = {
    categoryName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingCategoryUncheckedUpdateWithoutListingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryName?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VendorLocationUpsertWithoutListingsInput = {
    update: XOR<VendorLocationUpdateWithoutListingsInput, VendorLocationUncheckedUpdateWithoutListingsInput>
    create: XOR<VendorLocationCreateWithoutListingsInput, VendorLocationUncheckedCreateWithoutListingsInput>
    where?: VendorLocationWhereInput
  }

  export type VendorLocationUpdateToOneWithWhereWithoutListingsInput = {
    where?: VendorLocationWhereInput
    data: XOR<VendorLocationUpdateWithoutListingsInput, VendorLocationUncheckedUpdateWithoutListingsInput>
  }

  export type VendorLocationUpdateWithoutListingsInput = {
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
    vendor?: VendorUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type VendorLocationUncheckedUpdateWithoutListingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingMediaUpsertWithWhereUniqueWithoutListingInput = {
    where: ListingMediaWhereUniqueInput
    update: XOR<ListingMediaUpdateWithoutListingInput, ListingMediaUncheckedUpdateWithoutListingInput>
    create: XOR<ListingMediaCreateWithoutListingInput, ListingMediaUncheckedCreateWithoutListingInput>
  }

  export type ListingMediaUpdateWithWhereUniqueWithoutListingInput = {
    where: ListingMediaWhereUniqueInput
    data: XOR<ListingMediaUpdateWithoutListingInput, ListingMediaUncheckedUpdateWithoutListingInput>
  }

  export type ListingMediaUpdateManyWithWhereWithoutListingInput = {
    where: ListingMediaScalarWhereInput
    data: XOR<ListingMediaUpdateManyMutationInput, ListingMediaUncheckedUpdateManyWithoutListingInput>
  }

  export type ListingMediaScalarWhereInput = {
    AND?: ListingMediaScalarWhereInput | ListingMediaScalarWhereInput[]
    OR?: ListingMediaScalarWhereInput[]
    NOT?: ListingMediaScalarWhereInput | ListingMediaScalarWhereInput[]
    id?: IntFilter<"ListingMedia"> | number
    listingId?: IntFilter<"ListingMedia"> | number
    mediaType?: EnumMediaTypeFilter<"ListingMedia"> | $Enums.MediaType
    mediaUrl?: StringFilter<"ListingMedia"> | string
    caption?: StringNullableFilter<"ListingMedia"> | string | null
    displayOrder?: IntFilter<"ListingMedia"> | number
    isPrimary?: BoolFilter<"ListingMedia"> | boolean
    uploadedAt?: DateTimeFilter<"ListingMedia"> | Date | string
  }

  export type ListingSearchIndexUpsertWithoutListingInput = {
    update: XOR<ListingSearchIndexUpdateWithoutListingInput, ListingSearchIndexUncheckedUpdateWithoutListingInput>
    create: XOR<ListingSearchIndexCreateWithoutListingInput, ListingSearchIndexUncheckedCreateWithoutListingInput>
    where?: ListingSearchIndexWhereInput
  }

  export type ListingSearchIndexUpdateToOneWithWhereWithoutListingInput = {
    where?: ListingSearchIndexWhereInput
    data: XOR<ListingSearchIndexUpdateWithoutListingInput, ListingSearchIndexUncheckedUpdateWithoutListingInput>
  }

  export type ListingSearchIndexUpdateWithoutListingInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
  }

  export type ListingSearchIndexUncheckedUpdateWithoutListingInput = {
    categoryId?: IntFieldUpdateOperationsInput | number
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
  }

  export type ListingCreateWithoutMediaInput = {
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor: VendorCreateNestedOneWithoutListingsInput
    category: ListingCategoryCreateNestedOneWithoutListingsInput
    location: VendorLocationCreateNestedOneWithoutListingsInput
    search?: ListingSearchIndexCreateNestedOneWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutMediaInput = {
    id?: number
    vendorId: number
    categoryId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    search?: ListingSearchIndexUncheckedCreateNestedOneWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutMediaInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutMediaInput, ListingUncheckedCreateWithoutMediaInput>
  }

  export type ListingUpsertWithoutMediaInput = {
    update: XOR<ListingUpdateWithoutMediaInput, ListingUncheckedUpdateWithoutMediaInput>
    create: XOR<ListingCreateWithoutMediaInput, ListingUncheckedCreateWithoutMediaInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutMediaInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutMediaInput, ListingUncheckedUpdateWithoutMediaInput>
  }

  export type ListingUpdateWithoutMediaInput = {
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneRequiredWithoutListingsNestedInput
    category?: ListingCategoryUpdateOneRequiredWithoutListingsNestedInput
    location?: VendorLocationUpdateOneRequiredWithoutListingsNestedInput
    search?: ListingSearchIndexUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    search?: ListingSearchIndexUncheckedUpdateOneWithoutListingNestedInput
  }

  export type ListingCreateWithoutSearchInput = {
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    vendor: VendorCreateNestedOneWithoutListingsInput
    category: ListingCategoryCreateNestedOneWithoutListingsInput
    location: VendorLocationCreateNestedOneWithoutListingsInput
    media?: ListingMediaCreateNestedManyWithoutListingInput
  }

  export type ListingUncheckedCreateWithoutSearchInput = {
    id?: number
    vendorId: number
    categoryId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: ListingMediaUncheckedCreateNestedManyWithoutListingInput
  }

  export type ListingCreateOrConnectWithoutSearchInput = {
    where: ListingWhereUniqueInput
    create: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput>
  }

  export type ListingUpsertWithoutSearchInput = {
    update: XOR<ListingUpdateWithoutSearchInput, ListingUncheckedUpdateWithoutSearchInput>
    create: XOR<ListingCreateWithoutSearchInput, ListingUncheckedCreateWithoutSearchInput>
    where?: ListingWhereInput
  }

  export type ListingUpdateToOneWithWhereWithoutSearchInput = {
    where?: ListingWhereInput
    data: XOR<ListingUpdateWithoutSearchInput, ListingUncheckedUpdateWithoutSearchInput>
  }

  export type ListingUpdateWithoutSearchInput = {
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneRequiredWithoutListingsNestedInput
    category?: ListingCategoryUpdateOneRequiredWithoutListingsNestedInput
    location?: VendorLocationUpdateOneRequiredWithoutListingsNestedInput
    media?: ListingMediaUpdateManyWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutSearchInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: ListingMediaUncheckedUpdateManyWithoutListingNestedInput
  }

  export type VendorLocationCreateManyVendorInput = {
    id?: number
    addressLine1: string
    addressLine2?: string | null
    city: string
    district: string
    province: string
    postalCode?: string | null
    latitude?: number | null
    longitude?: number | null
    isMainLocation?: boolean
  }

  export type ListingCreateManyVendorInput = {
    id?: number
    categoryId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VendorLocationUpdateWithoutVendorInput = {
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUpdateManyWithoutLocationNestedInput
  }

  export type VendorLocationUncheckedUpdateWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
    listings?: ListingUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type VendorLocationUncheckedUpdateManyWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    addressLine1?: StringFieldUpdateOperationsInput | string
    addressLine2?: NullableStringFieldUpdateOperationsInput | string | null
    city?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    postalCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    isMainLocation?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListingUpdateWithoutVendorInput = {
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ListingCategoryUpdateOneRequiredWithoutListingsNestedInput
    location?: VendorLocationUpdateOneRequiredWithoutListingsNestedInput
    media?: ListingMediaUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: ListingMediaUncheckedUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUncheckedUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutVendorInput = {
    id?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateManyLocationInput = {
    id?: number
    vendorId: number
    categoryId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingUpdateWithoutLocationInput = {
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneRequiredWithoutListingsNestedInput
    category?: ListingCategoryUpdateOneRequiredWithoutListingsNestedInput
    media?: ListingMediaUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: ListingMediaUncheckedUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUncheckedUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingCreateManyCategoryInput = {
    id?: number
    vendorId: number
    addressId: number
    title: string
    shortDescription: string
    longDescription?: string | null
    priceMin: number
    priceMax?: number | null
    priceNote?: string | null
    duration?: string | null
    capacity?: number | null
    availability?: string | null
    ratingAverage?: number
    ratingCount?: number
    viewsCount?: number
    visibilityStatus?: $Enums.VisibilityStatus
    isFeatured?: boolean
    displayPriority?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListingUpdateWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vendor?: VendorUpdateOneRequiredWithoutListingsNestedInput
    location?: VendorLocationUpdateOneRequiredWithoutListingsNestedInput
    media?: ListingMediaUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: ListingMediaUncheckedUpdateManyWithoutListingNestedInput
    search?: ListingSearchIndexUncheckedUpdateOneWithoutListingNestedInput
  }

  export type ListingUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    vendorId?: IntFieldUpdateOperationsInput | number
    addressId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    shortDescription?: StringFieldUpdateOperationsInput | string
    longDescription?: NullableStringFieldUpdateOperationsInput | string | null
    priceMin?: FloatFieldUpdateOperationsInput | number
    priceMax?: NullableFloatFieldUpdateOperationsInput | number | null
    priceNote?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    capacity?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    ratingAverage?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    viewsCount?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumVisibilityStatusFieldUpdateOperationsInput | $Enums.VisibilityStatus
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    displayPriority?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingMediaCreateManyListingInput = {
    id?: number
    mediaType: $Enums.MediaType
    mediaUrl: string
    caption?: string | null
    displayOrder?: number
    isPrimary?: boolean
    uploadedAt?: Date | string
  }

  export type ListingMediaUpdateWithoutListingInput = {
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingMediaUncheckedUpdateWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListingMediaUncheckedUpdateManyWithoutListingInput = {
    id?: IntFieldUpdateOperationsInput | number
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    mediaUrl?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    displayOrder?: IntFieldUpdateOperationsInput | number
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use VendorCountOutputTypeDefaultArgs instead
     */
    export type VendorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VendorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VendorLocationCountOutputTypeDefaultArgs instead
     */
    export type VendorLocationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VendorLocationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListingCategoryCountOutputTypeDefaultArgs instead
     */
    export type ListingCategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListingCategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListingCountOutputTypeDefaultArgs instead
     */
    export type ListingCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListingCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LocalTouristDefaultArgs instead
     */
    export type LocalTouristArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LocalTouristDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VendorDefaultArgs instead
     */
    export type VendorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VendorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VendorLocationDefaultArgs instead
     */
    export type VendorLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VendorLocationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListingCategoryDefaultArgs instead
     */
    export type ListingCategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListingCategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListingDefaultArgs instead
     */
    export type ListingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListingMediaDefaultArgs instead
     */
    export type ListingMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListingMediaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RefreshTokenDefaultArgs instead
     */
    export type RefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RefreshTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ListingSearchIndexDefaultArgs instead
     */
    export type ListingSearchIndexArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ListingSearchIndexDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}