# Ayubowan Connect - Complete Setup Guide

> **Last Updated:** March 2026  
> A comprehensive guide for setting up authentication, OAuth, and vendor management for Ayubowan Connect.

---

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Clerk Authentication Setup](#clerk-authentication-setup)
- [Google OAuth Integration](#google-oauth-integration)
- [Vendor Registration Backend](#vendor-registration-backend)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Project Structure

```
Ayubowan-Connect/
├── frontend/              # Next.js frontend application
│   ├── app/              # App router pages
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # User dashboard
│   │   └── vendor/       # Vendor dashboard
│   ├── components/       # Reusable components
│   ├── middleware.ts     # Clerk middleware for route protection
│   └── .env.local        # Frontend environment variables
│
├── backend/              # NestJS backend application
│   ├── src/
│   │   ├── modules/      # Feature modules
│   │   └── prisma/       # Database service
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── .env              # Backend environment variables
│
└── SETUP_GUIDE.md       # This file
```

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Step 2: Configure Environment Variables

Create `.env.local` in the `frontend` directory and `.env` in the `backend` directory. See [Environment Configuration](#environment-configuration) for details.

### Step 3: Run the Applications

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev
# Runs on http://localhost:3000

# Terminal 2 - Backend
cd backend
npm run start:dev
# Runs on http://localhost:3001
```

---

## 🔐 Clerk Authentication Setup

### What's Configured

✅ Clerk package installed  
✅ Middleware for route protection  
✅ ClerkProvider in layout  
✅ Login page (`/auth/login`)  
✅ User registration (`/auth/register`)  
✅ Vendor registration (`/auth/vendor-register`)  
✅ User and Vendor dashboards

### Required Setup Steps

#### 1. Get Clerk API Keys

1. Go to [https://clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Navigate to **API Keys** in the dashboard
4. Copy your:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)

#### 2. Update Frontend Environment Variables

Add to `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here

# Path configurations (already set)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

#### 3. Configure Clerk Dashboard

In your Clerk Dashboard at [https://dashboard.clerk.com](https://dashboard.clerk.com):

**Set Paths** (Configure → Paths):

- Sign-in URL: `/auth/login`
- Sign-up URL: `/auth/register`
- Home URL: `/`
- After sign-in URL: `/dashboard`
- After sign-up URL: `/dashboard`

**Enable OAuth Providers** (Configure → Social Connections):

- Enable **Google** for "Continue with Google"
- Configure other providers as needed

### Protected Routes

The middleware automatically protects these routes:

- `/dashboard/*` - Requires authentication
- `/profile/*` - Requires authentication
- `/booking/*` - Requires authentication
- `/vendor/*` - Requires authentication (except `/vendor-register`)

Public routes (no auth required):

- `/`, `/auth/*`, `/landing`, `/experiences`, `/marketplace`, `/events`, `/pro`

### Testing Authentication

1. Start the frontend: `npm run dev` in the `frontend` directory
2. Visit [http://localhost:3000/auth/register](http://localhost:3000/auth/register)
3. Create an account and verify email
4. Login at [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
5. You should be redirected to `/dashboard`

### Customization

**Styling Clerk Components:**

```typescript
<SignIn
  appearance={{
    elements: {
      rootBox: "mx-auto",
      card: "shadow-lg rounded-lg",
    },
    variables: {
      colorPrimary: "#3d9b8f", // Your brand color
    }
  }}
/>
```

**User Metadata:**

```typescript
await clerk.users.updateUser(userId, {
  publicMetadata: {
    role: "vendor",
    businessName: "My Craft Shop",
  },
});
```

---

## 🌐 Google OAuth Integration

### Prerequisites

- Google Cloud Platform account
- Application running on localhost

### Setup Steps

#### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "Ayubowan Connect")
3. Enable the **Google+ API** for your project

#### 2. Create OAuth 2.0 Credentials

1. Navigate to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Configure OAuth consent screen:
   - User type: **External**
   - App name: `Ayubowan Connect`
   - Add your email as test user
4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `Ayubowan Connect`
   - Authorized JavaScript origins: `http://localhost:3001`
   - Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
5. Copy **Client ID** and **Client Secret**

#### 3. Configure Backend

Add to `backend/.env`:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

#### 4. Production Setup

For production deployment:

1. Add production domain to authorized redirect URIs
2. Update `GOOGLE_REDIRECT_URI` environment variable
3. Submit app for Google verification (if >100 users)

---

## 👔 Vendor Registration Backend

### Registration Flow

1. **User signs up via Clerk** (email/password or Google OAuth)
2. **Email verification** (handled by Clerk)
3. **Complete vendor profile** (custom forms):
   - Craft details (name, type, experience, description)
   - Portfolio images
   - Identity verification documents
4. **Data submitted to backend** at `POST /vendor/register`
5. **Admin approval** required before vendor can operate

### Required Backend Implementation

#### 1. Install Required Packages

```bash
cd backend
npm install @clerk/clerk-sdk-node
npm install @nestjs/platform-express multer
npm install @types/multer --save-dev

# For file storage (choose one)
npm install aws-sdk        # If using AWS S3
npm install cloudinary     # If using Cloudinary
```

#### 2. Database Schema

Add to `backend/prisma/schema.prisma`:

```prisma
model Vendor {
  id                   String       @id @default(cuid())
  userId               String       @unique // Clerk user ID
  email                String
  craftName            String
  craftType            String
  experience           Int
  description          String       @db.Text
  businessRegistration String?
  taxId                String?
  portfolioUrls        String[]     // Array of image URLs
  identityDocumentUrl  String
  status               VendorStatus @default(PENDING_APPROVAL)
  submittedAt          DateTime     @default(now())
  approvedAt           DateTime?
  approvedBy           String?
  rejectedAt           DateTime?
  rejectionReason      String?

  // Relations
  products             Product[]
  bookings             Booking[]

  @@map("vendors")
}

enum VendorStatus {
  PENDING_APPROVAL
  APPROVED
  REJECTED
  SUSPENDED
}
```

#### 3. Create Vendor Controller

Create `backend/src/modules/vendor-management/vendor-management.controller.ts`:

```typescript
import {
  Controller,
  Post,
  Put,
  Param,
  UseInterceptors,
  UploadedFiles,
  Body,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { VendorManagementService } from "./vendor-management.service";
import { Clerk } from "@clerk/clerk-sdk-node";

@Controller("vendor")
export class VendorManagementController {
  private clerkClient: any;

  constructor(private readonly vendorService: VendorManagementService) {
    this.clerkClient = Clerk({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  @Post("register")
  @UseInterceptors(FilesInterceptor("files", 20))
  async registerVendor(
    @Body() body: any,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      // 1. Validate user exists in Clerk
      const clerkUser = await this.clerkClient.users.getUser(body.userId);

      if (!clerkUser) {
        return { success: false, message: "User not found" };
      }

      // 2. Upload files to storage (implement uploadPortfolioFiles)
      const portfolioUrls = await this.uploadPortfolioFiles(files);
      const identityDocUrl = await this.uploadIdentityDocument(files);

      // 3. Save vendor data to database
      const vendor = await this.vendorService.create({
        userId: body.userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        craftName: body.craftName,
        craftType: body.craftType,
        experience: parseInt(body.experience),
        description: body.description,
        businessRegistration: body.businessRegistration,
        taxId: body.taxId,
        portfolioUrls: portfolioUrls,
        identityDocumentUrl: identityDocUrl,
        status: "PENDING_APPROVAL",
        submittedAt: new Date(),
      });

      // 4. Update Clerk user metadata
      await this.clerkClient.users.updateUserMetadata(body.userId, {
        publicMetadata: {
          role: "vendor",
          vendorId: vendor.id,
          vendorStatus: "pending_approval",
          vendorApplicationDate: new Date().toISOString(),
        },
      });

      return {
        success: true,
        vendorId: vendor.id,
        message: "Vendor registration successful. Pending approval.",
        status: "pending_approval",
      };
    } catch (error) {
      console.error("Vendor registration error:", error);
      return {
        success: false,
        message: "Vendor registration failed",
        error: error.message,
      };
    }
  }

  @Put(":id/approve")
  async approveVendor(@Param("id") id: string, @Body() data: any) {
    const vendor = await this.vendorService.approve(id, data.adminId);

    await this.clerkClient.users.updateUserMetadata(vendor.userId, {
      publicMetadata: {
        vendorStatus: "approved",
        approvedAt: new Date().toISOString(),
      },
    });

    return { success: true, vendor };
  }

  @Put(":id/reject")
  async rejectVendor(@Param("id") id: string, @Body() data: any) {
    const vendor = await this.vendorService.reject(id, data.reason);

    await this.clerkClient.users.updateUserMetadata(vendor.userId, {
      publicMetadata: {
        vendorStatus: "rejected",
        rejectedAt: new Date().toISOString(),
      },
    });

    return { success: true, vendor };
  }

  private async uploadPortfolioFiles(files: Express.Multer.File[]) {
    // TODO: Implement file upload to S3/Cloudinary
    return [];
  }

  private async uploadIdentityDocument(files: Express.Multer.File[]) {
    // TODO: Implement secure document upload
    return "";
  }
}
```

#### 4. Clerk Webhooks (Recommended)

Create `backend/src/modules/webhooks/clerk-webhook.controller.ts`:

```typescript
import { Controller, Post, Body, Headers } from "@nestjs/common";
import { Webhook } from "svix";

@Controller("webhooks/clerk")
export class ClerkWebhookController {
  @Post()
  async handleWebhook(
    @Body() payload: any,
    @Headers("svix-id") svixId: string,
    @Headers("svix-timestamp") svixTimestamp: string,
    @Headers("svix-signature") svixSignature: string,
  ) {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    try {
      const evt = webhook.verify(JSON.stringify(payload), {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });

      switch (evt.type) {
        case "user.created":
          // Sync user to database
          break;
        case "user.updated":
          // Update user in database
          break;
        case "user.deleted":
          // Handle user deletion
          break;
      }

      return { success: true };
    } catch (error) {
      console.error("Webhook verification failed:", error);
      return { success: false };
    }
  }
}
```

Configure webhook in Clerk Dashboard:

- URL: `https://your-domain.com/webhooks/clerk`
- Events: `user.created`, `user.updated`, `user.deleted`

---

## ⚙️ Environment Configuration

### Frontend (.env.local)

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# Clerk Paths (pre-configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)

```env
# Clerk
CLERK_SECRET_KEY=sk_test_your_secret_here
CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ayubowan"

# JWT
JWT_SECRET=your-jwt-secret-here

# File Storage (AWS S3)
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1

# OR Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 🧪 Testing

### Test Authentication Flow

1. **User Registration:**
   - Go to http://localhost:3000/auth/register
   - Create account with email/password or Google
   - Verify email
   - Login and access dashboard

2. **Vendor Registration:**
   - Go to http://localhost:3000/auth/vendor-register
   - Complete Clerk sign-up
   - Fill vendor details forms
   - Submit and check backend logs
   - Verify data saved in database

3. **Protected Routes:**
   - Try accessing `/dashboard` without login → redirects to login
   - Login and access dashboard → should succeed

### API Testing

Use Postman or curl to test backend endpoints:

```bash
# Test vendor registration endpoint
curl -X POST http://localhost:3001/vendor/register \
  -F "userId=user_123" \
  -F "craftName=Traditional Pottery" \
  -F "craftType=pottery" \
  -F "experience=5" \
  -F "description=Handmade pottery..." \
  -F "portfolio_0=@image1.jpg" \
  -F "identityDocument=@id.pdf"
```

---

## 🐛 Troubleshooting

### Clerk Issues

**"Missing publishable key" error:**

- Verify `.env.local` exists in `frontend/` directory
- Check keys start with `NEXT_PUBLIC_CLERK_` and `CLERK_`
- Restart dev server: `npm run dev`

**Infinite redirect loop:**

- Check `middleware.ts` public routes configuration
- Verify path configurations in `.env.local`

**OAuth not working:**

- Enable provider in Clerk Dashboard
- Add redirect URLs in Google Console
- Check environment is "Development" in Clerk

### Google OAuth Issues

**redirect_uri_mismatch:**

- Verify redirect URI matches exactly in Google Console
- Check `GOOGLE_REDIRECT_URI` in backend `.env`

**Authentication failed:**

- Check browser console for errors
- Verify Google credentials are correct
- Ensure email is added as test user in OAuth consent screen

### Backend Issues

**Vendor registration fails:**

- Check Clerk secret key is valid
- Verify file upload service is configured
- Check database connection
- Review backend logs for detailed errors

**Files not uploading:**

- Verify AWS/Cloudinary credentials
- Check bucket permissions
- Ensure file types are allowed

---

## 📚 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Guide](https://clerk.com/docs/quickstarts/nextjs)
- [Google OAuth Setup](https://console.cloud.google.com/)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)

---

## ✅ Setup Checklist

### Initial Setup

- [ ] Install frontend dependencies
- [ ] Install backend dependencies
- [ ] Create environment files

### Clerk Setup

- [ ] Create Clerk account and application
- [ ] Add Clerk API keys to `.env.local`
- [ ] Configure Clerk Dashboard paths
- [ ] Enable OAuth providers (optional)
- [ ] Test user registration and login

### Google OAuth (Optional)

- [ ] Create Google Cloud project
- [ ] Configure OAuth consent screen
- [ ] Create OAuth 2.0 credentials
- [ ] Add credentials to backend `.env`

### Vendor Backend

- [ ] Install required npm packages
- [ ] Create Prisma schema
- [ ] Run database migrations
- [ ] Implement vendor controller
- [ ] Configure file storage (S3/Cloudinary)
- [ ] Test vendor registration flow
- [ ] Set up Clerk webhooks

### Testing

- [ ] Test user registration
- [ ] Test user login
- [ ] Test vendor registration
- [ ] Test protected routes
- [ ] Test file uploads
- [ ] Verify data in database

---

## 🚀 Next Steps

1. **Complete remaining backend endpoints:**
   - Vendor profile management
   - Product listing
   - Booking system
   - Payment integration

2. **Build admin panel:**
   - Vendor approval workflow
   - User management
   - Analytics dashboard

3. **Add features:**
   - Email notifications
   - Real-time chat
   - Reviews and ratings
   - Search and filters

4. **Deploy to production:**
   - Set up production databases
   - Configure production OAuth
   - Set up CI/CD pipeline
   - Configure domain and SSL

---

**Need Help?** Open an issue in the repository or contact the development team.

**Good Luck Building Ayubowan Connect! 🎉**
