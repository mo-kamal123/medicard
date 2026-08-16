import { memo } from "react"
import { useTextLanguage } from "../hooks/useTextLanguage"

/**
 * Renders text that automatically picks the correct font (Cairo/Inter) and
 * direction (rtl/ltr) based on its own content, regardless of the website
 * locale. Neutral content (numbers, URLs, punctuation, empty) is left to the
 * surrounding layout.
 *
 * Usage:
 *   <AutoText as="p" className="mt-3 text-sm" text={review.ratingText} />
 *
 * @param {*} text - Content to render.
 * @param {string|Function} [as="span"] - Element/tag to render.
 * @param {string} [className] - Extra classes merged on top of the font class.
 */
const AutoText = memo(({ text, as: Tag = "span", className = "", ...rest }) => {
  const { dir, fontClass } = useTextLanguage(text)
  const classes = fontClass ? `${fontClass} ${className}`.trim() : className

  return (
    <Tag dir={dir} className={classes} {...rest}>
      {text}
    </Tag>
  )
})

export default AutoText
