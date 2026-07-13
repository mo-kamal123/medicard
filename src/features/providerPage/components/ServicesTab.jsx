import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useProviderServices } from "../hooks/providerPage.queries"

const ServicesTab = ({ providerId }) => {
  const { t } = useTranslation()
  const { data, isLoading } = useProviderServices(providerId, true)
  const groups = useMemo(() => data?.data?.groups || [], [data])

  const allServices = useMemo(
    () => groups.flatMap((g) => g.services.map((s) => ({ ...s, categoryName: g.categoryName }))),
    [groups]
  )

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (!allServices.length) {
    return <p className="text-gray-500">{t("providerPage.noServices")}</p>
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.categoryId}>
          <h3 className="mb-4 text-lg font-semibold text-gray-800">{group.categoryName}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.services.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border border-gray-200 flex flex-col justify-between bg-gray-50/60 p-4 transition hover:shadow-md"
              >
                <h3 className="font-semibold text-lg text-gray-900">{service.serviceName}</h3>
                <span className="rounded-full bg-green-50 px-2 py-1 text-xs text-main bg-[#86AFE3] border border-main w-fit my-1">
                  {t("providerPage.off", { discount: service.discountPercentage.toFixed(1) })}
                </span>
                {service.isSpecialOffer && (
                  <span className="mt-2 w-fit rounded-full bg-orange-50 px-2 py-1 text-xs text-orange-600">
                    {t("providerPage.specialOffer")}
                  </span>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">
                    {service.priceBefore.toFixed(0)} EGP
                  </span>
                  <span className="font-bold text-main">
                    {service.priceAfter.toFixed(0)} EGP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServicesTab
