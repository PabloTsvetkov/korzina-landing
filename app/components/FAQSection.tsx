"use client";

import { useState } from "react";
import faqData from "./faq-data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-page">
        <h2 className="section-title text-korzina-primary">Частые вопросы</h2>
        <p className="section-subtitle text-korzina-textMuted">
          Коротко отвечаем на то, что обычно спрашивают пользователи и партнёры.
        </p>

        <div className="mt-8 space-y-3">
          {faqData.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <button
                key={item.question}
                className="w-full text-left rounded-2xl border border-korzina-primary/20 bg-korzina-surface px-4 py-3 md:px-5 md:py-4 hover:border-korzina-primary/40 transition"
                // className="w-full text-left rounded-2xl border bg-korzina-surface px-4 py-3 md:px-5 md:py-4"
                onClick={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-medium text-sm md:text-base text-korzina-text">
                    {item.question}
                  </div>
                  <span className="text-xl text-korzina-primary">
                    {isOpen ? "−" : "+"}
                    {/* + */}
                  </span>
                </div>

                {isOpen && (
                  <div className="mt-2 text-sm text-korzina-textMuted">
                  {/* <div className="font-medium text-sm md:text-base text-korzina-text"> */}
                    {item.answer}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
