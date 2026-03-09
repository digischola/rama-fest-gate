import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Calendar, Clock, MapPin, Flame, Users, UtensilsCrossed, Baby,
  Ticket, ShieldCheck, Check, Info, Droplets, Soup, Sprout, Fan, Heart,
  HandHelping, Phone, Train, Bus, Navigation, MessageCircle, Send,
  CalendarPlus, Link as LinkIcon, ArrowUp, ChevronLeft, ChevronRight
} from "lucide-react";

import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";
import img9 from "@/assets/9.jpg";
import img10 from "@/assets/10.jpg";
import img11 from "@/assets/11.jpg";
import imgLogo from "@/assets/logo.jpg";
import img13 from "@/assets/13.png";
import imgPrasadam from "@/assets/prasadam.png";
import imgAbhisheka from "@/assets/abhisheka_seva.jpg";
import imgAlankara from "@/assets/alankara.jpg";
import imgAnnadanam from "@/assets/annadanam.jpg";
import imgCharity from "@/assets/charity.jpg";
import imgPushpa from "@/assets/pushpa_seva.jpg";

import { AnimateIn } from "@/components/AnimateIn";
import { CountUp } from "@/components/CountUp";
import { MobileNav } from "@/components/MobileNav";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* ═══════════════════════════════════════
   COUNTDOWN HOOK
   ═══════════════════════════════════════ */
const TARGET = new Date("2026-03-26T18:00:00+08:00").getTime();

function useCountdown() {
  const calc = () => {
    const diff = TARGET - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
    return {
      d: Math.floor(diff / 864e5),
      h: Math.floor((diff % 864e5) / 36e5),
      m: Math.floor((diff % 36e5) / 6e4),
      s: Math.floor((diff % 6e4) / 1e3),
      done: false,
    };
  };
  const [t, setT] = useState(calc);
  const [prev, setPrev] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(t);
      setT(calc);
    }, 1000);
    return () => clearInterval(id);
  }, [t]);

  return { ...t, prev };
}

/* ═══════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════ */
function downloadICS() {
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20260326T100000Z\nDTEND:20260326T133000Z\nSUMMARY:Śrī Rāma Navamī 2026 at ISKM Singapore\nDESCRIPTION:Grand celebration with Abhisheka, Kirtana, Ramayana Drama & free Prasadam.\nLOCATION:No.9 Lorong 29 Geylang #03-02 Singapore 388065\nURL:https://srikrishnamandir.org/festival/sri-rama-navami-2026/\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([ics], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "rama-navami-2026.ics";
  a.click();
}

/* Confetti generator */
function Confetti() {
  const colors = ["hsl(var(--gold))", "hsl(var(--pink))", "hsl(var(--gold-light))", "hsl(var(--pink-light))", "hsl(var(--navy))"];
  return (
    <div className="confetti-container">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 40}%`,
            background: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.8}s`,
            animationDuration: `${1 + Math.random() * 1}s`,
          }}
        />
      ))}
    </div>
  );
}

/* Rotating testimonials */
const testimonials = [
  { text: "\"A truly divine experience — the kīrtana was soul-stirring!\"", author: "— Priya, attended 2025" },
  { text: "\"The prasādam was amazing and the drama brought tears to my eyes.\"", author: "— Ravi K., attended 2024" },
  { text: "\"My children loved it. We come back every year without fail.\"", author: "— Lakshmi S., attended 2025" },
];

function RotatingTestimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-12 flex items-center justify-center overflow-hidden">
      <div key={idx} className="testimonial-rotate text-center">
        <p className="text-sm italic text-text-muted-custom">{testimonials[idx].text}</p>
        <p className="text-xs text-navy-2 font-semibold mt-0.5">{testimonials[idx].author}</p>
      </div>
    </div>
  );
}

