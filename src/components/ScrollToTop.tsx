import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 md:bottom-8 right-4 z-[998] w-11 h-11 rounded-full bg-navy text-white shadow-lg flex items-center justify-center border-none cursor-pointer transition-all hover:bg-navy-2 hover:scale-110 animate-fade-in"
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
