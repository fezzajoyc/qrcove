import type { Dictionary } from "../i18n";

const ja: Dictionary = {
  brand: "QRCove",
  tagline: "すべての QR コードはブラウザの中で生成されます。",
  metaDesc: "ブラウザ内で完結する無料の QR コード生成・読み取りツール。URL・Wi-Fi・連絡先などのコードを作成 — 透かなし、登録不要、有効期限なし。画像から読み取る際は、開く前に中身を確認できます。",

  nav: {
    tools: "すべてのツール",
    categories: "カテゴリー",
    about: "このサイトについて",
    menu: "メニュー",
    language: "言語",
  },

  home: {
    heroTitle: "期限切れのない QR コード — 透かなし・登録不要",
    heroSub: "{n} 個の QR ツールで生成も読み取りも:URL、Wi-Fi、連絡先、位置情報。すべてブラウザ内でローカル実行 — 無料、登録不要、アップロード一切なし。",
    browseAll: "すべてのツールを見る",
    categoriesTitle: "カテゴリー",
    featuredTitle: "人気のツール",
    trustLocal: "データは端末から出ません",
    trustFree: "無料・アカウント不要",
    trustFast: "即時処理・オフライン対応",
    rotating:
    [
      "Wi-Fi は一読で接続 — パスワードを打たせる必要なし",
      "データはコードの中 — リダイレクトが消えても動き続けます",
      "連絡先・リンク・位置 — スキャンして直接スマホへ",
      "アカウントも透かしも「動的 QR」のサブスク切れもありません",
    ],
    statsLabels: { tools: "ツール", languages: "言語", uploads: "アップロード", accounts: "アカウント" },
    eyebrow: "ずっと無料",
    heroCtaSecondary: "仕組みを見る",
    statsTools: "{n} 個のツール",
    statsLanguages: "{n} 言語",
    statsUploads: "アップロード 0 回",
    statsAccounts: "アカウント 0 個",
    categoriesSub: "QRCove の全ツールが、あなたのデバイス上で動きます。",
    popularSub: "いちばん使われているツール。",
    privacyTitle: "あなたのデータは端末の外に出ません。",
    privacySub: "アップロードという手順がありません。QR はブラウザ内の JavaScript が描いています。これはポリシーの約束ではなく、実装の仕方です。",
    privacyPoint1T: "ローカル処理",
    privacyPoint1D: "テキストと画像はブラウザのメモリ内でのみ処理され、どこにも送信されません。",
    privacyPoint2T: "アカウント不要",
    privacyPoint2D: "登録もメールも履歴もありません。開いてすぐ使えます。",
    privacyPoint3T: "誠実な設計",
    privacyPoint3D: "ブラウザでできないことは、できないとはっきり書きます。",
    privacyLink: "プライバシーの詳細を読む",
    endTitle: "ツールを選んで、すぐ使える。",
    endSub: "無料の QR ツール。アップロードゼロ、インストール不要。",
  },

  tools: {
    title: "すべてのツール",
    subtitle: "{count} 個の無料ブラウザツールを検索。アップロード不要・登録不要。",
    filterPlaceholder: "ツールを検索…",
    count: "{count} 個のツール",
    empty: "「{query}」に一致するツールはありません。",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF の結合・分割・変換・編集をどこにもアップロードせずに行えます。" },
    image: { name: "画像", desc: "画像の圧縮・リサイズ・切り抜き・形式変換をブラウザ内で。" },
    text: { name: "テキスト", desc: "文字数・整形・並べ替え・変換を入力しながら即時に。" },
    developer: { name: "開発者", desc: "日々の開発に使うフォーマッタ・エンコーダ・ジェネレータ。" },
    seo: { name: "SEO", desc: "メタタグ・構造化データ・SERP プレビューなどの SEO ヘルパー。" },
    security: { name: "セキュリティ", desc: "パスワード・ハッシュ・各種ルックアップを端末内で生成・検証。" },
    utility: { name: "ユーティリティ", desc: "QR コードの生成と読み取り:URL、Wi-Fi、連絡先、スキャン — すべてローカル処理で期限なし。" },
  },

  tool: {
    howTo: "使い方",
    faq: "よくある質問",
    related: "関連ツール",
    privacyNote:
      "このツールは完全にブラウザ内で動作します。データは端末から出ず、サーバーへアップロードされることはありません。",
    inCategory: "{category}のその他のツール",
    backToCategory: "{category}のすべてのツール",
  },

  common: {
    copy: "コピー",
    copied: "コピーしました",
    download: "ダウンロード",
    reset: "リセット",
    swap: "入れ替え",
    clear: "クリア",
    error: "エラーが発生しました。入力を確認して再試行してください。",
    input: "入力",
    output: "結果",
    settings: "オプション",
    dropFiles: "ここにファイルをドロップ、またはクリックして選択",
    dropFile: "ここにファイルをドロップ、またはクリックして選択",
    processing: "処理中…",
    fileSize: "サイズ",
    sample: "サンプルを試す",
    uppercase: "大文字",
  },

  unit: {
    from: "変換前",
    to: "変換後",
    amount: "数値",
    result: "結果",
    common: "よく使う変換",
    formula: "計算式",
    allUnits: "すべての単位",
  },

  text: {
    stats: {
      words: "単語数",
      characters: "文字数",
      charsNoSpaces: "空白除く",
      sentences: "文の数",
      paragraphs: "段落",
      lines: "行数",
      readingTime: "読了時間",
      readingMinutes: "約 {n} 分",
    },
  },

  footer: {
    line: "無料の QR ツール。ここで行ったことは端末の外に出ません。",
    privacy: "プライバシー",
    terms: "利用規約",
    about: "このサイトについて",
    badges: "バッジ",
    language: "言語",
  },

  badge: {
    title: "QRCove バッジ",
    desc: "あなたのサイトや README、ドキュメントに QRCove バッジを置いてみてください。このサイトへリンクし、背後の QR ツールが完全にブラウザ内で動くことを伝えます。",
    voluntary: "設置は完全に任意です。プロジェクトを気に入ったらお好きなバッジをどうぞ。許可は不要です。",
    md: "Markdown(README)",
    html: "HTML(ウェブサイト)",
    thanks: "広めていただきありがとうございます。すべての設置が、ファイルを尊重するツールの発見につながります。",
  },

    embed: {
    title: "ツールを埋め込む",
    desc: "1 行であなたのサイトにツールを。訪問者のブラウザ内で動きます。",
  },

    mcp: {
    title: "MCP サーバー——AI から呼び出せるツール",
    desc1: "QRCove は MCP(Model Context Protocol)サーバーを同梱しています。Claude や Cursor などの AI アシスタントが、Wi-Fi や vCard の QR ペイロード構築、読み取り結果の判別をそのまま実行できます — このサイトと同じテスト済みロジックであり、再実装ではありません。",
    desc2: "ツールはサイト自身の純粋関数(ペイロード構築・QR 内容判別・ISO 容量マトリクス)を実行します。QR 画像のレンダリングはブラウザ専用で、これらの文字列ツールは AI クライアント側のマシンで npx 経由で動きます — 当社サーバーには何も送信されません。",
    toolsTitle: "実行可能なツール({n} 個)",
    requiresNode: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
    privacy: "Node.js 18+ が必要です。サーバーは stdio でローカル実行。呼び出したツール計算のみローカルで行われます。",
  },

    notFound: {
    title: "ページが見つかりません",
    body: "お探しのツールは存在しません。すべてのツールからお探しください。",
    home: "ホームへ戻る",
  },
};

export default ja;
