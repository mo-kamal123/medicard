import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import i18n from "../config/i18n";

const PlanCard = ({ data, active }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className={`
        relative flex min-h-[450px] md:min-h-[600px] w-full cursor-pointer flex-col justify-between rounded-3xl border p-6 md:p-8 transition-all duration-300
        ${
          active
            ? "border-[#D6E4FF] bg-gradient-to-br from-[#EEF4FF] via-[#EAF5F5] to-[#DFF5EE]"
            : "border-[#D6E4FF] bg-white"
        }
      `}
    >
      <div
        className={`absolute top-3 md:top-5 rounded-full border border-[#FCD34D] bg-[#FEF3C7] px-3 md:px-4 py-1 text-xs md:text-sm font-medium text-[#D97706]
    ${i18n.dir() === "rtl" ? "left-3 md:left-5" : "right-3 md:right-5"}`}
      >
        {t("plans.save", { discount: Math.round(data.discount) })}
      </div>

      <div>
        <h3 className="mb-4 md:mb-6 text-xl md:text-2xl font-medium uppercase text-main">
          {data.title}
        </h3>

        <div className="mb-6 md:mb-8 flex items-end gap-2 border-b border-gray-200 pb-4">
          <span className="text-4xl md:text-6xl font-semibold text-[#0A1F57]">
            {data.price}
          </span>
          <span className="mb-1 md:mb-2 text-base md:text-lg text-gray-500">
            {t("plans.egp")}
          </span>
          {data.priceBefore && data.priceBefore !== data.price && (
            <span className="mb-1 md:mb-2 text-sm md:text-lg text-gray-400 line-through">
              {data.priceBefore} {t("plans.egp")}
            </span>
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
          mt-6 md:mt-10 w-full rounded-xl py-3 md:py-4 font-medium text-white transition-all
          ${
            active
              ? "bg-gradient-to-r from-[#3B82F6] to-[#143D7A]"
              : "bg-[#3E78B9] hover:bg-[#3468A0]"
          }
        `}
      >
        {t("plans.getCard")}
      </button>
    </div>
  );
};

export default PlanCard;
