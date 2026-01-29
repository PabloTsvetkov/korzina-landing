// app/components/CompareSection.tsx
"use client";

import Image from "next/image";

const ORANGE = "#FE6900";

type Item = { text: string };

export default function CompareSection() {
  const korzinaItems: Item[] = [
    { text: "Собираешь корзину один раз — мы сравниваем цены" },
    { text: "Считаем итог: товары + доставка + акции" },
    { text: "Показываем несколько наиболее подходящих вариантов" },
  ];

  const manualItems: Item[] = [
    { text: "Переключаешься между несколькими приложениями магазинов" },
    { text: "Собираешь одну и ту же корзину каждый раз заново" },
    { text: "Легко пропустить самый выгодный вариант" },
  ];

  return (
    <section id="compare" className="section relative">
      <div className="container-page">
        <div className="rounded-[40px] bg-white border border-black/5 shadow-soft overflow-hidden">
          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="max-w-3xl">
              <h2 className="section-title text-slate-900">
                Вручную или с{" "}
                <span style={{ color: ORANGE, fontSize: "1.1em" }}>Корзиной</span>?
              </h2>
              <p className="section-subtitle">
                Сравнение подходов — почему с Корзиной быстрее, проще и понятнее выбрать лучший вариант.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* With Korzina */}
              <div className="rounded-[28px] border border-black/5 bg-white p-7 md:p-8 shadow-soft ring-1 ring-[rgba(254,105,0,0.18)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg md:text-xl font-semibold text-slate-900">
                      С <span style={{ color: ORANGE }}>Корзиной</span>
                    </div>
                    <div className="mt-1 text-base md:text-lg text-slate-600">
                      Быстро и понятно
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className="mt-2 inline-flex h-3.5 w-3.5 rounded-full"
                    style={{ background: "rgba(254,105,0,0.22)" }}
                  />
                </div>

                <ul className="mt-7 space-y-5">
                  {korzinaItems.map((it) => (
                    <li key={it.text} className="flex gap-4">
                      <Image
                        src="/icons/fullBasketGreen.png"
                        alt=""
                        width={28}
                        height={28}
                        className="mt-1 shrink-0 w-[28px] h-[28px]"
                      />
                      <span className="text-[16px] md:text-[18px] leading-relaxed text-slate-900 font-semibold">
                        {it.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Manual */}
              <div className="rounded-[28px] border border-black/5 bg-white p-7 md:p-8 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg md:text-xl font-semibold text-slate-900">
                      Вручную
                    </div>
                    <div className="mt-1 text-base md:text-lg text-slate-600">
                      Долго и невыгодно
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className="mt-2 inline-flex h-3.5 w-3.5 rounded-full bg-black/10"
                  />
                </div>

                <ul className="mt-7 space-y-5">
                  {manualItems.map((it) => (
                    <li key={it.text} className="flex gap-4">
                      <Image
                        src="/icons/emptyBasketRed.png"
                        alt=""
                        width={28}
                        height={28}
                        className="mt-1 shrink-0 w-[28px] h-[28px]"
                      />
                      <span className="text-[16px] md:text-[18px] leading-relaxed text-slate-800 font-semibold">
                        {it.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 h-px w-full bg-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
