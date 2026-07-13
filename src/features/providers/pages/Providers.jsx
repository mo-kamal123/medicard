import { useSearchParams } from "react-router-dom"
import ProvidersGrid from "../components/ProvidersGrid"
import ProvidersFilters from "../components/ProvidersFilters"
import { useProviders } from "../hooks/providers.queries"
import Pagination from "../../../shared/components/Pagination"
import { useCallback } from "react"
import { getStoredLocation, useGeolocation } from "../../../shared/hooks/useGeolocation"

const PAGE_SIZE = 12

const Providers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  useGeolocation()

  const filters = {
    keyword: searchParams.get("keyword") || "",
    categoryId: searchParams.get("categoryId") || "",
    governorateId: searchParams.get("governorateId") || "",
    cityId: searchParams.get("cityId") || "",
    sortBy: searchParams.get("sortBy") || "",
    page: parseInt(searchParams.get("page") || "1", 10),
  }

  const location = getStoredLocation()
  const queryParams = {
    KeyWord: filters.keyword || undefined,
    CategoryId: filters.categoryId || undefined,
    GovernorateId: filters.governorateId || undefined,
    CityId: filters.cityId || undefined,
    SortBy: filters.sortBy || undefined,
    UserLatitude: location?.lat ?? undefined,
    UserLongitude: location?.lng ?? undefined,
    PageNumber: filters.page,
    PageSize: PAGE_SIZE,
  }

  const { data, isLoading } = useProviders(queryParams)

  const providers = data?.data?.items || []
  const totalPages = Math.max(1, data?.data?.totalPages || 1)

  const handlePageChange = useCallback(
    (page) => {
      const params = new URLSearchParams(searchParams)
      if (page > 1) {
        params.set("page", String(page))
      } else {
        params.delete("page")
      }
      setSearchParams(params, { replace: true })
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
    [searchParams, setSearchParams]
  )

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="w-[90%] mx-auto px-4 py-8">
        <ProvidersFilters />

        <div className="mt-8">
          <ProvidersGrid
            providers={providers}
            isLoading={isLoading}
          />
        </div>
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Providers
