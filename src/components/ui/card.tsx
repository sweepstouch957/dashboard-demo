// components/ui/card.tsx
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-2xl border bg-white text-black shadow p-4", className)} {...props} />
  );
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("p-2", className)}>
      {children}
    </div>
  );
}
