# Texas BHA Website - PRD

## Problem Statement
Build a professional, modern website for Texas Business Healthcare Association with 10+ public pages + admin panel. Navy blue dominant color scheme with white and silver/light gray accents.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000)
- **Backend**: FastAPI + Motor (async MongoDB) (port 8001)
- **Database**: MongoDB with 9+ collections
- **Auth**: JWT-based admin authentication
- **File Uploads**: react-dropzone (frontend) + FastAPI UploadFile (backend), stored in /app/backend/uploads

## User Personas
1. **Students/Young Professionals** - Primary visitors exploring committees, chapters, opportunities
2. **Healthcare Organizations** - Seeking consulting services and partnership
3. **Admin** - Managing website content through admin panel

## Core Requirements
- 10+ public pages: Home, Consulting, Committees, Policy, Gallery, Chapters/Expansion, Opportunities, Contact, Newsletter, Team
- Admin panel with full CRUD for all content types + file upload
- Mobile responsive design
- News ticker with announcements
- Gallery with lightbox and category filtering
- Contact form with inquiry type selection
- Instagram feed display on Gallery page
- Texas map with chapter locations on Expansion page
- Horizontal scrolling project sections on Consulting page

## What's Been Implemented

### Phase 1 (Feb 20, 2026)
- [x] Full backend API with 10+ MongoDB collections + JWT admin auth
- [x] Database seeding with comprehensive placeholder data
- [x] Navigation: Committees dropdown + all page links + Google Calendar icon
- [x] Blue abstract pinwheel logo applied throughout
- [x] All 10+ public pages fully designed and functional
- [x] Admin panel: Login + full CRUD for all content types
- [x] Responsive navbar with mobile Sheet menu
- [x] Footer with quick links, social media, copyright

### Phase 2 (Dec 2025)
- [x] Minor name corrected to "HEALTHCARE REFORM & INNOVATION"
- [x] Google Calendar icon in navigation
- [x] Hero section cleaned (removed floating icons)
- [x] Logo zoomed to 420%
- [x] Consulting page: horizontal scroll with arrow navigation
- [x] Outreach page: Marketing Chairs section
- [x] Expansion page: Expansion Chairs + static chapters + Texas map

### Phase 3 (Feb 2026 - Latest Session)
- [x] Admin panel file upload system (react-dropzone + /api/upload endpoint)
- [x] Custom Texas SVG map with chapter markers on Expansion page
- [x] Custom Instagram feed display on Gallery page (API-free, links to @tx_bha)
- [x] Consulting page: both Ongoing and Completed projects with horizontal scrolling
- [x] Team management: Marketing Chair and Expansion Chair categories
- [x] "Est. 2019" on homepage hero section
- [x] Team page: displays all 4 categories (Executive Board, Marketing Chair, Expansion Chair, Committee Leads)

### Verification (Feb 23, 2026)
- [x] Instagram link verified: https://www.instagram.com/tx_bha/
- [x] "Est. 2019" confirmed on homepage, not on Chapters page
- [x] Rachel Adams → Marketing Chair, Michael Chang → Expansion Chair (fixed)
- [x] Team page updated to show all role-based sections
- [x] Full e2e testing: Backend 100%, Frontend 100%

## Testing Results
- Backend: 100% (19/19 API tests passing)
- Frontend: 100% (all pages, navigation, admin verified)
- Test report: /app/test_reports/iteration_4.json

## Admin Credentials
- Email: admin@texasbha.org
- Password: TexasBHA2024!

## Key API Endpoints
- /api/team, /api/projects, /api/chapters, /api/committees
- /api/newsletters, /api/announcements, /api/gallery
- /api/admin/* (CRUD, requires JWT)
- /api/upload (POST, file upload)
- /api/uploads/{filename} (GET, serve uploaded files)

## Prioritized Backlog

### P1 (Next Up)
- SEO meta tags per page
- Animated scroll-into-view effects

### P2 (Future)
- Downloadable PDF functionality for Policy & Research page
- Live X/Twitter feed integration on Gallery page
- Email notifications for contact form submissions
- Admin password change
- Analytics dashboard for admin
- Advanced chapter map with real geo coordinates

### Refactoring
- TexasMap.js: Move CSS-positioned markers to SVG-native rendering
- ChaptersPage.js: Break down large file into smaller components
- Logo styling: Replace mix-blend-mode workaround with clean SVG/PNG
