"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "How do I book a sports facility?",
    answer:
      "Simply browse the facilities, filter by your preferred sport, date, and time, then pick a slot. Confirm your booking with a secure payment and you'll get an instant digital pass.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We support all major debit and credit cards as well as popular digital wallets. Every payment is processed securely with instant confirmation on your booking.",
  },
  {
    question: "Can I cancel or refund my booking?",
    answer:
      "Yes. You can cancel your booking from your dashboard up to 24 hours before the scheduled time. Refunds are processed back to your original payment method within 3–5 business days.",
  },
  {
    question: "Can I reschedule my booking to another slot?",
    answer:
      "Absolutely. As long as your preferred new time slot is available, you can reschedule from your dashboard anytime before the start of your booking.",
  },
  {
    question: "Are equipment and amenities included?",
    answer:
      "Each facility lists its available amenities, from changing rooms to equipment rental. Check the facility details page before booking to see exactly what's included.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Reach out through the contact section on our site or email our support team. We typically respond within a few hours and are happy to help with any questions.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-brand-secondary dark:text-slate-400">
            Everything you need to know about booking on SportNest.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-[#F4F5F7] dark:bg-slate-800 dark:border dark:border-white/10 rounded-xl overflow-hidden transition-colors ${
                  isOpen ? "border border-cyan-500/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">
                    {faq.question}
                  </h3>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-cyan-400 to-sky-600 text-white rotate-180"
                        : "bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-gray-500 dark:text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
