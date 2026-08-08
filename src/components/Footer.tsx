import React, { useState } from 'react';
import { Phone, MapPin, Mail, MessageSquare, ShieldCheck, Instagram, Facebook, CreditCard, ArrowRight } from 'lucide-react';
import logoImg from '../assets/images/mujtaba_gold_logo_1786177848393.jpg';

interface FooterProps {
  onOpenLocation: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLocation, onSelectCategory }) => {
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub) {
      setSubSuccess(true);
      setEmailSub('');
      setTimeout(() => setSubSuccess(false), 4000);
    }
  };

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          {/* Col 1: Brand Info & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-amber-300/40 p-0.5 overflow-hidden bg-white shadow-md">
                <img
                  src={logoImg}
                  alt="Mujtaba Designer Logo"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-ethnocentric text-xl font-bold tracking-[0.35em] text-slate-950 uppercase leading-tight">
                  MUJTABA DESIGNER
                </span>
                <span className="text-[9px] tracking-[0.5em] text-slate-500 font-semibold uppercase">
                  HAUTE COUTURE
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Pakistan's premier haute couture fashion house. Specializing in bespoke zardozi sherwanis, luxury velvet couture, and bridal ensembles.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/923318858108"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 flex items-center justify-center transition-colors"
                title="WhatsApp Support"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="tel:03318858108"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:bg-amber-800 text-white flex items-center justify-center transition-colors"
                title="Call Support"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenLocation}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:bg-amber-800 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Store Pickup"
              >
                <MapPin className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.instagram.com/mujtaba_designers_?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-900 flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1EGmNs7afC/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@mujtabadesigenero?_r=1&_t=ZS-98iWriHXdFE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors text-[11px] font-bold uppercase"
                title="TikTok"
              >
                tt
              </a>
            </div>
          </div>

          {/* Col 2: Luxury Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold tracking-[0.3em] text-slate-900 uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('COUTURE')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bridal Couture & Heritage Embroidery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('COUTURE')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bespoke Bridal Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('VELVET EDITION')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Velvet Heritage Edition
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('LUXURY LAWN')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luxury Lawn & Chiffon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('FESTIVE PRET')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Festive Pret & Kurta Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold tracking-[0.3em] text-slate-900 uppercase">
              Boutique Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:03318858108" className="hover:text-white">
                  WhatsApp / Call: 03318858108
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>shayan.webdev.pk@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Rabi Saddar, Adam Jee Road, Rawalpindi, Pakistan</span>
              </li>
              <li>
                <a
                  href="https://share.google/ObTR5vvNsyNTTRQAB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  View Location on Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: VIP Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold tracking-[0.3em] text-slate-900 uppercase">
              VIP Privileges
            </h4>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Subscribe to receive exclusive access to private bridal runway previews and custom stitching offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex border border-slate-800 bg-slate-900 rounded-lg overflow-hidden">
                <input
                  type="email"
                  required
                  placeholder="Enter your Gmail..."
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-transparent text-white focus:outline-none placeholder-stone-500"
                />
                <button
                  type="submit"
                  className="px-3 bg-black hover:bg-amber-900 text-white font-bold text-xs uppercase transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subSuccess && (
                <p className="text-[11px] text-emerald-400">
                  Thank you for subscribing to Mujtaba Designer VIP updates.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© 2026 MUJTABA DESIGNER. All Rights Reserved. Haute Couture Edition.</p>
          <div className="flex flex-wrap gap-6 uppercase tracking-[0.2em] text-[9px] font-semibold">
            <span>100% Authentic Handcraft</span>
            <span>Worldwide Express Delivery</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Floating Sticky WhatsApp Quick Button */}
      <a
        href="https://wa.me/923318858108"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600/90 hover:bg-emerald-600 backdrop-blur-md text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all hover:scale-110 border border-emerald-400/30"
        title="Chat on WhatsApp: 03318858108"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold uppercase tracking-wider pr-1">
          WhatsApp 03318858108
        </span>
      </a>
    </footer>
  );
};
