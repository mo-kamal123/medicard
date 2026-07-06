import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"

const PlanCard = ({ data, active }) => {
  const navigate = useNavigate()
  return (
    <div
      className={`
        relative flex min-h-[600px] w-1/2 cursor-pointer flex-col justify-between rounded-3xl border p-8 transition-all duration-300
        ${
          active
            ? "border-[#D6E4FF] bg-gradient-to-br from-[#EEF4FF] via-[#EAF5F5] to-[#DFF5EE]"
            : "border-[#D6E4FF] bg-white"
        }
      `}
    >
      {data.discount && (
        <div className="absolute right-5 top-5 rounded-full border border-[#FCD34D] bg-[#FEF3C7] px-4 py-1 text-sm font-medium text-[#D97706]">
          Save {Math.round(data.discount)}%
        </div>
      )}

      <div>
        <h3 className="mb-6 text-2xl font-bold uppercase text-main">{data.title}</h3>

        <div className="mb-8 flex items-end gap-2 border-b border-gray-200 pb-4">
          <span className="text-6xl font-semibold text-[#0A1F57]">{data.price}</span>
          <span className="mb-2 text-lg text-gray-500">EGP</span>
          {data.priceBefore && data.priceBefore !== data.price && (
            <span className="mb-2 text-lg text-gray-400 line-through">{data.priceBefore} EGP</span>
          )}
        </div>

        <div className="space-y-4">
          {data.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check size={18} className="shrink-0 text-green-600" />
              <p className="text-gray-600">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate("/buy-card")}
        className={`
          mt-10 w-full rounded-xl py-4 font-medium text-white transition-all
          ${
            active
              ? "bg-gradient-to-r from-[#3B82F6] to-[#143D7A]"
              : "bg-[#3E78B9] hover:bg-[#3468A0]"
          }
        `}
      >
        Get Card
      </button>
    </div>
  )
}

export default PlanCard
