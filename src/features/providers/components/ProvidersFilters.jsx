import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const selectClassName =
  "appearance-none rounded-xl border border-white bg-white px-4 py-3.5 pr-10 text-sm text-gray-700 outline-none min-w-[140px]";

const ProvidersFilters = ({ providers = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [governorate, setGovernorate] = useState(
    searchParams.get("governorate") || "all"
  );
  const [city, setCity] = useState(searchParams.get("city") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "name");

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setCategory(searchParams.get("category") || "all");
    setGovernorate(searchParams.get("governorate") || "all");
    setCity(searchParams.get("city") || "all");
    setSortBy(searchParams.get("sortBy") || "name");
  }, [searchParams]);

  const categories = useMemo(
    () =>
      [...new Set(providers.map((provider) => provider.categoryName).filter(Boolean))].sort(),
    [providers]
  );

  const governorates = useMemo(
    () =>
      [...new Set(providers.map((provider) => provider.governorate).filter(Boolean))].sort(),
    [providers]
  );

  const cities = useMemo(
    () => [...new Set(providers.map((provider) => provider.city).filter(Boolean))].sort(),
    [providers]
  );

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (category !== "all") params.set("category", category);
    if (governorate !== "all") params.set("governorate", governorate);
    if (city !== "all") params.set("city", city);
    if (sortBy !== "name") params.set("sortBy", sortBy);

    setSearchParams(params);
  };

  return (
    <div className="rounded-2xl bg-[#E8F1FA] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[260px] flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            type="text"
            placeholder="Doctor name, pharmacy, lab..."
            className="w-full rounded-xl border border-white bg-white py-3.5 pl-11 pr-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={selectClassName}
          >
            <option value="all">Category</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="relative">
          <select
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}
            className={selectClassName}
          >
            <option value="all">Government</option>
            {governorates.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="relative">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={selectClassName}
          >
            <option value="all">City</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={selectClassName}
          >
            <option value="name">Sort by</option>
            <option value="rating">Highest Rated</option>
            <option value="discount">Highest Discount</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="rounded-xl bg-main px-8 py-3.5 text-sm font-medium text-white transition hover:bg-sec"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ProvidersFilters;
