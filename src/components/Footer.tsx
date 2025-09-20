import Link from 'next/link';
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Photography', href: '/photography' },
      { name: 'Graphic Design', href: '/graphic-design' },
      { name: 'Print Lab', href: '/print-lab' },
      { name: 'Photo Booth', href: '/photo-booth' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Portraits', href: '/photography#portraits' },
      { name: 'Events', href: '/photography#events' },
      { name: 'Sports', href: '/photography#sports' },
      { name: 'Media Day', href: '/photography#media-day' },
      { name: 'Logos', href: '/graphic-design#logos' },
      { name: 'Posters', href: '/graphic-design#posters' },
      { name: 'Banners', href: '/print-lab#banners' },
      { name: 'Business Cards', href: '/print-lab#business-cards' },
    ],
  };

  const social = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/4kphotoz',
      icon: Instagram,
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/4kphotoz',
      icon: Facebook,
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@4kphotoz',
      icon: Youtube, // Using Youtube icon as placeholder for TikTok
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@4kphotoz',
      icon: Youtube,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/4kphotoz',
      icon: Linkedin,
    },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-display font-bold text-white mb-4">4kphotoz</div>
            <p className="text-white/70 font-body text-sm leading-relaxed mb-6">
              Creative solutions, born in the Bay. Your #1 photography and print solution serving California with blazing fast turnaround times.
            </p>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>25509 Industrial Blvd, O10<br />Hayward, CA 94545</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+15108281061" className="hover:text-white transition-colors duration-200">
                  (510) 828-1061
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@4kphotoz.com" className="hover:text-white transition-colors duration-200">
                  info@4kphotoz.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-accent font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-body"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-accent font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-body"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white font-accent font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <p className="mb-2">Ready to get started?</p>
              <Link
                href="/contact"
                className="inline-flex items-center text-primary hover:text-white transition-colors duration-200 font-medium"
              >
                Get a quote today →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} 4kphotoz LLC. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
