"use client";

import React from "react";

type Step = {
  title: string;
  description: string;
};

type FeatureCard = {
  tag: string;
  title: string;
  description: string;
  stat?: string; // микро-пруф (опционально)
  highlight?: boolean; // большая карточка
};

export default function HowItWorksSection2() {
  // очень компактные шаги (можно оставить даже если карточки ещё не готовы)
  const steps: Step[] = [
    {
      title: "Собери корзину",
      description: "Добавь продукты как обычно — без ручного сравнения.",
    },
    {
      title: "Корзина посчитает варианты",
      description: "С учётом цен, доставки, акций и времени.",
    },
    {
      title: "Выбери лучший сценарий",
      description: "Дешевле / быстрее / удобнее — по твоему приоритету.",
    },
  ];

  // карточки функционала — пока с заглушками, потом заменишь тексты
  const features: FeatureCard[] = [
    {
      tag: "Сравнение",
      title: "Считаем корзину целиком",
      description:
        "Не по одному товару: считаем итоговую сумму всей корзины в каждом магазине.",
      stat: "до −10% в месяц",
      highlight: true,
    },
    {
      tag: "Доставка",
      title: "Учитываем доставку в итоговом чеке",
      description:
        "Сравнение честное: цена товаров + доставка + условия по времени и адресу.",
      stat: "меньше сюрпризов",
    },
    {
      tag: "Промо",
      title: "Подтягиваем акции и промокоды",
      description:
        "Если в магазине есть выгодное промо — оно учитывается автоматически.",
      stat: "больше выгод",
    },
    {
      tag: "Сценарии",
      title: "Показываем 2–3 лучших варианта",
      description:
        "Не один “самый дешёвый”, а понятные сценарии под разные приоритеты.",
      stat: "выбор без хаоса",
    },
    {
      tag: "Прозрачность",
      title: "Объясняем, почему так выгоднее",
      description:
        "Показываем, что именно повлияло: цена, доставка, акции, замены и т.д.",
      stat: "доверие к расчёту",
    },
  ];

  return (
    <section id="how" className="section relative">
      {/* лёгкий локальный glow, чтобы секция была “живой”, но не шумной */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 right-[10%] h-[320px] w-[320px] rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.10)" }}
        />
      </div>

      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title text-slate-900">
            Как работает <span style={{ color: "#FE6900" }}>Корзина</span>
          </h2>
          <p className="section-subtitle">
            Собираешь корзину один раз — мы считаем варианты по магазинам,
            доставке и промо и показываем, где выгоднее оформить заказ.
          </p>
        </div>

        {/* Компактные шаги (3 штуки) */}
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="korzina-glass rounded-2xl p-4 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: "rgba(254,105,0,0.10)",
                    color: "#FE6900",
                  }}
                >
                  {i + 1}
                </div>
                <div className="font-semibold text-slate-900">{s.title}</div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Карточки функционала */}
        <div className="mt-10">
          {/* Desktop grid */}
          <div className="hidden md:grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <Feature
                key={f.title}
                {...f}
                className={f.highlight ? "md:col-span-2" : ""}
              />
            ))}
          </div>

          {/* Mobile “slider” without libs */}
          <div className="md:hidden -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {features.map((f) => (
                <div key={f.title} className="snap-start min-w-[280px]">
                  <Feature {...f} />
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Листай карточки влево → вправо
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({
  tag,
  title,
  description,
  stat,
  className = "",
  highlight,
}: {
  tag: string;
  title: string;
  description: string;
  stat?: string;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "korzina-glass rounded-3xl p-6 shadow-soft relative overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* subtle inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl"
        style={{ background: "rgba(254,105,0,0.10)" }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "rgba(254,105,0,0.10)",
              color: "#FE6900",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {tag}
          </span>

          {stat ? (
            <span className="text-xs font-semibold text-slate-700">{stat}</span>
          ) : null}
        </div>

        <div className="mt-3 text-lg font-semibold text-slate-900">{title}</div>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        {highlight ? (
          <div className="mt-4 text-sm text-slate-700">
            <span className="font-semibold">Идея:</span> этот блок можно позже
            заменить на реальный кейс/скрин “Корзина посчитала 3 сценария”.
          </div>
        ) : null}
      </div>
    </div>
  );
}
