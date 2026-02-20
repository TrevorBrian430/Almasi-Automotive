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



Good Features:

1. The "Digital Glovebox" (Smart Asset Management)
Currently, you have a "list of cars." Let's turn that into a secure Digital Asset Vault.

What it is: A secure, encrypted space for every document related to the vehicle.
Deep Features:
The "Docs" Tab: Instant access to the Logbook, Insurance Sticker, Inspection Certificates, and Import Papers. No more fumbling in the actual glovebox when stopped by traffic police; you just open the app.
Live Valuation: Real-time AI estimated value of their specific car based on market trends. "Your Land Cruiser LC300 has appreciated by 4% this month."
"Sell Back" Button: One-tap option to get a guaranteed buy-back offer from Almasi.
2. "Sourcing Concierge" with Visual AI
Move beyond just "Contact Us" to a proactive acquisition tool.

The Idea: "I saw this car, I want it."
Deep Feature: Users can upload a photo of a car they spotted on the street or Instagram. Your system identifies the model/spec and starts a "Sourcing Request" to find that exact car in the UK/Japan/Australia.
Import Tracker: A "Domino's Pizza Tracker" but for a $150k vehicle.
Stage 1: Verified in UK
Stage 2: Loaded on Vessel (Map location)
Stage 3: Arrived Mombasa
Stage 4: Customs Cleared
Stage 5: En Route to Westlands
3. "Live Service Bay" (Radical Transparency)
This builds immense trust, which is the currency of your business.

The Idea: When a car is checked in for service (Booking Status = "In Bay"), the user gets a "Live View" tab.
Deep Feature:
Tech Cam: Periodic photo updates uploaded by the technician. "Technician John just removed the oil filter."
Visual Health Check: Instead of a text report, a short video clip showing the worn brake pad vs. a new one, sent directly to the user for approval.
4. Immersion: "The Start-Up Sound"
Luxury cars are emotional. Connect with the senses.

The Idea: On the "My Garage" dashboard, add a "Start Engine" button next to their car.
Creativity: When clicked, it plays the actual cold-start exhaust note of their specific model (e.g., the roar of their G63 AMG or the purr of their S-Class). It’s a small, "toy-like" feature that owners would show off to friends.
5. Almasi "Black Card" (Lifestyle & Community)
Turn the customer base into a club.

The Idea: The app acts as a membership card.
Deep Feature:
Partner Perks: Flash the Almasi App at partner luxury hotels (e.g., Villa Rosa Kempinski) or restaurants for VIP parking or a free drink.
Events: "Sunday Morning Drive" sign-ups. Limited slots, bookable only via the app.