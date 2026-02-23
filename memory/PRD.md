# Texas BHA Website - PRD

## Problem Statement
Build a professional, modern website for Texas Business Healthcare Association with 8 public pages + admin panel. Navy blue dominant color scheme with white and silver/light gray accents.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000)
- **Backend**: FastAPI + Motor (async MongoDB) (port 8001)
- **Database**: MongoDB with 9 collections
- **Auth**: JWT-based admin authentication

## User Personas
1. **Students/Young Professionals** - Primary visitors exploring committees, chapters, opportunities
2. **Healthcare Organizations** - Seeking consulting services and partnership
3. **Admin** - Managing website content through admin panel

## Core Requirements
- 8 public pages: Home, Consulting, Committees, Policy, Gallery, Chapters, Opportunities, Contact
- Admin panel with full CRUD for all content types
- Mobile responsive design
- News ticker with announcements
- Gallery with lightbox and category filtering
- Contact form with inquiry type selection

## What's Been Implemented (Feb 20, 2026)
- [x] Full backend API with 10+ MongoDB collections + JWT admin auth
- [x] Database seeding with comprehensive placeholder data
- [x] **Navigation**: Committees dropdown (Philanthropy, Consulting, Policy, Expansion, Outreach/Marketing) + Home, Gallery, Newsletter, Opportunities, Contact
- [x] **New Logo**: Blue abstract pinwheel logo applied throughout (navbar, hero, footer, admin)
- [x] **Hero**: Blurred background image behind logo for layered look
- [x] **Photo-forward design**: Side-by-side text+image blocks, photo banners, photo grids on all pages
- [x] Home page: Hero, news ticker, about section, photo banner, committees highlight, team photos, CTA
- [x] Philanthropy page: Charitable initiatives, photo grid, event photos
- [x] Consulting page: Team photo, services grid, completed/ongoing projects
- [x] Policy page: Research team photo, accordion sections with status badges
- [x] Expansion page: Team photo, chapter cards, Texas map, Start a Chapter CTA
- [x] Outreach/Marketing page: Social strategy, marketing activities, social links
- [x] Gallery page: Filterable grid with lightbox, social media links
- [x] Newsletter page: Subscribe form (name, email), archive section with past issues
- [x] Opportunities page: Photo section, philanthropy and other opportunities with CTAs
- [x] Contact page: Form with inquiry type, contact info sidebar
- [x] Admin panel: Login + full CRUD for all content types + newsletter management
- [x] Responsive navbar with mobile Sheet menu + Committees dropdown
- [x] Footer with quick links, social media, copyright

## What's Been Implemented (Dec 2025)
- [x] **Minor name corrected**: Changed to "HEALTHCARE REFORM & INNOVATION" across all pages
- [x] **Google Calendar icon**: Added to navigation bar (desktop + mobile) linking to user's calendar
- [x] **Hero section cleaned**: Removed decorative floating icons around the logo
- [x] **Logo zoomed**: Increased logo zoom to 420% for better visibility
- [x] **Team page updated**: Removed Committee Leads section, keeping only Executive Board
- [x] **Consulting page updated**: Added horizontal scroll with arrow navigation for ongoing projects
- [x] **Outreach page updated**: Added Marketing Chairs leadership section
- [x] **Expansion page updated**: 
    - Added Expansion Chairs leadership section
    - Added static chapters for high schools (Prosper, Bridgeland, Wylie, Round Rock, Travis)
    - Added Texas A&M as college chapter
    - Updated map with legend differentiating college vs high school chapters
- [x] **Opportunities page**: Updated UT minor link to McCombs Healthcare Minor page

## Testing Results
- Backend: 100% (all 16 endpoints passing)
- Frontend: 95% (lightbox close button minor fix applied)

## Prioritized Backlog
### P0 (Complete)
- All 8 pages + admin panel

### P1
- File upload for images (currently URL-based)
- SEO meta tags per page
- Animated scroll-into-view effects

### P2
- Email notifications for contact form
- Admin password change
- Embedded social media feeds
- Downloadable PDF resources on policy page
- Advanced chapter map with real geo coordinates
- Analytics dashboard for admin

## Next Tasks
1. Add image file upload capability to admin panel
2. Add SEO meta tags to each page
3. Implement scroll animations (intersection observer)
4. Add email notifications for contact submissions
