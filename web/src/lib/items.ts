// Server-side loading of the question inventories (Phase 4 step 5).
// The inventory ships in 31 languages, the UI in 20 — the inventory simply
// follows the UI locale (the ?lang= switcher was removed 2026-07-23: two
// language dropdowns on one page confused users). pt/zh UI locales map to
// their pt-br/zh-cn inventories (upstream fell back to English there).

import { query } from '@solidjs/router';
import type { LanguageCode, Question } from '@bigfive-org/questions';

const LOCALE_TO_INVENTORY: Record<string, string> = {
  pt: 'pt-br',
  zh: 'zh-cn'
};

// Resolve a code to a known inventory, falling back to English.
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
