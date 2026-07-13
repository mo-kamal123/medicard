import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { X } from "lucide-react";
import { useProviderPackages, usePackage } from "../hooks/providerPage.queries";
import Paginations from "../../../shared/components/Pagination";

const PAGE_SIZE = 6;

const PackagesTab = ({ providerId }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const { data, isLoading } = useProviderPackages(providerId, true);
  const { data: pkgData, isLoading: pkgLoading } = usePackage(selectedId);
  const packages = data?.data?.items || [];
  const selectedPkg = pkgData?.data;

  const totalPages = Math.max(1, Math.ceil(packages.length / PAGE_SIZE));

  const paginatedPackages = useMemo(
    () => packages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [packages, page]
  );

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (!packages.length) {
    return <p className="text-gray-500">{t("providerPage.noPackages")}</p>;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPackages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedId(pkg.id)}
            className="cursor-pointer overflow-hidden rounded-xl  relative border border-gray-200 bg-white transition hover:shadow-md"
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
            <span className="rounded-full absolute top-3 right-3 bg-green-100 px-2 py-1 text-xs text-green-600">
              -{pkg.discountPercentage.toFixed(0)}%
            </span>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{pkg.name}</h3>

              <div className="mt-3 flex justify-between items-center gap-2 text-sm text-gray-600">
                <span>
                  {t("providerPage.packageServices", {
                    count: pkg.servicesCount,
                  })}
                </span>
                <div className=" flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">
                    {pkg.priceBefore.toFixed(0)} EGP
                  </span>
                  <span className="font-bold text-main">
                    {pkg.priceAfter.toFixed(0)} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Paginations
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {selectedId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {pkgLoading ? (
              <div className="space-y-4 py-8">
                <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
                <div className="h-40 animate-pulse rounded-xl bg-gray-100" />
                <div className="h-4 w-64 animate-pulse rounded bg-gray-100" />
              </div>
            ) : (
              selectedPkg && (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {selectedPkg.name}
                    </h2>

                    {selectedPkg.discountPercentage > 0 && (
                      <span className="rounded-full bg-[#DFF7F1] px-3 py-1 text-sm font-medium text-[#11A87A]">
                        Save {selectedPkg.discountPercentage.toFixed(0)}%
                      </span>
                    )}
                  </div>

                  {/* Tests + Image */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="rounded-2xl border border-gray-200 p-4 h-48 overflow-y-auto">
                      <h3 className="mb-3 font-semibold text-gray-800">
                        {t("providerPage.includes")}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {selectedPkg.serviceNames?.map((name, index) => (
                          <li key={index}>
                            {index + 1}- {name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="h-48 overflow-hidden rounded-2xl bg-gray-100">
                      {selectedPkg.image && (
                        <img
                          src={selectedPkg.image}
                          alt={selectedPkg.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {selectedPkg.description && (
                    <div className="mt-6">
                      <h3 className="font-semibold text-gray-800">
                        Description
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {selectedPkg.description}
                      </p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-gray-300 pt-5">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through">
                        {selectedPkg.priceBefore.toFixed(0)} EGP
                      </span>
                      <span className="text-2xl font-bold text-[#1677FF]">
                        {selectedPkg.priceAfter.toFixed(0)} EGP
                      </span>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PackagesTab
