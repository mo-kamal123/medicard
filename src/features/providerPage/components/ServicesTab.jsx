import { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  Activity,
  BadgePercent,
  BriefcaseMedical,
  ClipboardList,
  Eye,
  FlaskConical,
  HeartPulse,
  ScanLine,
  Search,
  SearchX,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react"
import { useProviderCategories, useServicesByCategory } from "../hooks/providerPage.queries"
import Pagination from "../../../shared/components/Pagination"
import AutoText from "../../../shared/components/AutoText"
import EmptyState from "../../../shared/components/EmptyState"

const API_ORIGIN = "https://medicard-api-v2.medicardeg.com"

const resolveImage = (url) => {
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  return `${API_ORIGIN}${url.startsWith("/") ? "" : "/"}${url}`
}

const getServiceIcon = (text) => {
  const value = (text || "").toLowerCase()
  if (/(lasik|eye|vision|ophthalm)/.test(value)) return Eye
  if (/(x-?ray|ray|scan|radio|ct|mri|ultrasound|imaging|echo)/.test(value)) return ScanLine
  if (/(teeth|dental|ortho|smile)/.test(value)) return Smile
  if (/(lab|test|analysis|blood|sample|sugar)/.test(value)) return FlaskConical
  if (/(cardio|heart|ecg|stress)/.test(value)) return HeartPulse
  if (/(inject|vaccin|syring|drip)/.test(value)) return Syringe
  if (/(skin|derma|cosmetic|beauty)/.test(value)) return Sparkles
  if (/(physio|therapy|fitness)/.test(value)) return Activity
  if (/(consult|clinic|doctor|check|general)/.test(value)) return Stethoscope
  return BriefcaseMedical
}

const getLocalizedServiceName = (service, lang) => {
  const isArabic = lang?.toLowerCase().startsWith("ar")
  const localized = isArabic ? service.serviceNameAr : service.serviceNameEn
  return localized || service.serviceName || ""
}

const ServicesTab = ({ providerId }) => {
  const { t, i18n } = useTranslation()
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [page, setPage] = useState(1)

  const { data: categoriesData, isLoading: categoriesLoading } =
    useProviderCategories(providerId, true)
  const categories = useMemo(() => categoriesData?.data || [], [categoriesData])

  const selectedIsValid = categories.some((c) => c.id === selectedCategoryId)
  const activeCategoryId = selectedIsValid
    ? selectedCategoryId
    : categories[0]?.id ?? null

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300)
    return () => clearTimeout(id)
  }, [searchTerm])

  const { data: servicesData, isLoading: servicesLoading } = useServicesByCategory(
    providerId,
    activeCategoryId,
    debouncedSearch,
    page
  )
  const services = servicesData?.data?.items || []
  const totalPages = servicesData?.data?.totalPages || 0
  const safePage = Math.min(page, Math.max(1, totalPages))

  if (categoriesLoading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 w-32 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
    )
  }

  if (!categories.length) {
    return <EmptyState icon={ClipboardList} title={t("providerPage.noServices")} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategoryId(category.id)
                  setSearchTerm("")
                  setPage(1)
                }}
                className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-3.5 py-2 transition ${
                  isActive
                    ? "border-main bg-main text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-main/40 hover:bg-main/5"
                }`}
              >
                {category.imageUrl && (
                  <img
                    src={resolveImage(category.imageUrl)}
                    alt=""
                    className="h-8 w-8 rounded-lg object-cover"
                  />
                )}
                <AutoText
                  className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-700"}`}
                  text={category.name}
                />
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search
            size={18}
            className="absolute top-1/2 inset-s-3 -translate-y-1/2 text-gray-400"
          />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            placeholder={t("providerPage.searchServices")}
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 ps-10 pe-4 text-sm outline-none transition focus:border-main"
          />
        </div>
      </div>

      {servicesLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-44 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      ) : services.length ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service) => {
              const ServiceIcon = getServiceIcon(
                `${service.serviceNameEn} ${service.serviceName}`
              )
              const hasDiscount = service.discountPercentage > 0
              const priceAfter =
                service.priceBefore * (1 - (service.discountPercentage || 0) / 100)

              return (
                <div
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 pt-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-main/15 to-sec/10 transition group-hover:from-main/25 group-hover:to-sec/15">
                      <ServiceIcon size={22} className="text-main" />
                    </div>

                    <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                      <div className="min-w-0">
                        <AutoText
                          as="h3"
                          className="truncate text-lg font-semibold text-gray-900"
                          text={getLocalizedServiceName(service, i18n.language)}
                        />
                        {hasDiscount && (
                          <span className="mt-1.5 flex w-fit items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600">
                            <BadgePercent size={12} />
                            {t("providerPage.off", {
                              discount: service.discountPercentage.toFixed(1),
                            })}
                          </span>
                        )}
                      </div>

                      <div className="shrink-0 text-right flex flex-col gap-3">
                        {hasDiscount && (
                          <span className="block whitespace-nowrap text-xs text-gray-400 line-through">
                            {service.priceBefore.toFixed(0)} {t("providerPage.egp")}
                          </span>
                        )}
                        <span className="block whitespace-nowrap text-xl font-bold text-main">
                          {priceAfter.toFixed(0)} {t("providerPage.egp")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <EmptyState
          icon={debouncedSearch ? SearchX : ClipboardList}
          title={debouncedSearch ? t("providerPage.noSearchResults") : t("providerPage.noServices")}
        />
      )}
    </div>
  )
}

export default ServicesTab
