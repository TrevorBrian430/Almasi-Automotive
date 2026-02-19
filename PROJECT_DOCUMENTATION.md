# Almasi Automotive - Project Documentation

## Project Overview
**Almasi Automotive** is a premium digital platform for a luxury vehicle dealership and service center. The application provides a high-end user experience for browsing exclusive vehicles, booking services, and managing automotive care.

Built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**, it features a sophisticated dark-mode UI with gold accents (`#D4AF37`), emphasizing luxury and exclusivity.

---

## 🚀 Key Features Implemented

### 1. **Core Architecture**
- **Tech Stack**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **State Management**: Zustand (for Auth, UI, Service, and Filter states).
- **Authentication (Mock)**: Role-based access control (RBAC) covering:
  - **Public**: Browse collection, view services.
  - **Owner**: Access "My Garage," book services, view history.
  - **Admin**: Manage workshop, bookings, and customer data.

### 2. **Public Facing Pages**
- **Homepage**: 
  - Cinematic Hero section with particle effects and 3D-style animations.
  - Featured Vehicles slider with horizontal scroll.
  - Service Pillars showcase.
  - Testimonials and scrolling brand partners.
- **Collection Page**: 
  - Grid view of vehicles with advanced filtering (Make, Model, Year, Price).
  - Search functionality.
- **Vehicle Detail Page**:
  - **Fullscreen Lightbox Gallery**: Pinch-to-zoom, swipe navigation, keyboard support.
  - Detailed specifications and pricing.
  - "Concierge Bar" for quick mobile booking/WhatsApp contact.
- **Service Page**:
  - Visually rich hero section (matching homepage aesthetic).
  - Detailed service breakdowns (Diagnostics, Performance, Detailing).

### 3. **Owner Dashboard (`/dashboard`)**
- **Service Portal**:
  - **My Garage**: Digital twin of owner's vehicles, stacking cards vertically on mobile.
  - **Book Service**: Dedicated form with vehicle selection and issue description.
  - **Service History**: Timeline of past maintenance and costs.

### 4. **Admin Dashboard (`/admin`)**
- **Workshop Kanban Board**: Drag-and-drop interface to track vehicles through service stages (Scheduled → In Bay → Repairing → Ready).
- **Bookings Management**: List view of all incoming service requests with status tracking.
- **Customer Directory**: Consolidated view of all clients and their vehicles.

---

## 🛠️ Features Implemented Today (Latest Session)

We focused on refining the mobile UX, visuals, and separating complex workflows into dedicated pages.

### **A. Visual & UX Enhancements**
1.  **Service Hero Parity**: Ported the homepage's rich visual effects (floating particles, radial orbs, diamond rings, grid overlays) to the Service page for brand consistency.
2.  **Fullscreen Gallery**: Replaced static images with a fully interactive Lightbox (Zoom/Swipe support).
3.  **Mobile Responsiveness**:
    - **My Garage**: Cards now stack vertically on mobile (full width) and switch to horizontal scroll on tablets.
    - **Admin Bookings**: Converted large tables into compact Cards for mobile view.
    - **Concierge Bar**: Added glassmorphism transparency and gradient fades to prevent text masking.
    - **WhatsApp Float**: Position optimizations to clear bottom bars.

### **B. Navigation & Structure**
4.  **Dashboard Sidebars**: 
    - Fixed z-index and overlap issues on mobile.
    - Added dedicated Mobile Top Bars for both Admin and User dashboards.
    - "Sign Out" button pinned to the bottom for easy access.
5.  **Page Separation**:
    - Created dedicated `/dashboard/service/book` and `/dashboard/service/history` pages.
    - Created dedicated `/admin/bookings` and `/admin/customers` pages.

### **C. Functionality**
6.  **Enhanced Booking Forms**: 
    - Added "Owner Details" section (Name, Phone, Email) to both dashboard and public booking forms to ensure admins can contact clients.
    - Validated Kenyan phone number formats.
7.  **Clickable CTAs**: Fixed interaction issues where background overlays were blocking button clicks.
8.  **Footer**: Responsive grid layout and text overlap fixes.

---

## 🔮 Missing Features / Next Steps requests

To move from "Prototype" to "Production", the following are recommended:

1.  **Backend Integration**: Connect to a real database (e.g., Supabase, PostgreSQL) to persist bookings and vehicle data (currently using Zustand mock stores).
2.  **Real Authentication**: Replace mock auth with NextAuth.js, Clerk, or Supabase Auth.
3.  **Image Management**: Admin interface to upload/delete vehicle images (currently hardcoded in `public/`).
4.  **Notifications**: Send Email/SMS confirmations upon booking (e.g., via Resend or Twilio).
5.  **Search & Filtering**: Server-side filtering for large vehicle collections.
