"use client";

import { useState } from "react";

interface ShareButtonsProps {
  onKakaoShare: () => void;
  shareUrl: string;
}

export default function ShareButtons({
  onKakaoShare,
  shareUrl,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      const timer = window.setTimeout(() => setCopied(false), 2000);
      return () => window.clearTimeout(timer);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      const timer = window.setTimeout(() => setCopied(false), 2000);
      return () => window.clearTimeout(timer);
    }
  };

  const handleSms = () => {
    const message = `오늘 뭐먹지? 같이 메뉴 골라보자! ${shareUrl}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Kakao Share */}
      <button
        type="button"
        onClick={onKakaoShare}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl
          bg-[#FEE500] text-[#191919] font-bold text-sm
          hover:brightness-95 active:scale-[0.98] transition-all"
      >
        <span className="text-lg">📱</span>
        카카오톡으로 보내기
      </button>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="relative flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl
          bg-gray-100 text-gray-700 font-bold text-sm
          hover:bg-gray-200 active:scale-[0.98] transition-all"
      >
        <span className="text-lg">🔗</span>
        {copied ? "복사 완료!" : "링크 복사"}
      </button>

      {/* SMS */}
      <button
        type="button"
        onClick={handleSms}
        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl
          bg-green-500 text-white font-bold text-sm
          hover:bg-green-600 active:scale-[0.98] transition-all"
      >
        <span className="text-lg">💬</span>
        문자로 보내기
      </button>

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-full shadow-lg toast-enter z-50">
          링크가 복사되었습니다!
        </div>
      )}
    </div>
  );
}
