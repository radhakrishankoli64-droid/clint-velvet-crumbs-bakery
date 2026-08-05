import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { BAKERY_LOCATIONS } from '../data/mockData';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[#D4AF37] font-semibold uppercase tracking-widest text-xs">
          Connect With Velvet Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          Contact Us & Custom Cake Inquiry
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Locations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#201815] border border border-[#D4AF37]/20 space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-[#F3E5AB]">
              Concierge Contact
            </h3>
            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                +91 (022) 4900 8822 (9:00 AM - 9:00 PM IST)
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                concierge@velvetcrumbs.in
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-[#F3E5AB]">
              Flagship Ateliers
            </h3>
            {BAKERY_LOCATIONS.map(loc => (
              <div key={loc.id} className="p-4 rounded-2xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 text-xs">
                <p className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {loc.name}
                </p>
                <p className="text-stone-500 mt-1">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Custom Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#201815] border border-[#D4AF37]/30 shadow-xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-[#F3E5AB]">
              Book Custom Wedding or Tiered Cake Consultation
            </h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                <p className="font-bold text-sm">Consultation Request Received!</p>
                <p>Our Master Pastry Chef will reach out to you via WhatsApp / Phone within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Your Name *</label>
                    <input type="text" required placeholder="e.g. Radhika Sharma" className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Phone Number *</label>
                    <input type="tel" required placeholder="+91 98765 43210" className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Event Date *</label>
                    <input type="date" required className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700" />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Estimated Guests *</label>
                    <input type="number" placeholder="e.g. 50" className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Describe Theme & Flavors *</label>
                  <textarea rows={4} required placeholder="Describe desired cake design, dietary constraints (100% Eggless), or flavor preferences..." className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-[#2A1D19] border border-stone-300 dark:border-stone-700" />
                </div>

                <button type="submit" className="w-full py-3.5 rounded-2xl bg-[#5D4037] text-[#D4AF37] font-bold text-xs hover:bg-[#4A322B] shadow-md flex items-center justify-center gap-2">
                  <span>Send Consultation Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
