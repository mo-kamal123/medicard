import { Check } from "lucide-react";

const PlanCard = ({ data, active }) => {
  return (
    <div
      className={`
        relative flex flex-col justify-between min-h-[600px] w-1/2 rounded-3xl border p-8 transition-all duration-300
        ${
          active
            ? "bg-gradient-to-br from-[#EEF4FF] via-[#EAF5F5] to-[#DFF5EE] border-[#D6E4FF]"
            : "bg-white border-[#D6E4FF]"
        }
      `}
    >
      {/* Save Badge */}
      {active && (
        <div className="absolute top-5 right-5 px-4 py-1 text-sm font-medium text-[#D97706] bg-[#FEF3C7] border border-[#FCD34D] rounded-full">
          Save 20%
        </div>
      )}

      <div>
        {/* Title */}
        <h3 className="text-2xl font-bold uppercase text-main mb-6">
          {data.title}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-2 mb-8 pb-4 border-b border-gray-200">
          <span className="text-6xl font-semibold text-[#0A1F57]">
            {data.price}
          </span>
          <span className="text-lg text-gray-500 mb-2">EGP</span>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          {data.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check size={18} className="text-green-600 shrink-0" />
              <p className="text-gray-600">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        className={`
          mt-10 w-full py-4 rounded-xl text-white font-medium transition-all
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
  );
};

export default PlanCard;