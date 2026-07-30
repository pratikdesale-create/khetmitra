import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import LandingPage from "@/pages/index";
import DashboardPage from "@/pages/dashboard";
import DiagnosePage from "@/pages/diagnose";
import ShopsPage from "@/pages/shops";
import WeatherPage from "@/pages/weather";
import SchemesPage from "@/pages/schemes";
import HistoryPage from "@/pages/history";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/diagnose" component={DiagnosePage} />
      <Route path="/shops" component={ShopsPage} />
      <Route path="/weather" component={WeatherPage} />
      <Route path="/schemes" component={SchemesPage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="khetmitra-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
