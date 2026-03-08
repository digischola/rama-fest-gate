

## Śrī Rāma Navamī 2026 — Registration Landing Page

A single-page React + Tailwind + shadcn/ui registration site faithfully recreating the uploaded HTML design with all content, layout, colors, and interactions.

### Structure
One main page built from these component sections, in order:

1. **Top Ribbon** — Fixed navy gradient bar with gold "Limited Seats" text and pink CTA link
2. **Sticky Nav** — Glassmorphism navbar (cream 92% opacity + blur), shadow on scroll, logo + links + pink "Register Free" button. Desktop links hidden on tablet/mobile.
3. **Hero Section** — Navy gradient background with decorative SVG pattern. Two-column layout: left has eyebrow text, title, description, event meta (date/time/venue with gold icon circles), live countdown timer (pills with gold numbers), and registration count. Right has the Lord Rama painting (image 13) with gold frame border effect. Below: centered white registration card with form.
4. **Social Proof Strip** — White bar with 3 icon chips (500+ celebrated, Free Prasādam, Family-friendly)
5. **What to Expect** — 3-column grid of 6 cards, each with photo, title, description. Uses uploaded images per your mapping.
6. **Gallery** — Horizontal scrollable strip of 6 photos with snap scrolling and gold scrollbar
7. **Schedule** — Vertical timeline with gold/navy gradient line, dots, highlight items with pink tags, plus fasting guidance card
8. **About Lord Rāma** — Two-column editorial: left has image with dark overlay + Sanskrit text, right has paragraphs + "Read more" toggle to expand/collapse
9. **Sevā (Donation)** — Horizontally scrollable cards with gold icon, title, description, outline button
10. **Volunteer Banner** — Navy gradient two-column: left image, right text + pink CTA
11. **Location** — Two-column: Google Maps embed + venue info with directions button
12. **Share Section** — WhatsApp, Telegram, Add to Calendar, Copy Link buttons
13. **Final CTA** — Full-width with background image (image 1) + heavy navy overlay, pink CTA button
14. **Footer** — Navy-deep background, logo, copyright, links
15. **Mobile Sticky Bar** — Fixed bottom pink CTA, visible only ≤768px

### Design System
- **Colors**: Exact CSS variables from HTML (navy, pink, gold, cream, etc.)
- **Fonts**: Google Fonts — Playfair Display for headings, Source Sans Pro for body
- **Icons**: Lucide React icons (replacing Font Awesome equivalents)
- **Patterns**: Pink buttons for all CTAs, gold accents/dividers, white cards with subtle shadows, hover translateY(-2px), 50px gold dividers under section titles

### Functionality
- **Countdown Timer**: Live updating every second to March 26, 2026 18:00 SGT
- **Registration Form**: Client-side only — on submit, hide form, show success state with green check, increment counter
- **Read More Toggle**: Expand/collapse extra paragraphs in About section
- **Nav Scroll Shadow**: Add shadow class on scroll > 10px
- **Copy Link**: Clipboard API, show "Copied!" for 2 seconds
- **Add to Calendar**: Generate and download .ics file
- **Smooth Scroll**: All anchor links scroll smoothly
- **Responsive**: Breakpoints at 1024px, 768px, 480px matching the HTML media queries

### Images
- All 10 uploaded images copied to src/assets and imported in components
- 3 missing images (drama, feast, volunteer) will use placeholder styling until provided

