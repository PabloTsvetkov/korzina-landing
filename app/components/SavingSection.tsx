// app/components/SavingSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const ORANGE = "#FE6900";

type Feature = {
  tag: string; // оранжевый заголовок карточки
  title: string; // можно использовать позже, если захочешь
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function SavingSection() {
  const features: Feature[] = useMemo(
    () => [
      {
        tag: "Сравнение корзины",
        title: "Считаем корзину целиком",
        description:
          "Считаем итоговую сумму всей корзины в разных магазинах, а не один товар в вакууме.",
        imageSrc: "/phoneCartPortrait.png",
        imageAlt: "Экран сравнения корзины",
      },
      {
        tag: "Доставка",
        title: "Учитываем доставку",
        description:
          "Сравнение честное: товары + доставка + условия по времени и адресу — в одном расчёте.",
        imageSrc: "/phoneShopsPortrait.png",
        imageAlt: "Экран доставки и магазинов",
      },
      {
        tag: "Акции и промо",
        title: "Подтягиваем скидки",
        description:
          "Если есть промокоды или акции — они учитываются автоматически и влияют на итог.",
        imageSrc: "/phoneCatalogPortrait.png",
        imageAlt: "Экран каталога и промо",
      },
      {
        tag: "Сценарии",
        title: "Показываем лучшие варианты",
        description:
          "2–3 сценария под твой приоритет: дешевле / быстрее / удобнее — без хаоса.",
        imageSrc: "/phoneCartPortrait.png",
        imageAlt: "Экран сценариев",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate каждые 5 секунд (если пользователь не “наводит”)
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      setActive((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, [paused, features.length]);

  return (
    <section id="can" className="section relative">
      {/* subtle glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 left-[8%] h-[320px] w-[320px] rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.08)" }}
        />
      </div>

      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title text-slate-900">
            Какие наши <span style={{ color: ORANGE, fontSize: '1.1' }}>возможности</span>
          </h2>
          <p className="section-subtitle">
            Одна и та же корзина может стоить по-разному из-за цен, доставки и
            промо. Корзина считает итоговую стоимость и показывает, где реально
            выгоднее.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 items-stretch">
          <div
            className="space-y-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {features.map((f, idx) => {
              const isActive = idx === active;

              return (
                <button
                  key={f.tag}
                  type="button"
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  className={[
                    "w-full text-left",
                    "rounded-3xl",
                    "px-6 py-5 md:px-7 md:py-6",
                    "border border-black/5",
                    "transition-all duration-300 ease-out",
                    "shadow-soft",
                    isActive ? "bg-[rgba(254,105,0,0.95)]" : "bg-white",
                    "hover:bg-[rgba(254,105,0,0.95)]",
                    "group",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className={[
                          "text-sm md:text-base font-bold uppercase tracking-wide",
                          "transition-colors duration-300",
                          isActive ? "text-white" : "text-[rgba(254,105,0,1)]",
                          "group-hover:text-white",
                        ].join(" ")}
                      >
                        {f.tag}
                      </div>

                      <div
                        className={[
                          "mt-2 text-sm  md:text-base leading-relaxed",
                          "transition-colors duration-300",
                          isActive ? "text-white/90" : "text-slate-600",
                          "group-hover:text-white/90",
                        ].join(" ")}
                      >
                        {f.description}
                      </div>
                    </div>

                    {/* small indicator */}
                    <span
                      aria-hidden
                      className={[
                        "mt-1 inline-flex h-[12px] w-[16px] rounded-full transition",
                        isActive ? "bg-white" : "bg-black/10 group-hover:bg-white",
                      ].join(" ")}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: image panel */}
          <div className="rounded-[36px] bg-white border border-black/5 shadow-soft p-6 md:p-8 relative overflow-hidden min-h-[360px] lg:min-h-[520px] flex items-center justify-center">
            {/* subtle inner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl"
              style={{ background: "rgba(254,105,0,0.10)" }}
            />

            {/* Crossfade images */}
            <div className="relative w-full h-full flex items-center justify-center">
              {features.map((f, idx) => {
                const isShown = idx === active;
                return (
                  <div
                    key={f.imageSrc + idx}
                    className={[
                      "absolute inset-0 flex items-center justify-center",
                      "transition-opacity duration-500 ease-out",
                      isShown ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    aria-hidden={!isShown}
                  >
                    <Image
                      src={f.imageSrc}
                      alt={f.imageAlt}
                      width={420}
                      height={860}
                      className="w-[240px] md:w-[280px] lg:w-[320px] h-auto select-none"
                      priority={idx === 0}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
