"use client";

import { useId, useState } from "react";
import faqData from "./faq-data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="section relative">
      {/* subtle glow for section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-16 left-[12%] h-[260px] w-[260px] rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.08)" }}
        />
      </div>

      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title text-slate-900">
            Частые <span style={{ color: "#FE6900" }}>вопросы</span>
          </h2>
          <p className="section-subtitle">
            Коротко отвечаем на то, что обычно спрашивают пользователи и партнёры.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {faqData.map((item, index) => {
            const isOpen = index === openIndex;
            const panelId = `${baseId}-faq-panel-${index}`;
            const buttonId = `${baseId}-faq-button-${index}`;

            return (
              <div
                key={item.question}
                className={[
                  "korzina-glass rounded-2xl shadow-soft overflow-hidden",
                  "transition",
                  isOpen ? "ring-1 ring-black/5" : "hover:ring-1 hover:ring-black/5",
                ].join(" ")}
              >
                {/* Header button */}
                <button
                  id={buttonId}
                  type="button"
                  className="w-full text-left px-4 py-3 md:px-5 md:py-4"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-semibold text-sm md:text-base text-slate-900">
                      {item.question}
                    </div>

                    {/* Chevron icon (no libs) */}
                    <span
                      className={[
                        "shrink-0 inline-flex items-center justify-center",
                        "h-9 w-9 rounded-full",
                        "border border-black/10 bg-white/50",
                        "transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="#FE6900"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </button>

                {/* Animated panel */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={[
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  ].join(" ")}
                >
                  <div className="min-h-0">
                    <div className="px-4 pb-4 md:px-5 md:pb-5 text-sm text-slate-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>

                {/* Divider (subtle) */}
                <div className="h-px bg-black/5" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