/* Blur-up image */
function BlurImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={`img-blur-up ${loaded ? "loaded" : ""} ${className || ""}`}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
export default function Index() {
  const countdown = useCountdown();
  const [registered, setRegistered] = useState(false);
  const [spots, setSpots] = useState(127);
  const [navScrolled, setNavScrolled] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [copyText, setCopyText] = useState("Copy Link");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendees, setAttendees] = useState("2");
  const [volunteer, setVolunteer] = useState("no");

  // Gallery carousel
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, [autoplayPlugin.current]);
  const [galCanPrev, setGalCanPrev] = useState(true);
  const [galCanNext, setGalCanNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setGalCanPrev(emblaApi.canScrollPrev());
      setGalCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 10);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleRegister = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setRegistered(true);
      setSpots((s) => s + 1);
    },
    []
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyText("Copied!");
      setTimeout(() => setCopyText("Copy Link"), 2000);
    });
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollGalleryPrev = () => emblaApi?.scrollPrev();
  const scrollGalleryNext = () => emblaApi?.scrollNext();

  // Form validation helpers
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const filledFields = [isNameValid, isEmailValid].filter(Boolean).length;
  const formProgress = Math.round(((filledFields + 1) / 3) * 100); // +1 for attendees which has default

  /* ─── data ─── */
  const expectCards = [
    { img: img5, title: "Sacred Abhiṣeka", desc: "Witness the grand bathing ceremony of the deities with milk, ghee, yogurt, and sanctified waters." },
    { img: img6, title: "Divine Kīrtana", desc: "Join heart-stirring congregational chanting that fills the temple with spiritual vibrations." },
    { img: img9, title: "Rāmāyaṇa Drama", desc: "Watch a captivating theatrical performance depicting the glories of Lord Rāma's pastimes." },
    { img: imgPrasadam, title: "Blessed Prasādam", desc: "Relish sanctified vegetarian food offered to the Lord — served free to all attendees." },
    { img: img3, title: "Spiritual Discourse", desc: "Hear inspiring insights on the significance of Rāma Navamī and the teachings of the Rāmāyaṇa." },
    { img: img8, title: "Community & Family", desc: "Bring the whole family for children's performances, book stalls, and a warm atmosphere." },
  ];

  const galleryImgs = [
    { src: img1, alt: "Deities with white flower garlands" },
    { src: img2, alt: "Decorated altar with colorful flowers" },
    { src: img7, alt: "Close-up of deities with fruit garlands" },
    { src: img4, alt: "Sacred Shaligrama puja" },
    { src: img3, alt: "Full altar view with decorations" },
    { src: img9, alt: "Ramayana drama on stage" },
  ];

  const timeline = [
    { time: "6:00 – 6:30 PM", title: "Ārati & Opening Kīrtana", desc: "Evening worship ceremony with congregational chanting to set the devotional atmosphere", highlight: false },
    { time: "6:30 – 7:30 PM", title: "Grand Abhiṣeka & Kīrtana", tag: "Highlight", desc: "The sacred bathing ceremony of the deities — the centrepiece of the evening celebration", highlight: true },
    { time: "7:30 – 7:45 PM", title: "Rāma Navamī Address", desc: "Spiritual insights on Lord Rāma's appearance and teachings by the Temple President", highlight: false },
    { time: "7:45 PM", title: "Prasādam is Served", tag: "Free Feast", desc: "Sanctified vegetarian feast for all attendees — come hungry, leave blessed", highlight: true },
    { time: "8:00 – 8:30 PM", title: "Children's Cultural Performance", desc: "Presentations and recitations by young devotees celebrating Rāma's glories", highlight: false },
    { time: "8:30 – 9:30 PM", title: "Rāmāyaṇa Drama", tag: "Grand Finale", desc: "A spectacular theatrical performance by the Vaikunta Players", highlight: true },
  ];

  const sevaCards = [
    { icon: <Droplets size={18} />, title: "Abhiṣeka Sevā", desc: "Sponsor the grand bathing ceremony with milk, ghee, yogurt & sacred waters", link: "https://srikrishnamandir.org/product/abhiseka-seva/", img: imgAbhisheka },
    { icon: <Soup size={18} />, title: "Annadānam Sevā", desc: "Feed the community — sponsor the special Rāma Navamī prasādam feast", link: "https://srikrishnamandir.org/product/sri-gaura-pur%E1%B9%87ima-annadanam-seva/", img: imgAnnadanam },
    { icon: <Sprout size={18} />, title: "Mandira Puṣpa Sevā", desc: "Help adorn the temple with flowers, mango leaves, and festive decorations", link: "https://srikrishnamandir.org/product/sri-gaura-pur%E1%B9%87ima-mandira-pu%E1%B9%A3pa-seva/", img: imgPushpa },
    { icon: <Fan size={18} />, title: "Puṣpa-Alaṅkāra", desc: "Contribute to exquisite flower garland decorations for the deities", link: "https://srikrishnamandir.org/product/sri-gaura-pur%E1%B9%87ima-pu%E1%B9%A3pa-ala%E1%B9%85kara-seva/", img: imgAlankara },
    { icon: <Heart size={18} />, title: "General Donation", desc: "Support the festival in any way that feels right for you", link: "https://srikrishnamandir.org/product/sri-gaura-pur%E1%B9%87ima-outright-contribution/", img: imgCharity },
  ];

  return (
    <div className="min-h-screen">
      {/* Skip to content */}
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* ═══ RIBBON ═══ */}
      <div className="fixed top-0 left-0 right-0 z-[1001] bg-gradient-to-br from-navy-deep to-navy text-white text-center py-2.5 px-5 text-[13px] font-semibold tracking-wide">
        <span className="text-gold"><span className="urgency-dot" /><Flame className="inline w-3.5 h-3.5 mr-1 -mt-0.5" /> Limited Seats</span>
        {" "}— Register free for Śrī Rāma Navamī 2026
        <a href="#register" onClick={scrollTo("register")} className="text-pink-light underline font-bold ml-2 hover:text-pink">Secure Your Spot →</a>
      </div>

      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-[37px] left-0 right-0 z-[1000] h-14 flex items-center justify-between px-4 md:px-[30px] border-b border-navy/[0.06] transition-shadow duration-300 backdrop-blur-[16px] ${navScrolled ? "shadow-[0_2px_20px_rgba(30,58,110,0.08)]" : ""}`} style={{ background: "hsla(30, 75%, 96%, 0.92)" }}>
        <a href="#" className="flex items-center gap-2.5 font-display text-lg font-bold text-navy no-underline">
          <img src={imgLogo} alt="ISKM" className="h-8 rounded-full" />
          <span className="hidden sm:inline">ISKM Singapore</span>
        </a>
        <div className="flex items-center gap-0 md:gap-[26px]">
          <a href="#expect" onClick={scrollTo("expect")} className="hidden lg:block text-[13px] font-semibold text-text-dark tracking-wide hover:text-navy no-underline nav-link-hover">What's On</a>
          <a href="#schedule" onClick={scrollTo("schedule")} className="hidden lg:block text-[13px] font-semibold text-text-dark tracking-wide hover:text-navy no-underline nav-link-hover">Schedule</a>
          <a href="#about" onClick={scrollTo("about")} className="hidden lg:block text-[13px] font-semibold text-text-dark tracking-wide hover:text-navy no-underline nav-link-hover">About</a>
          <a href="#location" onClick={scrollTo("location")} className="hidden lg:block text-[13px] font-semibold text-text-dark tracking-wide hover:text-navy no-underline nav-link-hover">Venue</a>
          <a href="#register" onClick={scrollTo("register")} className="hidden sm:inline-block bg-pink text-navy py-2 px-[22px] rounded-md font-bold text-[13px] hover:bg-pink-light hover:-translate-y-px transition-all no-underline cta-glow">Register Free</a>
          <MobileNav />
        </div>
      </nav>

      {/* Scroll progress bar */}
      <div className="fixed top-[37px] left-0 right-0 z-[1001] h-[3px]">
        <div className="scroll-progress h-full" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      </div>

      {/* ═══ HERO ═══ */}
      <section id="main-content" className="mt-[93px] relative overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(var(--navy-deep)) 0%, hsl(var(--navy)) 40%, hsl(var(--navy-2)) 100%)" }}>
        {/* Decorative SVG pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23f4c96b' stop-opacity='0.06'/%3E%3Cstop offset='100%25' stop-color='%23f4c96b' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='400' cy='400' r='350' fill='url(%23g1)'/%3E%3Cg fill='none' stroke='%23f4c96b' stroke-width='0.4' opacity='0.1'%3E%3Ccircle cx='400' cy='400' r='150'/%3E%3Ccircle cx='400' cy='400' r='220'/%3E%3Ccircle cx='400' cy='400' r='290'/%3E%3C/g%3E%3C/svg%3E") center/80% no-repeat`
        }} />

        {/* Hero top: text + painting */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] max-w-[1200px] mx-auto px-5 md:px-[30px] lg:px-[50px] pt-[30px] md:pt-[40px] lg:pt-[50px] relative z-[2] items-center text-center lg:text-left">
          <div className="text-white flex flex-col items-center lg:items-start lg:pr-10">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[2.5px] uppercase text-gold mb-[18px]">
              <span className="w-[30px] h-[1.5px] bg-gold hidden sm:block" />
              ISKM Singapore Presents
            </div>
            <h1 className="text-[clamp(1.85rem,4vw,3rem)] font-bold leading-[1.12] mb-3.5 text-white">
              Śrī Rāma Navamī <span className="text-gold">2026</span>
            </h1>
            <p className="text-sm md:text-[15px] font-light leading-[1.7] opacity-[0.88] max-w-[440px] mb-[22px]">
              Celebrate the divine appearance of Lord Rāma — an evening of grand Abhiṣeka, soul-stirring Kīrtana, captivating drama, and blessed Prasādam.
            </p>
            <div className="flex flex-col gap-2 mb-6 items-center lg:items-start">
              {[
                { icon: <Calendar size={12} />, text: "Thursday, 26th March 2026" },
                { icon: <Clock size={12} />, text: "6:00 PM – 9:30 PM" },
                { icon: <MapPin size={12} />, text: "No.9 Lorong 29 Geylang, #03-02" },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white">
                  <div className="w-8 h-8 rounded-full bg-gold/[0.12] flex items-center justify-center text-gold">{m.icon}</div>
                  <span>{m.text}</span>
                </div>
              ))}
            </div>
            {/* Countdown with digit pulse */}
            <div className="flex gap-1.5 sm:gap-2 mb-2 justify-center lg:justify-start">
              {countdown.done ? (
                <div className="text-gold text-[17px] font-semibold">The celebration is happening now!</div>
              ) : (
                [
                  { n: countdown.d, p: countdown.prev.d, l: "Days" },
                  { n: countdown.h, p: countdown.prev.h, l: "Hours" },
                  { n: countdown.m, p: countdown.prev.m, l: "Mins" },
                  { n: countdown.s, p: countdown.prev.s, l: "Secs" },
                ].map((c, i) => (
                  <div key={i} className="bg-white/[0.06] border border-gold/20 rounded-lg py-[6px] sm:py-[7px] px-2.5 sm:px-3 min-w-[52px] sm:min-w-[56px] text-center">
                    <div
                      key={c.n}
                      className={`font-display text-[20px] sm:text-[22px] font-bold text-gold leading-none ${c.n !== c.p ? "digit-change" : ""}`}
                    >
                      {c.n}
                    </div>
                    <div className="text-[9px] uppercase tracking-[1px] opacity-50 mt-0.5">{c.l}</div>
                  </div>
                ))
              )}
            </div>
            <p className="text-xs opacity-60 mt-1">
              <strong className="text-gold opacity-100"><CountUp end={spots} className="tabular-nums" /> people</strong> have registered so far
            </p>
          </div>

          {/* Painting */}
          <div className="relative w-[200px] sm:w-[240px] md:w-[280px] lg:w-[340px] flex-shrink-0 mx-auto lg:mx-0 mt-[30px] lg:mt-0">
            <div className="absolute -inset-[6px] border-2 border-gold/20 rounded-[20px] pointer-events-none" />
            <div className="absolute -inset-[12px] border border-gold/[0.08] rounded-[24px] pointer-events-none" />
            <img src={img13} alt="Traditional painting of Lord Śrī Rāma" className="w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(244,201,107,0.15)] block" loading="eager" />
          </div>
        </div>

        <div className="pb-[35px] md:pb-[40px] lg:pb-[50px]" />
      </section>

      {/* ═══ REGISTRATION FORM (separate section) ═══ */}
      <div id="register" className="py-[40px] md:py-[60px] px-4 md:px-5" style={{ background: "linear-gradient(180deg, hsl(var(--cream-warm)), hsl(var(--cream)))" }}>
        <div className="max-w-[520px] mx-auto">
          <AnimateIn animation="scale-in">
            <div className="bg-white rounded-2xl p-6 sm:p-[28px] w-full shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              {!registered ? (
                <>
                  <div className="text-center mb-[18px]">
                    <span className="inline-block bg-gold/[0.12] text-navy text-xs font-bold py-1 px-3.5 rounded-[20px] mb-2 border border-gold/30">
                      <Ticket className="inline w-3 h-3 mr-1 -mt-0.5" /> Free Entry
                    </span>
                    <h3 className="text-xl text-navy mb-1">Reserve Your Seat</h3>
                    <p className="text-[13px] text-text-muted-custom">Fill in below to register for the celebration</p>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className={`w-2 h-2 rounded-full transition-all duration-300 ${step <= filledFields + 1 ? "bg-gold scale-110" : "bg-border"}`} />
                      ))}
                      <span className="text-[10px] text-text-muted-custom ml-1.5">Almost there!</span>
                    </div>
                  </div>
                  <form onSubmit={handleRegister}>
                    <div className="mb-3 relative">
                      <label className="block text-xs font-semibold text-text-dark mb-1 tracking-wide">Full Name *</label>
                      <input type="text" placeholder="Your full name" required value={name} onChange={(e) => setName(e.target.value)}
                        className={`w-full py-3 md:py-2.5 px-3.5 border-[1.5px] border-[#e5ded5] rounded-lg font-body text-sm text-text-dark bg-cream outline-none transition-all focus:border-navy focus:shadow-[0_0_0_3px_rgba(30,58,110,0.08)] placeholder:text-[#b5aea5] ${isNameValid ? "input-valid" : ""}`} />
                      {isNameValid && <Check className="absolute right-3 top-[34px] w-4 h-4 text-green" />}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="relative">
                        <label className="block text-xs font-semibold text-text-dark mb-1 tracking-wide">Email *</label>
                        <input type="email" placeholder="you@email.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                          className={`w-full py-3 md:py-2.5 px-3.5 border-[1.5px] border-[#e5ded5] rounded-lg font-body text-sm text-text-dark bg-cream outline-none transition-all focus:border-navy focus:shadow-[0_0_0_3px_rgba(30,58,110,0.08)] placeholder:text-[#b5aea5] ${isEmailValid ? "input-valid" : ""}`} />
                        {isEmailValid && <Check className="absolute right-3 top-[34px] w-4 h-4 text-green" />}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-text-dark mb-1 tracking-wide">Phone</label>
                        <input type="tel" placeholder="+65 XXXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)}
                          className="w-full py-3 md:py-2.5 px-3.5 border-[1.5px] border-[#e5ded5] rounded-lg font-body text-sm text-text-dark bg-cream outline-none transition-all focus:border-navy focus:shadow-[0_0_0_3px_rgba(30,58,110,0.08)] placeholder:text-[#b5aea5]" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-text-dark mb-1 tracking-wide">Number of Attendees</label>
                      <select value={attendees} onChange={(e) => setAttendees(e.target.value)}
                        className="w-full py-3 md:py-2.5 px-3.5 border-[1.5px] border-[#e5ded5] rounded-lg font-body text-sm text-text-dark bg-cream outline-none transition-all focus:border-navy focus:shadow-[0_0_0_3px_rgba(30,58,110,0.08)]">
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5+ People</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-semibold text-text-dark mb-1 tracking-wide">Would you like to volunteer?</label>
                      <select value={volunteer} onChange={(e) => setVolunteer(e.target.value)}
                        className="w-full py-3 md:py-2.5 px-3.5 border-[1.5px] border-[#e5ded5] rounded-lg font-body text-sm text-text-dark bg-cream outline-none transition-all focus:border-navy focus:shadow-[0_0_0_3px_rgba(30,58,110,0.08)]">
                        <option value="no">No, just attending</option>
                        <option value="yes">Yes, I'd love to help!</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-pink text-navy border-none rounded-lg font-body text-[15px] font-bold cursor-pointer transition-all tracking-wide mt-1 hover:bg-pink-light hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(248,164,192,0.35)] cta-glow">
                      Register Now — It's Free
                    </button>
                    <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-text-muted-custom">
                      <ShieldCheck className="w-3 h-3 text-green" />
                      <span>No payment required · We'll send a confirmation email</span>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-[30px] px-2.5 relative overflow-hidden">
                  <Confetti />
                  <div className="w-[60px] h-[60px] bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-[1]">
                    <Check className="w-7 h-7 text-green" />
                  </div>
                  <h3 className="text-[22px] text-navy mb-2 relative z-[1]">You're Registered!</h3>
                  <p className="text-sm text-text-muted-custom leading-relaxed relative z-[1]">We've saved your spot for Śrī Rāma Navamī 2026. A confirmation email will be sent shortly.</p>
                </div>
              )}
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ═══ SOCIAL PROOF ═══ */}
      <div className="bg-white border-b border-black/[0.04] py-[18px] px-5">
        <div className="max-w-[1100px] mx-auto flex justify-center items-center gap-3 sm:gap-10 flex-col sm:flex-row flex-wrap">
          {[
            { icon: <Users size={13} />, cls: "bg-gold/[0.15] text-navy", text: <><strong className="text-navy font-bold"><CountUp end={500} suffix="+" /></strong> celebrated last year</> },
            { icon: <UtensilsCrossed size={13} />, cls: "bg-pink/[0.12] text-navy", text: <><strong className="text-navy font-bold">Free Prasādam</strong> for everyone</> },
            { icon: <Baby size={13} />, cls: "bg-green/10 text-green", text: <><strong className="text-navy font-bold">Family-friendly</strong> all ages welcome</> },
          ].map((p, i) => (
            <AnimateIn key={i} animation="pop-in" delay={i * 150}>
              <div className="flex items-center gap-2.5 text-sm text-text-dark">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center ${p.cls}`}>{p.icon}</span>
                <span>{p.text}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
        {/* Rotating testimonials */}
        <div className="max-w-[600px] mx-auto mt-3">
          <RotatingTestimonials />
        </div>
      </div>

      {/* ═══ ABOUT LORD RAMA (Significance) ═══ */}
      <div id="about" className="py-[50px] md:py-[70px] px-5" style={{ background: "linear-gradient(180deg, hsl(var(--cream-warm)), hsl(var(--cream)))" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[50px] items-center">
          <AnimateIn animation="fade-up">
            <div className="relative rounded-2xl overflow-hidden aspect-auto md:aspect-[4/5] min-h-[300px]">
              <BlurImage src={img7} alt="Deities of Lord Rama, Sita, and Lakshmana at ISKM" className="w-full h-full object-cover block" loading="lazy" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-10 text-center" style={{ background: "linear-gradient(180deg, rgba(22,45,88,0.3), rgba(22,45,88,0.75))" }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[90px] font-bold text-gold/[0.08] leading-none whitespace-nowrap">श्रीराम</div>
                <div className="font-display text-2xl font-semibold leading-[1.4] mb-3 text-gold relative z-[1]">श्रीरामचन्द्राय नमः</div>
                <p className="text-[13px] text-white/80 leading-[1.7] max-w-[280px] font-body relative z-[1]">Obeisances unto Lord Śrī Rāmacandra — the embodiment of dharma, compassion, and divine grace.</p>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn animation="fade-up" delay={150}>
            <div>
              <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-navy-2 mb-3 font-body">The Significance</div>
              <h2 className="text-[30px] text-navy mb-[18px] leading-[1.2]">Who is Lord Śrī Rāma?</h2>
              <p className="text-[15px] text-text-dark leading-[1.8] mb-3.5">
                Śrī Rāma Navamī celebrates the appearance of Lord Śrī Rāmacandra — the seventh incarnation of the Supreme Lord Viṣṇu. Born as the eldest son of King Daśaratha and Queen Kauśalyā in the Solar dynasty at Ayodhyā, He descended to establish dharma and exemplify the ideal of righteous living.
              </p>
              <p className="text-[15px] text-text-dark leading-[1.8] mb-3.5">
                Lord Rāma's life, as narrated in the epic Rāmāyaṇa by sage Vālmīki, embodies truth, honour, devotion, and selfless love. His name itself is considered a great mantra — simply chanting "Rāma" purifies the heart and brings peace.
              </p>
              <button onClick={() => setReadMore(!readMore)} className="text-navy-2 font-bold cursor-pointer border-none bg-transparent font-body text-sm p-0 hover:underline">
                {readMore ? "Show less ↑" : "Read more about the festival ↓"}
              </button>
              <div className={`read-more-content ${readMore ? "open" : ""} mt-2.5`}>
                <p className="text-[15px] text-text-dark leading-[1.8] mb-3.5">
                  Rāma Navamī falls on the ninth day (navamī) of the bright fortnight (Śukla Pakṣa) of the month of Caitra. According to the Vedic calendar, Lord Rāma appeared at noon — in the Madhyāhna period — which is why the main worship and celebrations take place during midday and evening.
                </p>
                <p className="text-[15px] text-text-dark leading-[1.8] mb-3.5">
                  At ISKM, we celebrate this sacred occasion with a grand evening program that includes the sacred bathing ceremony (Abhiṣeka) of the deities, soul-stirring congregational chanting (kīrtana), a dramatic performance of the Rāmāyaṇa, and a sumptuous feast of sanctified vegetarian food (prasādam) served free to all.
                </p>
                <p className="text-[15px] text-text-dark leading-[1.8]">
                  Srila Prabhupada, the founder-ācārya, taught that Lord Rāma's mission was identical to Lord Kṛṣṇa's — to re-establish dharma and attract all living beings back to their eternal, loving relationship with the Supreme.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ═══ WHAT TO EXPECT ═══ */}
      <div id="expect" className="py-[50px] md:py-[70px] px-4 md:px-5 max-w-[1100px] mx-auto">
        <AnimateIn animation="fade-up">
          <SectionHeader overline="What Awaits You" title="An Evening of Devotion & Joy" sub="Experience the spiritual grandeur of Lord Rāma's appearance celebration" />
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {expectCards.map((c, i) => (
            <AnimateIn key={i} animation="fade-up" delay={i * 100}>
              <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)] card-hover-glow">
                <BlurImage src={c.img} alt={c.title} className="w-full h-[190px] object-cover block" loading="lazy" />
                <div className="p-[20px_20px] text-center">
                  <h3 className="text-[17px] mb-1.5">{c.title}</h3>
                  <p className="text-[13px] text-text-muted-custom leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* ═══ GALLERY (Embla Carousel) ═══ */}
      <div className="px-4 md:px-5 max-w-[1100px] mx-auto pb-[50px] md:pb-[70px]">
        <AnimateIn animation="fade-up">
          <SectionHeader overline="Past Celebrations" title="Glimpses from Our Temple" sub="Real moments from ISKM Singapore celebrations" />
        </AnimateIn>
        <div className="relative">
          <button
            onClick={scrollGalleryPrev}
            className="absolute -left-1 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-none cursor-pointer hover:bg-cream transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-navy" />
          </button>
          <button
            onClick={scrollGalleryNext}
            className="absolute -right-1 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-none cursor-pointer hover:bg-cream transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-navy" />
          </button>
          <div ref={emblaRef} className="overflow-hidden rounded-xl mx-6 md:mx-8">
            <div className="flex">
              {galleryImgs.map((g, i) => (
                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 px-2">
                  <BlurImage
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="w-full h-[250px] md:h-[280px] object-cover rounded-xl transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SCHEDULE ═══ */}
      <div id="schedule" className="py-[50px] md:py-[70px] px-4 md:px-5 max-w-[1100px] mx-auto">
        <AnimateIn animation="fade-up">
          <SectionHeader overline="Program Schedule" title="Thursday, 26 March 2026" sub="6:00 PM onwards · All timings are approximate" />
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <div className="bg-white rounded-2xl p-[28px_22px] md:p-[45px_50px] shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
            <div className="relative pl-10">
              {/* Timeline line */}
              <div className="absolute left-[14px] top-2.5 bottom-2.5 w-0.5 rounded-sm" style={{ background: "linear-gradient(to bottom, hsl(var(--gold)), hsl(var(--navy)))" }} />
              {timeline.map((t, i) => (
                <AnimateIn key={i} animation="slide-left" delay={i * 120}>
                  <div className={`relative pb-[30px] pl-[30px] last:pb-0`}>
                    <div className={`absolute -left-[33px] top-1 w-3 h-3 rounded-full border-[2.5px] border-gold ${t.highlight ? "bg-gold shadow-[0_0_0_4px_rgba(244,201,107,0.2)]" : "bg-cream"}`} />
                    <div className="text-[13px] font-bold text-navy-2 mb-0.5">{t.time}</div>
                    <h4 className="text-[17px] text-navy mb-0.5">
                      {t.title}
                      {t.tag && (
                        <span className="inline-block bg-pink/[0.12] text-navy text-[10px] font-bold font-body py-0.5 px-2.5 rounded-[10px] uppercase tracking-[0.5px] ml-2 align-middle">
                          {t.tag}
                        </span>
                      )}
                    </h4>
                    <p className="text-[13px] text-text-muted-custom leading-[1.5]">{t.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </AnimateIn>
        {/* Fasting card */}
        <AnimateIn animation="fade-up" delay={200}>
          <div className="bg-white rounded-xl border-l-4 border-l-gold p-[22px_26px] flex gap-3.5 items-start max-w-[700px] mx-auto mt-[30px] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <Info className="text-gold mt-0.5 flex-shrink-0" size={18} />
            <p className="text-sm text-text-dark leading-relaxed">
              <strong className="text-navy">Fasting Guidance:</strong> Devotees traditionally fast until noon on Rāma Navamī and then take only fruit and milk. After the madhyāhna period, the fast may be broken with Ekādaśī-style prasādam. If you're new to this, simply come and enjoy — no fasting is required to attend.
            </p>
          </div>
        </AnimateIn>
      </div>


      {/* ═══ SEVA / DONATION ═══ */}
      <div id="donate" className="py-[50px] md:py-[70px] px-4 md:px-5 max-w-[1100px] mx-auto">
        <AnimateIn animation="fade-up">
          <SectionHeader overline="Support the Festival" title="Sevā Opportunities" sub="Contribute to making this celebration possible for everyone" />
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sevaCards.map((c, i) => (
            <AnimateIn key={i} animation="fade-up" delay={i * 100}>
              <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 border-t-[3px] border-t-transparent hover:-translate-y-1 hover:border-t-gold h-full flex flex-col">
                <BlurImage src={c.img} alt={c.title} className="w-full h-[180px] object-cover block" loading="lazy" />
                <div className="p-[20px_24px] flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-9 h-9 rounded-[8px] bg-gold/[0.12] flex items-center justify-center text-navy flex-shrink-0">{c.icon}</div>
                    <h4 className="text-base text-navy">{c.title}</h4>
                  </div>
                  <p className="text-xs text-text-muted-custom leading-[1.5] mb-3.5 flex-1">{c.desc}</p>
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-block py-2 px-5 rounded-md text-[13px] font-bold no-underline border-[1.5px] border-gold text-navy transition-all hover:bg-gold self-start">Contribute</a>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* ═══ VOLUNTEER ═══ */}
      <div className="max-w-[1100px] mx-auto px-5 pb-[70px]">
        <AnimateIn animation="fade-up">
          <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[340px]" style={{ background: "linear-gradient(135deg, hsl(var(--navy)), hsl(var(--navy-deep)))" }}>
            <div className="min-h-[220px] md:min-h-[300px] overflow-hidden">
              <BlurImage src={img11} alt="Volunteers at ISKM Singapore" className="w-full h-full object-cover block" loading="lazy" />
            </div>
            <div className="p-[30px_22px] md:p-[45px_40px] flex flex-col justify-center text-center md:text-left">
              <h2 className="text-[26px] text-white mb-2.5">Serve & Be Blessed</h2>
              <p className="text-[15px] text-white/75 leading-relaxed mb-[22px]">
                Volunteer for decorations, prasādam distribution, guest welcome, and more. Experience the joy of selfless service.
              </p>
              <a href="https://srikrishnamandir.org/volunteer/be-a-volunteer-sri-gaura-pur%e1%b9%87ima/" target="_blank" rel="noopener noreferrer" className="inline-block self-center md:self-start bg-pink text-navy py-3.5 px-8 rounded-lg no-underline font-bold text-[15px] transition-all hover:bg-pink-light hover:-translate-y-0.5 cta-glow">
                <HandHelping className="inline w-4 h-4 mr-1.5 -mt-0.5" /> Sign Up to Volunteer
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* ═══ LOCATION ═══ */}
      <div id="location" className="py-[50px] md:py-[70px] px-4 md:px-5 max-w-[1100px] mx-auto">
        <AnimateIn animation="fade-up">
          <SectionHeader overline="Venue" title="How to Get Here" />
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_24px_rgba(0,0,0,0.04)] grid grid-cols-1 md:grid-cols-2">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7843!2d103.8873!3d1.3137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTgnNDkuMyJOIDEwM8KwNTMnMTQuMyJF!5e0!3m2!1sen!2ssg!4v1"
                className="w-full h-full min-h-[240px] md:min-h-[340px] border-0"
                allowFullScreen
                loading="lazy"
                title="ISKM Singapore Map"
              />
            </div>
            <div className="p-[28px_22px] md:p-10 flex flex-col justify-center">
              <img src={imgLogo} alt="ISKM" className="h-[45px] w-[45px] rounded-full mb-3.5" />
              <h3 className="text-xl text-navy mb-[18px]">International Sri Krishna Mandir</h3>
              <div className="flex gap-3 mb-3 text-sm text-text-dark">
                <MapPin className="text-gold mt-0.5 flex-shrink-0" size={14} />
                <span>No. 9 Lorong 29 Geylang, #03-02<br />Singapore 388065</span>
              </div>
              <div className="flex gap-3 mb-3 text-sm text-text-dark">
                <Clock className="text-gold mt-0.5 flex-shrink-0" size={14} />
                <span>Thursday, 26 March 2026<br />6:00 PM – 9:30 PM</span>
              </div>
              <div className="flex gap-3 mb-3 text-sm text-text-dark">
                <Phone className="text-gold mt-0.5 flex-shrink-0" size={14} />
                <span>+(65) 6250 2280</span>
              </div>
              <div className="mt-[18px] pt-[18px] border-t border-black/[0.06]">
                <h4 className="text-[13px] font-bold text-text-dark mb-2 font-body">Getting Here</h4>
                <p className="text-[13px] text-text-muted-custom mb-1"><Train className="inline w-3 h-3 mr-1.5 text-gold" />Aljunied MRT (EW9) or Paya Lebar MRT (CC9/EW9)</p>
                <p className="text-[13px] text-text-muted-custom mb-1"><Bus className="inline w-3 h-3 mr-1.5 text-gold" />Bus 2, 13, 21, 26, 40, 51, 67 — Sims Ave (B10)</p>
              </div>
              <a href="https://maps.google.com/?q=No.9+Lorong+29+Geylang+%2303-02+Singapore+388065" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-[18px] bg-gold text-navy py-2.5 px-[22px] rounded-md no-underline text-[13px] font-bold transition-all hover:bg-gold-light self-start">
                <Navigation size={13} /> Get Directions
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* ═══ SHARE ═══ */}
      <div className="text-center py-[40px] md:py-[50px] px-5 max-w-[1100px] mx-auto">
        <AnimateIn animation="fade-up">
          <SectionHeader overline="Spread the Word" title="Invite Friends & Family" noMargin />
        </AnimateIn>
        <AnimateIn animation="fade-up" delay={100}>
          <div className="flex justify-center gap-2.5 flex-wrap mt-5">
            <a href="https://wa.me/?text=Join%20me%20for%20Sri%20Rama%20Navami%202026%20at%20ISKM%20Singapore%20on%20March%2026!%20Free%20entry%2C%20prasadam%20%26%20more.%20Register%3A%20https%3A%2F%2Fsrikrishnamandir.org%2Ffestival%2Fsri-rama-navami-2026%2F" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full no-underline text-[13px] font-semibold transition-transform hover:-translate-y-0.5 bg-[#25D366] text-white">
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a href="https://t.me/share/url?url=https://srikrishnamandir.org/festival/sri-rama-navami-2026/&text=Join+Sri+Rama+Navami+2026+at+ISKM+Singapore!" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full no-underline text-[13px] font-semibold transition-transform hover:-translate-y-0.5 bg-[#0088cc] text-white">
              <Send size={14} /> Telegram
            </a>
            <button onClick={downloadICS}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full text-[13px] font-semibold transition-transform hover:-translate-y-0.5 bg-navy text-white border-none cursor-pointer">
              <CalendarPlus size={14} /> Add to Calendar
            </button>
            <button onClick={handleCopy}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full text-[13px] font-semibold transition-transform hover:-translate-y-0.5 bg-cream-warm text-navy border border-[#e5ded5] cursor-pointer">
              <LinkIcon size={14} /> {copyText}
            </button>
          </div>
        </AnimateIn>
      </div>

      {/* ═══ FINAL CTA ═══ */}
      <AnimateIn animation="fade-up">
        <div className="text-cream text-center py-20 px-5 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={img1} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(22,45,88,0.92), rgba(30,58,110,0.88), rgba(45,74,124,0.92))" }} />
          </div>
          <h2 className="relative z-[1] text-[clamp(1.5rem,3vw,2.2rem)] text-white mb-2">Don't Miss This Sacred Celebration</h2>
          <p className="relative z-[1] opacity-70 mb-[30px] text-base">Thursday, 26 March 2026 · 6:00 PM · ISKM Singapore</p>
          <a href="#register" onClick={scrollTo("register")}
            className="relative z-[1] inline-block bg-pink text-navy py-4 px-11 rounded-lg no-underline text-base font-bold transition-all shadow-[0_4px_20px_rgba(248,164,192,0.3)] hover:bg-pink-light hover:-translate-y-0.5 cta-glow">
            <ArrowUp className="inline w-4 h-4 mr-1.5 -mt-0.5" /> Register Now — Free
          </a>
        </div>
      </AnimateIn>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-navy-deep text-white/[0.45] text-center py-7 px-5 text-[13px]">
        <img src={imgLogo} alt="ISKM" className="h-[38px] w-[38px] rounded-full opacity-70 mx-auto mb-2.5" />
        <p>© 2026 International Sri Krishna Mandir · <a href="https://srikrishnamandir.org" className="text-gold no-underline hover:underline">srikrishnamandir.org</a> · <a href="mailto:contact@srikrishnamandir.org" className="text-gold no-underline hover:underline">contact@srikrishnamandir.org</a></p>
      </footer>

      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy-deep z-[999] shadow-[0_-4px_20px_rgba(0,0,0,0.2)] block md:hidden">
        <div className="scroll-progress w-full" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        <div className="p-[12px_16px]">
          <a href="#register" onClick={scrollTo("register")} className="block bg-pink text-navy text-center py-3.5 rounded-lg font-bold text-[15px] no-underline cta-glow">
            <ArrowUp className="inline w-4 h-4 mr-1.5 -mt-0.5" /> Register Free — Mar 26
          </a>
        </div>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-[70px] md:hidden" />

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
}

/* ═══ SECTION HEADER COMPONENT ═══ */
function SectionHeader({ overline, title, sub, noMargin }: { overline: string; title: string; sub?: string; noMargin?: boolean }) {
  return (
    <div className={`text-center ${noMargin ? "mb-0" : "mb-[30px] md:mb-[45px]"}`}>
      <div className="font-body text-[11px] font-bold tracking-[2.5px] uppercase text-navy-2 mb-2.5">{overline}</div>
      <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] text-navy leading-[1.2]">{title}</h2>
      <div className="w-[50px] h-[3px] bg-gold mx-auto mt-3.5 rounded-sm" />
      {sub && <p className="text-[15px] text-text-muted-custom mt-2 max-w-[520px] mx-auto">{sub}</p>}
    </div>
  );
}
