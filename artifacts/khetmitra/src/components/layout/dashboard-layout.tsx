import { useLanguage } from "@/contexts/language-context";
import { languageNames, type Language } from "@/lib/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LayoutDashboard,
  ScanSearch,
  History,
  CloudSun,
  Store,
  Landmark,
  Settings,
  Menu,
  LogOut,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function useNavItems() {
  const { t } = useLanguage();
  return [
    { name: t("nav.overview"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("nav.diagnosis"), href: "/diagnose", icon: ScanSearch },
    { name: t("nav.history"), href: "/history", icon: History },
    { name: t("nav.weather"), href: "/weather", icon: CloudSun },
    { name: t("nav.shops"), href: "/shops", icon: Store },
    { name: t("nav.schemes"), href: "/schemes", icon: Landmark },
  ];
}

function NavLinks({ closeMobile }: { closeMobile?: () => void }) {
  const [location] = useLocation();
  const navItems = useNavItems();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.href;
        
        return (
          <Link 
            key={item.name} 
            href={item.href}
            onClick={closeMobile}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium
              ${isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
          >
            <Icon className="w-5 h-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return (
    <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
      <SelectTrigger className="w-[110px] h-9">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(languageNames) as Language[]).map((lang) => (
          <SelectItem key={lang} value={lang}>{languageNames[lang]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-sidebar-border bg-sidebar shrink-0 sticky top-0 h-[100dvh]">
        <div className="p-4 md:p-6 border-b border-sidebar-border/50">
          <Link href="/">
            <Logo className="text-sidebar-foreground" />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">Main Menu</p>
            <NavLinks />
          </div>
        </div>
        <div className="p-4 border-t border-sidebar-border/50 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors text-sm font-medium">
            <Settings className="w-5 h-5" />
            {t("nav.settings")}
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-md text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium">
            <LogOut className="w-5 h-5" />
            {t("nav.signOut")}
          </Link>
        </div>
      </aside>

      {/* Mobile Header & Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-16 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border">
                <div className="p-4 border-b border-sidebar-border/50">
                  <Logo className="text-sidebar-foreground" />
                </div>
                <div className="p-4">
                  <NavLinks closeMobile={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex h-16 items-center justify-end px-6 border-b bg-card/50 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-destructive border-2 border-background"></span>
            </Button>
            <ThemeToggle />
            <div className="h-6 w-px bg-border mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-medium leading-none">Ramesh Farmer</p>
                <p className="text-xs text-muted-foreground mt-0.5">Punjab, India</p>
              </div>
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className="bg-primary/10 text-primary">RF</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}