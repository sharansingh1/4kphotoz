"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Users, Trophy, Target, Palette, CheckCircle, Star, Clock, Shield, Download } from "lucide-react";

export default function PhotographyPage() {
  const [pageImages, setPageImages] = useState({
    portraits: '/nature.jpg',
    events: '/nature.jpg',
    mediaDay: '/nature.jpg',
    sports: '/nature.jpg',
    marketing: '/nature.jpg',
    sportsPortraits: '/nature.jpg',
    littleLeague: '/nature.jpg',
  });

  useEffect(() => {
    // Load admin-configured images
    fetch('/api/admin/settings')
      .then(response => response.json())
      .then(data => {
        if (data.pageImages?.photography) {
          setPageImages(data.pageImages.photography);
        }
      })
      .catch(error => {
        console.log('Error loading page images:', error);
      });
  }, []);
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Photography
            </h1>
            <p className="text-xl md:text-2xl font-body text-muted-foreground mb-8">
              Professional photography for every occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <Link href="/contact">Get In Touch</Link>
              </Button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Photography Services
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              From intimate portraits to large-scale events, we capture every moment with precision and artistry
            </p>
          </div>

          {/* First row - 3 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Portraits */}
            <div className="group bg-muted rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.portraits}
                  alt="Professional portrait photography showcasing individual and group portraits with polished, professional look - perfect for seniors, couples, families"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Portraits</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Individual and group portraits with a polished, professional look. Perfect for seniors, couples, families, and everyone in between.
                </p>
              </div>
            </div>

            {/* Events */}
            <div className="group bg-muted rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.events}
                  alt="Event photography capturing school dances, graduations, corporate gatherings and community celebrations - moments that matter most"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Events</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  From school dances and graduations to corporate gatherings and community celebrations, we capture the moments that matter most.
                </p>
              </div>
            </div>

            {/* Media Day */}
            <div className="group bg-muted rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.mediaDay}
                  alt="Complete athletic media day setups with professional lighting, backdrops, and custom graphics to showcase teams in style"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Media Day</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Complete athletic media day setups with lighting, backdrops, and custom graphics to showcase your team in style.
                </p>
              </div>
            </div>
          </div>

          {/* Second row - 2 services centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {/* Sports Action */}
              <div className="group bg-muted rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
                <div className="aspect-video relative">
                  <Image
                    src={pageImages.sports}
                    alt="High-energy sports action photography covering games, tournaments, and competitions - freezing big plays and highlight moments"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Sports Action</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    High-energy coverage of games, tournaments, and competitions — freezing the big plays and highlight moments that deserve to be remembered.
                  </p>
                </div>
              </div>

              {/* Marketing & Branding */}
              <div className="group bg-muted rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105 border border-border">
                <div className="aspect-video relative">
                  <Image
                    src={pageImages.marketing}
                    alt="Clean, creative marketing and branding photography helping schools, businesses, and organizations stand out on socials and in print"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Marketing & Branding</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    Clean, creative visuals that help schools, businesses, and organizations stand out on socials, in person with prints, and everywhere else.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Enterprise-Level Services
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              Specialized services designed for schools, leagues, and large organizations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sports Portraits */}
            <div className="bg-muted rounded-2xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">Sports Portraits</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Full-day athletic portrait setups with professional lighting and backdrops</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Capable of photographing 100+ athletes in a single day</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Secure, individual family access to each athlete's photos</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Affordable downloads priced below industry competitors</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Print options including premium finishes</p>
                </div>
              </div>

              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src={pageImages.sportsPortraits}
                  alt="Sports portrait photography setup with professional lighting and backdrops - capable of photographing 100+ athletes in a single day"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Little League Photography */}
            <div className="bg-muted rounded-2xl p-8 border border-border">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">Little League Photography</h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Organized league-wide shoots with efficient scheduling</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Individual and team portraits delivered via private family galleries</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Optional custom team banners and individual athlete banner designs</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Fast turnaround with digital downloads and print packages</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground font-body">Lower cost for families compared to traditional providers</p>
                </div>
              </div>

              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src={pageImages.littleLeague}
                  alt="Little League photography with organized league-wide shoots, individual and team portraits delivered via private family galleries"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Photography */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose Our Photography
            </h2>
            <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
              Professional results with unmatched service and value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Fast Turnaround</h3>
              <p className="text-muted-foreground font-body">
                Quick delivery without compromising quality. Get your photos when you need them.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Secure Galleries</h3>
              <p className="text-muted-foreground font-body">
                Private, password-protected galleries for easy viewing and downloading.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Affordable Downloads</h3>
              <p className="text-muted-foreground font-body">
                High-quality digital downloads at prices below industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              Ready to Capture Your Moments?
            </h2>
            <p className="text-lg font-body text-muted-foreground mb-12">
              Let's discuss your photography needs and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <Link href="/contact">Get In Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background text-lg px-8 py-4">
                <span className="text-foreground/70">(510) 828-1061</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
