import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Корзина — умный сервис для заказа продуктов",
  description:
    "Корзина сравнивает стоимость всей корзины в разных магазинах и помогает экономить на доставке.",
  metadataBase: new URL("https://korzina.example.com"), // поменяешь позже
  openGraph: {
    title: "Корзина — экономь на доставке и продуктах",
    description:
      "Сервис, который считает стоимость всей корзины сразу в нескольких магазинах и показывает, где выгоднее заказать.",
    url: "https://korzina.example.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          {/* Хедер */}
          {/* <header className="border-b bg-korzina-surface backdrop-blur">
            <div className="container-page flex items-center justify-between py-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo+text_horizontal_no_bg.png"
                  alt="Логотип"
                  width={300}
                  height={100}
                />
              </div>

              <nav className="hidden md:flex items-center gap-6 text-m text-korzina-primary">
                <a href="#how" className="hover:text-korzina-primaryDark">
                  Как это работает
                </a>
                <a href="#saving" className="hover:text-korzina-primaryDark">
                  Экономия
                </a>
                <a href="#b2b" className="hover:text-korzina-primaryDark">
                  Для партнёров
                </a>
                <a href="#faq" className="hover:text-korzina-primaryDark">
                  FAQ
                </a>
              </nav>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center justify-center rounded-full bg-korzina-primary px-6 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-korzina-primaryDark transition">
                  Получить бета-доступ
                </button>
              </div>
            </div>
          </header> */}

          {/* Контент страниц */}
          <main className="flex-1">{children}</main>

          {/* Футер */}
          <footer className="border-t border-slate-800 mt-12">
            <div className="container-page py-8 text-sm text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                © {new Date().getFullYear()} Корзина. Все права защищены.
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="/privacy" className="hover:text-slate-300">
                  Политика конфиденциальности
                </a>
                <a href="/terms" className="hover:text-slate-300">
                  Пользовательское соглашение
                </a>
                <a href="#b2b" className="hover:text-slate-300">
                  Для ритейлеров и брендов
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
