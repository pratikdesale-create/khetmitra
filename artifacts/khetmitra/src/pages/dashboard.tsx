import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Activity, MapPin, AlertTriangle, Landmark, ScanSearch, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const { data: summary, isLoading, error } = useGetDashboardSummary();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">Farm Overview</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your crops today.</p>
          </div>
          <Link href="/diagnose" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            <ScanSearch className="w-4 h-4 mr-2" />
            New Diagnosis
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-[100px]" /> : (
                <div className="text-2xl font-bold">{summary?.totalDiagnoses || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
              <AlertTriangle className={`h-4 w-4 ${(summary?.activeDiseases || 0) > 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-[100px]" /> : (
                <div className="text-2xl font-bold text-destructive">{summary?.activeDiseases || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Crops needing attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nearby Shops</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-[100px]" /> : (
                <div className="text-2xl font-bold">{summary?.nearbyShops || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Within 10km radius</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eligible Schemes</CardTitle>
              <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? <Skeleton className="h-8 w-[100px]" /> : (
                <div className="text-2xl font-bold">{summary?.schemesAvailable || 0}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Govt programs to apply for</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Diagnosis Activity</CardTitle>
              <CardDescription>Number of crop issues reported over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary?.monthlyDiagnosesCount || []}>
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Scans</CardTitle>
                <CardDescription>Latest crop diagnoses</CardDescription>
              </div>
              <Link href="/history" className="text-sm text-primary hover:underline">View All</Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-3 w-[80px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (summary?.recentDiagnoses?.length || 0) > 0 ? (
                <div className="space-y-6">
                  {summary?.recentDiagnoses.slice(0, 4).map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        {/* Placeholder for actual image */}
                        <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-serif text-xl">
                          {item.cropName.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium truncate">{item.cropName}</p>
                          <Badge variant={item.status === 'Recovered' ? 'outline' : 'secondary'} className="text-[10px] px-1.5 py-0">
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{item.diseaseName}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{format(new Date(item.createdAt), 'MMM d, yyyy')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center p-4 border border-dashed rounded-lg bg-muted/30">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
                    <ScanSearch className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium text-sm">No recent scans</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">Start diagnosing your crops to track their health here.</p>
                  <Link href="/diagnose" className="text-xs font-medium text-primary flex items-center">
                    New Scan <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
