import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="section relative">
{/* White glow spots (только под зоной текста слева) */}
<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
  {/* cluster under text */}
  <div
    className="absolute top-8 left-[10%] h-[300px] w-[300px] rounded-full blur-3xl"
    style={{ background: "rgba(255,255,255,0.44)" }}
  />
  <div
    className="absolute top-20 left-[18%] h-[320px] w-[320px] rounded-full blur-3xl"
    style={{ background: "rgba(255,255,255,0.48)" }}
  />
  <div
    className="absolute top-36 left-[10%] h-[280px] w-[280px] rounded-full blur-3xl"
    style={{ background: "rgba(255,255,255,0.44)" }}
  />

  {/* extend brightness further to the right but still within text area */}
  <div
    className="absolute top-20 left-[30%] h-[320px] w-[360px] rounded-full blur-3xl"
    style={{ background: "rgba(255,255,255,0.44)" }}
  />
  <div
    className="absolute top-44 left-[38%] h-[300px] w-[380px] rounded-full blur-3xl"
    style={{ background: "rgba(255,255,255,0.40)" }}
  />

  {/* lower part under buttons/subtext */}
  <div
    className="absolute top-[56%] left-[12%] h-[320px] w-[520px] rounded-full blur-3xl"
    style={{ background: "rgba(255,255,255,0.40)" }}
  />
  <div
    className="absolute top-[62%] left-[34%] h-[300px] w-[480px] rounded-full blur-3xl"
    style={{ background: "rgba(255,255,255,0.36)" }}
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
            <span style={{ color: "#FE6900" }}>корзина продуктов</span> из
            разных магазинов.
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
            <span>∙ Экономим деньги</span>
            <span>∙ Экономим время</span>
            <span>∙ Упрощаем выбор</span>
          </div>
        </div>

        {/* RIGHT (phone + glow card) */}
        <div className="relative flex justify-center md:justify-end top-[70px]">
          {/* phone glow */}
          <div
            aria-hidden
            className="absolute -inset-10 rounded-full blur-3xl"
            style={{ background: "rgba(254,105,0,0.16)" }}
          />

          {/* glass frame */}
          <Image
            src="/phoneLeft.png"
            alt="Корзина — интерфейс приложения"
            width={500}
            height={500}
            priority
            className="h-[700px] w-[384px] max-w-xs md:max-w-sm rounded-3xl
             drop-shadow-[0_40px_30px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}
