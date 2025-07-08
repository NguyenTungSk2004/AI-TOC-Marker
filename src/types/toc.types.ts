export interface TOCHeading {
  id: string;
  title: string;
  children?: TOCHeading[];
}

export interface QAGroup {
  question: string;
  headings: TOCHeading[];
}
