# Ayubowan Connect

**Ayubowan Connect** is a digital platform designed to connect travelers with authentic Sri Lankan culture, treasures, and experiences. It bridges the gap between visitors and local vendors, offering a seamless way to discover events, book experiences, and purchase handmade crafts.

## 🚀 Features

- **Authentic Experiences**: Discover and book village tours, cooking classes, and traditional activities.
- **Marketplace**: Shop for handmade crafts and authentic local goods directly from artisans.
- **Events Calendar**: Stay updated with cultural festivals, workshops, and gatherings.
- **Pro Features**:
  - **AI Itinerary Planner**: Personalized journey planning based on interests.
  - **Real-time Translation**: Chat with locals instantly without language barriers.
  - **Vendor Insights**: Analytics and trends for local business owners.
- **Role-Based Access**: Tailored interfaces for Guests, Travellers, and Vendors.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Custom CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API

## 📦 Getting Started

Follow these steps to set up the project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ayubowan-connect.git
    cd ayubowan-connect
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
Ayubowan-Connect/
│
├── ayubowan-connect/        ← Landing page (DO NOT make any changes here)
│
├── frontend/                ← Feature Frontend (Main Application)
│   ├── app/
│   │   ├── auth/            ← Authentication UI
│   │   ├── marketplace/     ← Marketplace UI
│   │   ├── booking/         ← Booking UI
│   │   ├── events/          ← Events UI
│   │   ├── vendor/          ← Vendor management UI
│   │   ├── payments/        ← Payments UI
│   │   ├── ai/              ← AI features UI
│   │   └── admin/           ← Admin UI
│   │
│   ├── components/          ← Shared UI components
│   ├── public/              ← Static assets
│   ├── styles/              ← Global & component styles
│   ├── package.json
│   └── next.config.mjs
│
├── backend/                 ← Backend (NestJS + Prisma)
│   ├── prisma/              ← Database schema & ORM
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   └── modules/
│   │       ├── authentication/      ← Auth APIs
│   │       ├── marketplace/          ← Marketplace APIs
│   │       ├── booking/               ← Booking APIs
│   │       ├── events/                ← Events APIs
│   │       ├── vendor-management/     ← Vendor APIs
│   │       ├── payments/              ← Payment APIs
│   │       ├── ai-services/            ← AI APIs
│   │       └── admin/                  ← Admin APIs
│   │
│   ├── package.json
│   └── nest-cli.json
│
└── .gitignore
```

## 🤝 Contributing

This is a private project. Contributions are currently restricted to the development team only.
