import { useTranslation } from "react-i18next"
import { Search, SlidersHorizontal } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Dropdown from "../../../shared/components/Dropdown"
import { useGovernorates, useCities } from "../hooks/providers.queries"
import { useCategoriesQuery } from "../../../features/home/hooks/home.queries"

const ProvidersFilters = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const timerRef = useRef(null)
  const [filterOpen, setFilterOpen] = useState(false)

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "")
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "")
  const [governorateId, setGovernorateId] = useState(searchParams.get("governorateId") || "")
  const [cityId, setCityId] = useState(searchParams.get("cityId") || "")
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "")

  const selectedGov = governorateId || null

  const { data: governoratesData } = useGovernorates()
  const { data: citiesData } = useCities(selectedGov)
  const { data: categoriesData } = useCategoriesQuery()

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "")
    setCategoryId(searchParams.get("categoryId") || "")
    setGovernorateId(searchParams.get("governorateId") || "")
    setCityId(searchParams.get("cityId") || "")
    setSortBy(searchParams.get("sortBy") || "")
  }, [searchParams])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const updateParams = (overrides) => {
    const params = new URLSearchParams()
    const kw = overrides.keyword !== undefined ? overrides.keyword : keyword
    const catId = overrides.categoryId !== undefined ? overrides.categoryId : categoryId
    const govId = overrides.governorateId !== undefined ? overrides.governorateId : governorateId
    const ctyId = overrides.cityId !== undefined ? overrides.cityId : cityId
    const sort = overrides.sortBy !== undefined ? overrides.sortBy : sortBy

    params.set("page", "1")
    if (kw.trim()) params.set("keyword", kw.trim())
    if (catId) params.set("categoryId", catId)
    if (govId) params.set("governorateId", govId)
    if (ctyId) params.set("cityId", ctyId)
    if (sort) params.set("sortBy", sort)

    setSearchParams(params, { replace: true })
  }

  const handleKeywordChange = (e) => {
    const value = e.target.value
    setKeyword(value)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => updateParams({ keyword: value }), 400)
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value
    setCategoryId(value)
    updateParams({ categoryId: value })
  }

  const handleGovernorateChange = (e) => {
    const value = e.target.value
    setGovernorateId(value)
    setCityId("")
    updateParams({ governorateId: value, cityId: "" })
  }

  const handleCityChange = (e) => {
    const value = e.target.value
    setCityId(value)
    updateParams({ cityId: value })
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    updateParams({ sortBy: value })
  }

  const categories = useMemo(() => {
    const items = categoriesData?.data || []
    return items.map((item) => ({ value: String(item.id), label: item.name }))
  }, [categoriesData])

  const governorates = useMemo(() => {
    const items = governoratesData?.data || []
    return items.map((item) => ({ value: String(item.id), label: item.name }))
  }, [governoratesData])

  const cities = useMemo(() => {
    const items = citiesData?.data || []
    return items.map((item) => ({ value: String(item.id), label: item.name }))
  }, [citiesData])

  return (
    <div className="rounded-2xl bg-[#E8F1FA] p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3">
        <div className="relative sm:col-span-2 lg:col-span-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={keyword}
            onChange={handleKeywordChange}
            type="text"
            placeholder={t("providers.searchPlaceholder")}
            className="w-full rounded-xl border border-white bg-white py-3.5 pl-11 pr-12 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-main transition-colors lg:hidden"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div
          className={`col-span-full lg:col-span-4 lg:grid lg:grid-cols-4 lg:gap-3 transition-all duration-300 ease-in-out ${
            filterOpen
              ? "max-h-96 opacity-100 mt-3 overflow-visible"
              : "max-h-0 opacity-0 overflow-hidden lg:max-h-96 lg:opacity-100 lg:mt-0 lg:overflow-visible"
          }`}
        >
          <Dropdown
            placeholder={t("providers.allCategories")}
            options={[
              { value: "", label: t("providers.allCategories") },
              ...categories,
            ]}
            value={categoryId}
            name="categoryId"
            onChange={handleCategoryChange}
          />

          <Dropdown
            placeholder={t("providers.allGovernments")}
            options={[
              { value: "", label: t("providers.allGovernments") },
              ...governorates,
            ]}
            value={governorateId}
            name="governorateId"
            onChange={handleGovernorateChange}
          />

          <Dropdown
            placeholder={t("providers.allCities")}
            options={[
              { value: "", label: t("providers.allCities") },
              ...cities,
            ]}
            value={cityId}
            name="cityId"
            onChange={handleCityChange}
            disabled={!selectedGov}
          />

          <Dropdown
            placeholder={t("providers.sortBy")}
            options={[
              { value: "", label: t("providers.sortBy") },
              { value: "1", label: t("providers.nearest") },
              { value: "2", label: t("providers.highestDiscount") },
            ]}
            value={sortBy}
            name="sortBy"
            onChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ProvidersFilters
