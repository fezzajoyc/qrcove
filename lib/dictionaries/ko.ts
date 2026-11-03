import type { Dictionary } from "../i18n";

// 한국어(ko) — 합니다체로 통일, 불필요한 외래어 표기 지양.
// 계약: 키 구조는 en과 완전히 동일(tests/seo.test.ts), 값은 한국어로 번역.
const ko: Dictionary = {
  brand: "QRCove",
  tagline: "모든 QR 코드는 브라우저 안에서 만들어집니다.",
  metaDesc: "브라우저에서 완전히 작동하는 무료 QR 코드 생성기이자 리더. 링크, Wi-Fi, 연락처 등의 코드를 만드세요 — 워터마크 없음, 가입 없음, 만료 없음. 이미지를 읽을 때는 열기 전에 내용을 먼저 확인할 수 있습니다.",

  nav: {
    tools: "전체 도구",
    categories: "카테고리",
    about: "소개",
    menu: "메뉴",
    language: "언어",
  },

  home: {
    heroTitle: "만료되지 않는 QR 코드 — 워터마크 없음, 가입 없음",
    heroSub: "{n}개의 QR 도구로 만들기와 읽기를 모두: 링크, Wi-Fi, 연락처 카드, 위치. 모두 브라우저에서 로컬 실행 — 무료, 가입 불필요, 업로드 없음.",
    browseAll: "전체 도구 보기",
    pinned: "고정됨",
    pin: "상단에 고정",
    unpin: "고정 해제",
    popular: "인기 도구",
    categoriesTitle: "카테고리",
    featuredTitle: "인기 도구",
    trustLocal: "데이터는 기기에 머뭅니다",
    trustFree: "무료, 계정 불필요",
    trustFast: "즉시 실행, 오프라인 작동",
    rotating:
    [
      "손님은 스캔 한 번으로 Wi-Fi에 연결 — 아무도 비밀번호를 입력하지 않습니다",
      "데이터는 코드 안에 — 사라질 리다이렉트가 없습니다",
      "연락처·링크·위치 — 스캔해서 바로 휴대폰으로",
      "계정도 워터마크도 만료되는 “동적” 구독도 없습니다",
    ],
    statsLabels: { tools: "도구", languages: "개 언어", uploads: "업로드", accounts: "계정" },
    eyebrow: "평생 무료",
    heroCtaSecondary: "이용 방법",
    statsTools: "도구 {n}개",
    statsLanguages: "{n}개 언어",
    statsUploads: "업로드 0건",
    statsAccounts: "계정 0개",
    categoriesSub: "QRCove의 모든 도구가 기기 위에서 실행됩니다.",
    popularSub: "가장 많이 열어보는 도구입니다.",
    privacyTitle: "데이터는 절대 기기를 떠나지 않습니다.",
    privacySub: "업로드 단계가 없습니다. QR는 브라우저의 JavaScript가 그립니다 — 정책의 약속이 아니라 만들어진 방식입니다.",
    privacyPoint1T: "로컬 처리",
    privacyPoint1D: "텍스트와 이미지는 브라우저 메모리에서만 처리됩니다. 어디로도 전송되지 않습니다.",
    privacyPoint2T: "계정 없음",
    privacyPoint2D: "가입도, 이메일도, 저장되는 기록도 없습니다. 도구를 열고 바로 쓰면 됩니다.",
    privacyPoint3T: "설계부터 정직하게",
    privacyPoint3D:
      "브라우저에서 정말 불가능한 일이라면 그렇다고 말합니다. 가능한 척하지 않습니다.",
    privacyLink: "전체 개인정보 노트 읽기",
    endTitle: "도구를 고르면, 바로 작동합니다.",
    endSub: "무료 QR 도구, 업로드 0, 설치 불필요.",
  },

  tools: {
    title: "전체 도구",
    subtitle: "브라우저에서 도는 무료 도구 {count}개. 업로드도, 가입도 없습니다.",
    filterPlaceholder: "도구 검색…",
    count: "도구 {count}개",
    empty: "“{query}”에 해당하는 도구가 없습니다.",
  },

  categories: {
    pdf: { name: "PDF", desc: "어디에도 업로드하지 않고 PDF를 합치고, 나누고, 변환하고, 편집합니다." },
    image: { name: "이미지", desc: "브라우저 안에서 이미지를 압축하고, 크기를 조정하고, 자르고, 변환합니다." },
    text: { name: "텍스트", desc: "입력하는 즉시 텍스트를 세고, 정리하고, 정렬하고, 변환합니다." },
    developer: { name: "개발", desc: "매일 쓰는 포매터, 인코더, 디코더, 생성기 모음." },
    seo: { name: "SEO", desc: "메타 태그, 스키마 마크업, SERP 미리보기 등 온페이지 SEO 도우미." },
    security: { name: "보안", desc: "비밀번호, 해시, 조회 도구 — 기기에서 생성하고 확인합니다." },
    utility: { name: "생활", desc: "QR 만들기와 읽기: 링크, Wi-Fi, 연락처 카드, 스캔 — 전부 로컬 처리, 만료 없음." },
  },

  tool: {
    howTo: "사용 방법",
    faq: "자주 묻는 질문",
    related: "관련 도구",
    nextStep: "다음 단계",
    copyLink: "링크 복사",
    privacyNote:
      "이 도구는 전부 브라우저 안에서 실행됩니다. 데이터는 기기를 떠나지 않으며 어떤 서버로도 업로드되지 않습니다.",
    inCategory: "{category}의 다른 도구",
    backToCategory: "{category} 전체 도구",
  },

  common: {
    openTool: "도구 열기",
    copy: "복사",
    copied: "복사됨",
    download: "다운로드",
    reset: "초기화",
    swap: "바꾸기",
    clear: "지우기",
    error: "문제가 발생했습니다. 입력값을 확인하고 다시 시도해 주세요.",
    input: "입력",
    output: "결과",
    settings: "옵션",
    dropFiles: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    dropFile: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    processing: "처리 중…",
    fileSize: "크기",
    sample: "예시로 써보기",
    uppercase: "대문자",
  },

  unit: {
    from: "변환 전",
    to: "변환 후",
    amount: "값",
    result: "결과",
    common: "자주 쓰는 변환",
    formula: "계산식",
    allUnits: "전체 단위",
  },

  text: {
    stats: {
      words: "단어",
      characters: "글자",
      charsNoSpaces: "공백 제외",
      sentences: "문장",
      paragraphs: "단락",
      lines: "줄",
      readingTime: "읽는 시간",
      readingMinutes: "약 {n}분",
    },
  },

  footer: {
    line: "무료 QR 도구. 여기서 하는 모든 일은 기기를 떠나지 않습니다.",
    privacy: "개인정보",
    terms: "약관",
    about: "소개",
    badges: "배지",
    language: "언어",
  },

  badge: {
    title: "QRCove 배지",
    desc: "사이트, README, 문서에 QRCove 배지를 달아 보세요. 여기로 연결되며, 배지 뒤의 QR 도구들이 전부 브라우저 안에서 실행된다는 뜻이기도 합니다.",
    voluntary: "배지 삽입은 완전히 자율입니다 — 마음에 드는 배지를 골라 쓰세요. 허락받을 필요 없습니다.",
    md: "Markdown (README)",
    html: "HTML (웹사이트)",
    thanks: "널리 알려 주셔서 감사합니다 — 하나의 삽입이 도구를 더 많은 사람에게 알려 줍니다.",
  },

  embed: {
    title: "도구 삽입",
    desc: "한 줄로 사이트에 도구를 넣으세요. 방문자의 브라우저에서 실행됩니다.",
  },

    mcp: {
    title: "MCP 서버 — AI가 호출하는 도구",
    desc1: "QRCove는 MCP(Model Context Protocol) 서버를 제공합니다: Claude, Cursor 같은 AI 어시스턴트가 Wi-Fi·vCard 페이로드를 만들고 디코딩된 QR 내용을 분류합니다 — 이 사이트와 같은 테스트된 로직이지 재구현이 아닙니다.",
    desc2: "도구는 사이트 자체의 순수 함수를 실행합니다: 페이로드 생성, QR 내용 판별, ISO 용량 매트릭스. QR 이미지 렌더링은 브라우저 전용이며, 이 문자열 도구들은 npx를 통해 AI 클라이언트 머신에서 실행됩니다 — 우리 서버로는 아무것도 전송되지 않습니다.",
    toolsTitle: "실행 가능한 도구({n}개)",
    requiresNode: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
    privacy: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
  },

    notFound: {
    title: "페이지를 찾을 수 없습니다",
    body: "찾으시는 도구가 존재하지 않습니다. 전체 도구를 둘러보세요.",
    home: "홈으로 가기",
  },
};

export default ko;
