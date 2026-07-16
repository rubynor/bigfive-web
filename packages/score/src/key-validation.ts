import type { DomainCode, FacetNumber } from './types';
import { DOMAIN_CODES, FACET_NUMBERS } from './types';

// Validates a scoring key (the @bigfive-org/questions item set) against the
// IPIP-NEO-120 structure the norm engine assumes. Pure: pass the items in;
// a build-time test runs this against the real questions data and asserts no
// errors, so a mismatched/renumbered key can never silently misalign raw sums
// with the wrong mean/SD.

export interface KeyItem {
  id: string;
  domain: string;
  facet: number;
  keyed: string; // 'plus' | 'minus'
  num?: number; // 1..120 position (added by getItems)
}

export interface KeyValidation {
  ok: boolean;
  errors: string[];
}

const EXPECTED_TOTAL = 120;
const ITEMS_PER_DOMAIN = 24;
const ITEMS_PER_FACET = 4;
const SPACING = 30; // the 4 items of a (domain,facet) sit 30 apart

// Position (1-based num) -> expected (domain, facet), for the standard IPIP
// interleave: domains cycle N,E,O,A,C every item; facet increments every 5.
function expectedAt(num: number): { domain: DomainCode; facet: FacetNumber } {
  const p = num - 1;
  const domain = DOMAIN_CODES[p % 5];
  const facet = ((Math.floor((p % 30) / 5) + 1) as FacetNumber);
  return { domain, facet };
}

export function validateScoringKey(items: KeyItem[]): KeyValidation {
  const errors: string[] = [];
  const push = (e: string) => errors.push(e);

  if (items.length !== EXPECTED_TOTAL) {
    push(`expected ${EXPECTED_TOTAL} items, got ${items.length}`);
  }

  // unique ids
  const ids = new Set<string>();
  for (const it of items) {
    if (ids.has(it.id)) push(`duplicate item id: ${it.id}`);
    ids.add(it.id);
  }

  // keyed domain
  for (const it of items) {
    if (it.keyed !== 'plus' && it.keyed !== 'minus') {
      push(`item ${it.id}: keyed='${it.keyed}' (expected plus|minus)`);
    }
    if (!DOMAIN_CODES.includes(it.domain as DomainCode)) {
      push(`item ${it.id}: domain='${it.domain}' not in N,E,O,A,C`);
    }
    if (!FACET_NUMBERS.includes(it.facet as FacetNumber)) {
      push(`item ${it.id}: facet=${it.facet} not in 1..6`);
    }
  }

  // per-domain and per-(domain,facet) counts
  for (const domain of DOMAIN_CODES) {
    const inDomain = items.filter((i) => i.domain === domain);
    if (inDomain.length !== ITEMS_PER_DOMAIN) {
      push(`domain ${domain}: ${inDomain.length} items (expected ${ITEMS_PER_DOMAIN})`);
    }
    for (const facet of FACET_NUMBERS) {
      const inFacet = inDomain.filter((i) => i.facet === facet);
      if (inFacet.length !== ITEMS_PER_FACET) {
        push(
          `facet ${domain}${facet}: ${inFacet.length} items (expected ${ITEMS_PER_FACET})`
        );
      }
      // num spacing of 30 within the group (only if num is present)
      const nums = inFacet
        .map((i) => i.num)
        .filter((n): n is number => typeof n === 'number')
        .sort((a, b) => a - b);
      if (nums.length === ITEMS_PER_FACET) {
        for (let k = 1; k < nums.length; k++) {
          if (nums[k] - nums[k - 1] !== SPACING) {
            push(
              `facet ${domain}${facet}: num spacing ${nums.join(',')} not ${SPACING} apart`
            );
            break;
          }
        }
      }
    }
  }

  // positional enumeration matches the norm index map (only if nums present)
  const withNum = items.filter((i) => typeof i.num === 'number');
  if (withNum.length === items.length && items.length === EXPECTED_TOTAL) {
    for (const it of items) {
      const exp = expectedAt(it.num as number);
      if (exp.domain !== it.domain || exp.facet !== it.facet) {
        push(
          `item num ${it.num}: is ${it.domain}${it.facet}, norm map expects ${exp.domain}${exp.facet}`
        );
      }
    }
  }

  return { ok: errors.length === 0, errors };
}
