import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Phone, Star, ArrowLeft } from "lucide-react"
import { useProviderPage } from "../hooks/providerPage.queries"
import ServicesTab from "../components/ServicesTab"
import ReviewsTab from "../components/ReviewsTab"
import PackagesTab from "../components/PackagesTab"
import BranchesTab from "../components/BranchesTab"

const TABS = [
  { key: "services", label: "Services" },
  { key: "reviews", label: "Reviews" },
  { key: "packages", label: "Packages" },
  { key: "branches", label: "Branches" },
]

const tabComponents = {
  services: ServicesTab,
  reviews: ReviewsTab,
  packages: PackagesTab,
  branches: BranchesTab,
}

const ProviderPage = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("services")
  const { data, isLoading, isError } = useProviderPage(id)
  const provider = data?.data

  if (isLoading) {
    return (
      <div className="bg-body min-h-screen pb-16">
        <div className="mx-auto w-[90%] px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 rounded bg-gray-200" />
            <div className="h-32 rounded-2xl bg-gray-200" />
            <div className="flex gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 w-24 rounded bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !provider) {
    return (
      <div className="bg-body flex min-h-screen items-center justify-center pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-dark">Provider not found</h2>
          <Link to="/providers" className="mt-4 inline-flex items-center gap-2 text-main underline">
            <ArrowLeft size={16} /> Back to providers
          </Link>
        </div>
      </div>
    )
  }

  const ActiveComponent = tabComponents[activeTab]

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="mx-auto w-[90%] px-4 py-8">
        {/* <Link
          to="/providers"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-main"
        >
          <ArrowLeft size={16} /> Back to providers
        </Link> */}

        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-[#F0F6FF] via-[#E7EFFF] to-[#DDF5EF] p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-xl border border-gray-400 bg-white p-2">
              <img
                src={provider.imageUrl}
                alt={provider.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                  <p className="mt-1 text-gray-500">{provider.categoryName}</p>

                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                      {provider.totalServices} Services
                    </span>

                    {provider.hotLine && (
                      <span className="flex items-center gap-2">
                        <Phone size={15} />
                        {provider.hotLine}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-xl bg-white px-4 py-2 shadow-sm">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-main font-semibold">{provider.averageRating?.toFixed(1)}</span>
                  <span className="text-main">({provider.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-b border-gray-400">
          <div className="flex gap-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-main text-main"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {activeTab === "branches" ? (
            <BranchesTab branches={provider.branches} />
          ) : (
            <ActiveComponent providerId={Number(id)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProviderPage
