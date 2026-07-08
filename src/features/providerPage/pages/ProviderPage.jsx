import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Phone, Star, ArrowLeft, Stethoscope } from "lucide-react"
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
    <div className="bg-white  min-h-screen pb-16">
      <div className="">
        {/* <Link
          to="/providers"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-main"
        >
          <ArrowLeft size={16} /> Back to providers
        </Link> */}

        <div className="rounded-2xl border border-gray-200 bg-gradient-to-r from-[#F0F6FF] via-[#E7EFFF] to-[#DDF5EF] p-4 md:p-10">
          <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-center w-[95%] m-auto">
            <div className="flex h-20 w-20 md:h-40 md:w-40 shrink-0 items-center justify-center rounded-xl border border-gray-400 bg-white p-2">
              <img
                src={provider.imageUrl}
                alt={provider.name}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-xl md:text-3xl font-bold text-gray-900 truncate">{provider.name}</h1>
                  <p className="mt-1 text-sm md:text-base text-gray-500">{provider.categoryName}</p>

                  <div className="mt-3 md:mt-4 flex flex-wrap gap-4 md:gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2 text-xl">
                    <Stethoscope size={20} className="text-main" />
                      {provider.totalServices} Services
                    </span>

                    {provider.hotLine && (
                      <span className="flex items-center gap-2 text-xl">
                        <Phone size={20} className="text-main"/>
                        {provider.hotLine}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 rounded-xl bg-white/70 px-3 md:px-4 py-2 shadow-sm">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-main font-semibold text-sm md:text-base">{provider.averageRating?.toFixed(1)}</span>
                  <span className="text-main text-xs md:text-sm">({provider.totalReviews})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-b border-gray-400 w-[90%] m-auto">
          <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
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

        <div className="mt-6 w-[90%] m-auto">
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
