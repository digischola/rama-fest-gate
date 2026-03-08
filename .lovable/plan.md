

## UX/UI Enhancement Plan — 10/10 Experience

After reviewing the full page, here are the high-impact improvements grouped by category:

### 1. Scroll-Triggered Reveal Animations (Intersection Observer)
Currently every section just exists statically. Adding staggered fade-up animations as sections enter the viewport creates a polished, modern feel.

- **Custom `useInView` hook** using Intersection Observer API (no extra dependencies)
- **Section headers**: fade-up with 0.4s delay
- **What to Expect cards**: staggered fade-up (each card delayed by 100ms)
- **Timeline items**: slide-in-from-left with stagger
- **Gallery images**: scale-in on scroll
- **Seva cards**: fade-up with stagger
- **Social proof chips**: pop-in with stagger
- **Registration card**: subtle scale-in

### 2. Micro-Interactions & Polish
- **Countdown timer**: digit flip/pulse animation when numbers change (brief scale bounce on the changing digit)
- **Registration button**: subtle pulse/glow animation to draw attention (CSS keyframe `pulse-glow` on the pink CTA)
- **Form inputs**: smooth label float animation on focus (transform the label up with color change)
- **Nav links**: underline slide-in effect on hover (CSS `::after` pseudo-element)
- **Gallery**: add left/right scroll arrow buttons for desktop (not just drag-to-scroll)
- **"Read more" toggle**: smooth height transition instead of instant show/hide (CSS `max-height` + `overflow:hidden` transition)
- **Back to top button**: floating button that appears after scrolling past hero

### 3. Social Proof & Urgency (Conversion Optimization)
- **Live registration counter animation**: count-up animation when the number enters viewport (animate from 0 to 127)
- **Urgency badge**: pulsing dot on "Limited Seats" ribbon
- **Testimonial/quote strip**: a small rotating quote from past attendees below social proof (adds credibility)
- **Registration form progress indicator**: small dots or step indicator showing "almost done" feel
- **Success state enhancement**: confetti-like particle burst on successful registration (CSS-only particles)

### 4. Mobile-Specific UX Improvements
- **Hamburger menu**: slide-out mobile nav drawer with all links (currently hidden on mobile with no alternative)
- **Sticky CTA bar enhancement**: add a subtle progress bar showing scroll depth, and pulse the CTA when user reaches mid-page
- **Touch-friendly gallery**: add dot indicators below gallery strip showing current position
- **Form**: larger touch targets (min 48px height inputs on mobile), auto-scroll to form on CTA click with offset for sticky bar
- **Bottom sheet registration**: on mobile, tapping CTA could slide up a bottom sheet with the form instead of scrolling

### 5. Performance & Visual Refinements
- **Image lazy loading with blur-up placeholders**: show a blurred low-res version while full image loads (CSS `filter: blur` with `onLoad` transition)
- **Parallax on hero background**: subtle parallax scroll on the decorative SVG pattern
- **Card hover states**: add subtle border-gold glow on What to Expect cards
- **Smooth gradient transitions** between sections (overlap gradients slightly)
- **Typography rhythm**: slightly larger line-heights on mobile for readability

### 6. Accessibility & Trust
- **Focus ring styles**: visible, branded focus rings on all interactive elements
- **Skip to content link**: hidden skip link for keyboard users
- **ARIA labels**: on icon-only buttons and decorative elements
- **Form validation UX**: inline validation with green checkmarks as fields are completed (real-time feedback)

---

### Implementation Approach

**New files:**
- `src/hooks/useInView.ts` — Intersection Observer hook for scroll animations
- `src/components/MobileNav.tsx` — hamburger menu drawer component
- `src/components/ScrollToTop.tsx` — back-to-top floating button
- `src/components/CountUp.tsx` — animated counter component
- `src/components/GalleryControls.tsx` — arrow buttons + dot indicators for gallery

**Modified files:**
- `src/pages/Index.tsx` — wrap sections with animation wrappers, add micro-interactions, mobile nav, gallery controls, form validation UX, confetti success state, animated counter
- `src/index.css` — add keyframes for `pulse-glow`, `fade-up`, `slide-in-left`, `count-up`, blur-up placeholder, nav link underline hover, smooth read-more transition, confetti particles
- `tailwind.config.ts` — add new animation keyframes and utility classes

**No new dependencies** — all animations via CSS keyframes + Intersection Observer API. Uses existing shadcn Sheet component for mobile nav drawer.

### Priority for Conversion (Form Fills)
The highest-impact changes for getting the form filled:
1. Pulsing glow on all pink CTA buttons (constant subtle attention)
2. Mobile hamburger nav so users can always find "Register"
3. Animated count-up on registration counter (social proof)
4. Inline form validation with green checks (reduces friction)
5. Confetti success state (delightful completion)
6. Scroll-reveal animations (professional credibility)

