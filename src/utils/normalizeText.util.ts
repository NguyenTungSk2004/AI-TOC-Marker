export function normalizeText(text: string): string {
  return text
  .trim()
  .toLocaleLowerCase('en-US')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'd');
}