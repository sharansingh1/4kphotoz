import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Monitor, User, Clock, Star, CheckCircle, Zap, Users, Smile, Gift } from "lucide-react";

export const metadata = {
  title: "Photo Booth Rental Services - 4kphotoz LLC",
  description: "Instant memories, endless smiles. Modern, fun, and customizable photo booths for any event. Mirror booth and stationary booth options available.",
  keywords: "photo booth rental, mirror booth, stationary booth, event photography, instant prints, California, Bay Area, party rental",
};

export default function PhotoBoothPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Photo Booth
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-body mb-8">
              Instant memories, <span className="gradient-text">endless smiles.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <Link href="/contact">Book Your Booth</Link>
              </Button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Booth Options */}
      <section id="booths" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Choose Your Booth Experience
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              Two amazing options to bring fun and memories to your event
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mirror Booth */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src="/nature.jpg"
                  alt="Sleek, interactive mirror booth with touchscreen interface - modern photo booth rental with custom templates and unlimited instant prints"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-primary/90 text-white px-4 py-2 rounded-lg text-center font-accent font-semibold">
                    $75/hour
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Monitor className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">Mirror Booth with Prints</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">Sleek, interactive mirror booth with touchscreen</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">Custom templates and unlimited instant prints</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">Online gallery included</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">Perfect for selfie lovers and tech-savvy guests</p>
                  </div>
                </div>

                <Button asChild className="w-full gradient-bg hover:opacity-90">
                  <Link href="/contact">Book Mirror Booth</Link>
                </Button>
              </div>
            </div>

            {/* Stationary Booth */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src="/nature.jpg"
                  alt="Photographer-run stationary booth with custom backdrops and professional lighting - traditional photo booth experience with digital delivery"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-primary/90 text-white px-4 py-2 rounded-lg text-center font-accent font-semibold">
                    $100/hour
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">Stationary Booth with Photographer</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">Photographer-run booth with custom backdrops and lighting</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">All photos delivered digitally after the event</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">Online gallery included</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-white/70 font-body">Professional guidance and posing assistance</p>
                  </div>
                </div>

                <Button asChild className="w-full gradient-bg hover:opacity-90">
                  <Link href="/contact">Book Stationary Booth</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Why Choose Our Photo Booths
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              Modern technology meets fun experiences for unforgettable memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-white mb-4">Instant Fun</h3>
              <p className="text-white/70 font-body text-sm">
                Immediate prints and digital sharing for instant gratification and social media buzz.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-white mb-4">Group Friendly</h3>
              <p className="text-white/70 font-body text-sm">
                Accommodates groups of all sizes with props and backdrops for everyone to enjoy.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Smile className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-white mb-4">Customizable</h3>
              <p className="text-white/70 font-body text-sm">
                Personalized templates, backdrops, and props to match your event theme perfectly.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-accent font-semibold text-white mb-4">Memories Forever</h3>
              <p className="text-white/70 font-body text-sm">
                Digital gallery access ensures everyone can relive the fun long after the event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Perfect for Any Event
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              From intimate gatherings to large celebrations, our photo booths add fun to every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Types - Stand-in images */}
            {[
              { name: "Weddings", description: "Capture the joy and love of your special day" },
              { name: "Birthday Parties", description: "Make every birthday celebration unforgettable" },
              { name: "Corporate Events", description: "Add fun to team building and company gatherings" },
              { name: "School Events", description: "Perfect for proms, graduations, and school celebrations" },
              { name: "Holiday Parties", description: "Bring festive cheer to any holiday gathering" },
              { name: "Anniversaries", description: "Celebrate milestones with lasting memories" }
            ].map((event, index) => (
              <div key={index} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="aspect-video relative">
                  <Image
                    src="/nature.jpg"
                    alt={`Photo booth rental for ${event.name.toLowerCase()} - ${event.description} with professional photo booth services`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-accent font-semibold text-white mb-2">{event.name}</h3>
                  <p className="text-white/70 font-body text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Packages */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              No hidden fees, no surprises. Just great value for amazing memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Mirror Booth</h3>
              <div className="text-4xl font-display font-bold text-primary mb-6">$75<span className="text-lg text-gray-400">/hour</span></div>
              <ul className="space-y-3 text-white/70 font-body text-left mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Interactive touchscreen interface</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Unlimited instant prints</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Custom templates and branding</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Online gallery access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Props and backdrops included</span>
                </li>
              </ul>
              <Button asChild className="w-full gradient-bg hover:opacity-90">
                <Link href="/contact">Book Now</Link>
              </Button>
            </div>

            <div className="bg-black rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">Stationary Booth</h3>
              <div className="text-4xl font-display font-bold text-primary mb-6">$100<span className="text-lg text-gray-400">/hour</span></div>
              <ul className="space-y-3 text-white/70 font-body text-left mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Professional photographer included</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Custom backdrops and lighting</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Digital delivery after event</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Online gallery access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Posing guidance and assistance</span>
                </li>
              </ul>
              <Button asChild className="w-full gradient-bg hover:opacity-90">
                <Link href="/contact">Book Now</Link>
              </Button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-white/70 font-body mb-4">Need a custom package or have questions?</p>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
}
