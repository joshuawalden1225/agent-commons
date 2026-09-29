// Research-only structured evidence gate. Does not crawl, interpret language,
// settle production forecasts, or establish archive completeness.
export function classifyEvidence(card, evidence, now) {
  const zoned = v => typeof v === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(v) && Number.isFinite(Date.parse(v));
  if (!zoned(card.deadline) || !zoned(now)) return 'unresolved';
  const positive = evidence.items.some(e => e.officialBoard === card.board && e.projectId === card.projectId && e.milestone === card.milestone && e.completed === true && e.attachmentRead === true && zoned(e.publishedAt) && Date.parse(e.publishedAt) <= Date.parse(card.deadline) && Date.parse(e.publishedAt) <= Date.parse(now));
  if (positive) return 'yes';
  if (Date.parse(now) <= Date.parse(card.deadline)) return 'unresolved';
  // Unknown or inconsistent timestamps cannot be used to certify a negative.
  if (evidence.items.some(e => !zoned(e.publishedAt) || Date.parse(e.publishedAt) > Date.parse(now))) return 'unresolved';
  return evidence.completeCoverage === true ? 'no' : 'unresolved';
}
