declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (params: KakaoShareParams) => void;
      };
    };
  }
}

interface KakaoShareParams {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: Array<{
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }>;
}

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "https://mwomuk.dhlm-studio.com";
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "https://mwomuk.dhlm-studio.com";
}

function isKakaoAvailable(): boolean {
  return typeof window !== "undefined" && !!window.Kakao;
}

export function initKakao(): void {
  const kakaoKey =
    process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "ea95354167038ebb0be11c1aae1ffe26";

  function tryInit() {
    if (typeof window === "undefined") return;
    if (!window.Kakao) {
      console.log("[Kakao] SDK not yet loaded, retrying in 500ms...");
      setTimeout(tryInit, 500);
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
      console.log("[Kakao] SDK initialized.");
    } else {
      console.log("[Kakao] Already initialized.");
    }
  }

  tryInit();
}

export function shareMenu(categoryName: string, shareCode: string): void {
  const baseUrl = getBaseUrl();
  const shareUrl = `${baseUrl}/s/${shareCode}`;

  const params: KakaoShareParams = {
    objectType: "feed",
    content: {
      title: "\uC624\uB298 \uBB50 \uBA39\uC9C0? \uD83C\uDF7D\uFE0F",
      description: `${categoryName} - \uAC19\uC774 \uACE8\uB77C\uBCF4\uC790!`,
      imageUrl: "https://mwomuk.dhlm-studio.com/og-share.png?v=1",
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "\uBA54\uB274 \uACE8\uB77C\uBCF4\uAE30",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  };

  console.log("[Kakao DEBUG] shareUrl:", shareUrl);
  console.log("[Kakao DEBUG] params:", JSON.stringify(params, null, 2));

  if (isKakaoAvailable() && window.Kakao.isInitialized()) {
    console.log("[Kakao DEBUG] SDK ready, calling sendDefault...");
    window.Kakao.Share.sendDefault(params);
  } else {
    console.log(
      "[Kakao Mock] SDK not ready. isAvailable:",
      isKakaoAvailable()
    );
    console.log(`[Kakao Mock] Share URL: ${shareUrl}`);
  }
}

export function shareResult(matchCount: number, sessionId: string): void {
  const baseUrl = getBaseUrl();
  const resultUrl = `${baseUrl}/result/${sessionId}`;

  const params: KakaoShareParams = {
    objectType: "feed",
    content: {
      title: `\uC6B0\uB9AC \uACA9\uCE58\uB294 \uBA54\uB274 ${matchCount}\uAC1C! \uD83C\uDF89`,
      description: "\uC624\uB298 \uC800\uB141\uC740 \uC774\uAC70\uB2E4!",
      imageUrl: "https://mwomuk.dhlm-studio.com/og-share.png?v=1",
      link: {
        mobileWebUrl: resultUrl,
        webUrl: resultUrl,
      },
    },
    buttons: [
      {
        title: "\uACB0\uACFC \uBCF4\uAE30",
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      {
        title: "\uB098\uB3C4 \uD574\uBCF4\uAE30",
        link: {
          mobileWebUrl: baseUrl,
          webUrl: baseUrl,
        },
      },
    ],
  };

  if (isKakaoAvailable() && window.Kakao.isInitialized()) {
    window.Kakao.Share.sendDefault(params);
  } else {
    console.log("[Kakao Mock] shareResult:", params);
    console.log(`[Kakao Mock] Result URL: ${resultUrl}`);
  }
}
