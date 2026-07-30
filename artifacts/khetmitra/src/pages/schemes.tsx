import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Landmark, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { useListSchemes } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SchemesPage() {
  const { data: schemes, isLoading } = useListSchemes();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Insurance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Input': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Technology': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const renderSchemesList = (filteredSchemes: any[] | undefined) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }

    if (!filteredSchemes || filteredSchemes.length === 0) {
      return (
        <div className="py-16 text-center border border-dashed rounded-lg bg-muted/10 mt-6">
          <Landmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No schemes available</h3>
          <p className="text-muted-foreground mt-1">There are no schemes matching this category right now.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className={`overflow-hidden flex flex-col transition-all hover:shadow-md ${!scheme.isActive ? 'opacity-70 grayscale-[0.5]' : ''}`}>
            <CardHeader className="pb-3 border-b bg-muted/30">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Badge className={`mb-3 border-none ${getCategoryColor(scheme.category)}`}>
                    {scheme.category}
                  </Badge>
                  <CardTitle className="text-xl leading-tight">{scheme.name}</CardTitle>
                  <CardDescription className="text-xs font-medium uppercase tracking-wider mt-2 text-primary/80">
                    {scheme.ministry}
                  </CardDescription>
                </div>
                {!scheme.isActive && (
                  <Badge variant="outline" className="text-xs bg-background">Closed</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-5 pb-4 flex-1">
              <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                {scheme.description}
              </p>
              
              <div className="space-y-4">
                <div className="bg-background rounded-md border p-3">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                    Eligibility
                  </h4>
                  <p className="text-sm font-medium">{scheme.eligibility}</p>
                </div>
                <div className="bg-primary/5 rounded-md border border-primary/10 p-3">
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center">
                    <Landmark className="w-3.5 h-3.5 mr-1.5" />
                    Key Benefit
                  </h4>
                  <p className="text-sm font-medium text-foreground">{scheme.benefit}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                className="w-full" 
                variant={scheme.isActive ? "default" : "secondary"}
                disabled={!scheme.isActive}
                onClick={() => scheme.isActive && window.open(scheme.applicationUrl, '_blank')}
              >
                {scheme.isActive ? (
                  <>Apply Now <ArrowRight className="w-4 h-4 ml-2" /></>
                ) : (
                  "Applications Closed"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">Government Schemes</h1>
          <p className="text-muted-foreground mt-1">Discover and apply for agricultural subsidies and relief programs.</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-card border h-auto p-1 overflow-x-auto flex-wrap sm:flex-nowrap justify-start">
            <TabsTrigger value="all" className="py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Schemes</TabsTrigger>
            <TabsTrigger value="Financial" className="py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Financial Assistance</TabsTrigger>
            <TabsTrigger value="Insurance" className="py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Crop Insurance</TabsTrigger>
            <TabsTrigger value="Input" className="py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Inputs & Equipment</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            {renderSchemesList(schemes)}
          </TabsContent>
          <TabsContent value="Financial" className="m-0">
            {renderSchemesList(schemes?.filter(s => s.category === 'Financial'))}
          </TabsContent>
          <TabsContent value="Insurance" className="m-0">
            {renderSchemesList(schemes?.filter(s => s.category === 'Insurance'))}
          </TabsContent>
          <TabsContent value="Input" className="m-0">
            {renderSchemesList(schemes?.filter(s => s.category === 'Input'))}
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50 border-dashed">
          <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Need help applying?</h4>
                <p className="text-sm text-muted-foreground max-w-md">Our village agents can assist you with the paperwork for a small fee.</p>
              </div>
            </div>
            <Button variant="outline">Contact Agent</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
