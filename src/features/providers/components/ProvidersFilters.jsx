import { useTranslation } from "react-i18next"
import { Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Dropdown from "../../../shared/components/Dropdown"

const ProvidersFilters = ({ providers = [] }) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const timerRef = useRef(null)

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "all")
  const [governorate, setGovernorate] = useState(searchParams.get("governorate") || "all")
  const [city, setCity] = useState(searchParams.get("city") || "all")
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "name")

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "")
    setCategory(searchParams.get("category") || "all")
    setGovernorate(searchParams.get("governorate") || "all")
    setCity(searchParams.get("city") || "all")
    setSortBy(searchParams.get("sortBy") || "name")
  }, [searchParams])

  const updateParams = (overrides) => {
    const params = new URLSearchParams()
    const kw = overrides.keyword !== undefined ? overrides.keyword : keyword
    const cat = overrides.category !== undefined ? overrides.category : category
    const gov = overrides.governorate !== undefined ? overrides.governorate : governorate
    const cty = overrides.city !== undefined ? overrides.city : city
    const sort = overrides.sortBy !== undefined ? overrides.sortBy : sortBy

    if (kw.trim()) params.set("keyword", kw.trim())
    if (cat !== "all") params.set("category", cat)
    if (gov !== "all") params.set("governorate", gov)
    if (cty !== "all") params.set("city", cty)
    if (sort !== "name") params.set("sortBy", sort)

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
    setCategory(value)
    updateParams({ category: value })
  }

  const handleGovernorateChange = (e) => {
    const value = e.target.value
    setGovernorate(value)
    updateParams({ governorate: value })
  }

  const handleCityChange = (e) => {
    const value = e.target.value
    setCity(value)
    updateParams({ city: value })
  }

  const handleSortChange = (e) => {
    const value = e.target.value
    setSortBy(value)
    updateParams({ sortBy: value })
  }

  const categories = useMemo(
    () =>
      [...new Set(providers.map((provider) => provider.categoryName).filter(Boolean))].sort(),
    [providers]
  )

  const governorates = useMemo(
    () =>
      [...new Set(providers.map((provider) => provider.governorate).filter(Boolean))].sort(),
    [providers]
  )

  const cities = useMemo(
    () => [...new Set(providers.map((provider) => provider.city).filter(Boolean))].sort(),
    [providers]
  )

  return (
    <div className="rounded-2xl bg-[#E8F1FA] p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={keyword}
            onChange={handleKeywordChange}
            type="text"
            placeholder={t("providers.searchPlaceholder")}
            className="w-full rounded-xl border border-white bg-white py-3.5 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <Dropdown
          placeholder={t("providers.category")}
          options={[
            { value: "all", label: t("providers.allCategories") },
            ...categories.map((item) => ({ value: item, label: item })),
          ]}
          value={category}
          name="category"
          onChange={handleCategoryChange}
        />

        <Dropdown
          placeholder={t("providers.government")}
          options={[
            { value: "all", label: t("providers.allGovernments") },
            ...governorates.map((item) => ({ value: item, label: item })),
          ]}
          value={governorate}
          name="governorate"
          onChange={handleGovernorateChange}
        />

        <Dropdown
          placeholder={t("providers.city")}
          options={[
            { value: "all", label: t("providers.allCities") },
            ...cities.map((item) => ({ value: item, label: item })),
          ]}
          value={city}
          name="city"
          onChange={handleCityChange}
        />

        <Dropdown
          placeholder={t("providers.sortBy")}
          options={[
            { value: "name", label: t("providers.name") },
            { value: "rating", label: t("providers.highestRated") },
            { value: "discount", label: t("providers.highestDiscount") },
          ]}
          value={sortBy}
          name="sortBy"
          onChange={handleSortChange}
        />
      </div>
    </div>
  )
}

export default ProvidersFilters
