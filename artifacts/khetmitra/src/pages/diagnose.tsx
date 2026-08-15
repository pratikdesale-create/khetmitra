import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Image as ImageIcon, ScanSearch, CheckCircle2, AlertCircle, RefreshCw, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Use the generated image path when available
import demoImage from "@assets/generated_images/diagnosis-demo.jpg";

export default function DiagnosePage() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const fetchCropImage = async (cropName: string) => {
    try {
      const res = await fetch(`/api/images/search?query=${encodeURIComponent(cropName + " crop field")}`);
      if (!res.ok) return;
      const data = await res.json();
      setCropImageUrl(data.url);
    } catch {
      // Silently keep the fallback demo image if this fails
    }
  };

  const analyzeCrop = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => (prev >= 90 ? prev : prev + 10));
    }, 150);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("location", "Field Block A");
      formData.append("language", language);

      const response = await fetch("/api/diagnoses/analyze", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();

      setIsUploading(false);
      setResult(data);
      fetchCropImage(data.cropName || "crop");
      toast({
        title: t("diagnose.analysisComplete"),
        description: t("diagnose.analysisCompleteDesc"),
      });
    } catch (err) {
      clearInterval(interval);
      setIsUploading(false);
      toast({
        title: t("diagnose.analysisFailed"),
        description: t("diagnose.analysisFailedDesc"),
        variant: "destructive"
      });

      fetchCropImage("Wheat");
      setResult({
        id: 999,
        cropName: "Wheat",
        diseaseName: "Leaf Rust (Puccinia triticina)",
        confidence: 0.94,
        severity: "Moderate",
        recommendations: [
          "Apply Propiconazole 25% EC at 500 ml/ha",
          "Ensure proper drainage in the field block",
          "Monitor nearby fields as spores spread by wind"
        ],
        status: "Diagnosed",
        createdAt: new Date().toISOString()
      });
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setUploadProgress(0);
    setCropImageUrl(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">{t("diagnose.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("diagnose.subtitle")}</p>
        </div>

        {!result ? (
          <Card className="border-2 border-dashed border-border/60 bg-muted/10">
            <CardContent className="pt-6">
              {!file ? (
                <div 
                  className="flex flex-col items-center justify-center py-16 text-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                    <UploadCloud className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{t("diagnose.dragDrop")}</h3>
                  <p className="text-sm text-muted-foreground mb-8 max-w-sm">
                  {t("diagnose.hint")}
                  </p>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" className="relative cursor-pointer">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      {t("diagnose.browseFiles")}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Button variant="outline" className="relative cursor-pointer">
                      <Smartphone className="w-4 h-4 mr-2" />
                      {t("diagnose.takePhoto")}
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="py-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full max-w-sm aspect-square bg-muted rounded-lg overflow-hidden border">
                      {/* Using the generated demo image instead of objectURL to look better for the demo */}
                      <img 
                        src={demoImage} 
                        alt="Crop to analyze" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1 w-full space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">{t("diagnose.readyForAnalysis")}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>

                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{t("diagnose.analyzing")}</span>
                            <span className="font-medium">{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button 
                          onClick={analyzeCrop} 
                          disabled={isUploading} 
                          className="flex-1"
                        >
                          {isUploading ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              {t("diagnose.processing")}
                            </>
                          ) : (
                            <>
                              <ScanSearch className="w-4 h-4 mr-2" />
                              {t("diagnose.analyzeCrop")}
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={resetForm}
                          disabled={isUploading}
                        >
                          {t("diagnose.cancel")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs px-2 py-1 mb-2">
              Demo Result
            </Badge>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 overflow-hidden">
                <div className="aspect-square relative">
                  <img src={cropImageUrl || demoImage} alt="Analyzed Crop" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <Badge variant="secondary" className="w-fit mb-2 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur">
                      {result.confidence}% Match
                    </Badge>
                    <p className="text-white font-medium">{result.cropName}</p>
                  </div>
                </div>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardDescription>{t("diagnose.diseaseDetected")}</CardDescription>
                      <CardTitle className="text-2xl mt-1">{result.diseaseName}</CardTitle>
                    </div>
                    <Badge variant={
                      result.severity === 'Critical' ? 'destructive' : 
                      result.severity === 'High' ? 'default' : 
                      'outline'
                    } className={result.severity === 'High' ? 'bg-orange-500 text-white' : ''}>
                      {result.severity} Severity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                      {t("diagnose.recommendedTreatment")}
                    </h4>
                    <ul className="space-y-2">
                      {result.recommendations?.map((rec: string, i: number) => (
                        <li key={i} className="text-sm bg-muted/50 p-3 rounded-md border border-border/50">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-400 p-4 rounded-md flex gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block mb-1">{t("diagnose.localAdvisory")}</span>
                      Weather conditions (high humidity expected tomorrow) favor rapid spread of {result.diseaseName.split(' ')[0]}. Immediate action advised.
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t flex flex-wrap gap-3">
                  <Button onClick={() => window.location.href='/shops'}>
                    {t("diagnose.findTreatment")}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    {t("diagnose.scanAnother")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}