'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pageImages, setPageImages] = useState({
    studio: '/nature.jpg',
  });

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How fast is your turnaround?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most photography projects are delivered within 24-72 hours. Print orders typically complete within 24-48 hours. We pride ourselves on our blazing fast turnaround times."
        }
      },
      {
        "@type": "Question", 
        "name": "Do you travel for events?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We serve all of California and are happy to travel for events. Contact us for travel quotes and availability for your location."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats do you provide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide high-resolution JPEG files by default, with RAW files available upon request. All files are optimized for both print and digital use."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer package deals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! We offer discounted packages for multiple services. Contact us to discuss custom packages that fit your needs and budget."
        }
      }
    ]
  };

  useEffect(() => {
    // Load admin-configured images
    fetch('/api/admin/settings')
      .then(response => response.json())
      .then(data => {
        if (data.pageImages?.contact) {
          setPageImages(data.pageImages.contact);
        }
      })
      .catch(error => {
        console.log('Error loading page images:', error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 font-body mb-8">
              Ready to bring your vision to life? Let&apos;s discuss your project.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-accent font-semibold text-foreground mb-2">Address</h3>
                    <p className="text-foreground/70 font-body">
                      25509 Industrial Blvd, O10<br />
                      Hayward, CA 94545
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-accent font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-foreground/70 font-body">
                      <a href="tel:+15108281061" className="hover:text-primary transition-colors duration-200">
                        (510) 828-1061
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-accent font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-foreground/70 font-body">
                      <a href="mailto:info@4kphotoz.com" className="hover:text-primary transition-colors duration-200">
                        info@4kphotoz.com
                      </a>
                    </p>
                    <p className="text-foreground/70 font-body">
                      <a href="mailto:support@4kphotoz.com" className="hover:text-primary transition-colors duration-200">
                        support@4kphotoz.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-accent font-semibold text-foreground mb-2">Business Hours</h3>
                    <p className="text-foreground/70 font-body">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* Background Image */}
              <div className="mt-12 aspect-video relative rounded-2xl overflow-hidden">
                <Image
                  src={pageImages.studio}
                  alt="4kphotoz LLC studio and office location in Hayward, California - professional photography and print services facility"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-background/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-black/60 backdrop-blur-sm px-8 py-6 rounded-2xl border border-white/20">
                    <h3 className="text-2xl font-display font-bold mb-2 text-white">Visit Our Studio</h3>
                    <p className="text-lg text-white/90">See our equipment and meet our team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-900/20 border border-green-500/50 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-foreground/70 font-body">
                      Thank you for your message. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="photography">Photography</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="print-lab">Print Lab</option>
                        <option value="photo-booth">Photo Booth</option>
                        <option value="multiple">Multiple Services</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Tell us about your project, event details, or any questions you have..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-bg hover:opacity-90 text-lg py-4"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/70 font-body max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background rounded-2xl p-8">
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">How fast is your turnaround?</h3>
              <p className="text-foreground/70 font-body">
                Most photography projects are delivered within 24-72 hours. Print orders typically complete within 24-48 hours. We pride ourselves on our blazing fast turnaround times.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8">
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Do you travel for events?</h3>
              <p className="text-foreground/70 font-body">
                Yes! We serve all of California and are happy to travel for events. Contact us for travel quotes and availability for your location.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8">
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">What file formats do you provide?</h3>
              <p className="text-foreground/70 font-body">
                We provide high-resolution JPEG files by default, with RAW files available upon request. All files are optimized for both print and digital use.
              </p>
            </div>

            <div className="bg-background rounded-2xl p-8">
              <h3 className="text-xl font-accent font-semibold text-foreground mb-4">Do you offer package deals?</h3>
              <p className="text-foreground/70 font-body">
                Absolutely! We offer discounted packages for multiple services. Contact us to discuss custom packages that fit your needs and budget.
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
