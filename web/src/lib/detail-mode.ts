// Detail-level preference for the result page. 'simple' (default) explains
// scores in plain language ("higher than 73% of people"); 'advanced' adds
// the technical numbers (percentile, raw score, T-score).

export type DetailMode = 'simple' | 'advanced';

export const DETAIL_MODE_KEY = 'result-detail-mode';
