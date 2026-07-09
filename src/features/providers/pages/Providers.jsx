import { useMemo, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import ProvidersGrid from "../components/ProvidersGrid"
import { flattenProviders } from "../utils/flattenProviders"
import ProvidersFilters from "../components/ProvidersFilters"
import { useProviders } from "../hooks/providers.queries"
import { filterProviders } from "../utils/filterProviders"
import Paginations from "../../../shared/components/Pagination"
const PAGE_SIZE = 12
const API_PAGE_SIZE = 100

const Providers = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "all",
    governorate: searchParams.get("governorate") || "all",
    city: searchParams.get("city") || "all",
    sortBy: searchParams.get("sortBy") || "name",
  }

  const queryParams = {
    KeyWord: filters.keyword || undefined,
    PageNumber: 1,
    PageSize: API_PAGE_SIZE,
    SortBy: filters.sortBy !== "name" ? filters.sortBy : undefined,
  }

  const { data, isLoading, isError } = useProviders(queryParams)

  const apiProviders = flattenProviders(data?.data?.items || [])

  const filtered = useMemo(
    () => filterProviders(apiProviders, filters),
    [apiProviders, filters.keyword, filters.category, filters.governorate, filters.city, filters.sortBy]
  )

  const currentPage = parseInt(searchParams.get("page") || "1", 10)
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginatedProviders = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  )

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
        <ProvidersFilters providers={apiProviders} />

        <div className="mt-8">
          <ProvidersGrid
            providers={paginatedProviders}
            isLoading={isLoading && !isError && !apiProviders.length}
          />
        </div>
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Providers
