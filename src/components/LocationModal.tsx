import React from 'react';
import { X, MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, ShieldCheck } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-white/90 backdrop-blur-2xl rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-white/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-950/90 text-white p-5 flex justify-between items-center border-b border-slate-800/80">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block mb-0.5">
              MUJTABA DESIGNER
            </span>
            <h3 className="font-serif text-xl font-bold tracking-wide">Boutique Locations & Store Pickup</h3>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Map Box */}
          <div className="border border-stone-200 overflow-hidden relative shadow-xs">
            <iframe
              title="Mujtaba Designer Boutique Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.378776856012!2d74.34863267683935!3d31.51375624747754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f6690460bf%3A0x6b772412e693172e!2sGulberg%20III%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-3 bg-slate-900 text-white text-xs flex justify-between items-center">
              <span className="font-medium flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Main Flagship Store: Gulberg III Boulevard, Lahore
              </span>
              <a
                href="https://maps.google.com/?q=Gulberg+III+Lahore"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-800 hover:bg-amber-900 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1"
              >
                Open in Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Contact Details & Direct Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <h4 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-amber-800" /> Direct Support & Appointments
              </h4>
              <p className="text-stone-600">
                Contact our VIP couture stylists for custom fitting, bridal appointments, and order inquiries.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://wa.me/923318858108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold uppercase tracking-wider text-[11px] flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Direct WhatsApp: 03318858108
                </a>

                <a
                  href="tel:03318858108"
                  className="w-full py-2.5 bg-slate-900 hover:bg-amber-800 text-white font-bold uppercase tracking-wider text-[11px] flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-300" /> Call Direct: 03318858108
                </a>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <h4 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-800" /> Boutique Hours
              </h4>
              <ul className="space-y-1.5 text-stone-700">
                <li className="flex justify-between border-b border-stone-200 pb-1">
                  <span>Monday - Saturday:</span>
                  <span className="font-bold">11:00 AM - 9:30 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-200 pb-1">
                  <span>Sunday:</span>
                  <span className="font-bold">2:00 PM - 9:00 PM</span>
                </li>
                <li className="flex justify-between pt-1 text-amber-900 font-semibold">
                  <span>Custom Stitching Consultation:</span>
                  <span>By Appointment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-stone-100 border-t border-stone-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-amber-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
