export function extractTOCByQA(): QAGroup[] {
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

    i++; // skip assistant
  }

  return result;
}
