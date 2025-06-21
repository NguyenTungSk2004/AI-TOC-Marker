interface TOCHeading {
  id: string;
  title: string;
  children?: TOCHeading[];
}

interface QAGroup {
  question: string;
  headings: TOCHeading[];
}