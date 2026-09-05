import { en } from '@/i18n/translations/en';
import { es } from '@/i18n/translations/es';

export function testSpanishDictionaryMatchesEnglishSections() {
  const englishSections = Object.keys(en);
  const spanishSections = Object.keys(es);

  if (englishSections.join(',') !== spanishSections.join(',')) {
    throw new Error('Spanish translations must match the English dictionary shape.');
  }
}
