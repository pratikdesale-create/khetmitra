import { Leaf } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
        <Leaf className="w-5 h-5" />
      </div>
      <span className="font-serif font-bold text-xl tracking-tight text-primary dark:text-primary-foreground">
        KhetMitra
      </span>
    </div>
  );
}
