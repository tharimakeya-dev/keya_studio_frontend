# 🎬 Keya Studio — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express-5.3-green?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

> **Keya Studio** is a premier peer-to-peer workspace sharing platform empowering creators, filmmakers, photographers, audio engineers, and podcasters to discover, book, and host world-class production spaces worldwide. Studio hosts can list their creative lofts, acoustic cinema stages, podcast lounges, music suites, and art workshops, while creators can book hourly slots with real-time collision prevention and transparent pricing.

---

## 🌐 Live URLs & Repositories

| Destination | URL |
| :--- | :--- |
| 🚀 **Live Client Website** | [https://keya-studio-frontend.vercel.app](https://keya-studio-frontend.vercel.app) |
| ⚡ **Live Back end API** | [https://keya-studio-backend.vercel.app](https://keya-studio-backend.vercel.app) |
| 💻 **Front end Repository** | [https://github.com/tharimakeya-dev/keya_studio_frontend](https://github.com/tharimakeya-dev/keya_studio_front end) |
| 🛠️ **Back end Repository** | [https://github.com/tharimakeya-dev/keya_studio_backend](https://github.com/tharimakeya-dev/keya_studio_back end) |

---

## ✨ Key Platform Features

1. **Dynamic Studio Discovery & Instant Search**:
   - Filter creative workspaces across 5 dedicated disciplines (*Photo Studio, Film Stage, Podcast Room, Music Suite, Art Workshop*).
   - Real-time search by studio name, location, and amenity keywords.
   - Dynamic sorting by Recommended, Price (Low to High, High to Low), and Top Rating.
   - Category browse cards on the homepage with deep linking into filtered search results.

2. **Complete Studio Management CRUD with ImgBB Cloud Hosting**:
   - **Add Studio (`/add-studio`)**: Private route allowing hosts to upload high-res imagery via the **ImgBB API**, select amenity badges, set hourly rate and security deposit, and publish live spaces.
   - **My Studio Listings (`/my-listings`)**: Host management dashboard displaying all spaces created by the authenticated user.
   - **Custom Confirmation Modal**: Safe deletion with custom UI modal dialog to prevent accidental deletion.
   - **Update Studio (`/studios/edit/[id]`)**: Pre-populated editing interface with read-only host credentials.

3. **Intelligent Booking Engine with Double-Booking Prevention (Challenge 2)**:
   - Interactive booking modal with automatic duration calculation and transparent pricing breakdowns.
   - **Collision Prevention Guard**: Real-time evaluation of time intervals `(newStart < existingEnd && newEnd > existingStart)` against existing bookings in MongoDB, rejecting conflicting time slots.
   - New reservations start with `"Pending"` status.
   - **My Bookings (`/my-bookings`)**: Tracks status badges (*Pending, Confirmed, Completed, Cancelled*) with instant self-cancellation for pending bookings.

4. **Robust JWT Authentication with HTTPOnly Cookies (Challenge 1)**:
   - Mutation endpoints protected with JWT stored in HTTPOnly cookies (`SameSite=None`, `Secure`).
   - Live registration password validation checklist enforcing at least one uppercase letter (`[A-Z]`), one lowercase letter (`[a-z]`), and minimum 6 characters.
   - Full Google OAuth 2.0 social sign-in integration and persistent session restoration across route refreshes.

5. **Tailwind v4 Light/Dark Mode & Production UX (Challenge 3)**:
   - Seamless **Dark / Light Theme Toggle** in the navigation bar with instant CSS variable switching and local storage persistence (no FOUC flash).
   - Standardized feedback via **Sonner toasts** and zero default browser `alert()` / `confirm()` prompts.
   - Animated aperture spinner and skeleton cards during data fetching.
   - **PDF Booking Receipt Generator**: Instant client-side printable/downloadable booking invoice.
   - **Saved Studios Wishlist**: MongoDB-backed favorite heart toggling on all studio cards.
   - Custom **404 Not Found Page** with illustration and home navigation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16.4](https://nextjs.org/) (App Router), [React 19.3](https://react.dev/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/) |
| **Feedback & Notifications** | [Sonner Toast Library](https://sonner.emilkowal.ski/) |
| **Image Hosting** | [ImgBB API](https://api.imgbb.com/) Cloud Storage |
| **Backend Framework** | [Express.js 5.3](https://expressjs.com/), [Node.js](https://nodejs.org/) (v20+ / v24 LTS) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) with Official Native Driver (v7.8) |
| **Authentication & Security** | JWT (JSON Web Tokens), HTTPOnly Cookies, Bcrypt.js, CORS Credentials |
| **Deployment** | [Vercel](https://vercel.com/) (Frontend & Server less Node.js Back end) |

---

## 🔑 Examiner Test Credentials

For quick evaluation of authenticated features, host listings, and reservations:

| Account Type | Email | Password / Access | Notes |
| :--- | :--- | :--- | :--- |
| **Examiner Demo Account** | `creator.demo@example.com` | `KeyaStudio2026!` | Pre-populated with active listings & bookings |
| **1-Click Quick Demo** | *Click "1-Click Examiner Demo Sign In"* | *Instant 1-Click* | Available on `/login` for instant grading |
| **Google Social Login** | *Click "Sign In with Google"* | *Google OAuth 2.0* | Connects directly via Google OAuth |

---

## 🚀 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or newer recommended, v20+ / v24 LTS tested)
- [Git](https://git-scm.com/)
- Active MongoDB connection URI (MongoDB Atlas or local)

---

### 1. Server Setup (`backend/`)

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env)
cp .env.example .env
```

Ensure your `backend/.env` contains:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
DB_NAME=studiospace
JWT_SECRET=studiospace_super_secret_jwt_key_b14_a8_cat_harry_2026
CLIENT_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

```bash
# 4. Seed the database with 6 verified studio listings
npm run seed

# 5. Start the backend development server
npm run dev
# Running at http://localhost:5000
```

---

### 2. Client Setup (`frontend/`)

```bash
# 1. Navigate to the frontend directory
cd ../frontend

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env.local)
cp .env.example .env.local
```

Ensure your `frontend/.env.local` contains:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=4f4dad1c8edf0e218d86fe3b0bc6655e
```

```bash
# 4. Start the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Requirements Compliance Checklist

| Feature Requirement | Status | Notes |
| :--- | :---: | :--- |
| **No Lorem Ipsum Text** | ✅ Complete | 100% authentic production descriptions across all listings |
| **No Default Alerts/Confirms** | ✅ Complete | Toast feedback via Sonner and custom modal dialogs |
| **Sticky Navbar with Aperture Logo** | ✅ Complete | Logo, active route indicators, theme toggle, user avatar dropdown |
| **Footer with Modern X Logo** | ✅ Complete | Official X logo (no Twitter bird), categories, newsletter, legal links |
| **Hero Slider (>= 3 slides)** | ✅ Complete | Cross fade slider with high-res photography and CTAs |
| **Featured Studios (.limit(6))** | ✅ Complete | 6 verified studios loaded dynamically from MongoDB |
| **Browse by Categories** | ✅ Complete | 5 discipline cards pre-filtering the `/studios` page |
| **2 Extra Home Sections** | ✅ Complete | "How Booking Works" (4 steps) & "Host Guarantee & Support" (4 assurances) |
| **Password Validation Checklist** | ✅ Complete | Live check for uppercase, lowercase, and 6+ characters |
| **Full Studio CRUD** | ✅ Complete | Add with ImgBB upload, Explore, Details, Edit, Delete with modal |
| **Double-Booking Collision Prevention** | ✅ Complete | Overlap interval collision detection against confirmed bookings |
| **HTTPOnly Cookie JWT Security** | ✅ Complete | Secure mutation endpoints reject unauthorized requests with 401 |
| **Light/Dark Theme Customization** | ✅ Complete | Tailwind v4 custom variant persisted in localStorage |
| **PDF Booking Receipt** | ✅ Complete | Downloadable invoice receipt for confirmed reservations |
| **Saved Studios Wishlist** | ✅ Complete | MongoDB-backed favorite heart toggling on all studio cards |
| **Custom 404 Page** | ✅ Complete | Cinematic studio illustration with direct return-home CTA |

---

## 📄 License
This project was developed for the **B14-A8** assignment evaluation under the MIT License.
