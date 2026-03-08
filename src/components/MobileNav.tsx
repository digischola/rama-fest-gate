import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import imgLogo from "@/assets/logo.jpg";

const links = [
  { id: "expect", label: "What's On" },
  { id: "schedule", label: "Schedule" },
  { id: "about", label: "About" },
  { id: "location", label: "Venue" },
  { id: "donate", label: "Sevā" },
  { id: "register", label: "Register" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-navy hover:bg-navy/5 transition-colors border-none bg-transparent cursor-pointer"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] bg-cream p-0">
        <SheetHeader className="p-6 pb-2 border-b border-border">
          <SheetTitle className="flex items-center gap-2.5">
            <img src={imgLogo} alt="ISKM" className="h-8 w-8 rounded-full" />
            <span className="font-display text-lg text-navy">ISKM Singapore</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col p-4 gap-1">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={handleClick(link.id)}
              className={`py-3 px-4 rounded-lg text-sm font-semibold no-underline transition-colors ${
                link.id === "register"
                  ? "bg-pink text-navy mt-2 text-center font-bold"
                  : "text-text-dark hover:bg-navy/5"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
