import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className = "" }: MeteorsProps) => {
  const [meteors, setMeteors] = useState<
    { id: number; top: string; left: string; animationDelay: string; animationDuration: string }[]
  >([]);

  useEffect(() => {
    const generatedMeteors = new Array(number).fill(true).map(() => ({
      id: Math.random(),
      top: 0 + "px",
      left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    setMeteors(generatedMeteors);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((el: any) => (
        <span
          key={el.id}
          className={`absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] animate-meteor opacity-0 ${className}`}
          style={{
            top: el.top,
            left: el.left,
            animationDelay: el.animationDelay,
            animationDuration: el.animationDuration,
          }}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </div>
  );
};
