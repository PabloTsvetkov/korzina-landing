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

export default function CompareSection() {
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
    <section id="compare" className="section relative">
      <div className="container-page mt-10 korzina-glass rounded-3xl shadow-soft p-6 md:p-7 max-w-3xl">
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
                  Ты тратишь время на сбор одинаковой корзины и всё равно можешь
                  выбрать не лучший итог из-за доставки или промо.
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
