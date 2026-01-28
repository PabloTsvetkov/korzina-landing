import React from "react";

type SavingItem = {
  title: string;
  description: string;
  value: string;
  label: string;
};

export default function SavingSection() {
  const items: SavingItem[] = [
    {
      title: "Считаем всю корзину целиком",
      description:
        "Не сравниваем отдельные товары — считаем итоговую сумму всей корзины с доставкой и скидками.",
      value: "до 10%",
      label: "экономия в месяц",
    },
    {
      title: "Оптимизируем доставку",
      description:
        "Смотрим на чек + доставку. Иногда магазин с чуть более дорогими товарами выигрывает из-за доставки.",
      value: "до −15%",
      label: "экономия на доставке",
    },
    {
      title: "Учитываем акции и промо",
      description:
        "Подтягиваем акции/промокоды партнёров и учитываем их в расчёте итоговой суммы.",
      value: "x2",
      label: "выгодных промо",
    },
  ];

  return (
    <section id="saving" className="section relative">
      {/* subtle section glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-20 right-[12%] h-[300px] w-[300px] rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.08)" }}
        />
      </div>

      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title text-slate-900">
            Где появляется <span style={{ color: "#FE6900" }}>экономия</span>
          </h2>
          <p className="section-subtitle">
            Ты просто собираешь корзину. Корзина пересчитывает варианты по
            магазинам, доставке и промо и показывает 2–3 лучших сценария.
          </p>
        </div>

        {/* Top cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="korzina-glass rounded-3xl p-6 shadow-soft relative overflow-hidden"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl"
                style={{ background: "rgba(254,105,0,0.10)" }}
              />
              <div className="relative">
                <div className="text-xs uppercase tracking-wide text-slate-600 mb-2">
                  {item.label}
                </div>
                <div className="text-3xl font-semibold mb-3" style={{ color: "#FE6900" }}>
                  {item.value}
                </div>
                <div className="font-semibold text-slate-900 mb-2">
                  {item.title}
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison block: Manual vs Korzina */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
          <CompareCard
            title="Вручную"
            subtitle="Собираешь одну и ту же корзину в нескольких приложениях"
            items={[
              "Переключаешься между 2–4 сервисами",
              "Собираешь корзину заново в каждом",
              "Сложно учесть доставку + акции одновременно",
              "Тратишь 15–25 минут на сравнение",
              "Легко ошибиться и упустить промо",
            ]}
            tone="neutral"
          />

          <CompareCard
            title="С Корзиной"
            subtitle="Одна корзина → несколько сценариев под твой приоритет"
            items={[
              "Собираешь корзину один раз",
              "Считаем итог: товары + доставка + промо",
              "Показываем 2–3 сценария: дешевле / быстрее / удобнее",
              "Экономишь время и деньги без лишних действий",
              "Прозрачно: почему этот вариант выгоднее",
            ]}
            tone="accent"
          />
        </div>

        {/* Optional mini proof */}
        <div className="mt-10 korzina-glass rounded-3xl p-6 md:p-8 shadow-soft relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "rgba(254,105,0,0.10)" }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Почему суммы отличаются даже на “одинаковой” корзине?
              </div>
              <div className="mt-1 text-sm text-slate-600 max-w-2xl">
                В разных магазинах меняются цены, условия доставки и доступные промо.
                Корзина собирает это в один расчёт и показывает реальную итоговую стоимость.
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95"
              style={{ backgroundColor: "#FE6900" }}
            >
              Посмотреть пример расчёта
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareCard({
  title,
  subtitle,
  items,
  tone,
}: {
  title: string;
  subtitle: string;
  items: string[];
  tone: "neutral" | "accent";
}) {
  const accent = tone === "accent";

  return (
    <div className="korzina-glass rounded-3xl p-6 shadow-soft relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: accent ? "rgba(254,105,0,0.14)" : "rgba(0,0,0,0.04)" }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-lg font-semibold text-slate-900">{title}</div>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: accent ? "rgba(254,105,0,0.10)" : "rgba(0,0,0,0.04)",
              color: accent ? "#FE6900" : "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {accent ? "лучший путь" : "дольше и сложнее"}
          </span>
        </div>

        <div className="mt-2 text-sm text-slate-600">{subtitle}</div>

        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          {items.map((t) => (
            <li key={t} className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent ? "#FE6900" : "rgba(15,23,42,0.35)" }}
              />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
