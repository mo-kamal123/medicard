import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProvidersGrid from "../components/ProvidersGrid";
import { flattenProviders } from "../utils/flattenProviders";
import ProvidersFilters from "../components/ProvidersFilters";
import { useProviders } from "../hooks/providers.queries";
import { filterProviders } from "../utils/filterProviders";

const Providers = () => {
  const [searchParams] = useSearchParams();

  const filters = {
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "all",
    governorate: searchParams.get("governorate") || "all",
    city: searchParams.get("city") || "all",
    sortBy: searchParams.get("sortBy") || "name",
  };

  const { data, isLoading, isError } = useProviders({
    KeyWord: filters.keyword,
    PageNumber: 1,
    PageSize: 30,
  });

  const apiProviders = flattenProviders(data?.data?.items || []);

  const providers = useMemo(
    () => filterProviders(apiProviders, filters),
    [
      apiProviders,
      filters.keyword,
      filters.category,
      filters.governorate,
      filters.city,
      filters.sortBy,
    ]
  );

  return (
    <div className="bg-body min-h-screen pb-16">
      <div className="w-[90%] mx-auto px-4 py-8">
        <ProvidersFilters providers={apiProviders} />

        <div className="mt-8">
          <ProvidersGrid
            providers={providers}
            isLoading={isLoading && !isError && !apiProviders.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Providers;
