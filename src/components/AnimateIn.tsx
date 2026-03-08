import { useInView } from "@/hooks/useInView";
import { ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "scale-in" | "pop-in";
  as?: keyof JSX.IntrinsicElements;
}

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
  as: Tag = "div",
}: AnimateInProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const animationClasses: Record<string, string> = {
    "fade-up": "translate-y-8 opacity-0",
    "fade-in": "opacity-0",
    "slide-left": "-translate-x-8 opacity-0",
    "scale-in": "scale-95 opacity-0",
    "pop-in": "scale-90 opacity-0",
  };

  const baseHidden = animationClasses[animation] || animationClasses["fade-up"];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "translate-y-0 translate-x-0 scale-100 opacity-100" : baseHidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
