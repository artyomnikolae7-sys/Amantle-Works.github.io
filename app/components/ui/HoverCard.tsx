import { useRef, useState, ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function HoverCard({ children, className = "", isActive = false, onClick }: HoverCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${
        isActive 
          ? "bg-gradient-to-r from-primary to-accent border-primary/50 text-white shadow-[0_0_20px_rgba(255,0,34,0.3)] scale-[1.02]" 
          : "themed-card text-muted-foreground hover:text-foreground hover:-translate-y-1 hover:shadow-lg"
      } ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--primary-glow, rgba(255,0,34,.1)), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
