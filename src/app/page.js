"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Palette,
  Printer,
  CameraIcon,
  ArrowRight,
  Users,
  Zap,
  Scale,
} from "lucide-react";

export default function Home() {
  const [highlightImages, setHighlightImages] = useState(['/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg', '/nature.jpg']);

  useEffect(() => {
    // Load admin highlight images
    fetch('/api/admin/settings')
      .then(response => response.json())
      .then(data => {
        if (data.highlightImages && data.highlightImages.length >= 6) {
          setHighlightImages(data.highlightImages.slice(0, 6));
        }
      })
      .catch(error => {
        console.log('Error loading highlight images:', error);
        // Keep default images on error
      });
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Little League Parents Banner */}
      <div className="pt-16 lg:pt-20">
        <div className="bg-gradient-to-r from-blue-500/10 via-blue-600/20 to-blue-700/10 backdrop-blur-sm border-b border-blue-200/20 py-4 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm md:text-base font-medium text-foreground">
              <span className="font-semibold text-blue-600">Little League Parents:</span> Looking to download your kids photos? 
              <a 
                href="https://store.4kphotoz.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-md"
              >
                Click here!
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Blue Gradient Blob */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full blur-[180px] opacity-70 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your #1 <span className="italic text-primary">Photography</span> & Print Solution in California
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional photography, graphic design, print lab, and photo booth services serving{" "}
            <span className="font-semibold text-primary">Bay Area California</span> with{" "}
            <span className="font-semibold text-primary">blazing fast</span>{" "}
            turnaround times
          </p>

          <button
            onClick={() =>
              document.querySelector("#services")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="inline-flex items-center px-10 py-4 text-lg font-semibold rounded-full 
             bg-gradient-to-r from-blue-500 to-blue-600 
             hover:from-blue-600 hover:to-blue-700 
             shadow-lg shadow-blue-500/30
             transition-all duration-500 ease-out 
             transform hover:-translate-y-1 hover:scale-105"
          >
            Learn More
            <ArrowRight className="ml-3 w-6 h-6" />
          </button>

        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              We are an{" "}
              <span className="italic text-primary">extension</span> of your
              creative team in California
            </h2>
            <p className="text-lg font-body text-muted-foreground leading-relaxed">
              At 4kphotoz LLC, we bring professional photography, graphic design, and print lab services
              together under one roof in Hayward, California. Founded in the Bay Area, we&apos;ve partnered
              with schools, organizations, and businesses across California to
              create visuals that stand out, tell stories, and make a lasting
              impact. Our fast turnaround times and professional quality make us the preferred choice for photography and print services throughout the Bay Area.
            </p>
          </div>
        </div>
      </section>


      {/* Services Overview */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, we deliver exceptional results across
              all our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Photography */}
            <div className="group text-center p-8 rounded-2xl bg-muted hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">
                Photography
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                From sports and events to portraits and marketing campaigns, we
                capture the moments that matter.
              </p>
            </div>

            {/* Graphic Design */}
            <div className="group text-center p-8 rounded-2xl bg-muted hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">
                Graphic Design
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Posters, banners, branding, and custom graphics built to make
                your message pop.
              </p>
            </div>

            {/* Print Lab */}
            <div className="group text-center p-8 rounded-2xl bg-muted hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                <Printer className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">
                Print Lab
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                In-house printing with blazing fast turnaround — banners,
                posters, stickers, and everything in between.
              </p>
            </div>

            {/* Photo Booth */}
            <div className="group text-center p-8 rounded-2xl bg-muted hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                <CameraIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">
                Photo Booth
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                Modern, fun, and customizable booths to bring energy and
                memories to any event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Featured Work
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              A selection of our standout visuals that showcase our creative
              capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl bg-muted hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border"
              >
                <div className="aspect-square relative">
                  <Image
                    src={highlightImages[(item - 1) % 6] || "/nature.jpg"}
                    alt={`Featured photography work ${item}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      asChild
                      variant="outline"
                      className="border-foreground text-foreground hover:bg-foreground hover:text-background"
                    >
                      <Link href="https://gallery.4kphotoz.com/">View Gallery</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="https://gallery.4kphotoz.com/">View All Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional results with unmatched speed and quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">
                All-in-One Solution
              </h3>
              <p className="text-muted-foreground font-body">
                Photography, design, and print under one roof. Streamline your
                workflow and save time.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">
                Blazing Fast Turnaround
              </h3>
              <p className="text-muted-foreground font-body">
                From idea to finished product, we move quick without cutting
                corners.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">
                Built for Any Size Project
              </h3>
              <p className="text-muted-foreground font-body">
                Whether it&apos;s a single banner or a full-school media day, our
                team scales to match your vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              Ready to Get Started?
            </h2>
            <p className="text-lg font-body text-muted-foreground mb-12">
              Let&apos;s discuss your project and bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
              >
                <Link href="/contact">Get Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground text-foreground hover:bg-foreground hover:text-background text-lg px-8 py-4"
              >
                <span className="text-foreground/70">(510) 828-1061</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
