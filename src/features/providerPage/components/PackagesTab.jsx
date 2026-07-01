import { useProviderPackages } from "../hooks/providerPage.queries"

const PackagesTab = ({ providerId }) => {
  const { data, isLoading } = useProviderPackages(providerId, true)
  const packages = data?.data?.items || []

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    )
  }

  if (!packages.length) {
    return <p className="text-gray-500">No packages available.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
        >
          {pkg.imageUrl && (
            <div className="h-40 bg-gray-50">
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{pkg.description}</p>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <span>{pkg.servicesCount} services</span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                {pkg.priceBefore.toFixed(2)} EGP
              </span>
              <span className="font-bold text-main">
                {pkg.priceAfter.toFixed(2)} EGP
              </span>
              <span className="ml-auto rounded-full bg-green-50 px-2 py-1 text-xs text-green-600">
                -{pkg.discountPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PackagesTab
