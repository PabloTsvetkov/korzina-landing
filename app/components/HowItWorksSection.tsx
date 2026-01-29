// app/components/HowItWorksSection.tsx
"use client";

import Image from "next/image";

const ORANGE = "#FE6900";

type Step = {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function HowItWorksSection() {
  const steps: Step[] = [
    {
      number: "01",
      title: "Выбери магазин",
      description:
        "Укажи адрес и время — мы подберём магазины, которые доставят тебе удобно и вовремя.",
      imageSrc: "/phoneShopsPortrait.png",
      imageAlt: "Экран выбора магазина",
    },
    {
      number: "02",
      title: "Собери корзину",
      description:
        "Добавляй продукты как обычно — без переключений между магазинами.",
      imageSrc: "/phoneCatalogPortrait.png",
      imageAlt: "Экран каталога и выбора товаров",
    },
    {
      number: "03",
      title: "Сравни цены",
      description:
        "Покажем разные варианты: где дешевле, быстрее или удобнее — выбирай лучший.",
      imageSrc: "/phoneCartPortrait.png",
      imageAlt: "Экран сравнения вариантов корзины",
    },
  ];

  return (
    <section id="how" className="section relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-28 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.06)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-[40px] bg-white border border-black/5 shadow-soft overflow-hidden">
          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                Как работает{" "}
                <span style={{ color: ORANGE, fontSize: "1.1em" }}>
                  Корзина
                </span>
              </h2>
              <p className="mt-3 text-base md:text-lg text-slate-600">
                Три шага — и у тебя готова корзина с понятными вариантами, где
                выгоднее оформить заказ.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col">
                  {/* Big number + smaller title under it */}
                  <div className="leading-none">
                    <div
                      className="text-[44px] md:text-[54px] font-semibold tracking-tight text-center"
                      style={{ color: ORANGE }}
                    >
                      {step.number}
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-slate-900 text-center">
                      {step.title}
                    </div>
                  </div>

                  <div className="mt-6 relative">
                    {/* Шире/крупнее экран */}
                    <div className="relative mx-auto w-[260px] md:w-[270px] overflow-hidden">
                      {/* Обрезаем снизу на ~40px */}
                      <div
                        className="relative"
                        style={{ marginBottom: "-100px" }}
                      >
                        <Image
                          src={step.imageSrc}
                          alt={step.imageAlt}
                          width={520}
                          height={980}
                          className="w-full h-auto select-none"
                          priority={step.number === "01"}
                        />
                      </div>

                      {/* Blur/fade снизу (переходит полностью в белый) */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 22%, rgba(255,255,255,0.9) 62%, rgba(255,255,255,1) 100%)",
                          WebkitBackdropFilter: "blur(10px)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 relative top-[-50px] px-4">
                    <div
                      className="rounded-[24px] px-5 py-4 text-center shadow-soft"
                      style={{
                        background: "rgba(254,105,0,0.8)",
                        color: "white",
                      }}
                    >
                      <p className="text-[17px] md:text-[16px] leading-[1.5] font-semibold ">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
