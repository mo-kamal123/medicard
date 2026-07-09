import { useTranslation } from "react-i18next"
import { MapPin, Phone, ExternalLink } from "lucide-react"

const BranchesTab = ({ branches }) => {
  const { t } = useTranslation()
  if (!branches?.length) {
    return <p className="text-gray-500">{t("providerPage.noBranches")}</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {branches.map((branch) => (
        <div
          key={branch.branchId}
          className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-900">{branch.branchName}</h3>

          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
              <span>{branch.fullAddress}</span>
            </div>

            {branch.phoneNumber1 && (
              <a href={`tel:${branch.phoneNumber1}`} className="flex items-center gap-2 hover:text-main">
                <Phone size={16} className="shrink-0 text-gray-400" />
                <span>{branch.phoneNumber1}</span>
              </a>
            )}

            {branch.phoneNumber2 && (
              <a href={`tel:${branch.phoneNumber2}`} className="flex items-center gap-2 hover:text-main">
                <Phone size={16} className="shrink-0 text-gray-400" />
                <span>{branch.phoneNumber2}</span>
              </a>
            )}
          </div>

          {branch.mapUrl && (
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-main hover:underline"
            >
              <ExternalLink size={14} /> {t("providerPage.viewOnMap")}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default BranchesTab
