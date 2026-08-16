export const LANGUAGE_AR = "ar"
export const LANGUAGE_EN = "en"
export const LANGUAGE_NEUTRAL = "neutral"

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
const LATIN_RE = /[A-Za-z]/

/**
 * Detects whether a string is primarily Arabic or English based on the
 * proportion of Arabic vs. Latin characters.
 *
 * Numbers, punctuation, whitespace and emoji are ignored so that strings
 * made only of digits, URLs without letters, or empty strings are never
 * misclassified as Arabic or English.
 *
 * @param {*} value - The content to inspect (any type; non-strings -> neutral).
 * @returns {"ar" | "en" | "neutral"}
 */
export function detectTextLanguage(value) {
  if (typeof value !== "string" || !value.trim()) return LANGUAGE_NEUTRAL

  let arabic = 0
  let latin = 0

  for (const ch of value) {
    if (ARABIC_RE.test(ch)) arabic++
    else if (LATIN_RE.test(ch)) latin++
  }

  if (arabic === 0 && latin === 0) return LANGUAGE_NEUTRAL

  // Strict dominance: a single Arabic word inside a long English text stays
  // classified as English (and vice versa).
  return arabic > latin ? LANGUAGE_AR : LANGUAGE_EN
}

/**
 * Returns the appropriate dir value for an element rendered with this text.
 * "auto" lets the browser resolve direction for neutral/mixed content.
 *
 * @param {*} value - The content to inspect.
 * @returns {"rtl" | "ltr" | "auto"}
 */
export function getTextDirection(value) {
  const lang = detectTextLanguage(value)
  if (lang === LANGUAGE_AR) return "rtl"
  if (lang === LANGUAGE_EN) return "ltr"
  return "auto"
}

/**
 * One-stop helper returning everything needed to style an element.
 * The font class is applied only for Arabic/English; neutral content keeps
 * whatever font the surrounding layout already uses.
 *
 * @param {*} value - The content to inspect.
 * @returns {{ lang: string, dir: "rtl"|"ltr"|"auto", fontClass: string }}
 */
export function getTextAttrs(value) {
  const lang = detectTextLanguage(value)
  return {
    lang,
    dir: lang === LANGUAGE_AR ? "rtl" : lang === LANGUAGE_EN ? "ltr" : "auto",
    fontClass: lang === LANGUAGE_NEUTRAL ? "" : `text-auto-${lang}`,
  }
}
