import { useMemo } from "react"
import { getTextAttrs } from "../utils/textLanguage"

/**
 * Memoized accessor for an element's auto-detected language attributes.
 *
 * @param {*} text - The content to inspect.
 * @returns {{ lang: string, dir: "rtl"|"ltr"|"auto", fontClass: string }}
 */
export function useTextLanguage(text) {
  return useMemo(() => getTextAttrs(text), [text])
}
