import Image from "next/image";
import type { Metadata } from "next";
import FAQSection from "./components/FAQSection";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";

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

/* ===== SAVING SECTION ===== */

function SavingSection() {
  const items = [
    {
      // title: "название топика",
      title: "Считаем всю корзину целиком",
      description:
        "Не сравниваем отдельные продукты, а учитываем сумму всей корзины с доставкой и скидками.",
      // "описание топика",
      value: "до 10%",
      label: "экономия в месяц",
    },
    // {
    //   // title: "карточка",
    //   title: "Считаем всю корзину целиком",
    //   description:
    //     "Не сравниваем отдельные продукты, а учитываем сумму всей корзины с доставкой и скидками.",
    //   // "описание карточки",
    //   value: "число",
    //   label: "лейбл",
    // },
    {
      title: "Оптимизируем доставку",
      description:
        "Выбираем вариант, где итоговый чек + доставка для тебя выгоднее, а не просто минимальная цена товара.",
      value: "–15%",
      label: "средняя экономия на доставке",
    },
    {
      title: "Учитываем акции и промо",
      description:
        "Подтягиваем промо и спецпредложения партнёрских магазинов, чтобы не переплачивать.",
      value: "x2",
      label: "больше использованных акций",
    },
  ];

  return (
    <section id="saving" className="section">
      <div className="container-page">
        <h2 className="section-title text-korzina-primary">
          Где появляется экономия
        </h2>
        <p className="section-subtitle text-korzina-textMuted">
          Пользователь просто собирает корзину. Корзина под капотом
          пересчитывает варианты по магазинам, доставке и промо, показывая
          оптимальный путь.
          {/* Здесь тоже какое-нибудь небольшое описание работы */}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-korzina-primary/20 bg-korzina-bg p-5 shadow-soft"
            >
              <div className="text-xs uppercase tracking-wide text-korzina-primary mb-2">
                {item.label}
              </div>
              <div className="text-3xl font-semibold mb-3 text-korzina-accent">
                {/* <div className="text-xl"> */}
                {item.value}
              </div>
              <div className="font-medium text-korzina-text mb-2">
                {item.title}
              </div>
              <div className="text-sm text-korzina-textMuted">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
