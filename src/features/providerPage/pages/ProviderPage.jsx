import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams, Link } from "react-router-dom"
import { Phone, Star, ArrowRight, Stethoscope, MessageSquare, Package, MapPin } from "lucide-react"
import { useProviderPage } from "../hooks/providerPage.queries"
import ServicesTab from "../components/ServicesTab"
import ReviewsTab from "../components/ReviewsTab"
import PackagesTab from "../components/PackagesTab"
import BranchesTab from "../components/BranchesTab"

const ProviderPage = () => {
  const { t } = useTranslation()
  const TABS = [
    { key: "services", label: t("providerPage.tabs.services"), icon: Stethoscope },
    { key: "reviews", label: t("providerPage.tabs.reviews"), icon: MessageSquare },
    { key: "packages", label: t("providerPage.tabs.packages"), icon: Package },
    { key: "branches", label: t("providerPage.tabs.branches"), icon: MapPin },
  ]

  const tabComponents = {
    services: ServicesTab,
    reviews: ReviewsTab,
    packages: PackagesTab,
    branches: BranchesTab,
  }

  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("services")
  const { data, isLoading, isError } = useProviderPage(id)
  const provider = data?.data

  if (isLoading) {
    return (
      <div className="bg-body min-h-screen pb-16">
        <div className="w-full lg:w-[90%] mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 rounded bg-gray-200" />
            <div className="h-40 rounded-2xl bg-gray-200" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 w-24 shrink-0 rounded bg-gray-200" />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-44 rounded-2xl bg-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !provider) {
    return (
      <div className="bg-body flex min-h-screen items-center justify-center px-4 pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-dark">{t("providerPage.notFound")}</h2>
          <Link
            to="/providers"
            className="mt-4 inline-flex items-center gap-2 text-main underline"
          >
            <ArrowRight size={16} /> {t("providerPage.backToProviders")}
          </Link>
        </div>
      </div>
    )
  }

  const ActiveComponent = tabComponents[activeTab]

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Hero */}
      <div className="mx-auto lg:w-[90%] mt-3 px-4">
        <div className="relative rounded-2xl border border-gray-200 bg-linear-to-r from-[#F0F6FF] via-[#E7EFFF] to-[#DDF5EF] p-4 sm:p-6 md:p-8">
          <button
            onClick={() => setActiveTab("reviews")}
            className="absolute top-3 inset-e-3 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 shadow-sm transition hover:shadow-md md:hidden sm:top-4 sm:inset-e-4"
          >
            <Star size={15} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-main">
              {provider.averageRating?.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              {t("providerPage.reviewsCount", { count: provider.totalReviews })}
            </span>
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            {/* Logo */}
            {provider.imageUrl ? (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-300 bg-white p-1.5 sm:h-28 sm:w-28 md:h-36 md:w-36">
                <img
                  src={provider.imageUrl}
                  alt={provider.name}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-white text-2xl font-bold text-main sm:h-28 sm:w-28 md:h-36 md:w-36">
                {provider.name?.charAt(0)}
              </div>
            )}

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col">
              <h1 className="truncate text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                {provider.name}
              </h1>
              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                {provider.categoryName}
              </p>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab("services")}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 transition cursor-pointer hover:border-main hover:text-main sm:text-sm"
                  >
                    <Stethoscope size={16} className="text-main" />
                    {t("providerPage.services", { count: provider.totalServices })}
                  </button>

                  {provider.hotLine && (
                    <a
                      href={`tel:${provider.hotLine}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-600 transition hover:border-main hover:text-main sm:text-sm"
                    >
                      <Phone size={16} className="text-main" />
                      {provider.hotLine}
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 transition hover:border-main sm:text-sm"
                >
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-main">
                    {provider.averageRating?.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500 sm:text-sm">
                    {t("providerPage.reviewsCount", { count: provider.totalReviews })}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-6 w-[90%] px-4">
        <div className="border-b border-gray-200">
          <div className="flex gap-4 overflow-x-auto no-scrollbar sm:gap-6 md:gap-8">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap pb-3 text-sm font-medium transition-colors sm:text-base ${
                    isActive
                      ? "border-b-2 border-main text-main"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-main" : "text-gray-400"} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mt-6 w-[90%] px-4">
        {activeTab === "branches" ? (
          <BranchesTab branches={provider.branches} />
        ) : (
          <ActiveComponent providerId={Number(id)} />
        )}
      </div>
    </div>
  )
}

export default ProviderPage
