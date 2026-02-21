# Almasi Automotive - Platform Documentation

## 1. Executive Summary
**Almasi Automotive** is a high-end, premium web platform designed for a luxury car dealership operating in East Africa (Nairobi, Kenya). The platform goes beyond a simple brochure website, functioning as a complete **White-Glove Automotive Concierge Service**. It acts as a bridge between high-net-worth individuals and exclusive international vehicle imports, while seamlessly managing the post-purchase ownership experience (servicing, tracking, and club perks).

**Target Audience:**
*   **High-Net-Worth Individuals (HNWIs):** Executives, business owners, and prominent figures seeking exotic/luxury vehicles (Mercedes G-Class, Range Rovers, Porsches, etc.).
*   **Discerning Enthusiasts:** Buyers who demand transparency, direct OEM manufacturing standards, and a stress-free import process.

---

## 2. Core Architecture & Technology Stack
The platform is built using a modern, scalable, and ultra-fast tech stack designed to deliver a premium user experience.

*   **Framework:** Next.js (React)
*   **Styling:** Vanilla CSS & Tailwind CSS V4 (utilizing dark themes, glassmorphism, gold gradients, and abstract geometric overlays)
*   **Animations:** Framer Motion (for smooth, cinematic page reveals, floating particle effects, and premium micro-interactions)
*   **Scrolling:** Lenis (Smooth Scroll) for a buttery-smooth, native app-like browsing feeling.
*   **State Management:** Zustand (for lightweight, global modal and user states)
*   **Forms & Validation:** React Hook Form + Zod (for secure, typed data entry)
*   **Icons:** Lucide React

---

## 3. Platform Modules (The 3 Pillars)

The Almasi Automotive platform is divided into three distinct experiences:
1.  **The Public Facing Showroom** (Marketing & Lead Generation)
2.  **The Client Portal** (`/dashboard`) (Secure Ownership & Concierge)
3.  **The Admin Control Panel** (`/admin`) (Business Management)

---

### Pillar 1: The Public Facing Showroom
*The face of the brand. Designed to establish trust, showcase the standard of quality, and generate luxury leads.*

#### A. The Landing Page (`/`)
*   **Cinematic Hero Section:** Features a device-responsive luxury car backdrop (desktop widescreen vs. mobile portrait) with floating 3D gold particles, ambient glowing orbs, and bold typography ("The Art of Acquisition").
*   **Curated Collection Slider:** A draggable, high-performance carousel showcasing the latest exclusive vehicle arrivals (e.g., Porsche 911 GT3 RS, Range Rover Autobiography) with immersive hover states showing specs (0-100km/h, engine type).
*   **Service Pillars:** Outlines the brand promises: *Authenticated Inspections, Direct Imports, and White-Glove Concierge*.
*   **Testimonials:** Social proof section featuring quotes from high-profile clients (CEOs, Surgeons, Property Developers).
*   **WhatsApp Integration:** A persistent, floating WhatsApp action button for instant, direct communication with the sales team.

#### B. The Vehicle Collection (`/collection` & `/collection/[slug]`)
*   **Dynamic Inventory Grid:** A beautifully mapped grid of all available and incoming vehicles.
*   **Comprehensive Filtering:** Users can filter by Make, Body Style (SUV, Coupe, Sedan), and Price Range.
*   **Vehicle Detail Pages (VDP):** Deep-dive pages for individual cars featuring:
    *   Massive high-resolution image galleries.
    *   Performance metrics (Power, Torque, Top Speed).
    *   Feature lists categorized by Interior, Exterior, and Technology.
    *   Sticky "Reserve This Vehicle" CTA.
    *   **Immersive Vehicle Comparisons:** A tool allowing users to select multiple cars from the collection and compare their specs side-by-side.

#### C. The Service & Care Standard (`/service`)
*   **"Precision Care" Hero:** Avoids standard imagery in favor of pure, abstract geometric CSS styling to convey extreme precision and "Manufacturer Standards".
*   **Service Offerings:** Details routine servicing, diagnostics, and paint correction.
*   **Direct Booking Flow:** Triggers a global modal allowing users to request a service bay appointment instantly.

