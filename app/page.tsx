import Image from "next/image";
import type { Metadata } from "next";
import FAQSection from "./components/FAQSection";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import SavingSection from "./components/SavingSection";

export const dynamic = "force-static"; // явно говорим, что эта страница статическая

// Дополнительные метаданные только для главной (опционально)
export const metadata: Metadata = {
  title: "Корзина — сравнение цен и экономия на доставке",
  icons: {
    icon: "/logo.ico",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <SavingSection />
      {/* <B2BSection /> */}
      <FAQSection />
      <CTASection />
    </>
  );
}

/* ===== B2B SECTION ===== */

function B2BSection() {
  const points = [
    "Рост конверсии из корзины в заказ за счёт лучшего матчингa пользователя и магазина.",
    "Доступ к агрегированным данным по поведению пользователей и структуре их корзин.",
    "Возможность таргетированного промо в момент, когда пользователь готов оформить заказ.",
    // "Аргумент 1",
    // "Аргумент 2",
    // "Скоько угодно арументов",
  ];

  return (
    <section id="b2b" className="section">
      <div className="container-page grid gap-10 md:grid-cols-2 items-start">
        <div>
          <h2 className="section-title text-korzina-primary">
            Для ритейлеров и брендов
          </h2>
          <p className="section-subtitle text-korzina-textMuted">
            Корзина — это не просто пользовательский сервис. Это точка входа для
            сетей, которые хотят увеличить выручку и лучше понимать поведение
            покупателей.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-korzina-text">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-1 h-1.5 w-4 rounded-full bg-korzina-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-korzina-primary/20 bg-korzina-bg p-5 shadow-soft text-sm text-korzina-text space-y-3">
          <div className="text-xs uppercase tracking-wide text-korzina-primary">
            Что мы даём партнёрам
          </div>

          <p>
            Подробную аналитику по корзинам: какие категории покупают вместе,
            как часто, в каком чеке. Это помогает корректировать промо и
            ассортимент.
          </p>
          <p>
            Прозрачный канал трафика: пользователь видит ваш магазин как часть
            сценария, где вы — лучший выбор под его задачу (дешевле, ближе или
            быстрее).
          </p>
          <p>
            Гибкие форматы размещения: промо в карточке магазина, спец-слоты в
            выдаче сценариев, эксперименты с акциями.
          </p>

          <p>собственно описание</p>

          <button className="mt-4 inline-flex items-center justify-center rounded-full border border-korzina-primary/70 px-5 py-2 text-sm font-medium text-korzina-primary hover:bg-korzina-primary/10 transition">
            {/* <button className="mt-4 inline-flex items-center justify-center rounded-full border border-korzina-primary/70 px-2 py-1 text-sm font-medium text-korzina-primary"> */}
            {/* Связаться по партнёрству */}
            ?Конпка на контакт?
          </button>
          <button className="mt-4 inline-flex items-center justify-center rounded-full border border-korzina-primary/70 px-5 py-2 text-sm font-medium text-korzina-primary hover:bg-korzina-primary/10 transition">
            {/* <button className="mt-4 inline-flex items-center justify-center rounded-full border border-korzina-primary/70 px-2 py-1 text-sm font-medium text-korzina-primary"> */}
            ?Конпка на презу?
          </button>
        </div>
      </div>
    </section>
  );
}

/* ===== CTA SECTION ===== */

function CTASection() {
  return (
    <section className="section bg-gradient-to-r from-korzina-accent to-korzina-accentDark">
      {/* <section className="section"> */}
      <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6 text-korzina-text">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Попробуй собрать свою первую корзину в Корзине
          </h2>
          <p className="text-sm md:text-base text-korzina-textMuted max-w-xl">
            Старт занимает пару минут. Собери корзину как обычно — мы покажем,
            где выгоднее оформить заказ.
            {/* маленько описать */}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="rounded-full bg-korzina-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-korzina-primaryDark transition">
            Скачать приложение
          </button>
          <button className="rounded-full border border-korzina-text/40 px-6 py-2.5 text-sm font-medium text-korzina-text hover:bg-korzina-bg/70 transition">
            Презентация для партнёров
          </button>
          {/* тоже не особо придумал что, но наверное кнопки на скачивание и
          возможно презентацию еще раз */}
        </div>
      </div>
    </section>
  );
}
