import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

// Brand Colors
// Red: #C1272D
// Teal: #48B2A9
// Orange: #E8AB36
// Grey: #7E8083
// Theme Background: #EBF3F5 (Derived from reference image)

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Pillars', path: '/pillars' },
    { name: 'News & Events', path: '/news' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#EBF3F5] text-[#1A1A1A]">
      {/* Header - Minimalist */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#EBF3F5]/90 backdrop-blur-sm transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-24 border-b border-[#1A1A1A]/10">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src="/src/assets/logo.png" alt="Alfeco Foundation Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    "text-sm font-medium tracking-wide uppercase transition-colors hover:text-[#C1272D]",
                    location.pathname === link.path ? "text-[#C1272D]" : "text-[#1A1A1A]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="px-6 py-2 border border-[#1A1A1A] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors">
                Donate
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#1A1A1A]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Menu</span>
              {isMenuOpen ? <X /> : <span className="text-xs font-bold uppercase tracking-widest border border-[#1A1A1A] px-3 py-1 rounded-full">Menu</span>}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#EBF3F5] fixed inset-0 top-24 z-40 overflow-y-auto"
            >
              <nav className="flex flex-col p-8 gap-6 items-center text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-light text-[#1A1A1A] hover:text-[#C1272D]"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="mt-8 px-10 py-4 bg-[#1A1A1A] text-white text-sm font-bold uppercase tracking-widest rounded-full">
                  Donate
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer - Clean Editorial Style */}
      <footer className="bg-[#EBF3F5] text-[#1A1A1A] pt-20 pb-10 border-t border-[#1A1A1A]/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-full bg-[#C1272D]" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#7E8083]">
                    Alfeco
                  </span>
                  <span className="text-sm font-semibold tracking-[0.18em] uppercase text-[#1A1A1A]">
                    Foundation
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-2xl font-serif font-normal leading-relaxed mb-8">
                Empowering communities through compassion, collaboration, and practical solutions.
              </h3>
              <div className="flex gap-6">
                <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-[#C1272D]">Facebook</a>
                <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-[#C1272D]">Twitter</a>
                <a href="#" className="text-sm font-bold uppercase tracking-widest hover:text-[#C1272D]">Instagram</a>
              </div>
            </div>

            <div className="md:col-span-1 flex flex-col gap-4 text-sm text-[#7E8083]">
              <p>123 Alfeco Way<br />Industrial Park, Johannesburg</p>
              <p>+27 11 123 4567<br />info@alfecofoundation.org</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-4 text-[10px] uppercase tracking-widest text-[#7E8083]">
            <p>&copy; {new Date().getFullYear()} ALFECO FOUNDATION</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-[#1A1A1A]">Privacy</Link>
              <Link to="/terms" className="hover:text-[#1A1A1A]">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
