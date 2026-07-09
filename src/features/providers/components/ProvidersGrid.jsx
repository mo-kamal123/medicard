import { useTranslation } from "react-i18next";
import ProviderCard from "./ProviderCard";

const ProvidersGrid = ({ providers = [], isLoading }) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-[360px] animate-pulse rounded-2xl border border-borders bg-white"
          >
            <div className="h-52 bg-gray-100" />
            <div className="space-y-3 p-4">
              <div className="h-4 w-2/3 rounded bg-gray-100" />
              <div className="h-4 w-1/3 rounded bg-gray-100" />
              <div className="h-4 w-1/2 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!providers.length) {
    return (
      <div className="rounded-2xl border border-dashed border-borders bg-white px-6 py-16 text-center">
        <h3 className="text-xl font-semibold text-dark">{t("providers.noResults")}</h3>
        <p className="mt-2 text-sm text-gray-500">
          {t("providers.noResultsDesc")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

export default ProvidersGrid;
