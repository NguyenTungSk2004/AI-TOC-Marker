# 🌟 AI TOC Marker – Tiện ích tạo mục lục cho ChatGPT

**AI TOC Marker** là tiện ích mở rộng cho trình duyệt **Chrome** giúp bạn **đánh dấu và điều hướng các tiêu đề (heading)** trong cuộc hội thoại của **ChatGPT**. Rất hữu ích khi làm việc với nội dung dài, cần tìm nhanh thông tin hoặc tổ chức lại cấu trúc câu trả lời.

🔗 **Xem hướng dẫn chi tiết & demo tại:** [https://nguyentungsk2004.github.io/AI-TOC-Marker/](https://nguyentungsk2004.github.io/AI-TOC-Marker/)

---

## 🚀 Tính năng nổi bật

* 🔎 **Tự động nhận diện** tiêu đề như `H1`, `H2` trong phản hồi ChatGPT
* 🧭 **Điều hướng nhanh** đến phần mong muốn trong hội thoại
* 🌟 **Đánh dấu & làm nổi bật** các mục chính rõ ràng
* 🔐 **Hoạt động cục bộ** – không cần tích hợp API hay tài khoản
* 💡 **Dễ cài đặt** – chỉ vài bước là xong
* 🧑‍💻 **Mã nguồn mở** – bạn có thể tùy biến hoặc đóng góp
* 📉 **Giao diện gọn gàng, tối ưu cho dark mode** (light mode sẽ hỗ trợ trong các bản cập nhật tiếp theo)

---

## 🆕 Có gì mới trong v1.0.0?

✨ **Bản chính thức** với nhiều nâng cấp vượt trội từ bản beta:

* 🎨 **Giao diện mới hiện đại & thân thiện hơn**
* 🔔 **Cập nhật hệ thống thông báo** rõ ràng, nổi bật hơn
* 🧠 **Lưu lịch sử bật/tắt các tab trong cuộc hội thoại** – ghi nhớ các tab đã mở trong lần trước, giúp tiếp tục làm việc liền mạch
* 🧩 **Tối ưu lại hiệu suất và luồng xử lý DOM** – tăng tốc hiển thị và giảm trễ
* 🐞 **Sửa nhiều lỗi tìm ẩn** khi thao tác nhanh hoặc thao tác song song nhiều cuộc trò chuyện
* 📦 **Đóng gói gọn nhẹ hơn** – giúp tải nhanh hơn, ít file hơn

---

## 🎮 Demo tính năng

![Gif giới thiệu tính năng AI TOC Marker](https://github.com/NguyenTungSk2004/AI-TOC-Marker/blob/main/public/img/demo-guide.gif)

> 🎥 *Minh hoạ AI TOC Marker tự động đánh dấu và điều hướng tiêu đề trong cuộc hội thoại ChatGPT.*

---

## ⚙️ Cách cài đặt nhanh

1. 📦 Tải file `.zip` từ bảng tải bên dưới
2. 🗂 Giải nén file
3. 🌐 Mở Chrome → truy cập `chrome://extensions`
4. 🔧 Bật **Developer Mode** (Chế độ nhà phát triển)
5. 📂 Click **Load unpacked** → chọn thư mục đã giải nén
6. ✅ Mở ChatGPT → tiện ích sẽ tự động hoạt động

📁 Trong thư mục tải về có file `HOW-TO-INSTALL.html` hướng dẫn chi tiết kèm ảnh minh hoạ.

---

## 📥 Tải xuống & Sử dụng

<img src="https://img.shields.io/github/downloads/NguyenTungSk2004/AI-TOC-Marker/total" alt="Tổng số lượt tải" style="vertical-align: middle; margin-bottom: 4px;" />

| 📌 Phiên bản | 📝 Ghi chú                                            | 🔗 Link tải                                                                                                                       |
| ------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `1.0.0`      | Bản chính thức: UI mới, tối ưu hiệu suất, lưu lịch sử | [⬇️ Tải AI-TOC-Marker v1.0.0](https://github.com/NguyenTungSk2004/AI-TOC-Marker/releases/download/v1.0.0/AI-TOC-Marker-1.0.0.zip) |
| `0.1.0`      | Giao diện mới, tìm kiếm nâng cao, nhiều cải tiến UX   | [⬇️ Tải AI-TOC-Marker v0.1.0](https://github.com/NguyenTungSk2004/AI-TOC-Marker/releases/download/v0.1.0/AI-TOC-Marker-0.1.0.zip) |
| `0.0.1`      | Phiên bản đầu tiên                                    | [⬇️ Tải AI-TOC-Marker v0.0.1](https://github.com/NguyenTungSk2004/AI-TOC-Marker/releases/download/v0.0.1/AI-TOC-Marker-0.0.1.zip) |

---

## 👥 Phù hợp với ai?

* 🧑 Người dùng ChatGPT thường xuyên
* 🎓 Sinh viên, giảng viên, người nghiên cứu
* 💼 Nhân viên văn phòng, người viết nội dung
* 🧑‍💻 Lập trình viên cần theo dõi nhiều phần phản hồi từ AI

---

## 🧑‍💻 Dành cho nhà phát triển

Dự án được xây dựng bằng:

* ⚡ `Vite + Vanilla JS`
* 📦 `Manifest V3`
* 🔀 Script đóng gói tự động: `npm run zip`

### 🧪 Cài đặt local:

```bash
npm install
npm run dev
```

### 🔧 Build & Đóng gói:

```bash
npm run build
npm run zip
```

---

## 🪝 Dự án khởi tạo bằng scaffold

✨ Sử dụng scaffold: [create-chrome-ext](https://github.com/guocaoyi/create-chrome-ext)

---

## 🡓 Tác giả & Liên hệ

👤 Phát triển bởi **NguyenTungSk**
🔗 [GitHub cá nhân](https://github.com/NguyenTungSk2004/AI-TOC-Marker)

---

## ⚖️ Giấy phép

**AI TOC Marker** được phát hành theo giấy phép [Apache License 2.0](./LICENSE).

Điều đó có nghĩa là bạn được:

* ✅ Tự do sử dụng, chỉnh sửa, phân phối lại mã nguồn
* ✅ Tích hợp vào sản phẩm thương mại
* ✅ An tâm nhờ có điều khoản bảo vệ bản quyền & sáng chế

> Xem chi tiết trong [LICENSE](./LICENSE)

## 📬 Góp ý & Đóng góp

* 💬 Mở **Issue** để báo lỗi hoặc đề xuất tính năng mới
* 🤝 Gửi **Pull Request** nếu bạn muốn đóng góp mã nguồn

> Cảm ơn bạn đã sử dụng AI TOC Marker! Hãy ⭐ repo nếu bạn thấy hữu ích nhé!
