import { motion } from "framer-motion";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ScanSearch, MapPin, CloudSun, Landmark, Bot, History, WifiOff, CheckCircle2 } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg"; // Fallback to our generated asset if available

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <MarketingLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/50 z-10" />
          {/* We'll use the generated image if available */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-overlay"
            style={{ backgroundImage: `url(${heroBg})` }}
          ></div>
          <div className="w-full h-full bg-gradient-to-br from-green-900/40 to-amber-600/30 object-cover mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 bg-secondary/20 text-secondary-foreground hover:bg-secondary/30 border-secondary/30 px-3 py-1 text-sm font-medium">
                Built for Indian Agriculture
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Your Hyperlocal <br />
              <span className="text-primary relative whitespace-nowrap">
                Crop Health
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
              <br />Companion.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Snap a photo of a sick plant. Get instant diagnosis, find the exact treatment at a nearby shop, and apply for relief schemes—all in your local language.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Start Diagnosing Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                View Demo Dashboard
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Works offline
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> 6 local languages
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Free forever
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Stats Section */}
      <section className="py-16 md:py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="px-4 py-6 md:py-0"
            >
              <p className="text-5xl font-serif font-bold text-primary mb-2">35%</p>
              <p className="text-lg font-medium">Crop Yield Lost</p>
              <p className="text-sm text-muted-foreground mt-2">To pests and diseases annually in India due to late detection.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="px-4 py-6 md:py-0"
            >
              <p className="text-5xl font-serif font-bold text-primary mb-2">3-5 Days</p>
              <p className="text-lg font-medium">Average Delay</p>
              <p className="text-sm text-muted-foreground mt-2">Between spotting a disease and finding the right agro-chemical.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="px-4 py-6 md:py-0"
            >
              <p className="text-5xl font-serif font-bold text-primary mb-2">120m+</p>
              <p className="text-lg font-medium">Smallholder Farmers</p>
              <p className="text-sm text-muted-foreground mt-2">Need immediate, localized, and actionable advisory.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Everything a farmer needs, in one place.</h2>
            <p className="text-lg text-muted-foreground">We didn't just build an AI scanner. We built the complete workflow from diagnosis to treatment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ScanSearch, title: "Photo Diagnosis", desc: "Identify diseases instantly with our offline-capable AI model trained on local crops." },
              { icon: MapPin, title: "Nearby Shops", desc: "Don't just get a chemical name. Find exactly which local shop has it in stock, and how far it is." },
              { icon: CloudSun, title: "Weather Alerts", desc: "Hyperlocal weather data translated into actionable disease-risk warnings." },
              { icon: Landmark, title: "Govt Schemes", desc: "Match your profile with eligible PM-KISAN, insurance, and subsidy programs." },
              { icon: Bot, title: "Voice Assistant", desc: "Can't read complex advisories? Just tap the mic and hear it in your local language." },
              { icon: History, title: "Field History", desc: "Track every scan, treatment, and outcome season over season." },
              { icon: WifiOff, title: "Offline Support", desc: "No signal in the field? Scan now, results process locally or sync when back online." },
              { icon: CheckCircle2, title: "Local Advisory", desc: "Recommendations tailored to your specific district's soil and climate." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-border/50 bg-card/50 hover:bg-card hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Timeline */}
      <section id="how-it-works" className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">How KhetMitra works</h2>
            <p className="text-lg text-muted-foreground">From a sick leaf to a healthy harvest in 6 steps.</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border/80 transform md:-translate-x-1/2"></div>
            
            {[
              { title: "Spot an Issue", desc: "Farmer notices yellowing leaves or pest damage in the field." },
              { title: "Snap a Photo", desc: "Takes a clear picture using the KhetMitra app." },
              { title: "AI Diagnosis", desc: "Our model identifies the exact disease and severity." },
              { title: "Get Treatment Plan", desc: "Receives an organic or chemical recommendation." },
              { title: "Find Nearby Shop", desc: "App locates the closest agro-input store carrying the cure." },
              { title: "Track Recovery", desc: "Logs the treatment and monitors the plant's recovery." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block w-1/2 px-8 text-right">
                  {i % 2 === 0 && (
                    <>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </>
                  )}
                </div>
                
                <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 transform md:-translate-x-1/2 shadow-sm">
                  <span className="font-bold text-primary">{i + 1}</span>
                </div>
                
                <div className="w-full md:w-1/2 pl-20 md:px-8">
                  <div className="md:hidden">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                  {i % 2 !== 0 && (
                    <div className="hidden md:block">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to protect your harvest?</h2>
          <p className="text-xl text-primary-foreground/80 mb-10">Join thousands of Indian farmers using KhetMitra to increase yields and reduce losses.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="inline-flex h-14 items-center justify-center rounded-md bg-white px-8 text-lg font-bold text-primary shadow hover:bg-white/90 transition-colors">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
