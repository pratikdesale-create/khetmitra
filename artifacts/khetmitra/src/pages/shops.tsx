import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Search, Store, Navigation, Star, Clock } from "lucide-react";
import { useListShops } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function ShopsPage() {
  const { data: shops, isLoading } = useListShops();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredShops = shops?.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    shop.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold tracking-tight">Nearby Agro Shops</h1>
            <p className="text-muted-foreground mt-1">Find fertilizers, seeds, and equipment near you.</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by shop name or product (e.g., Propiconazole)" 
            className="pl-10 max-w-md bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-32 w-full rounded-none" />
                <CardContent className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredShops?.length === 0 ? (
            <div className="col-span-full py-12 text-center border border-dashed rounded-lg bg-muted/10">
              <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No shops found</h3>
              <p className="text-muted-foreground mt-1">Try a different search term or expanding your radius.</p>
            </div>
          ) : (
            filteredShops?.map((shop) => (
              <Card key={shop.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                <div className="h-2 bg-primary"></div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-lg line-clamp-1">{shop.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate">{shop.address}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0 bg-background shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {shop.rating}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 flex-1">
                  <div className="flex items-center gap-3 mb-4 text-sm font-medium">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Navigation className="w-4 h-4" />
                      {shop.distanceKm} km away
                    </div>
                    <div className="w-px h-4 bg-border"></div>
                    <div className={`flex items-center gap-1.5 ${shop.isOpen ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                      <Clock className="w-4 h-4" />
                      {shop.isOpen ? 'Open Now' : 'Closed'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Available Products</p>
                    <div className="flex flex-wrap gap-1.5">
                      {shop.products.slice(0, 4).map((product, i) => (
                        <Badge key={i} variant="secondary" className="font-normal text-xs bg-accent/50 hover:bg-accent text-accent-foreground">
                          {product}
                        </Badge>
                      ))}
                      {shop.products.length > 4 && (
                        <Badge variant="secondary" className="font-normal text-xs bg-muted">
                          +{shop.products.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 mt-auto flex gap-2">
                  <Button variant="outline" className="flex-1 border-primary/20 hover:bg-primary/5 text-primary">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button className="flex-1">
                    <Navigation className="w-4 h-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
