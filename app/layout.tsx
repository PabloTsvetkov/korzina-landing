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
      {/* <body className={`${inter.className} relative overflow-x-hidden bg-[rgba(254,105,0,0.18)]`}> */}
      <body
        className={`${inter.className} relative overflow-x-hidden bg-[url('/bg_image.png')] h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>

          <footer className="mt-12">
            <div className="container-page py-8 text-sm text-slate-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                © {new Date().getFullYear()} Корзина. Все права защищены.
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="/privacy" className="hover:text-slate-700">
                  Политика конфиденциальности
                </a>
                <a href="/terms" className="hover:text-slate-700">
                  Пользовательское соглашение
                </a>
                <a href="#b2b" className="hover:text-slate-700">
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
