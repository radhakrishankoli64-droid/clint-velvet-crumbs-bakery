import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are your cakes 100% eggless?',
      a: 'Yes! We maintain a dedicated 100% eggless bakery kitchen line with strict separate utensils and pans. All items marked "Eggless" contain zero egg traces.'
    },
    {
      q: 'How far in advance should I place my order for custom cakes?',
      a: 'Standard artisanal cakes can be delivered same-day if ordered before 2:00 PM. For elaborate multi-tier wedding or tiered custom cakes, we recommend ordering 48 hours in advance.'
    },
    {
      q: 'How long does your 36-hour sourdough stay fresh?',
      a: 'Our natural sourdough stays fresh for up to 4 days at room temperature in a linen bread bag, or up to 2 weeks sliced in the freezer. Toast before serving for maximum crust crispness!'
    },
    {
      q: 'Which cities do you deliver to in India?',
      a: 'We currently operate flagship ateliers offering cold-chain express delivery across Mumbai, Delhi NCR, and Bengaluru.'
    },
    {
      q: 'What is your refund and cancellation policy?',
      a: 'Cancellations made 24 hours prior to the scheduled delivery time receive a 100% instant refund or Velvet Crumbs points credit.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <HelpCircle className="w-10 h-10 text-[#D4AF37] mx-auto" />
        <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-[#F3E5AB]">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-500 text-xs">Everything you need to know about delivery, eggless recipes & custom orders.</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white dark:bg-[#201815] border border-stone-200 dark:border-stone-800 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex justify-between items-center gap-2"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800/50 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
