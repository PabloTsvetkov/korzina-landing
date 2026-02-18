"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const ORANGE = "#FE6900";

type FeatureCard = {
  title: string;
  points: string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const CONTENT = {
  sectionId: "can",
  heading: {
    first: "Какие наши ",
    accent: "возможности",
  },
  subtitle:
    "Честно считаем итоговую корзину, подбираем альтернативы, учитываем доставку и промо, чтобы вы выбрали лучший вариант сэкономив время и деньги.",
  sharedImage: {
    src: "/phoneCartPortrait.png",
    alt: "Экран приложения",
  },
  cards: [
    {
      title: "Считаем корзину целиком",
      points: [
        "Сравниваем итог по всей корзине",
        "Считаем в разных магазинах",
        "Экономия без лишних действий",
      ],
      description:
        "Сравниваем итоговую стоимость всей корзины в разных магазинах, а не только цену одного товара",
    },
    {
      title: "Учитываем доставку",
      points: ["Считаем стоимость доставки", "Показываем итоговую стоиомость корзины", "Удобно сравнивать варианты"],
      description:
        "Поможем найти более выгодный и удобрый вариант доставки",
    },
    {
      title: "Подтягиваем скидки",
      points: ["Учитываем промо и скидки", "Помогаем выбрать самый выгодный вариант"],
      description:
        "Можете заказать доставку прямо в Корзинек и не надо переходить в другие приложения",
    },
    {
      title: "Показываем лучшие варианты",
      points: ["Не пропустите акции", "Экономия на регулярных покупках", "Честное сравнение без ручного труда"],
      description: "Мы поможем не пропустить ни одну акцию и сэкономить ваши деньги",
    },
  ],
} as const;

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="block">
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SavingSection() {
  const features: FeatureCard[] = useMemo(() => {
    return CONTENT.cards.map((c) => ({
      title: c.title,
      points: c.points.slice(0, 4),
      description: c.description,
      imageSrc: CONTENT.sharedImage.src,
      imageAlt: CONTENT.sharedImage.alt,
    }));
  }, []);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  const count = features.length;

  const goTo = (idx: number) => {
    const next = ((idx % count) + count) % count;
    lastInteractionRef.current = Date.now();
    setActive(next);
  };

  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  const clearTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    intervalRef.current = window.setInterval(() => {
      const dt = Date.now() - lastInteractionRef.current;
      if (dt < 350) return;
      setActive((p) => (p + 1) % count);
    }, 6000);
  };

  useEffect(() => {
    if (paused || count <= 1) {
      clearTimer();
      return;
    }
    startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, count]);

  // ---------- SWIPE (touch + pointer) ----------
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    dragging: boolean;
    startX: number;
    lastX: number;
    dx: number;
    width: number;
    pointerId: number | null;
  }>({
    dragging: false,
    startX: 0,
    lastX: 0,
    dx: 0,
    width: 1,
    pointerId: null,
  });

  const [dragDx, setDragDx] = useState(0);

  const setTransform = (dx: number) => {
    setDragDx(dx);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    // свайп только для touch/pen (мышь не трогаем)
    if (e.pointerType === "mouse") return;

    const el = viewportRef.current;
    if (!el) return;

    el.setPointerCapture(e.pointerId);
    dragState.current.dragging = true;
    dragState.current.pointerId = e.pointerId;
    dragState.current.startX = e.clientX;
    dragState.current.lastX = e.clientX;
    dragState.current.dx = 0;
    dragState.current.width = el.clientWidth || 1;

    lastInteractionRef.current = Date.now();
    setPaused(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const st = dragState.current;
    if (!st.dragging) return;
    if (st.pointerId !== e.pointerId) return;

    const dx = e.clientX - st.startX;
    st.lastX = e.clientX;
    st.dx = dx;

    // небольшое “сопротивление”, чтобы не улетало далеко
    const resisted = Math.max(Math.min(dx, st.width * 0.35), -st.width * 0.35);
    setTransform(resisted);
  };

  const finishDrag = (pointerId?: number) => {
    const st = dragState.current;
    if (!st.dragging) return;
    if (pointerId != null && st.pointerId !== pointerId) return;

    const threshold = st.width * 0.18; // порог свайпа
    const dx = st.dx;

    st.dragging = false;
    st.pointerId = null;
    setTransform(0);
    setPaused(false);

    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    else {
      // вернуть на место — ничего не делаем, transform уже сбросили
    }
  };

  const onPointerUp = (e: React.PointerEvent) => finishDrag(e.pointerId);
  const onPointerCancel = (e: React.PointerEvent) => finishDrag(e.pointerId);

  // ---------- Keyboard arrows ----------
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  return (
    <section id={CONTENT.sectionId} className="section relative">

      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="section-title text-slate-900">
            {CONTENT.heading.first}
            <span style={{ color: ORANGE, fontSize: "1.1em" }}>{CONTENT.heading.accent}</span>
          </h2>
          <p className="section-subtitle">{CONTENT.subtitle}</p>
        </div>

        {/* SLIDER */}
        <div className="mt-10">
          <div className="relative">
            {/* Карточка (viewport) */}
            <div
              ref={viewportRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
              className={[
                "relative",
                "rounded-[32px] md:rounded-[36px]",
                "bg-white",
                "border border-black/5",
                "shadow-soft",
                "overflow-hidden",
                "outline-none",
                "select-none",
                "touch-pan-y",
              ].join(" ")}
              aria-roledescription="carousel"
              aria-label="Слайдер возможностей"
            >

              {/* Track */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(calc(-${active * 100}% + ${dragDx}px))`,
                    transition: dragState.current.dragging ? "none" : undefined,
                  }}
                >
                  {features.map((f, idx) => (
                    <div
                      key={f.title + idx}
                      className="min-w-full p-5 md:p-7"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${idx + 1} из ${count}`}
                    >
                      {/* Сделал ниже и компактнее */}
                      <div className="grid gap-6 md:gap-7 lg:grid-cols-2 items-start">
                        {/* LEFT: приклеено к верху */}
                        <div className="min-w-0 self-start lg:pl-5 lg:pt-5">
                          <h2
                            className="text-lg md:text-3xl font-extrabold"
                            style={{ color: ORANGE }}
                          >
                            {f.title}
                          </h2>

                          <ul className="mt-3 md:mt-7 space-y-2.5">
                            {f.points.map((p) => (
                              <li key={p} className="flex items-start gap-3 text-slate-700">
                                <span
                                  className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full"
                                  style={{
                                    background: "rgba(254,105,0,0.12)",
                                    color: ORANGE,
                                  }}
                                  aria-hidden
                                >
                                  <CheckIcon />
                                </span>
                                <span className="text-sm md:text-lg leading-relaxed">{p}</span>
                              </li>
                            ))}
                          </ul>

                          <p className="mt-10 text-sm md:text-base leading-relaxed text-slate-500">
                            {f.description}
                          </p>
                        </div>

                        {/* RIGHT: картинка меньше + не раздувает высоту */}
                        <div className="relative flex items-start justify-center self-start">
                          <Image
                            src={f.imageSrc}
                            alt={f.imageAlt}
                            width={360}
                            height={720}
                            className={[
                              "h-auto select-none",
                              "w-[180px] md:w-[220px] lg:w-[250px]",
                            ].join(" ")}
                            priority={idx === 0}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 pb-4 md:pb-5 pt-1">
                {features.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Перейти к карточке ${i + 1}`}
                      aria-current={isActive ? "true" : "false"}
                      className={[
                        "h-2.5 rounded-full transition-all",
                        isActive ? "w-8" : "w-2.5",
                      ].join(" ")}
                      style={{
                        background: isActive ? ORANGE : "rgba(15, 23, 42, 0.18)",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Стрелки ВНЕ карточки (чуть выступают) */}
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущая карточка"
              className={[
                "absolute top-1/2 -translate-y-1/2",
                // выступаем наружу:
                "-left-3 md:-left-5",
                "h-10 w-10 md:h-11 md:w-11",
                "rounded-full",
                "bg-white/95 backdrop-blur",
                "border border-black/10",
                "shadow-soft",
                "grid place-items-center",
                "transition-transform active:scale-[0.97]",
                "hover:bg-white",
              ].join(" ")}
            >
              <span className="text-slate-800">
                <ChevronIcon dir="left" />
              </span>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Следующая карточка"
              className={[
                "absolute top-1/2 -translate-y-1/2",
                // выступаем наружу:
                "-right-3 md:-right-5",
                "h-10 w-10 md:h-11 md:w-11",
                "rounded-full",
                "bg-white/95 backdrop-blur",
                "border border-black/10",
                "shadow-soft",
                "grid place-items-center",
                "transition-transform active:scale-[0.97]",
                "hover:bg-white",
              ].join(" ")}
            >
              <span className="text-slate-800">
                <ChevronIcon dir="right" />
              </span>
            </button>
          </div>

          {/* маленькая подсказка для мобилок (можно убрать) */}
          <p className="mt-3 text-center text-xs text-slate-500 md:hidden">
            Листай свайпом вправо/влево
          </p>
        </div>
      </div>
    </section>
  );
}
