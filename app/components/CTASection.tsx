// app/components/CTASection.tsx
"use client";

const ORANGE = "#FE6900";

export default function CTASection() {
  const onBetaClick = () => {
    // TODO: вставь свою логику: открыть модалку / перейти к форме / скролл к блоку
    console.log("beta signup click");
  };

  return (
    <section
      className="relative py-14 md:py-16"
      style={{
        background:
          "linear-gradient(90deg, rgba(254,105,0,0.06) 0%, rgba(254,105,0,0.14) 50%, rgba(254,105,0,0.06) 100%)",
      }}
      id="CTA"
    >
      {/* тонкий верхний/нижний бордер, чтобы выглядело как “разделитель” */}
      {/* <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-black/10" /> */}

      {/* мягкий glow (очень subtle) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.10)" }}
        />
      </div>

      <div className="container-page relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
              Попробуй собрать свою первую корзину в Корзине
            </h2>
            <p className="text-sm md:text-base text-slate-700/80">
              Старт занимает пару минут. Собери корзину как обычно — мы покажем,
              где выгоднее оформить заказ с доставкой.
            </p>
          </div>

          <button
            type="button"
            onClick={onBetaClick}
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 active:opacity-90 w-full md:w-auto"
            style={{ backgroundColor: ORANGE }}
          >
            Записаться на бета-тестирование
          </button>
        </div>
      </div>
    </section>
  );
}
