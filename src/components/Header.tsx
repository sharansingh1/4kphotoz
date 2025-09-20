'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Photography', href: '/photography' },
    { name: 'Graphic Design', href: '/graphic-design' },
    { name: 'Print Lab', href: '/print-lab' },
    { name: 'Photo Booth', href: '/photo-booth' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl lg:text-3xl font-display font-bold text-white group-hover:gradient-text transition-all duration-300">
              4kphotoz
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary transition-colors duration-200 font-accent font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-white/80 font-body">
              <a
                href="mailto:info@4kphotoz.com"
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>info@4kphotoz.com</span>
              </a>
              <a
                href="tel:+15108281061"
                className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                <span>(510) 828-1061</span>
              </a>
            </div>
            <Button asChild className="gradient-bg hover:opacity-90 transition-opacity duration-200">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-primary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden glass backdrop-blur-md rounded-lg mt-2 p-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/20">
                <div className="flex flex-col space-y-3 text-sm text-white/80">
                  <a
                    href="mailto:info@4kphotoz.com"
                    className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@4kphotoz.com</span>
                  </a>
                  <a
                    href="tel:+15108281061"
                    className="flex items-center space-x-2 hover:text-primary transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(510) 828-1061</span>
                  </a>
                </div>
                <Button asChild className="w-full mt-4 gradient-bg hover:opacity-90 transition-opacity duration-200">
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
