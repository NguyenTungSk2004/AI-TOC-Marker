# AI TOC Marker – Tiện ích tạo mục lục đa nền tảng cho ChatGPT & Grok

**AI TOC Marker** là tiện ích mở rộng Chrome **hỗ trợ đa nền tảng AI** (ChatGPT, Grok) với khả năng **tự động tạo mục lục, đánh dấu và điều hướng các tiêu đề (heading)** trong hội thoại AI. Được thiết kế để **quản lý nội dung dài, tra cứu nhanh thông tin và nâng cao hiệu quả học tập, làm việc** trên các platform AI hàng đầu.

**Hướng dẫn chi tiết & bản demo:** [https://nguyentungsk2004.github.io/AI-TOC-Marker/](https://nguyentungsk2004.github.io/AI-TOC-Marker/)

---

### **Tính năng cốt lõi**
* **Tự động phát hiện tiêu đề** `H1`, `H2`, `H3`, `H4` trong nội dung AI
* **Điều hướng tức thì** đến phần nội dung mong muốn chỉ với một cú nhấp chuột
* **Làm nổi bật nội dung chính** để dễ dàng theo dõi
* **Hoạt động hoàn toàn offline** – không cần tài khoản, không thu thập dữ liệu
* **Tìm kiếm tiêu đề nâng cao** – lọc theo từ khoá, hiển thị kết quả khớp
* **Cài đặt nhanh chóng, dễ sử dụng** chỉ với vài bước đơn giản

### **UI/UX tối ưu**
* **Title động theo platform** - hiển thị ChatGPT hoặc Grok
* **Giao diện tối ưu cho Dark Mode**
* **Ghi nhớ tab đã mở trong hội thoại** – tiếp tục công việc mượt mà
* **Thông báo rõ ràng hơn** – cập nhật trạng thái tức thì

---

## Demo thực tế

![AI TOC Marker demo](https://github.com/NguyenTungSk2004/AI-TOC-Marker/blob/main/public/img/demo-guide.gif)

> *Minh hoạ cách AI TOC Marker hoạt động trên cả ChatGPT và Grok với khả năng tự động nhận diện platform và tạo mục lục.*

---

## Cách cài đặt tiện ích

1. Tải file `.zip` bên dưới
2. Giải nén file
3. Truy cập `chrome://extensions`
4. Bật **Developer Mode** (Chế độ nhà phát triển)
5. Chọn **Load unpacked** → chọn thư mục đã giải nén
6. Mở ChatGPT hoặc Grok → tiện ích sẽ tự động hoạt động

Trong thư mục tải về có kèm file `HOW-TO-INSTALL.html` hướng dẫn chi tiết bằng hình ảnh.

---

## Tải xuống các phiên bản
<img src="https://img.shields.io/github/downloads/NguyenTungSk2004/AI-TOC-Marker/total" alt="Tổng số lượt tải" style="vertical-align: middle; margin-bottom: 4px;" />

| Phiên bản | Thay đổi chính                                | Link tải                                                                                                                       |
| ------------ | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `2.0.1`      | Cập nhật sửa lỗi DOM ChatGPT mới | [Tải AI-TOC-Marker v2.0.1](https://github.com/NguyenTungSk2004/AI-TOC-Marker/releases/download/v2.0.0/AI-TOC-Marker-2.0.1.zip) |
| `2.0.0`      | Hỗ trợ đa nền tảng (ChatGPT + Grok), Architecture mới | [Tải AI-TOC-Marker v2.0.0](https://github.com/NguyenTungSk2004/AI-TOC-Marker/releases/download/v2.0.0/AI-TOC-Marker-2.0.0.zip) |
| `1.0.0`      | UI mới, tối ưu hiệu suất, ghi nhớ trạng thái tab | [Tải AI-TOC-Marker v1.0.0](https://github.com/NguyenTungSk2004/AI-TOC-Marker/releases/download/v1.0.0/AI-TOC-Marker-1.0.0.zip) |
| `0.1.0`      | Giao diện dark mode, tìm kiếm nâng cao           | [Tải AI-TOC-Marker v0.1.0](https://github.com/NguyenTungSk2004/AI-TOC-Marker/releases/download/v0.1.0/AI-TOC-Marker-0.1.0.zip) |

---

## Hỗ trợ nền tảng AI

### **ChatGPT**
* **chat.openai.com**
* **chatgpt.com**
* **Auto-detect** conversation turns
* **Hierarchical TOC** từ markdown content

### **Grok**
* **x.ai/grok**
* **Smart message pairing**
* **Advanced DOM parsing**
* **Flex container handling**

---

## Phù hợp với ai?

* **Power users** của ChatGPT và Grok
* **Sinh viên, giảng viên, nhà nghiên cứu** sử dụng AI
* **Nhân viên văn phòng, copywriter, marketer** làm việc với AI
* **Lập trình viên, data scientist** theo dõi nội dung AI phức tạp
* **Doanh nghiệp** sử dụng multiple AI platforms

---

## Thông tin kỹ thuật cho developer

### **Architecture**
* **Framework**: Vite + TypeScript
* **Manifest V3** - Chrome Extensions
* **Platform Factory Pattern** - Extensible design
* **Modular Components** - Clean separation

### **Platform System**
* **BasePlatform** - Abstract class với common functionality
* **ChatGPTPlatform** - ChatGPT-specific implementation
* **GrokPlatform** - Grok-specific implementation
* **PlatformFactory** - Singleton pattern với auto-detection

### **Development Setup**
```bash
# Cài đặt dependencies
npm install

# Development mode
npm run dev

# Build production
npm run build

# Tạo zip file
npm run zip
```

### **Build Script**
```bash
# Build và đóng gói một lệnh
npm run zip
```

---

## Scaffold dự án

Khởi tạo từ scaffold: [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

---

## Tác giả & liên hệ

Phát triển bởi **NguyenTungSk**
[GitHub cá nhân](https://github.com/NguyenTungSk2004/AI-TOC-Marker)

---

## Giấy phép sử dụng

Phát hành theo [Apache License 2.0](./LICENSE)

Bạn được phép:

* Sử dụng, chỉnh sửa và phân phối mã nguồn
* Tích hợp vào sản phẩm thương mại
* Giữ nguyên bản quyền tác giả

> Xem chi tiết: [LICENSE](./LICENSE)

---

## Góp ý & Đóng góp

* Mở **Issue** để phản hồi lỗi hoặc đề xuất
* Gửi **Pull Request** để đóng góp mã nguồn
* **Đề xuất platform mới** để hỗ trợ

> Nếu bạn thấy tiện ích hữu ích, hãy star repo để ủng hộ nhé!

---

## Tags

`chrome-extension` `chatgpt` `grok` `ai-tools` `toc-generator` `productivity` `typescript` `manifest-v3` `multi-platform` `ai-assistant` `table-of-contents` `browser-extension` `developer-tools` `automation` `vietnamese`
