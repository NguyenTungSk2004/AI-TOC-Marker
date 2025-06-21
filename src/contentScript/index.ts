import { watchUrlChange } from "../utils/urlChangeWatcher";

console.info("ChatGPT TOC content script is running");

function injectHighlightStyle() {
  const style = document.createElement("style");
  style.textContent = `
    [data-toc-highlight] {
      scroll-margin-top: 100px;
    }

    .toc-highlight {
      background-color: rgba(255, 255, 100, 0.5);
    }

    .toc-highlight.fade-out {
      transition: background-color 1.2s ease;
      background-color: transparent;
    }
  `;
  document.head.appendChild(style);
}


function extractTOCByQA(): QAGroup[] {
  const result: QAGroup[] = [];
  const turns = Array.from(document.querySelectorAll("div.group\\/conversation-turn"));
  let tocIndex = 0;

  for (let i = 0; i < turns.length - 1; i++) {
    const userTurn = turns[i];
    const assistantTurn = turns[i + 1];

    const userRole = userTurn.querySelector('[data-message-author-role="user"]');
    const assistantRole = assistantTurn.querySelector('[data-message-author-role="assistant"]');

    if (!userRole || !assistantRole) continue;

    const question = userRole.querySelector(".whitespace-pre-wrap")?.textContent?.trim() || "";

    const headings: TOCHeading[] = [];
    let currentH2: TOCHeading | null = null;
    let currentH3: TOCHeading | null = null;

    assistantRole.querySelectorAll("div.markdown h2, div.markdown h3, div.markdown h4").forEach((el) => {
      const text = el.textContent?.trim();
      if (!text) return;

      const tag = el.tagName.toLowerCase();
      const tocId = `toc-${tocIndex++}`;
      el.setAttribute("id", tocId);
      el.setAttribute("data-toc-highlight", "");

      const headingObj: TOCHeading = { title: text, id: tocId };

      if (tag === "h2") {
        currentH2 = { ...headingObj, children: [] };
        headings.push(currentH2);
        currentH3 = null;
      } else if (tag === "h3" && currentH2) {
        currentH3 = { ...headingObj, children: [] };
        currentH2.children!.push(currentH3);
      } else if (tag === "h4" && currentH3) {
        currentH3.children!.push(headingObj);
      } else if (tag === "h3") {
        currentH3 = { ...headingObj, children: [] };
        headings.push(currentH3);
      } else if (tag === "h4") {
        headings.push(headingObj);
      }
    });

    if (headings.length > 0) {
      result.push({ question, headings });
    }

    i++; // skip assistant turn
  }

  return result;
}

function waitForMarkdownAndExtractTOC() {
  let debounceTimer: ReturnType<typeof setTimeout>;

  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const tocByQA = extractTOCByQA();

      chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc: tocByQA });
      chrome.storage.local.set({ toc: tocByQA });
    }, 500); // debounce
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// 👉 Inject CSS cho hiệu ứng highlight
injectHighlightStyle();

// 👉 Khởi động ban đầu
waitForMarkdownAndExtractTOC();

// 👉 Theo dõi thay đổi URL
watchUrlChange(() => {
  chrome.storage.local.set({ toc: [] }, () => {
    console.log("✅ Reset TOC data on URL change");
  });

  chrome.runtime.sendMessage({ type: "TOC_DATA_FROM_CONTENT", toc: [] });
  waitForMarkdownAndExtractTOC(); // Khởi tạo lại
});

// 👉 Xử lý scroll đến heading
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === "SCROLL_TO_HEADING" && request.id) {
    const el = document.getElementById(request.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      // Bỏ các lớp cũ nếu có
      el.classList.remove("toc-highlight", "fade-out");
      void el.offsetWidth; // force reflow

      // Áp dụng highlight ngay lập tức
      el.classList.add("toc-highlight");

      // Sau 300ms, bắt đầu hiệu ứng mờ dần
      setTimeout(() => {
        el.classList.add("fade-out");
      }, 300);

      // Sau 2s thì xóa toàn bộ class
      setTimeout(() => {
        el.classList.remove("toc-highlight", "fade-out");
      }, 2000);
    }
  }
});
