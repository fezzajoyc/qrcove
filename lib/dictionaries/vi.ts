// vi — từ điển tiếng Việt. Hình dạng khóa phải khớp en chính xác (tests/seo.test.ts).
// Giữ nguyên "QRCove", các placeholder {n}/{count}/{query}/{category} và token kỹ thuật.
const vi = {
  brand: "QRCove",
  tagline: "Mọi mã QR đều được tạo ngay trong trình duyệt của bạn.",
  metaDesc: "Trình tạo và đọc mã QR miễn phí chạy hoàn toàn trong trình duyệt của bạn. Tạo mã cho liên kết, Wi-Fi, danh bạ và nhiều hơn nữa — không watermark, không đăng ký, không hết hạn. Khi đọc ảnh, bạn xem bên trong có gì trước khi mở.",

  nav: {
    tools: "Tất cả công cụ",
    categories: "Danh mục",
    about: "Giới thiệu",
    menu: "Menu",
    language: "Ngôn ngữ",
  },

  home: {
    heroTitle: "Mã QR không bao giờ hết hạn — không watermark, không đăng ký",
    heroSub: "{n} công cụ để tạo và đọc mã QR: liên kết, Wi-Fi, danh thiếp, vị trí. Tất cả chạy cục bộ trong trình duyệt của bạn — miễn phí, không đăng ký, không tải lên.",
    browseAll: "Xem tất cả công cụ",
    categoriesTitle: "Danh mục",
    featuredTitle: "Công cụ phổ biến",
    trustLocal: "Dữ liệu ở lại trên thiết bị của bạn",
    trustFree: "Miễn phí, không cần tài khoản",
    trustFast: "Tức thì, dùng được cả khi offline",
    rotating:
    [
      "Khách kết nối Wi-Fi chỉ với một lần quét — không ai phải gõ mật khẩu",
      "Dữ liệu nằm ngay trong mã: không có chuyển hướng nào chết đi",
      "Danh bạ, liên kết và vị trí — quét là vào thẳng điện thoại",
      "Không tài khoản, không watermark, không gói “động” bị hết hạn",
    ],
    statsLabels: { tools: "công cụ", languages: "ngôn ngữ", uploads: "lượt tải lên", accounts: "tài khoản" },
    eyebrow: "Miễn phí mãi mãi",
    heroCtaSecondary: "Cách hoạt động",
    statsTools: "{n} công cụ",
    statsLanguages: "{n} ngôn ngữ",
    statsUploads: "0 lượt tải lên",
    statsAccounts: "0 tài khoản",
    categoriesSub: "Toàn bộ công cụ của QRCove chạy trên thiết bị của bạn.",
    popularSub: "Những công cụ được mở nhiều nhất.",
    privacyTitle: "Dữ liệu của bạn không bao giờ rời khỏi thiết bị.",
    privacySub: "Không có bước tải lên nào. Mã QR được JavaScript vẽ ngay trong trình duyệt — đó không phải lời hứa trong chính sách, mà là cách nó được xây dựng.",
    privacyPoint1T: "Xử lý cục bộ",
    privacyPoint1D: "Văn bản và hình ảnh được xử lý trong bộ nhớ của trình duyệt. Không có gì được truyền đi bất cứ nơi nào.",
    privacyPoint2T: "Không cần tài khoản",
    privacyPoint2D: "Không đăng ký, không email, không lưu lịch sử. Mở công cụ lên và dùng ngay.",
    privacyPoint3T: "Trung thực từ thiết kế",
    privacyPoint3D:
      "Nếu có gì đó thực sự không thể làm trong trình duyệt, chúng tôi nói thẳng thay vì giả vờ được.",
    privacyLink: "Đọc ghi chú riêng tư đầy đủ",
    endTitle: "Chọn một công cụ. Nó chỉ đơn giản là hoạt động.",
    endSub: "Công cụ QR miễn phí, không tải lên, không cần cài đặt gì.",
  },

  tools: {
    title: "Tất cả công cụ",
    subtitle: "Tìm kiếm trong {count} công cụ trình duyệt miễn phí. Không tải lên, không đăng ký.",
    filterPlaceholder: "Tìm công cụ…",
    count: "{count} công cụ",
    empty: "Không có công cụ nào khớp với “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Gộp, tách, chuyển đổi và chỉnh sửa file PDF mà không cần tải lên bất cứ đâu." },
    image: { name: "Ảnh", desc: "Nén, đổi kích thước, cắt và chuyển đổi ảnh ngay trong trình duyệt của bạn." },
    text: { name: "Văn bản", desc: "Đếm, làm sạch, sắp xếp và biến đổi văn bản tức thì khi bạn gõ." },
    developer: { name: "Lập trình viên", desc: "Trình định dạng, bộ mã hóa, bộ giải mã và trình tạo cho công việc dev hằng ngày." },
    seo: { name: "SEO", desc: "Thẻ meta, dữ liệu có cấu trúc, xem trước SERP và các trợ thủ SEO trên trang." },
    security: { name: "Bảo mật", desc: "Mật khẩu, hàm băm và tra cứu — tạo và kiểm tra ngay trên thiết bị của bạn." },
    utility: { name: "Tiện ích", desc: "Tạo và đọc mã QR: liên kết, Wi-Fi, danh thiếp, quét mã — tất cả cục bộ, không hết hạn." },
  },

  tool: {
    howTo: "Cách sử dụng",
    faq: "Câu hỏi thường gặp",
    related: "Công cụ liên quan",
    privacyNote:
      "Công cụ này chạy hoàn toàn trong trình duyệt của bạn. Dữ liệu không bao giờ rời khỏi thiết bị — không được tải lên bất kỳ máy chủ nào.",
    inCategory: "Xem thêm trong {category}",
    backToCategory: "Tất cả công cụ {category}",
  },

  common: {
    copy: "Sao chép",
    copied: "Đã sao chép",
    download: "Tải xuống",
    reset: "Đặt lại",
    swap: "Đảo chiều",
    clear: "Xóa",
    error: "Đã xảy ra lỗi. Kiểm tra dữ liệu nhập và thử lại.",
    input: "Đầu vào",
    output: "Kết quả",
    settings: "Tùy chọn",
    dropFiles: "Kéo thả file vào đây hoặc bấm để chọn",
    dropFile: "Kéo thả file vào đây hoặc bấm để chọn",
    processing: "Đang xử lý…",
    fileSize: "Dung lượng",
    sample: "Dùng thử ví dụ",
    uppercase: "CHỮ IN HOA",
  },

  unit: {
    from: "Từ",
    to: "Sang",
    amount: "Số lượng",
    result: "Kết quả",
    common: "Chuyển đổi thường dùng",
    formula: "Công thức",
    allUnits: "Tất cả đơn vị",
  },

  text: {
    stats: {
      words: "Từ",
      characters: "Ký tự",
      charsNoSpaces: "Không khoảng trắng",
      sentences: "Câu",
      paragraphs: "Đoạn",
      lines: "Dòng",
      readingTime: "Thời gian đọc",
      readingMinutes: "{n} phút đọc",
    },
  },

  footer: {
    line: "Công cụ QR miễn phí. Không gì bạn làm ở đây rời khỏi thiết bị của bạn.",
    privacy: "Quyền riêng tư",
    terms: "Điều khoản",
    about: "Giới thiệu",
    badges: "Huy hiệu",
    language: "Ngôn ngữ",
  },

  badge: {
    title: "Huy hiệu QRCove",
    desc: "Gắn huy hiệu QRCove lên trang web, README hay tài liệu của bạn. Nó dẫn về đây và cho mọi người biết các công cụ QR đằng sau nó chạy hoàn toàn trong trình duyệt.",
    voluntary: "Việc nhúng hoàn toàn tự nguyện — chọn một huy hiệu nếu bạn thích dự án này. Không cần xin phép ai.",
    md: "Markdown (README)",
    html: "HTML (trang web)",
    thanks: "Cảm ơn bạn đã lan tỏa — mỗi lượt nhúng giúp nhiều người hơn khám phá những công cụ tôn trọng file của họ.",
  },

  embed: {
    title: "Nhúng công cụ này",
    desc: "Đưa công cụ này vào trang của bạn bằng một dòng — nó chạy trong trình duyệt của khách.",
  },

    mcp: {
    title: "Máy chủ MCP — công cụ cho AI gọi trực tiếp",
    desc1: "QRCove đi kèm máy chủ MCP (Model Context Protocol): các trợ lý AI như Claude hay Cursor có thể tạo payload Wi-Fi và vCard, phân loại nội dung QR đã giải mã — cùng logic đã kiểm thử của trang này, không phải viết lại.",
    desc2: "Các công cụ chạy chính các hàm thuần của trang: tạo payload, nhận diện nội dung QR và ma trận dung lượng ISO. Việc vẽ ảnh QR chỉ có trên trình duyệt; các công cụ văn bản này chạy qua npx trên máy của AI client — không gì được gửi tới máy chủ của chúng tôi.",
    toolsTitle: "Công cụ chạy được ({n})",
    requiresNode: "Cần Node.js 18+. Máy chủ chạy cục bộ qua stdio; chỉ các lệnh bạn gọi được tính trên máy của bạn.",
    privacy: "Cần Node.js 18+. Máy chủ chạy cục bộ qua stdio; chỉ các lệnh bạn gọi được tính trên máy của bạn.",
  },

    notFound: {
    title: "Không tìm thấy trang",
    body: "Công cụ bạn tìm không tồn tại. Hãy xem tất cả công cụ thay thế.",
    home: "Về trang chủ",
  },
};

export default vi;
