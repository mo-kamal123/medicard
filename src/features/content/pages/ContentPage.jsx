import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useContent } from "../hooks/content.queries"

const slugMap = {
  "privacy-policy": "privacy-policy",
  terms: "terms-and-conditions",
  refund: "refund-policy",
}

const ContentPage = () => {
  const { slug } = useParams()
  const { t } = useTranslation()
  const resolvedSlug = slugMap[slug] || slug
  const { data, isLoading, isError } = useContent(resolvedSlug)

  const html = data?.data?.description || ""

  if (isLoading) {
    return (
      <div className="w-[90%] mx-auto py-16">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200 mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 animate-pulse rounded bg-gray-100" style={{ width: `${80 - i * 10}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !html) {
    return (
      <div className="w-[90%] mx-auto py-16 text-center text-gray-500">
        {t("content.notFound", "Content not available")}
      </div>
    )
  }

  return (
    <div className="w-[90%] mx-auto py-10 md:py-16">
      <div
        className="content-html"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default ContentPage
