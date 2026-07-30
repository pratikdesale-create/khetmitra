import { AuthLayout } from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { SiGoogle, SiFacebook } from "react-icons/si";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Leaf } from "lucide-react";

export default function LoginPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Enter your phone number or email to sign in.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Phone Number or Email</Label>
            <Input id="identifier" placeholder="+91 98765 43210" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
            </div>
            <Input id="password" type="password" required />
          </div>
          
          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full" onClick={() => toast({ title: "Google login placeholder" })}>
            <SiGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => toast({ title: "Facebook login placeholder" })}>
            <SiFacebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
