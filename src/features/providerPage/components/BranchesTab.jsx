import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { MapPin, Phone, ExternalLink } from "lucide-react"
import Paginations from "../../../shared/components/Pagination"

const PAGE_SIZE = 9

const BranchesTab = ({ branches }) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const safeBranches = branches || []

  const totalPages = Math.max(1, Math.ceil(safeBranches.length / PAGE_SIZE))

  const paginatedBranches = useMemo(
    () => safeBranches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [safeBranches, page]
  )

  if (!safeBranches.length) {
    return <p className="text-gray-500">{t("providerPage.noBranches")}</p>
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        {paginatedBranches.map((branch) => (
          <div
            key={branch.branchId}
            className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              {branch.branchName}
            </h3>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <div className="flex items-center  gap-2">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" inline-flex items-center gap-2 text-sm font-medium text-main hover:underline"
                >
                <div className="flex items-center justify-between gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <p className="text-main">{branch.fullAddress}</p>
                </div>
                  <ExternalLink size={14} />
                </a>
              </div>
              <div className="flex justify-between">
                {branch.phoneNumber1 && (
                  <a
                    href={`tel:${branch.phoneNumber1}`}
                    className="flex items-center gap-2 hover:text-main"
                  >
                    <Phone size={16} className="shrink-0 text-gray-400" />
                    <span>{branch.phoneNumber1}</span>
                  </a>
                )}

                {branch.phoneNumber2 && (
                  <a
                    href={`tel:${branch.phoneNumber2}`}
                    className="flex items-center gap-2 hover:text-main"
                  >
                    <span>{branch.phoneNumber2}</span>
                  </a>
                )}
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
    </>
  );
}

export default BranchesTab
