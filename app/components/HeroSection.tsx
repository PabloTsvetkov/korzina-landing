import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="section relative">
      {/* Hero glow (чуть ярче, чем остальной сайт) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-28 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.22)" }}
        />
        <div
          className="absolute top-36 left-[8%] h-[260px] w-[260px] rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.10)" }}
        />
      </div>

      <div className="container-page grid gap-10 md:grid-cols-[1.2fr,1fr] items-center">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 backdrop-blur-xl px-3 py-1 text-xs text-slate-700 shadow-soft">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "#FE6900" }}
            />
            Экономия до <span className="font-semibold">10% на продуктах</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Один сервис — вся{" "}
            <span style={{ color: "#FE6900" }}>корзина продуктов</span> из разных
            магазинов.
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-xl">
            Корзина сравнивает стоимость всей корзины сразу в нескольких
            магазинах и показывает, где выгоднее заказать с доставкой. Без
            переключения между приложениями и ручного сравнения.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 active:opacity-90"
              style={{ backgroundColor: "#FE6900" }}
            >
              Получить доступ
            </button>

            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white/50 backdrop-blur-xl px-6 py-2.5 text-sm font-semibold text-slate-800 hover:bg-white/70 transition"
            >
              Как это работает
            </a>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-600">
            <span>∙ Экономия на доставке</span>
            <span>∙ Учитываем акции и промо</span>
            <span>∙ Путь клиента от корзины до чека</span>
          </div>
        </div>

        {/* RIGHT (phone + glow card) */}
        <div className="relative flex justify-center md:justify-end">
          {/* phone glow */}
          <div
            aria-hidden
            className="absolute -inset-10 rounded-full blur-3xl"
            style={{ background: "rgba(254,105,0,0.16)" }}
          />

          {/* glass frame */}
          <div className="relative rounded-3xl shadow-soft p-4 md:p-5 ">
            <Image
              src="/phoneWithApp.png"
              alt="Корзина — интерфейс приложения"
              width={190}
              height={250}
              priority
              className="h-auto w-full max-w-xs md:max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
