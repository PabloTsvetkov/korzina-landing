"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
// Если у тебя есть lucide-react — можно оставить. Если нет, замени на простые SVG.
import { Menu, X, ArrowRight } from "lucide-react";

type NavItem = { id: string; label: string };

export default function Header() {
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "how", label: "Как это работает" },
      { id: "saving", label: "Экономия" },
      { id: "faq", label: "FAQ" },
    ],
    []
  );

  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("how");
  const [mobileOpen, setMobileOpen] = useState(false);

  // 1) “Лучшие лендинги” — shrink/blur при скролле
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2) Подсветка активного раздела (IntersectionObserver)
  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Берём самый “видимый”/пересёкший порог
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        // “Лучший” баланс для лендингов
        root: null,
        threshold: [0.25, 0.4, 0.6],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [navItems]);

  // 3) Закрывать моб. меню по ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // 4) Запрет скролла body, пока открыто меню
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setMobileOpen(false);

    // Смещение под фиксированный хедер
    const headerOffset = 96; // px (под top-6 + pill)
    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const onBetaClick = () => {
    // TODO: вставь свою логику (модалка, форма, роут, etc.)
    // Например, scrollToId("cta") или открыть modal
    // scrollToId("cta");
    console.log("beta click");
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-3 md:px-4">
        <div
          className={[
            "w-full max-w-6xl",
            "transition-all duration-300 ease-out",
            scrolled ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <nav
            className={[
              "flex items-center justify-between gap-3 md:gap-8",
              "rounded-full",
              // “glass”
              "backdrop-blur-xl",
              "border border-white/40",
              "shadow-soft",
              // Фон: чуть прозрачный, чтобы был эффект “дорого”
              "bg-white/60 hover:bg-white/70",
              "transition-all duration-300",
              // padding
              "px-4 py-2.5 md:px-8 md:py-4",
              // shrink при скролле
              scrolled ? "md:py-3 md:px-7" : "",
            ].join(" ")}
            aria-label="Главная навигация"
          >
            {/* ЛОГО */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMobileOpen(false);
              }}
              className="flex items-center gap-2.5"
              aria-label="На верх страницы"
            >
              <Image
                src="/logo+text_horizontal_no_bg.png"
                alt="Корзина"
                width={240}
                height={80}
                priority
                className="h-8 md:h-10 w-auto"
              />
              {/* Если у тебя логотип-изображение уже содержит текст — этот span можно убрать.
                  Но ты просил “Onest Medium для шрифта лого” — оставляю как опционально. */}
              {/* <span className="hidden sm:block font-onest font-medium text-[18px] md:text-[20px] text-slate-900">
                Корзина
              </span> */}
            </a>

            {/* ДЕСКТОП НАВ */}
            <ul className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => {
                const active = activeId === item.id;
                return (
                  <li key={item.id} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => scrollToId(item.id)}
                      className={[
                        "text-[15px] lg:text-[16px] font-semibold",
                        "transition-colors",
                        active ? "text-slate-900" : "text-slate-700 hover:text-slate-900",
                        "relative",
                      ].join(" ")}
                    >
                      {item.label}
                      <span
                        className={[
                          "absolute left-0 -bottom-2 h-[2px] w-full rounded-full",
                          "transition-all duration-300",
                          active ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                        style={{ backgroundColor: "#FE6900" }}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* CTA + MOBILE */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Desktop CTA */}
              <button
                type="button"
                onClick={onBetaClick}
                className={[
                  "hidden md:inline-flex",
                  "items-center justify-center",
                  "rounded-full",
                  "px-6 py-3",
                  "text-[15px] font-bold text-white",
                  "shadow-soft",
                  "transition-transform duration-200",
                  "hover:scale-[1.03] active:scale-[0.99]",
                ].join(" ")}
                style={{ backgroundColor: "#FE6900" }}
              >
                Получить бета-доступ
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </button>

              {/* Mobile burger */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className={[
                  "md:hidden",
                  "inline-flex items-center justify-center",
                  "rounded-full w-10 h-10",
                  "border border-white/50",
                  "bg-white/70 backdrop-blur-xl",
                  "shadow-soft",
                  "transition",
                  "hover:bg-white/80",
                ].join(" ")}
                aria-controls="mobile-menu"
                aria-expanded={mobileOpen}
                aria-label="Открыть меню"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE MENU (glass sheet) */}
      <div
        className={[
          "md:hidden",
          "fixed inset-0 z-40",
          "transition-opacity duration-200",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          id="mobile-menu"
          className={[
            "absolute left-3 right-3 top-[72px]",
            "rounded-3xl",
            "border border-white/40",
            "bg-white/70 backdrop-blur-2xl",
            "shadow-soft",
            "p-4",
            "transition-transform duration-200",
            mobileOpen ? "translate-y-0" : "-translate-y-2",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню"
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Меню</div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              Закрыть
            </button>
          </div>

          <div className="mt-3 space-y-1">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={[
                    "w-full text-left",
                    "rounded-2xl",
                    "px-4 py-3",
                    "text-[16px] font-semibold",
                    "transition",
                    active
                      ? "bg-white/70 text-slate-900"
                      : "text-slate-800 hover:bg-white/60",
                  ].join(" ")}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: active ? "#FE6900" : "transparent" }}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onBetaClick}
            className={[
              "mt-4",
              "w-full",
              "inline-flex items-center justify-center",
              "rounded-2xl",
              "px-5 py-3.5",
              "text-[16px] font-bold text-white",
              "shadow-soft",
              "transition-transform duration-200",
              "hover:scale-[1.01] active:scale-[0.99]",
            ].join(" ")}
            style={{ backgroundColor: "#FE6900" }}
          >
            Получить бета-доступ
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mt-3 text-xs text-slate-600">
            Нажми на раздел — прокручу страницу и закрою меню.
          </div>
        </div>
      </div>

      {/* Spacer чтобы контент не уезжал под fixed header */}
      <div className="h-[84px] md:h-[104px]" aria-hidden="true" />
    </>
  );
}
