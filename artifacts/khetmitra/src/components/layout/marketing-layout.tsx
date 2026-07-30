import { MarketingNavbar } from "./marketing-navbar";
import { Leaf, Twitter, Facebook, Youtube } from "lucide-react";
import { Link } from "wouter";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <MarketingNavbar />
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <span className="font-serif font-bold text-xl tracking-tight">
                    KhetMitra
                  </span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Your hyperlocal crop-health companion. Empowering Indian smallholder farmers with technology grounded in tradition.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><Link href="/diagnose" className="text-muted-foreground hover:text-foreground">Crop Diagnosis</Link></li>
                <li><Link href="/weather" className="text-muted-foreground hover:text-foreground">Weather Alerts</Link></li>
                <li><Link href="/schemes" className="text-muted-foreground hover:text-foreground">Govt Schemes</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Press</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} KhetMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
