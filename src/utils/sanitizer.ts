/**
 * Universal Sanitizer:
 * Enforces the strict rule that headers, titles, and document content
 * NEVER include:
 * - "1978"
 * - "ISU QUALITY ASSURANCE"
 * - "Seal Aligned"
 */

export const FORBIDDEN_TERMS = [
  /\b1978\b/gi,
  /ISU\s+QUALITY\s+ASSURANCE/gi,
  /Seal\s+Aligned/gi,
];

export function sanitizeUniversalExclusions<T>(data: T): T {
  if (typeof data === 'string') {
    let cleaned: string = data;
    for (const regex of FORBIDDEN_TERMS) {
      cleaned = cleaned.replace(regex, '');
    }
    return cleaned.trim() as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeUniversalExclusions(item)) as unknown as T;
  }

  if (data !== null && typeof data === 'object') {
    const copy: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      copy[key] = sanitizeUniversalExclusions(value);
    }
    return copy as T;
  }

  return data;
}

export function containsForbiddenTerm(text: string): boolean {
  if (!text) return false;
  return FORBIDDEN_TERMS.some((regex) => regex.test(text));
}
