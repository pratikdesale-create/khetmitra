import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowRight, ScanSearch } from "lucide-react";
import { useListDiagnoses } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "wouter";

export default function HistoryPage() {
  const { data: diagnoses, isLoading } = useListDiagnoses();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recovered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Treated': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Diagnosed': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">Field History</h1>
            <p className="text-muted-foreground mt-1">Timeline of past diagnoses and treatments.</p>
          </div>
          <Button variant="outline" className="shrink-0">
            <Download className="w-4 h-4 mr-2" />
            Export PDF Report
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4 pt-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 ml-0 md:ml-0" />
                <Card className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-4 md:ml-0">
                  <CardContent className="p-5">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : diagnoses?.length === 0 ? (
          <div className="py-20 text-center border border-dashed rounded-lg bg-card mt-6">
            <ScanSearch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No history yet</h3>
            <p className="text-muted-foreground mt-1 mb-6">Your field history timeline will appear here once you start diagnosing.</p>
            <Link href="/diagnose">
              <Button>Start First Diagnosis</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8 pt-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-border">
            {diagnoses?.map((item, i) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/20 text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <Calendar className="w-4 h-4" />
                </div>
                
                <Card className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] ml-4 md:ml-0 hover:shadow-md transition-shadow">
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 aspect-video sm:aspect-auto bg-muted shrink-0 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center font-serif text-3xl text-primary font-bold">
                        {item.cropName.charAt(0)}
                      </div>
                      <Badge className={`absolute top-3 left-3 border text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="p-5 flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(item.createdAt), 'MMMM d, yyyy')}
                      </div>
                      
                      <h3 className="text-lg font-bold mb-1 text-foreground">{item.cropName}</h3>
                      <p className="text-sm font-medium text-destructive mb-3">{item.diseaseName}</p>
                      
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Treatment Applied</p>
                        <p className="text-sm bg-muted/50 p-2 rounded border border-border/50">
                          {item.recommendations[0]}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Location: {item.location || 'Not specified'}</span>
                        <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary">
                          Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
