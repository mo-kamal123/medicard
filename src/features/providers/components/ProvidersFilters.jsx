import { useTranslation } from "react-i18next"
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  MapPin,
  ArrowUpDown,
  Check,
} from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Dropdown from "../../../shared/components/Dropdown"
import { useGovernorates, useCities } from "../hooks/providers.queries"
import { useCategoriesQuery } from "../../../features/home/hooks/home.queries"

const ProvidersFilters = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const timerRef = useRef(null)

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "")
  const [categoryId, setCategoryId] = useState(searchParams.get("categoryId") || "")
  const [governorateId, setGovernorateId] = useState(searchParams.get("governorateId") || "")
  const [cityId, setCityId] = useState(searchParams.get("cityId") || "")
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "1")

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
    setSortBy(searchParams.get("sortBy") || "1")
  }, [searchParams])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const updateParams = useCallback(
    (overrides) => {
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
    },
    [keyword, categoryId, governorateId, cityId, sortBy, setSearchParams]
  )

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
    updateParams({ governororateId: value, cityId: "" })
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

  const activeFilterCount =
    (categoryId ? 1 : 0) +
    (governorateId ? 1 : 0) +
    (cityId ? 1 : 0) +
    (sortBy !== "1" ? 1 : 0)

  /* ───────── Mobile sheet ───────── */

  const [sheetMounted, setSheetMounted] = useState(false)
  const [sheetShown, setSheetShown] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  const closeTimerRef = useRef(null)

  const openSheet = () => {
    clearTimeout(closeTimerRef.current)
    setOpenSection(null)
    setSheetShown(false)
    setSheetMounted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSheetShown(true)
      })
    })
  }

  const closeSheet = () => {
    setSheetShown(false)
    closeTimerRef.current = setTimeout(() => {
      setSheetMounted(false)
      setOpenSection(null)
    }, 300)
  }

  useEffect(() => {
    return () => clearTimeout(closeTimerRef.current)
  }, [])

  const applyAndClose = () => closeSheet()

  const clearAll = () => {
    updateParams({
      categoryId: "",
      governororateId: "",
      cityId: "",
      sortBy: "1",
    })
    setCategoryId("")
    setGovernorateId("")
    setCityId("")
    setSortBy("1")
    closeSheet()
  }

  const selectedLabel = (options, val) =>
    options.find((o) => o.value === val)?.label || ""

  const draftGovCities = useMemo(() => {
    if (!selectedGov) return []
    const items = citiesData?.data || []
    return items.map((item) => ({ value: String(item.id), label: item.name }))
  }, [citiesData, selectedGov])

  return (
    <div className="rounded-2xl bg-[#E8F1FA] p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3">
        <div className="relative sm:col-span-2 lg:col-span-4">
          <Search
            size={18}
            className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={keyword}
            onChange={handleKeywordChange}
            type="text"
            placeholder={t("providers.searchPlaceholder")}
            className="w-full rounded-xl border border-white bg-white py-3.5 ps-11 pe-12 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <button
            onClick={openSheet}
            className="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-lg bg-main/10 px-2 py-1.5 text-main transition-colors hover:bg-main/20 lg:hidden"
          >
            <SlidersHorizontal size={16} />
            {activeFilterCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-main text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="hidden lg:col-span-4 lg:grid lg:grid-cols-4 lg:gap-3">
          <Dropdown
            placeholder={t("providers.category")}
            options={[
              { value: "", label: t("providers.allCategories") },
              ...categories,
            ]}
            value={categoryId}
            name="categoryId"
            onChange={handleCategoryChange}
          />

          <Dropdown
            placeholder={t("providers.government")}
            options={[
              { value: "", label: t("providers.allGovernments") },
              ...governorates,
            ]}
            value={governorateId}
            name="governorateId"
            onChange={handleGovernorateChange}
          />

          <Dropdown
            placeholder={t("providers.city")}
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
            placeholder={t("providers.nearest")}
            options={[
              { value: "1", label: t("providers.nearest") },
              { value: "2", label: t("providers.highestDiscount") },
            ]}
            value={sortBy}
            name="sortBy"
            onChange={handleSortChange}
          />
        </div>
      </div>

      {/* ──── Mobile bottom sheet ──── */}
      {sheetMounted && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/60"
            style={{
              opacity: sheetShown ? 1 : 0,
              transition: "opacity 0.3s ease-out",
            }}
            onClick={closeSheet}
          />

          <div
            className="absolute bottom-0 inset-x-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-gray-50 shadow-[0_-10px_40px_rgba(0,0,0,0.12)]"
            style={{
              transform: sheetShown ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-gray-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 pt-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-main/10">
                  <SlidersHorizontal size={18} className="text-main" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    {t("providers.filters")}
                  </h2>
                  {activeFilterCount > 0 && (
                    <p className="text-xs text-main font-medium">
                      {activeFilterCount} {t("providers.active")}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={closeSheet}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Sections */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              <AccordionSection
                title={t("providers.category")}
                icon={LayoutGrid}
                value={selectedLabel(
                  [{ value: "", label: t("providers.allCategories") }, ...categories],
                  categoryId
                )}
                isOpen={openSection === "category"}
                onToggle={() =>
                  setOpenSection((prev) => (prev === "category" ? null : "category"))
                }
              >
                <OptionList
                  options={[
                    { value: "", label: t("providers.allCategories") },
                    ...categories,
                  ]}
                  selected={categoryId}
                  onSelect={(v) => {
                    setCategoryId(v)
                    updateParams({ categoryId: v })
                  }}
                />
              </AccordionSection>

              <AccordionSection
                title={t("providers.government")}
                icon={MapPin}
                value={selectedLabel(
                  [{ value: "", label: t("providers.allGovernments") }, ...governorates],
                  governorateId
                )}
                isOpen={openSection === "government"}
                onToggle={() =>
                  setOpenSection((prev) => (prev === "government" ? null : "government"))
                }
              >
                <OptionList
                  options={[
                    { value: "", label: t("providers.allGovernments") },
                    ...governorates,
                  ]}
                  selected={governorateId}
                  onSelect={(v) => {
                    setGovernorateId(v)
                    setCityId("")
                    updateParams({ governorateId: v, cityId: "" })
                  }}
                />
              </AccordionSection>

              <AccordionSection
                title={t("providers.city")}
                icon={MapPin}
                value={selectedLabel(
                  [{ value: "", label: t("providers.allCities") }, ...draftGovCities],
                  cityId
                )}
                isOpen={openSection === "city"}
                onToggle={() =>
                  setOpenSection((prev) => (prev === "city" ? null : "city"))
                }
                disabled={!governorateId}
              >
                <OptionList
                  options={[
                    { value: "", label: t("providers.allCities") },
                    ...draftGovCities,
                  ]}
                  selected={cityId}
                  onSelect={(v) => {
                    setCityId(v)
                    updateParams({ cityId: v })
                  }}
                />
              </AccordionSection>

              <AccordionSection
                title={t("providers.sortBy")}
                icon={ArrowUpDown}
                value={selectedLabel(
                  [
                    { value: "1", label: t("providers.nearest") },
                    { value: "2", label: t("providers.highestDiscount") },
                  ],
                  sortBy
                )}
                isOpen={openSection === "sortBy"}
                onToggle={() =>
                  setOpenSection((prev) => (prev === "sortBy" ? null : "sortBy"))
                }
              >
                <OptionList
                  options={[
                    { value: "1", label: t("providers.nearest") },
                    { value: "2", label: t("providers.highestDiscount") },
                  ]}
                  selected={sortBy}
                  onSelect={(v) => {
                    setSortBy(v)
                    updateParams({ sortBy: v })
                  }}
                />
              </AccordionSection>
            </div>

            {/* Footer */}
            <div className="flex gap-3 border-t border-gray-200/60 bg-white px-5 py-4 safe-area-pb">
              <button
                onClick={clearAll}
                className="flex-1 rounded-2xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-500 shadow-sm transition-all hover:bg-gray-50 active:scale-[0.97]"
              >
                {t("providers.clearAll")}
              </button>
              <button
                onClick={applyAndClose}
                className="flex-1 rounded-2xl bg-gradient-to-b from-main to-sec py-3.5 text-sm font-semibold text-white shadow-md shadow-main/25 transition-all hover:shadow-lg hover:shadow-main/30 active:scale-[0.97]"
              >
                {t("providers.apply")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ──── Accordion Section ──── */

const AccordionSection = ({
  title,
  icon: Icon,
  value,
  isOpen,
  onToggle,
  children,
  disabled = false,
}) => {
  const [expanded, setExpanded] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    if (isOpen) {
      rafRef.current = requestAnimationFrame(() => {
        setExpanded(false)
        rafRef.current = requestAnimationFrame(() => {
          setExpanded(true)
        })
      })
    } else {
      rafRef.current = requestAnimationFrame(() => {
        setExpanded(false)
      })
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [isOpen])

  return (
    <div
      className={`rounded-2xl bg-white mb-3 overflow-hidden ${
        disabled ? "pointer-events-none opacity-40" : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-start"
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
            isOpen ? "bg-main/10 text-main" : "bg-gray-100 text-gray-400"
          }`}
        >
          {Icon && <Icon size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          {!isOpen && value && (
            <p className="mt-0.5 truncate text-xs text-gray-400">{value}</p>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180 text-main" : ""
          }`}
        />
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: expanded ? "500px" : "0px" }}
      >
        <div className="border-t border-gray-100 px-2 pt-1.5 pb-2">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ──── Option List ──── */

const OptionList = ({ options, selected, onSelect }) => (
  <div className="py-1">
    {options.map((opt) => {
      const isActive = selected === opt.value
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSelect(opt.value)}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-150 ${
            isActive
              ? "bg-main/8 font-semibold text-main"
              : "text-gray-600 active:bg-gray-100"
          }`}
        >
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] transition-all duration-150 ${
              isActive
                ? "border-main bg-main text-white"
                : "border-gray-300 bg-white"
            }`}
          >
            {isActive && <Check size={12} strokeWidth={3} />}
          </span>
          <span className="flex-1 text-start">{opt.label}</span>
        </button>
      )
    })}
  </div>
)

export default ProvidersFilters
