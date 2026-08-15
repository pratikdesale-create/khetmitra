import { Link } from "wouter";
import { Logo } from "@/components/logo";
import { OrganicBackground } from "@/components/organic-background";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      {/* Left side - Marketing/Branding (hidden on mobile) */}
      <div className="hidden md:flex flex-1 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <OrganicBackground variant="subtle" />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10">
          <Link href="/">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-3xl tracking-tight">KhetMitra</span>
            </div>
          </Link>
        </div>
        
        <div className="relative z-10 max-w-md">
          <blockquote className="space-y-4">
            <p className="text-2xl font-serif font-medium leading-tight">
              "KhetMitra diagnosed my wheat crop in seconds. It didn't just tell me what was wrong, it told me which shop nearby had the medicine. It's like having an agronomist in my pocket."
            </p>
            <footer className="text-sm font-medium text-primary-foreground/80">
              — Ramesh Singh, Punjab
            </footer>
          </blockquote>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 md:hidden flex justify-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}