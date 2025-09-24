"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Printer, Flag, Image as ImageIcon, CreditCard, Sticker, FileText, Package, Zap, CheckCircle, Clock, Award } from "lucide-react";

export default function PrintLabPage() {
  const [pageImages, setPageImages] = useState({
    banners: '/nature.jpg',
    posters: '/nature.jpg',
    businessCards: '/nature.jpg',
    stickers: '/nature.jpg',
    flyers: '/nature.jpg',
    packaging: '/nature.jpg',
    showcase: '/nature.jpg',
  });

  useEffect(() => {
    // Load admin-configured images
    fetch('/api/admin/settings')
      .then(response => response.json())
      .then(data => {
        if (data.pageImages?.printLab) {
          setPageImages(data.pageImages.printLab);
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
              Print Lab
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-body mb-8">
              Prints that pop, <span className="gradient-text">quality you can trust.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <Link href="/contact">Print With Us</Link>
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
              Our Print Products
            </h2>
            <p className="text-lg text-foreground/70 font-body max-w-2xl mx-auto">
              High-quality printing services with blazing fast turnaround times
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Banners */}
            <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.banners}
                  alt="Durable, high-impact banner printing for schools, events, and businesses with professional quality and weather-resistant materials"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Flag className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Banners</h3>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Durable, high-impact banners for schools, events, and businesses.
                </p>
              </div>
            </div>

            {/* Posters */}
            <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.posters}
                  alt="Custom poster printing in any size - from small handouts to massive wall pieces with vibrant colors and crisp detail"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Posters</h3>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Custom posters in any size — from small handouts to massive wall pieces.
                </p>
              </div>
            </div>

            {/* Business Cards */}
            <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.businessCards}
                  alt="Professional business card printing with multiple finishes and styles - leaving the right impression for your business"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Business Cards</h3>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Professional cards that leave the right impression, available in multiple finishes and styles.
                </p>
              </div>
            </div>

            {/* Stickers & Decals */}
            <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.stickers}
                  alt="Custom stickers and decals in any shape, size, and finish - perfect for branding, giveaways, and promotional materials"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Sticker className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Stickers & Decals</h3>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Custom shapes, sizes, and finishes — perfect for branding or giveaways.
                </p>
              </div>
            </div>

            {/* Flyers & Brochures */}
            <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.flyers}
                  alt="Professional flyer and brochure printing that spreads the word with clarity and style - perfect for marketing and informational materials"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Flyers & Brochures</h3>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Handouts that spread the word with clarity and style.
                </p>
              </div>
            </div>

            {/* Packaging & Labels */}
            <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src={pageImages.packaging}
                  alt="Branded packaging and label printing to bring your products to life with professional quality and custom designs"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Packaging & Labels</h3>
                <p className="text-foreground/70 font-body text-sm leading-relaxed">
                  Branded packaging to bring your products to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Print Capabilities */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Print Capabilities
            </h2>
            <p className="text-lg text-foreground/70 font-body max-w-2xl mx-auto">
              State-of-the-art equipment and premium materials for exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Printer className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">High-Resolution Printing</h3>
              <p className="text-foreground/70 font-body text-sm">
                Crisp, vibrant prints with professional-grade equipment and premium inks.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Fast Turnaround</h3>
              <p className="text-foreground/70 font-body text-sm">
                Most orders completed within 24-48 hours without compromising quality.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Premium Materials</h3>
              <p className="text-foreground/70 font-body text-sm">
                High-quality papers, vinyls, and substrates for lasting durability.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Quality Guarantee</h3>
              <p className="text-foreground/70 font-body text-sm">
                100% satisfaction guarantee on all our print products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Print Gallery
            </h2>
            <p className="text-lg text-foreground/70 font-body max-w-2xl mx-auto">
              Examples of our high-quality print work across different product types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Print Gallery Items - Stand-in images */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="aspect-square relative">
                  <Image
                    src={pageImages.showcase}
                    alt={`Print lab product showcase ${item} - Professional quality printing examples including banners, posters, business cards, stickers, and other print materials`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" className="border-white text-foreground hover:bg-white hover:text-black">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything In Between */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              And Everything In Between
            </h2>
            <p className="text-lg text-foreground/70 font-body mb-8">
              If you can think of it, we can print it. From custom sizes to unique materials, 
              we're equipped to handle any printing challenge you throw our way.
            </p>
            <div className="bg-background rounded-2xl p-8 mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-foreground/70 font-body">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Custom Sizes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Specialty Materials</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Large Format</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Rush Orders</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Die Cutting</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Lamination</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p>Foil Stamping</p>
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
              Ready to Print Your Vision?
            </h2>
            <p className="text-lg text-foreground/70 font-body mb-12">
              Let's bring your designs to life with our professional printing services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <Link href="/contact">Print With Us</Link>
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
