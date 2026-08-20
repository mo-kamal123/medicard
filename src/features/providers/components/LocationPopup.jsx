import { useTranslation } from "react-i18next";
import locationImg from "../../../assets/location-img.png";

const LocationPopup = ({ onAllow, onSkip }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-2xl overflow-hidden rounded-3xl bg-[#fdfdfd] text-center shadow-xl">
        <div className="flex items-center justify-center px-6 pt-8 pb-4">
          <img
            src={locationImg}
            alt={t("providers.locationPopup.title")}
            className="h-60 w-auto object-contain"
          />
        </div>

        <div className="px-6 pb-6 pt-2">
          <h2 className="text-3xl font-semibold text-gray-900">
            {t("providers.locationPopup.title")}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {t("providers.locationPopup.description")}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={onAllow}
              className="w-[90%] m-auto rounded-xl bg-main py-3.5 text-sm font-semibold text-white transition-all cursor-pointer"
            >
              {t("providers.locationPopup.allow")}
            </button>

            <div className="flex items-center gap-3 w-[90%] m-auto">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              onClick={onSkip}
              className="text-sm font-semibold text-gray-500 transition-all hover:text-main hover:underline"
            >
              {t("providers.locationPopup.skip")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;
