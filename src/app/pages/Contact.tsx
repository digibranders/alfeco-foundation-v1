import React from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

// Theme: Minimal Editorial
// Background: #EBF3F5
// Text: #1A1A1A

export function Contact() {
  return (
    <div className="min-h-screen bg-[#EBF3F5] text-[#1A1A1A] font-sans pt-12 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#1A1A1A]/10 pb-8">
          <h1 className="text-4xl md:text-7xl font-serif font-normal">Get In Touch</h1>
          <p className="text-[#7E8083] mt-4 md:mt-0 max-w-md text-right text-lg font-light font-sans">
            We'd love to hear from you. Questions, volunteering, or just saying hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info - Clean List */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-[#C1272D]">Visit Us</h3>
              <p className="text-2xl font-light leading-relaxed">
                123 Alfeco Way,<br />
                Industrial Park,<br />
                Johannesburg
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-[#C1272D]">Contact</h3>
              <p className="text-xl font-light mb-2 hover:text-[#C1272D] transition-colors cursor-pointer">
                +27 11 123 4567
              </p>
              <p className="text-xl font-light hover:text-[#C1272D] transition-colors cursor-pointer">
                info@alfecofoundation.org
              </p>
            </div>

            <div className="pt-8 border-t border-[#1A1A1A]/10">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Follow Us</h3>
              <div className="flex gap-4 text-[#7E8083]">
                 <a href="#" className="hover:text-[#1A1A1A]">Facebook</a>
                 <a href="#" className="hover:text-[#1A1A1A]">LinkedIn</a>
                 <a href="#" className="hover:text-[#1A1A1A]">Instagram</a>
              </div>
            </div>
          </div>

          {/* Contact Form - Minimal Inputs */}
          <div className="lg:col-span-8">
            <form className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                <div className="group mb-8">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#7E8083] mb-2 group-focus-within:text-[#1A1A1A]">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-4 text-xl font-light focus:border-[#C1272D] outline-none transition-colors" placeholder="John" />
                </div>
                <div className="group mb-8">
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#7E8083] mb-2 group-focus-within:text-[#1A1A1A]">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-4 text-xl font-light focus:border-[#C1272D] outline-none transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="group mb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#7E8083] mb-2 group-focus-within:text-[#1A1A1A]">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-4 text-xl font-light focus:border-[#C1272D] outline-none transition-colors" placeholder="john@example.com" />
              </div>

              <div className="group mb-12">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#7E8083] mb-2 group-focus-within:text-[#1A1A1A]">Message</label>
                <textarea rows={3} className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-4 text-xl font-light focus:border-[#C1272D] outline-none transition-colors resize-none" placeholder="How can we help?"></textarea>
              </div>

              <button type="submit" className="bg-[#1A1A1A] text-white font-bold py-5 px-12 uppercase tracking-widest hover:bg-[#C1272D] transition-colors flex items-center gap-4 group w-full md:w-auto justify-between">
                Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
