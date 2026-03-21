import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "오늘 뭐먹? | 같이 고르는 오늘의 메뉴",
  description:
    "같이 고르면 싸움 없이 메뉴 결정! 서로 먹고 싶은 메뉴 3개를 고르면, 겹치는 메뉴를 알려드려요.",
  openGraph: {
    title: "오늘 뭐먹? | 같이 고르는 오늘의 메뉴",
    description:
      "같이 고르면 싸움 없이 메뉴 결정! 서로 먹고 싶은 메뉴 3개를 고르면, 겹치는 메뉴를 알려드려요.",
    images: [
      {
        url: "https://mwomuk.dhlm-studio.com/og-share.png?v=1",
        width: 1200,
        height: 630,
        alt: "오늘 뭐먹?",
      },
    ],
    type: "website",
    siteName: "오늘 뭐먹?",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘 뭐먹? | 같이 고르는 오늘의 메뉴",
    description:
      "같이 고르면 싸움 없이 메뉴 결정! 서로 먹고 싶은 메뉴 3개를 고르면, 겹치는 메뉴를 알려드려요.",
    images: ["https://mwomuk.dhlm-studio.com/og-share.png?v=1"],
  },
  metadataBase: new URL("https://mwomuk.dhlm-studio.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col items-center"
        style={{ fontFamily: "var(--font-noto-sans-kr), 'Noto Sans KR', sans-serif" }}
      >
        <div className="w-full max-w-[480px] min-h-screen flex flex-col">
          {children}
        </div>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
