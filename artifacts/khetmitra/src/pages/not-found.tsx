import { AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MarketingLayout } from "@/components/layout/marketing-layout";

export default function NotFound() {
  return (
    <MarketingLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4 tracking-tight">Field Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          The page you are looking for has been moved, deleted, or possibly never existed.
        </p>
        <Link href="/">
          <Button size="lg" className="font-medium">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </MarketingLayout>
  );
}
