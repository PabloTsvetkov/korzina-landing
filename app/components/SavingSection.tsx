"use client";

import { useMemo, useState } from "react";

type StoreScenario = {
  name: string;
  total: number; // итог
  items: number; // товары
  delivery: number; // доставка
  promo: number; // скидка/промо (положительное число)
  badge?: string;
};

const ORANGE = "#FE6900";

export default function SavingSection() {
  // Демонстрационные числа (пока условные) — позже заменишь на реальные/пример из ресерча
  const scenarios: StoreScenario[] = useMemo(
    () => [
      {
        name: "Магазин A",
        items: 1710,
        delivery: 149,
        promo: 120,
        total: 1739,
        badge: "лучше по цене",
      },
      {
        name: "Магазин B",
        items: 1650,
        delivery: 249,
        promo: 80,
        total: 1819,
        badge: "быстрее",
      },
      {
        name: "Магазин C",
        items: 1760,
        delivery: 99,
        promo: 0,
        total: 1859,
        badge: "доставка дешевле",
      },
    ],
    [],
  );

  const minTotal = Math.min(...scenarios.map((s) => s.total));
  const maxTotal = Math.max(...scenarios.map((s) => s.total));

  const [mode, setMode] = useState<"manual" | "korzina">("korzina");

  return (
    <section id="saving" className="section relative">
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
            Где появляется <span style={{ color: ORANGE }}>экономия</span>
          </h2>
          <p className="section-subtitle">
            Одна и та же корзина может стоить по-разному из-за цен, доставки и
            промо. Корзина считает итоговую стоимость и показывает, где реально
            выгоднее.
          </p>
        </div>

        {/* === MAIN: demo + reasons (different layout than cards) === */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr,0.8fr] items-stretch">
          {/* DEMO PANEL */}
          <div className="korzina-glass rounded-3xl shadow-soft p-6 md:p-7 relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(254,105,0,0.12)" }}
            />

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Мини-пример расчёта
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    “Одинаковая” корзина → разные итоги в магазинах
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {scenarios.map((s) => {
                  const pct =
                    maxTotal === minTotal
                      ? 100
                      : 100 -
                        ((s.total - minTotal) / (maxTotal - minTotal)) * 35; // 65–100% ширина, красиво
                  const isBest = s.total === minTotal;

                  return (
                    <div
                      key={s.name}
                      className="rounded-2xl bg-white/50 border border-black/5 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-900">
                            {s.name}
                          </div>
                          {s.badge ? (
                            <span
                              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                              style={{
                                background: isBest
                                  ? "rgba(254,105,0,0.12)"
                                  : "rgba(0,0,0,0.04)",
                                color: isBest ? ORANGE : "rgba(15,23,42,0.72)",
                                border: "1px solid rgba(0,0,0,0.06)",
                              }}
                            >
                              {s.badge}
                            </span>
                          ) : null}
                        </div>

                        <div className="text-sm font-semibold text-slate-900">
                          {formatRUB(s.total)}
                        </div>
                      </div>

                      {/* bar */}
                      <div className="mt-3 h-2.5 rounded-full bg-black/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-[width] duration-500"
                          style={{
                            width: `${pct}%`,
                            background: isBest ? ORANGE : "rgba(15,23,42,0.22)",
                          }}
                        />
                      </div>

                      {/* breakdown */}
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-600">
                        <div className="rounded-xl bg-white/40 border border-black/5 px-3 py-2">
                          <div className="text-[11px] uppercase tracking-wide">
                            Товары
                          </div>
                          <div className="mt-1 font-semibold text-slate-900">
                            {formatRUB(s.items)}
                          </div>
                        </div>
                        <div className="rounded-xl bg-white/40 border border-black/5 px-3 py-2">
                          <div className="text-[11px] uppercase tracking-wide">
                            Доставка
                          </div>
                          <div className="mt-1 font-semibold text-slate-900">
                            {formatRUB(s.delivery)}
                          </div>
                        </div>
                        <div className="rounded-xl bg-white/40 border border-black/5 px-3 py-2">
                          <div className="text-[11px] uppercase tracking-wide">
                            Промо
                          </div>
                          <div
                            className="mt-1 font-semibold"
                            style={{
                              color: s.promo ? ORANGE : "rgba(15,23,42,0.55)",
                            }}
                          >
                            {s.promo ? `−${formatRUB(s.promo)}` : "—"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95"
                  style={{ backgroundColor: ORANGE }}
                >
                  Получить бета-доступ
                </button>
              </div>
            </div>
          </div>

          {/* REASONS PANEL */}
          <div className="korzina-glass rounded-3xl shadow-soft p-6 md:p-7 relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "rgba(254,105,0,0.10)" }}
            />

            <div className="relative">
              <div className="text-sm font-semibold text-slate-900">
                Почему итог отличается
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Экономия появляется не “в одном месте”, а в сумме факторов.
              </p>

              <div className="mt-5 space-y-3">
                <Reason
                  title="Цены на товары меняются"
                  text="Даже одинаковые позиции могут отличаться по цене в разных магазинах."
                />
                <Reason
                  title="Доставка влияет на итог"
                  text="Где-то дешевле товары, но дороже доставка — итог может быть выше."
                />
                <Reason
                  title="Промо и акции разные"
                  text="Промокоды и акции не совпадают — важно считать их в одном чеке."
                />
              </div>

              <div className="mt-6 rounded-2xl bg-white/50 border border-black/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-600">
                  Важно
                </div>
                <div className="mt-1 text-sm text-slate-700">
                  Корзина показывает{" "}
                  <span className="font-semibold">
                    реальную итоговую стоимость
                  </span>
                  , а не “самую низкую цену на один товар”.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === MANUAL vs KORZINA as tabs (not cards grid) === */}
        <div className="mt-10 korzina-glass rounded-3xl shadow-soft p-6 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-lg font-semibold text-slate-900">
                Вручную или с Корзиной?
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Сравнение подходов — почему “вручную” почти всегда неудобно.
              </div>
            </div>

            <div className="relative inline-flex rounded-full border border-black/10 bg-white/60 p-1 shadow-soft">
              {/* moving background */}
              <span
                aria-hidden
                className="absolute top-1 bottom-1 left-1 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: "calc(50% - 4px)",
                  transform: `translateX(${mode === "korzina" ? "100%" : "0%"})`,
                  background:
                    "linear-gradient(135deg, rgba(254,105,0,0.22), rgba(254,105,0,0.38))",
                  boxShadow: "0 8px 24px rgba(254,105,0,0.25)",
                }}
              />

              <button
                type="button"
                onClick={() => setMode("manual")}
                className={[
                  "relative z-10",
                  "rounded-full px-5 py-2 text-sm font-semibold",
                  "transition-colors duration-200",
                  mode === "manual"
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                Вручную
              </button>

              <button
                type="button"
                onClick={() => setMode("korzina")}
                className={[
                  "relative z-10",
                  "rounded-full px-5 py-2 text-sm font-semibold",
                  "transition-colors duration-200",
                  mode === "korzina"
                    ? "text-slate-900"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
              >
                &nbsp;&nbsp;С Корзиной
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <BulletList
              title={mode === "manual" ? "Что происходит" : "Что происходит"}
              accent={mode === "korzina"}
              items={
                mode === "manual"
                  ? [
                      "Переключаешься между 2–4 приложениями",
                      "Собираешь корзину заново в каждом",
                      "Трудно учесть доставку и промо одновременно",
                      "Легко упустить акцию или ошибиться",
                    ]
                  : [
                      "Собираешь корзину один раз",
                      "Мы считаем товары + доставку + промо",
                      "Показываем 2–3 лучших сценария",
                      "Понятно, почему этот вариант выгоднее",
                    ]
              }
            />

            <div className="rounded-2xl bg-white/50 border border-black/5 p-5">
              <div className="text-xs uppercase tracking-wide text-slate-600">
                Результат
              </div>

              <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                {mode === "manual" ? (
                  <>
                    Ты тратишь время на сбор одинаковой корзины и всё равно
                    можешь выбрать не лучший итог из-за доставки или промо.
                  </>
                ) : (
                  <>
                    Ты получаешь лучший итоговый чек без лишних действий:
                    выбираешь “дешевле / быстрее / удобнее” — и идёшь оформлять
                    заказ.
                  </>
                )}
              </div>

              <div className="mt-4 h-px bg-black/5" />

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-slate-600">Приоритет</div>
                <div className="font-semibold" style={{ color: ORANGE }}>
                  {mode === "manual" ? "путается" : "понятный выбор"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reason({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white/50 border border-black/5 p-4">
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{text}</div>
    </div>
  );
}

function BulletList({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl bg-white/50 border border-black/5 p-5">
      <div className="text-xs uppercase tracking-wide text-slate-600">
        {title}
      </div>
      <ul className="mt-3 space-y-3 text-sm text-slate-700">
        {items.map((t) => (
          <li key={t} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: accent ? ORANGE : "rgba(15,23,42,0.35)",
              }}
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatRUB(n: number) {
  // простая локальная форматировка без Intl (чтобы было предсказуемо)
  const s = String(n);
  const parts: string[] = [];
  for (let i = s.length; i > 0; i -= 3)
    parts.unshift(s.substring(Math.max(0, i - 3), i));
  return `${parts.join(" ")} ₽`;
}
