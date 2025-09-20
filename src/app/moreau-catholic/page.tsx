'use client';

import { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Bell, CheckCircle, Clock, Download, HelpCircle, Mail } from "lucide-react";

export default function MoreauCatholicPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    athleteName: '',
    sport: '',
    graduationYear: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Moreau Catholic alerts form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        parentName: '',
        email: '',
        phone: '',
        athleteName: '',
        sport: '',
        graduationYear: ''
      });
      setConsentChecked(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sports = [
    'Football', 'Basketball', 'Baseball', 'Softball', 'Soccer', 'Volleyball',
    'Tennis', 'Golf', 'Track & Field', 'Cross Country', 'Swimming', 'Water Polo',
    'Lacrosse', 'Wrestling', 'Cheerleading', 'Other'
  ];

  const graduationYears = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Welcome Moreau Catholic Families
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-body mb-8">
              Find photos from past games or sign up to get alerts when new galleries go live.
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Quick Access
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              Choose what you'd like to do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-6 h-auto">
              <a href="https://gallery.4kphotoz.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center space-y-4">
                <Camera className="w-12 h-12" />
                <div>
                  <div className="text-xl font-accent font-semibold">View Past Games</div>
                  <div className="text-sm opacity-90">Browse existing photo galleries</div>
                </div>
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto">
              <a href="#alerts-form" className="flex flex-col items-center space-y-4">
                <Bell className="w-12 h-12" />
                <div>
                  <div className="text-xl font-accent font-semibold">Get Alerts for Future Games</div>
                  <div className="text-sm opacity-90">Sign up for notifications</div>
                </div>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Photos */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Recent Action Shots
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              A preview of our latest captures from Moreau Catholic athletics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Photos - Stand-in images */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-gray-700 transition-all duration-300 hover:scale-105">
                <div className="aspect-video relative">
                  <Image
                    src="/nature.jpg"
                    alt={`Moreau Catholic athletics action shot ${item} - Professional sports photography capturing team spirit, athletic performance, and school pride`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      View Full Gallery
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alerts Form */}
      <section id="alerts-form" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Get Alerts for Future Games
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              Stay updated on new photo galleries and never miss a moment of your athlete's season
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-green-900/20 border border-green-500/50 rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-white/70 font-body">
                We'll notify you as soon as new galleries are posted.
              </p>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium text-white mb-2">
                      Parent Name *
                    </label>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                      Phone (for text alerts) *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="athleteName" className="block text-sm font-medium text-white mb-2">
                      Athlete Name (optional)
                    </label>
                    <input
                      type="text"
                      id="athleteName"
                      name="athleteName"
                      value={formData.athleteName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Athlete's name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="sport" className="block text-sm font-medium text-white mb-2">
                      Sport (optional)
                    </label>
                    <select
                      id="sport"
                      name="sport"
                      value={formData.sport}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a sport</option>
                      {sports.map((sport) => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="graduationYear" className="block text-sm font-medium text-white mb-2">
                      Graduation Year (optional)
                    </label>
                    <select
                      id="graduationYear"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select graduation year</option>
                      {graduationYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                  />
                  <label htmlFor="consent" className="text-sm text-white/70 font-body">
                    I agree to receive text and email updates about new photo galleries from 4kphotoz LLC. 
                    You can unsubscribe at any time.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !consentChecked}
                  className="w-full gradient-bg hover:opacity-90 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing Up...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span>Sign Up for Alerts</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-white/70 font-body max-w-2xl mx-auto">
              Everything you need to know about our Moreau Catholic photo services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black rounded-2xl p-8">
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-accent font-semibold text-white mb-4">When are photos posted?</h3>
                  <p className="text-white/70 font-body">
                    Photos are typically posted within 24–72 hours after an event. We work quickly to get your memories to you as soon as possible.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-8">
              <div className="flex items-start space-x-3">
                <Download className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-accent font-semibold text-white mb-4">Can I order prints?</h3>
                  <p className="text-white/70 font-body">
                    Yes! You can order prints directly from each gallery. We offer various sizes and finishes to suit your needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-8">
              <div className="flex items-start space-x-3">
                <Bell className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-accent font-semibold text-white mb-4">How will I know when my event is ready?</h3>
                  <p className="text-white/70 font-body">
                    We'll notify you by text and email the moment your event's gallery goes live. No need to keep checking!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-8">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-accent font-semibold text-white mb-4">Who do I contact for help?</h3>
                  <p className="text-white/70 font-body">
                    Email us at <a href="mailto:support@4kphotoz.com" className="text-primary hover:text-white transition-colors duration-200">support@4kphotoz.com</a> for any questions or assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
              Need Help or Have Questions?
            </h2>
            <p className="text-lg text-white/70 font-body mb-12">
              Our team is here to help with any questions about photos, galleries, or our services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-4">
                <a href="mailto:support@4kphotoz.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Support
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-4">
                <a href="tel:+15108281061">Call (510) 828-1061</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
