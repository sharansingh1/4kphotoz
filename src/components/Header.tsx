'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    { name: 'Gallery', href: 'https://gallery.4kphotoz.com/' },
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
          <Link href="/" className="flex items-center group mr-8">
            <Image
              src="/logo.png"
              alt="4kphotoz Logo"
              width={120}
              height={120}
              className="w-24 h-24 lg:w-32 lg:h-32 group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-accent font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button asChild className="gradient-bg hover:opacity-90 transition-opacity duration-200">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground hover:text-primary transition-colors duration-200"
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
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <Button asChild className="w-full gradient-bg hover:opacity-90 transition-opacity duration-200">
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
