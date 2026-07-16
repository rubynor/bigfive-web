# Norm data provenance

The norm tables in `../src/norms/sources/johnson-webreport.ts` are transcoded
from the file `five-factor-e-norm.py` in this directory.

## Source

- **Project:** [`NeuroQuestAi/five-factor-e`](https://github.com/NeuroQuestAi/five-factor-e)
  (`ipipneo/norm.py`), version 1.13.1.
- **License:** MIT (see below).
- **Credited authors:** John A. Johnson; Dhiru Kholia.
- The numbers are **Johnson's online IPIP-NEO report norms**.

## Files

- `five-factor-e-norm.py` — verbatim copy of the MIT-licensed source, kept as the
  provenance record and as a fixture for `test/norms.test.ts`.
- `johnson-webreport.norms.json` — the `ns[]` arrays for all 12 strata
  (male/female/combined × {lt21, a21_40, a41_60, gt60}), produced by **running**
  `five-factor-e`'s `Norm(sex, age, 120)` — so combined rows use the source's own
  Python `round(avg(M,F), 2)` (banker's rounding).

## ⚠️ Provenance caveat (see repo `ARCHITECTURE.md`)

These stratified mean/SD values are **NOT** in Johnson (2014, *J. Research in
Personality* 51, 78–89), which reports only reliability/validity/structure. They
come from Johnson's **online report**, carried via `five-factor-e`. The port is
MIT-licensed and credited to Johnson, but the **derivation sample (N per stratum)
is undocumented**. Cite as "Johnson online report norms, via five-factor-e" —
never as the 2014 paper.

## MIT License (five-factor-e)

```
MIT License

Copyright (c) 2022-2025 NeuroQuest AI / Ederson Corbari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