#### D. About Us (`/about`)
*   **Brand Story:** Details the origins and mission of Almasi Automotive in East Africa.
*   **Location:** Includes showroom details for Westlands, Nairobi.

---

### Pillar 2: The Client Portal (`/dashboard`)
*A secure, authenticated area for existing clients to manage their ultra-luxury assets.*

#### A. The Dashboard Overview (`/dashboard`)
*   **Fleet Summary:** Shows the user their actively owned vehicles.
*   **Active Concierge Requests:** Tracks ongoing import requests or active service tickets.

#### B. Live Service Bay (`/dashboard/live`)
*   **Real-time Transparency:** A standout feature where clients can watch their car being serviced live.
*   **Live Ticket Updates:** A scrolling timeline feed showing mechanic notes, diagnostic readouts, and part replacements in real-time.
*   **Direct Mechanic Chat:** Secure messaging channel directly to the chief technician working on the vehicle.

#### C. Service & Booking (`/dashboard/service` & `/dashboard/service/book`)
*   **Digital Garage:** Clients can select which of their specific vehicles needs attention.
*   **Detailed Booking Form:** Full screen width form asking for Service Type (Routine, Diagnostic, Repair), Preferred Dates, and specific symptoms.
*   **Service History:** A permanent digital ledger of all past work done on the vehicle, ensuring total provenance and protecting the resale value of the car.

#### D. Sourcing Concierge (`/dashboard/sourcing`)
*   **Bespoke Import Requests:** Clients can request the dealership to hunt down a specific, rare vehicle globally.
*   **Live Import Tracker:** A visual timeline showing the status of their requested car (e.g., *Sourced in UK -> Inspection Passed -> On Ship transport -> Cleared KRA Customs -> Ready for Delivery*).

#### E. Almasi Club (`/dashboard/club`)
*   **Exclusive VIP Tier:** A loyalty and lifestyle section for top-tier clients.
*   **Club Perks:** Access to track days, private viewing events for new hypercars, and exclusive partnerships (e.g., luxury hotel stays, high-end dining).

---

### Pillar 3: Admin Control Panel (`/admin`)
*The central nervous system for the dealership staff to manage the entire operation securely.*

#### A. Fleet & Inventory Management (`/admin/fleet`)
*   **Inventory CRUD:** Full ability to Create, Read, Update, and Delete vehicles from the public collection.
*   **Detailed Spec Editing:** Admins can define every metric (Engine, 0-100, Price, Mileage, Status: Available/Sold/In-Transit).
*   **Image Management:** Systems to handle vehicle gallery arrays.

#### B. Booking & Lead Management (`/admin/bookings`)
*   **Central Inbox:** A dashboard to view all incoming service requests and vehicle inquiries.
*   **Status Toggles:** Ability to mark leads as *Pending, Confirmed, or Completed*.

#### C. Active Workshop (`/admin/workshop`)
*   **Service Bay Control:** The backend analog to the client's "Live Service Bay".
*   **Live Updates:** Admins can post real-time updates, photos, and mechanic notes to specific client timelines.

#### D. User & Client CRM (`/admin/users`)
*   **Client Database:** Management of all registered VIP clients and their linked vehicle fleets.

---

## 4. UI/UX Design System Features
*   **Strict Color Palette:** Deep Midnight Black `#050505`, Platinum Text `#E2E8F0`, and Signature Gold `#D4AF37`.
*   **Typography:** Elegant serif headings (`Cinzel`) paired with highly legible sans-serif body text (`Manrope`).
*   **Responsive Fluidity:** Every component is built mobile-first. The platform intelligently swaps background images (e.g., taking heavy 4k widescreen images on desktop and dynamically swapping them to optimized 9:16 portrait images on mobile) to ensure no awkward cropping and instant load times.
*   **Scroll Hijacking Prevention:** Features custom scroll containers with `data-lenis-prevent` to allow native mouse-wheel scrolling inside nested menus and live feeds without breaking the main page's smooth scroll effect.