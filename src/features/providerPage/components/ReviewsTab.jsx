import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Star, User, X, MessageSquare } from "lucide-react"
import { useProviderReviews } from "../hooks/providerPage.queries"
import AutoText from "../../../shared/components/AutoText"
import EmptyState from "../../../shared/components/EmptyState"

const MAX_LENGTH = 150

const timeAgo = (dateString, t) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffYear >= 1) return t("providerPage.timeAgo.year", { count: diffYear })
  if (diffMonth >= 1) return t("providerPage.timeAgo.month", { count: diffMonth })
  if (diffWeek >= 1) return t("providerPage.timeAgo.week", { count: diffWeek })
  if (diffDay >= 1) return t("providerPage.timeAgo.day", { count: diffDay })
  if (diffHour >= 1) return t("providerPage.timeAgo.hour", { count: diffHour })
  if (diffMin >= 1) return t("providerPage.timeAgo.minute", { count: diffMin })
  return t("providerPage.timeAgo.justNow")
}

const ReviewHeader = ({ review }) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-start justify-between gap-4">
      {/* User info */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-main/20 to-main/5 ring-2 ring-white shadow-sm">
            {review.userImageUrl ? (
              <img
                src={review.userImageUrl}
                alt={review.userName || "User avatar"}
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={26} className="text-main/70" />
            )}
          </div>

          {/* Online / verified-style accent */}
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-main" />
        </div>

        {/* Name + date */}
        <div className="min-w-0">
          <AutoText
            as="p"
            className="truncate text-sm font-semibold text-gray-900"
            text={review.userName}
          />

          <p className="mt-0.5 text-xs text-gray-400">
            {timeAgo(review.createdAt, t)}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1.5">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              strokeWidth={1.8}
              className={
                i < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-yellow-200"
              }
            />
          ))}
        </div>

        <span className="text-xs font-semibold text-yellow-700">
          {review.rating}
        </span>
      </div>
    </div>
  )
}

const ReviewDrawer = ({ review, onClose }) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const closingRef = useRef(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const handleClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setClosing(true)
    setTimeout(onClose, 300)
  }, [onClose])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleClose])

  const open = visible && !closing

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/30"
        style={{
          opacity: open ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
        onClick={handleClose}
      />
      <div
        className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-5">
          <h3 className="text-lg font-bold text-gray-900">
            {t("providerPage.reviewDetails")}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <ReviewHeader review={review} />
          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <AutoText
              as="p"
              className="text-sm leading-relaxed text-gray-600"
              text={review.ratingText}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const ReviewsTab = ({ providerId }) => {
  const { t } = useTranslation()
  const { data, isLoading } = useProviderReviews(providerId, true)
  const reviews = data?.data?.items || []
  const [selectedReview, setSelectedReview] = useState(null)

  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedReview])

  const openReview = (review) => setSelectedReview(review)

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (!reviews.length) {
    return <EmptyState icon={MessageSquare} title={t("providerPage.noReviews")} />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {reviews.map((review, index) => {
        const needsTruncation = review.ratingText?.length > MAX_LENGTH
        const displayText = needsTruncation
          ? review.ratingText.slice(0, MAX_LENGTH) + "..."
          : review.ratingText

        return (
          <div
            key={review.id || index}
            className="rounded-xl border border-gray-200 bg-gray-50/50 p-4"
          >
            <ReviewHeader review={review} />
            {review.ratingText && (
              <div>
                <AutoText
                  as="p"
                  className="mt-3 text-sm text-gray-600"
                  text={displayText}
                />
                {needsTruncation && (
                  <button
                    onClick={() => openReview(review)}
                    className="mt-1 text-sm font-medium text-main hover:underline"
                  >
                    {t("providerPage.showMore")}
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}

      {selectedReview && (
        <ReviewDrawer
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </div>
  )
}

export default ReviewsTab
