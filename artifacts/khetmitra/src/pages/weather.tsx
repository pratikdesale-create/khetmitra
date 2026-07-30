import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Droplets, Wind, ThermometerSun, AlertTriangle, CloudSun, CalendarDays } from "lucide-react";
import { useGetWeather } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeatherPage() {
  const { data: weather, isLoading } = useGetWeather();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />;
      case 'Medium': return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      default: return <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Weather & Advisory</h1>
          <p className="text-muted-foreground mt-1">
            {isLoading ? <Skeleton className="h-5 w-48" /> : `Current conditions for ${weather?.location}`}
          </p>
        </div>

        {/* Current Weather Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
              {isLoading ? (
                <div className="flex gap-6 items-center">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <div className="space-y-3">
                    <Skeleton className="w-32 h-12" />
                    <Skeleton className="w-24 h-6" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="bg-background rounded-full p-4 shadow-sm border">
                    <CloudSun className="w-16 h-16 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 text-primary font-serif font-bold">
                      <span className="text-6xl tracking-tighter">{weather?.temperature}°</span>
                      <span className="text-2xl">C</span>
                    </div>
                    <p className="text-xl font-medium mt-1">{weather?.condition}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border backdrop-blur">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-muted-foreground text-xs">Humidity</p>
                    <p className="font-semibold text-base">{isLoading ? <Skeleton className="w-8 h-5" /> : `${weather?.humidity}%`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border backdrop-blur">
                  <CloudRain className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-muted-foreground text-xs">Rain Chance</p>
                    <p className="font-semibold text-base">{isLoading ? <Skeleton className="w-8 h-5" /> : `${weather?.rainChance}%`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border backdrop-blur">
                  <Wind className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-muted-foreground text-xs">Wind Speed</p>
                    <p className="font-semibold text-base">{isLoading ? <Skeleton className="w-12 h-5" /> : `${weather?.windSpeed} km/h`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border backdrop-blur">
                  <ThermometerSun className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-muted-foreground text-xs">Disease Risk</p>
                    {isLoading ? (
                      <Skeleton className="w-16 h-5" />
                    ) : (
                      <Badge variant="outline" className={`font-semibold mt-0.5 border ${getRiskColor(weather?.diseaseRisk || 'Low')}`}>
                        {weather?.diseaseRisk}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-serif font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Advisory Alerts
            </h2>
            
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : weather?.alerts?.length === 0 ? (
              <Card className="bg-muted/30 border-dashed">
                <CardContent className="p-8 text-center text-muted-foreground">
                  No active weather or disease alerts for your area.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {weather?.alerts.map((alert, i) => (
                  <div key={i} className={`p-4 rounded-lg border flex gap-4 ${
                    alert.severity === 'High' ? 'bg-destructive/5 border-destructive/20' : 
                    alert.severity === 'Medium' ? 'bg-amber-500/5 border-amber-500/20' : 
                    'bg-card'
                  }`}>
                    {getAlertIcon(alert.severity)}
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{alert.type}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7-Day Forecast */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              7-Day Forecast
            </h2>
            
            <Card>
              <CardContent className="p-0 divide-y divide-border">
                {isLoading ? (
                  Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="p-4 flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))
                ) : (
                  weather?.forecast.map((day, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <span className="font-medium text-sm w-16">{day.day}</span>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {day.condition === 'Sunny' ? <CloudSun className="w-5 h-5 text-amber-500" /> : 
                         day.condition === 'Rain' ? <CloudRain className="w-5 h-5 text-blue-500" /> :
                         <CloudSun className="w-5 h-5" />}
                        <span className="text-xs w-10 text-right">{day.rainChance > 0 ? `${day.rainChance}%` : ''}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm font-medium w-24 justify-end">
                        <span className="text-muted-foreground">{day.low}°</span>
                        <span className="text-foreground">{day.high}°</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
