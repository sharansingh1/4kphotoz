"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Palette, Image as ImageIcon, Megaphone, Instagram, Zap, CheckCircle, Star, Users, Lightbulb } from "lucide-react";

export default function GraphicDesignPage() {
  const [pageImages, setPageImages] = useState({
    logos: '/nature.jpg',
    posters: '/nature.jpg',
    banners: '/nature.jpg',
    socialMedia: '/nature.jpg',
    portfolio: '/nature.jpg',
  });

  useEffect(() => {
    // Load admin-configured images
    fetch('/api/admin/settings')
      .then(response => response.json())
      .then(data => {
        if (data.pageImages?.graphicDesign) {
          setPageImages(data.pageImages.graphicDesign);
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
              Graphic Design
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-body mb-8">
              Unlimited Creativity. <span className="gradient-text">Unlimited Revisions.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <Link href="/contact">Design With Us</Link>
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
              Our Design Services
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              From logos to social media graphics, we create visuals that make your message pop
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logos */}
            <div className="group bg-muted border border-border rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src={pageImages.logos}
                  alt="Custom logo design services creating memorable brand identities that represent your brand and leave a lasting impression"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Logos</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Custom logo designs that represent your brand and leave a lasting impression.
                </p>
              </div>
            </div>

            {/* Posters */}
            <div className="group bg-muted border border-border rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src={pageImages.posters}
                  alt="Bold, eye-catching poster designs for schools, events, and businesses with professional quality and creative impact"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Posters</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Bold, eye-catching designs for schools, events, and businesses.
                </p>
              </div>
            </div>

            {/* Banners */}
            <div className="group bg-muted border border-border rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src={pageImages.banners}
                  alt="Large-scale banner designs that stand out anywhere - perfect for events, schools, and businesses with maximum visual impact"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Megaphone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Banners</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Large-scale visuals designed to stand out anywhere.
                </p>
              </div>
            </div>

            {/* Social Media Graphics */}
            <div className="group bg-muted border border-border rounded-2xl overflow-hidden hover:bg-muted/80 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src={pageImages.socialMedia}
                  alt="Engaging social media graphics tailored for Instagram, Facebook, TikTok, and more - designed to maximize engagement and brand visibility"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Social Media Graphics</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  Engaging content tailored for Instagram, Facebook, TikTok, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Design Process
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              From concept to completion, we ensure your vision comes to life perfectly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Discovery</h3>
              <p className="text-muted-foreground font-body text-sm">
                We learn about your brand, goals, and vision to create the perfect design brief.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Concept</h3>
              <p className="text-muted-foreground font-body text-sm">
                Initial concepts and mockups that bring your ideas to life with creative flair.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Refinement</h3>
              <p className="text-muted-foreground font-body text-sm">
                Unlimited revisions until you&apos;re completely satisfied with the final design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Delivery</h3>
              <p className="text-muted-foreground font-body text-sm">
                Final files delivered in all formats you need, ready for print or digital use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Design Portfolio
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              A showcase of our creative work across different industries and project types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio Items - Stand-in images */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl bg-muted border border-border hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                <div className="aspect-square relative">
                  <Image
                    src={pageImages.portfolio}
                    alt={`Graphic design portfolio item ${item} - Professional quality design work showcasing logos, posters, banners, or social media graphics`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Design */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose Our Design Services
            </h2>
            <p className="text-lg text-foreground/70 font-body max-w-2xl mx-auto">
              Professional design with unlimited creativity and revisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Unlimited Revisions</h3>
              <p className="text-foreground/70 font-body">
                We keep refining until you&apos;re 100% satisfied with the final design.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Creative Excellence</h3>
              <p className="text-foreground/70 font-body">
                Fresh, innovative designs that stand out from the competition.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Collaborative Process</h3>
              <p className="text-foreground/70 font-body">
                We work closely with you to bring your vision to life perfectly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Projects */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              Need Something Else?
            </h2>
            <p className="text-lg text-foreground/70 font-body mb-8">
              Looking for something unique? We do it all. From business cards to billboards, 
              from web graphics to vehicle wraps, let us know what you&apos;re looking for.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-foreground/70 font-body">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Business Cards</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Flyers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Brochures</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Vehicle Wraps</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Web Graphics</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Signage</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Packaging</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>And More!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-lg text-foreground/70 font-body mb-12">
              Let&apos;s create something amazing together with unlimited creativity and revisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <Link href="/contact">Design With Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-foreground hover:bg-white hover:text-black text-lg px-8 py-4">
                <span className="text-foreground/70">(510) 828-1061</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
