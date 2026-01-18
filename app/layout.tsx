import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "تيك داون - تحميل فيديو تيك توك بدون علامة مائية",
  description: "أفضل موقع لتحميل فيديوهات تيك  بجودة عالية وبدون حقوق. سريع، مجاني،  مميز.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
