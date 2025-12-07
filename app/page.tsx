import Image from "next/image";
import type { Metadata } from "next";
import FAQSection from "./components/FAQSection";

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
      <SavingSection />
      <HowItWorksSection />
      <B2BSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

/* ===== HERO ===== */

function HeroSection() {
  return (
    <section className="section bg-korzina-bg">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
        <div className="space-y-6">
          {/* бейджик сверху */}
          <div className="inline-flex items-center gap-2 rounded-full border border-korzina-primary/40 bg-korzina-primary/10 px-3 py-1 text-xs text-korzina-primary">
            <span className="h-2 w-2 rounded-full bg-korzina-accent" />
            Экономия до <span className="font-semibold">
              10% на продуктах
            </span>{" "}
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-korzina-text">
            Один сервис — вся{" "}
            <span className="text-korzina-accent">корзина продуктов</span> из
            разных магазинов.
          </h1>
          <p className="text-base md:text-lg text-korzina-textMuted max-w-xl">
            Корзина сравнивает стоимость всей корзины сразу в нескольких
            магазинах и показывает, где выгоднее заказать с доставкой. Без
            переключения между приложениями и ручного сравнения.
            {/* Здесь какое-нибудь описание работы сервиса */}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center justify-center rounded-full bg-korzina-primary px-6 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-korzina-primaryDark transition">
              Скачать для iOS / Android
            </button>
            {/* либо две кнопки на айос/андроид. либо кнопка на новую
            страницу/раздел */}
            {/* <button className="inline-flex items-center justify-center rounded-full border border-korzina-primary/40 px-6 py-2.5 text-sm text-korzina-primary hover:bg-korzina-surface transition">
              Смотреть, как это работает
            </button> */}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-korzina-textMuted">
            <span>∙ Экономия на доставке</span>
            <span>∙ Учитываем акции и промо</span>
            <span>∙ Путь клиента от корзины до чека</span>
            {/* <span>∙ пункт 1</span>
            <span>∙ пункт 2</span>
            <span>∙ пункт 3</span> */}
          </div>
        </div>

        {/* Правая часть — макет приложения / иллюстрация */}
        {/* <div className="relative"> */}
        {/* <div className="absolute -inset-8 rounded-3xl bg-korzina-accent/20 blur-3xl" /> */}
        {/* <div className="bg-white"> */}
        <Image
          src="/phone+app.png"
          alt="phone with an app"
          width={240}
          height={350}
          className="ml-auto mr-auto"
        />

        {/* </div> */}
        {/* <div className="relative rounded-3xl border border-korzina-primary/20 bg-korzina-surface p-4 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-korzina-textMuted">
                Корзина · предварительный просмотр
              </div>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-korzina-primary" />
                <span className="h-1.5 w-1.5 rounded-full bg-korzina-accent" />
                <span className="h-1.5 w-1.5 rounded-full bg-korzina-accentDark" />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-korzina-bg border border-korzina-primary/15 p-3 flex justify-between items-center">
                <div className="text-xs text-korzina-text">
                  Магнит ·{" "}
                  <span className="text-korzina-primary">выгоднее на 7%</span>
                </div>
                <div className="text-xs text-korzina-textMuted">
                  доставка 25–40 мин
                </div>
              </div>
              <div className="rounded-2xl bg-korzina-bg border border-korzina-primary/15 p-3 flex justify-between items-center">
                <div className="text-xs text-korzina-text">
                  ВкусВилл ·{" "}
                  <span className="text-korzina-primary">
                    удобнее по адресу
                  </span>
                </div>
                <div className="text-xs text-korzina-textMuted">
                  доставка 30–45 мин
                </div>
              </div>
              <div className="rounded-2xl bg-korzina-bg border border-korzina-primary/15 p-3 flex justify между items-center">
                <div className="text-xs text-korzina-text">
                  Перекрёсток ·{" "}
                  <span className="text-korzina-primary">лучшие акции</span>
                </div>
                <div className="text-xs text-korzina-textMuted">
                  доставка 40–60 мин
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-korzina-accent to-korzina-accentDark p-3 text-xs text-korzina-text font-medium">
                Корзина уже посчитала, где дешевле твой завтрашний завтрак.
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </section>
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
    <section id="saving" className="section bg-korzina-surface">
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

/* ===== HOW IT WORKS ===== */

function HowItWorksSection() {
  const steps = [
    {
      title: "Собери корзину",
      description:
        "Пользоавтель добавляет продукты как обычно: молоко, хлеб, овощи, товары для дома.",
      badge: "Шаг 1",
    },
    {
      title: "Корзина всё считает",
      description:
        "Мы считаем итоговую стоимость по разным магазинам с учётом доставки, акций и времени.",
      badge: "Шаг 2",
    },
    {
      title: "Выбери лучший вариант",
      description:
        "Показываем 2–3 оптимальных сценария: дешевле, быстрее, удобнее по времени и адресу.",
      badge: "Шаг 3",
    },
  ];

  return (
    <section id="how" className="section bg-korzina-bg">
      <div className="container-page grid gap-10 md:grid-cols-[1.1fr,1fr] items-start">
        <div>
          <h2 className="section-title text-korzina-primary">
            Как работает Корзина
          </h2>
          <p className="section-subtitle text-korzina-textMuted">
            Вместо того чтобы переключаться между приложениями разных сетей,
            пользователь работает только с Корзиной. Дальше мы ведём его до
            оформления заказа в выбранном магазине.
            {/* какое нибудь описание можно вставить */}
          </p>

          <div className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-2xl border border-korzina-primary/15 bg-korzina-surface p-4"
                // className="flex gap-4 rounded-xl border bg-korzina-surface p-4"
              >
                <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-korzina-primary/10 text-xs font-semibold text-korzina-primary">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wide text-korzina-primary">
                    {step.badge}
                  </div>
                  <div className="font-medium text-korzina-text">
                    {step.title}
                  </div>
                  <div className="text-sm text-korzina-textMuted">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Простая “диаграмма пути клиента” */}
        <div className="rounded-3xl border border-korzina-primary/15 bg-korzina-surface p-5 shadow-soft">
          <div className="text-sm font-medium mb-4 text-korzina-text">
            Путь клиента
          </div>
          <ol className="space-y-4 text-sm text-korzina-textMuted">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-korzina-primary" />
              <span>Корзина: пользователь собирает список покупок</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-korzina-primary" />
              <span>
                Подбор магазинов: считаем итоговую сумму и доставку по партнёрам
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-korzina-primary" />
              <span>
                Выбор сценария: дешевле / быстрее / удобнее — в зависимости от
                приоритета
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-korzina-primary" />
              <span>Переход в магазин партнёра и оформление заказа</span>
            </li>
          </ol>
        </div>
        {/* сюда пока не знаю что */}
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
    <section id="b2b" className="section bg-korzina-surface">
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
      {/* <section className="section bg-korzina-surface"> */}
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
