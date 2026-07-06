import { Star } from "lucide-react"
import { useProviderReviews } from "../hooks/providerPage.queries"

const timeAgo = (dateString) => {
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

  if (diffYear >= 1) return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`
  if (diffMonth >= 1) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`
  if (diffWeek >= 1) return `${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`
  if (diffDay >= 1) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`
  if (diffHour >= 1) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`
  if (diffMin >= 1) return `${diffMin} min ago`
  return "just now"
}

const ReviewsTab = ({ providerId }) => {
  const { data, isLoading } = useProviderReviews(providerId, true)
  const reviews = data?.data?.items || []

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
    return <p className="text-gray-500">No reviews yet.</p>
  }

  return (
    <div className="grid grid-cols-3">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-gray-50/50 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-main/10">
              {providerId.userImageUrl ? (
                <img
                  src={providerId.userImageUrl}
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-main">
                  {providerId.userName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">{review.userName}</p>
              <p className="my-1 text-xs text-gray-400">
                {timeAgo(review.createdAt)}
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          {review.ratingText && (
            <p className="mt-3 text-sm text-gray-600">{review.ratingText}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewsTab
