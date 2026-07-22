// Server-side loading of the question inventories (Phase 4 step 5).
// The inventory ships in 31 languages, the UI in 20 — the test page offers a
// language switcher (?lang=) so any inventory can be taken from any UI locale.
// pt/zh UI locales map to their pt-br/zh-cn inventories (upstream fell back
// to English there).

import { query } from '@solidjs/router';
import type { LanguageCode, Question } from '@bigfive-org/questions';

const LOCALE_TO_INVENTORY: Record<string, string> = {
  pt: 'pt-br',
  zh: 'zh-cn'
};

// Resolve a UI locale (or an explicit ?lang= override) to an inventory code.
export function inventoryLanguage(
  code: string | undefined,
  available: string[]
): string {
  if (code && available.includes(code)) return code;
  return 'en';
}

export function defaultInventoryLanguage(
  locale: string,
  available: string[]
): string {
  return inventoryLanguage(LOCALE_TO_INVENTORY[locale] ?? locale, available);
}

export const getItemsQuery = query(
  async (language: string): Promise<Question[]> => {
    'use server';
    const { getItems } = await import('@bigfive-org/questions');
    return getItems(language as LanguageCode);
  },
  'items'
);
