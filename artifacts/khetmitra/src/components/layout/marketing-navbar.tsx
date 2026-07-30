import { Link } from "wouter";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu } from "lucide-react";

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it works</a>
          <a href="#compare" className="text-muted-foreground hover:text-foreground transition-colors">Compare</a>
          <a href="#roadmap" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Select defaultValue="en">
              <SelectTrigger className="w-[100px] h-9 border-none bg-transparent hover:bg-accent focus:ring-0">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <ThemeToggle />
          
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2">
              Log in
            </Link>
            <Link href="/register" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Get Started
            </Link>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
