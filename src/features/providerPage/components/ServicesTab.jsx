import { useProviderServices } from "../hooks/providerPage.queries"

const ServicesTab = ({ providerId }) => {
  const { data, isLoading } = useProviderServices(providerId, true)
  const services = data?.data?.items || []

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (!services.length) {
    return <p className="text-gray-500">No services available.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <div
          key={service.id}
          className="rounded-xl border border-gray-200 flex flex-col justify-between bg-gray-50/60   p-4 transition hover:shadow-md"
        >
          <h3 className="font-semibold text-lg text-gray-900">{service.serviceName}</h3>
          <span className="rounded-full bg-green-50 px-2 py-1 text-xs text-main bg-[#86AFE3] border border-main w-fit my-1">
              -{service.discountPercentage.toFixed(1)}% off
            </span>
          {service.isSpecialOffer && (
            <span className="mt-2 w-fit rounded-full bg-orange-50 px-2 py-1 text-xs text-orange-600">
              Special Offer
            </span>
          )}

          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">
              {service.priceBefore.toFixed(2)} EGP
            </span>
            <span className="font-bold text-main">
              {service.priceAfter.toFixed(2)} EGP
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServicesTab
