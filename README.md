# 🎬 Keya Studio — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-5.3-green?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

> **Keya Studio** is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners and hosts can list their creative spaces—ranging from photography cyclorama daylight lofts and cinema sound stages to podcast lounges, music recording suites, and art workshops. Creators can discover, filter, inspect dynamic availability, and reserve studio slots with transparent hourly pricing and real-time booking management.

---

## 🌐 Live Website & Repositories

- **Live Production URL**: [https://keya-studio.vercel.app](https://keya-studio.vercel.app) *(Replace with your deployed Vercel link)*
- **Client-Side Repository**: [https://github.com/tharimakeya-dev/keya_studio_frontend](https://github.com/tharimakeya-dev/keya_studio_frontend)
- **Server-Side Repository**: [https://github.com/tharimakeya-dev/keya_studio_backend](https://github.com/tharimakeya-dev/keya_studio_backend)

---

## ✨ Key Website Features (Minimum 5 Core Highlights)

1. **Dynamic Studio Discovery & Advanced Filtering**:
   - Filter creative workspaces by medium (*Photo Studio, Film Stage, Podcast Room, Music Suite, Art Workshop*).
   - Real-time keyword search across titles, addresses, and gear descriptions.
   - Dynamic sorting by recommended, price (low-to-high, high-to-low), and top-rated spaces.
   - Home page category cards that seamlessly redirect and pre-select the chosen discipline.

2. **Full Studio Management CRUD with Cloud Image Hosting**:
   - **Add Studio (`/add-studio`)**: Private route featuring direct **ImgBB API** image uploads, interactive amenity tags/checkboxes, pricing, security deposit, capacity, and read-only host credentials.
   - **My Studio Listings (`/my-listings`)**: User-owned spaces filtered by `ownerEmail`.
   - **Custom Confirmation Modal**: Safe deletion system that verifies user confirmation via a custom modal dialog before removing documents from MongoDB.
   - **Update Studio (`/studios/edit/[id]`)**: Pre-populated editing suite with read-only host identification.

3. **Intelligent Booking Engine with Double-Booking Collision Prevention (Challenge 2)**:
   - Interactive booking modal calculating shoot duration and pricing automatically.
   - **Double-Booking Prevention Guard**: Evaluates time intervals `(newStart < existingEnd && newEnd > existingStart)` against confirmed reservations in MongoDB, blocking overlaps with an informative conflict alert.
   - New bookings are saved with initial `"Pending"` status.
   - **My Bookings (`/my-bookings`)**: Tracks status badges (*Pending, Confirmed, Completed, Cancelled*) with instant cancellation for pending reservations.

4. **Robust JWT Authentication with HTTPOnly Cookies (Challenge 1)**:
   - Server-side mutation routes (`POST /api/studios`, `DELETE /api/studios/:id`, `POST /api/bookings`) protected by JWT stored in secure HTTPOnly cookies.
   - Strict password security validation: rejects registrations unless the password contains at least one uppercase letter (`[A-Z]`), one lowercase letter (`[a-z]`), and is at least 6 characters long.
   - Google Social Authentication and persistent session state preventing redirection on route reload.

5. **Theme Customization & Modern UX Feedback (Challenge 3 & Polish)**:
   - System-wide **Dark/Light Mode Toggle** in the sticky navigation bar, persisting user choice via local storage.
   - Zero generic `window.alert()` / `confirm()` dialogs: standardized modern notifications using **Sonner**.
   - Branded animated aperture spinners and skeleton loaders during route transitions and asynchronous data fetches.
   - Custom **404 Page** with creative studio cinema illustration and a direct "Return to Home" button.
   - **PDF Booking Invoice Generator**: Downloadable receipt for confirmed studio bookings.
   - **MongoDB Wishlist / Saved Studios**: Heart icon on cards enabling creators to save spaces directly to their profile.

---

## 🛠️ Technology Stack

| Layer | Technologies Selected |
| :--- | :--- |
| **Frontend Framework** | **Next.js 16.4** (App Router), **React 19.3**, JavaScript / ESNext |
| **Styling & Icons** | **Tailwind CSS v4**, **Lucide React**, Brand Standalone SVGs (New X Logo) |
| **Notifications** | **Sonner** (modern toast components) |
| **Image Hosting** | **ImgBB API** integration for automated cloud photo hosting |
| **Backend API** | **Express.js 5.3**, Node.js (v24 LTS) |
| **Database** | **MongoDB Atlas** (Official MongoDB Driver v7.8) |
| **Authentication & Security** | **JWT (JSON Web Tokens)**, **HTTPOnly Cookies**, **Bcrypt.js** password hashing, CORS credentials |

---

## 🔑 Examiner Test Credentials

For quick evaluation of authenticated features, host controls, and bookings:

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Examiner / Host Account** | `elena.studios@example.com` | `KeyaStudio2026!` | Host Listings, Add Studio, Edit Studio, Bookings |
| **Creator / Guest Account** | `creator.demo@example.com` | `Creator2026!` | Explore, Book Workspace, Cancel Booking, Wishlist |
| **Social Login** | *Click "Continue with Google" / "Sign in with Google"* | *One-Click Instant Access* | Full creator privileges |

---

## 🚀 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or newer recommended, v20+ / v24 tested)
- [Git](https://git-scm.com/)
- Active MongoDB connection (MongoDB Atlas URI or local instance)

---

### 1. Server Setup (`backend/`)

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file (or copy from .env.example)
cp .env.example .env
```

Ensure your `backend/.env` contains:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
DB_NAME=studiospace
JWT_SECRET=studiospace_super_secret_jwt_key_b14_a8_cat_harry_2026
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

```bash
# Seed the database with 6 featured creative spaces (no Lorem Ipsum)
npm run seed

# Start the Express server
npm run dev
# The server will start at http://localhost:5000
```

---

### 2. Client Setup (`frontend/`)

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Create local environment file .env.local
```

Ensure your `frontend/.env.local` contains:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=4f4dad1c8edf0e218d86fe3b0bc6655e
```

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Requirements Compliance Verification

| Specification Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **No Lorem Ipsum Text** | ✅ Complete | 100% authentic production descriptions across all listings and marketing sections |
| **No Default Alerts** | ✅ Complete | All feedback handled via **Sonner toasts** and custom confirmation modals |
| **Sticky Navbar with Aperture Logo** | ✅ Complete | Clean Keya Studio logo, spotlight icon, active indicators, theme toggle, profile dropdown |
| **Footer with New X Logo** | ✅ Complete | Official rebranded X logo (no Twitter bird), categories, newsletter, legal links |
| **Hero Slider (>= 3 slides)** | ✅ Complete | Interactive crossfade slider with punchy headlines and CTAs linking to `/studios` |
| **Featured Studios (.limit(6))** | ✅ Complete | Dynamic query returning top 6 rated studios with price, badges, and details button |
| **Browse by Categories** | ✅ Complete | 5 interactive cards linking to `/studios?category=...` with pre-selected filters |
| **2 Extra Home Sections** | ✅ Complete | "How Booking Works" (4 steps) & "Host Guarantee & Support" (4 assurances) |
| **Password Validation** | ✅ Complete | Live checklist enforcing Uppercase, Lowercase, and 6+ characters |
| **CRUD Operations** | ✅ Complete | Add studio with ImgBB upload, explore, details, update, delete modal |
| **Double-Booking Prevention** | ✅ Complete | Time interval overlap collision detection against Confirmed slots (Challenge 2) |
| **HTTPOnly Cookie JWT Security** | ✅ Complete | Mutation endpoints reject unauthorized requests with 401 Unauthorized (Challenge 1) |
| **Dark/Light Theme Toggle** | ✅ Complete | Full system theme toggle in Navbar persisted in localStorage (Challenge 3) |
| **PDF Booking Receipt** | ✅ Complete | One-click downloadable invoice receipt for confirmed reservations |
| **Saved Studios Wishlist** | ✅ Complete | Heart icon allowing logged-in creators to save spaces in MongoDB |
| **Custom 404 Page** | ✅ Complete | Creative studio illustration with direct "Return to Home" button |

---

## 📄 License
This project was developed for the **B14-A8** assignment evaluation under the Creative Commons / MIT guidelines.
