import { useTranslation } from "react-i18next";
import { MapPin, Star, Phone, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import whatsappIcon from "../../../assets/whatsapp.svg";

const getOffers = (provider, t) => {
  if (provider.offers?.length) return provider.offers.slice(0, 3);

  const offers = [];

  if (provider.maxDiscountPercentage) {
    offers.push(
      t("providers.upToOff", {
        discount: provider.maxDiscountPercentage,
      })
    );
  }

  if (provider.categoryName === "Lab") {
    offers.push(t("providers.scanOff"));
  } else if (provider.categoryName === "Hospital") {
    offers.push(t("providers.examOff"));
  }

  return offers.slice(0, 3);
};

const getRating = (provider) => ({
  value:
    provider.averageRating != null
      ? Number(provider.averageRating).toFixed(1)
      : "0.0",
  count: provider.totalReviews ?? 0,
});

const ProviderCard = ({ provider }) => {
  const { t } = useTranslation();

  const offers = getOffers(provider, t);
  const rating = getRating(provider);

  const location = provider.city || provider.branchName || provider.governorate;

  return (
    <Link to={`/provider/${provider.providerId}`} className="block">
      {/* ================= MOBILE ================= */}
      <article className="md:hidden flex gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
        {/* Logo */}
        <div className="shrink-0 overflow-hidden rounded-xl bg-gray-100">
          {provider.imageUrl ? (
            <img
              src={provider.imageUrl}
              alt={provider.providerName}
              className="h-full w-36 object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center bg-main/10 text-lg font-bold text-main">
              {provider.providerName?.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-3 gap-1.5 ">
          {/* Name + category + distance */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 text-base font-bold text-gray-900">
                {provider.providerName}
              </h3>
              {provider.distanceKm != null && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                  <Navigation size={11} className="text-main" />
                  {provider.distanceKm.toFixed(1)} km
                </span>
              )}
            </div>

            {provider.categoryName && (
              <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-main">
                {provider.categoryName}
              </span>
            )}
          </div>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} className="shrink-0 text-main" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {/* Offers */}
          {offers.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {offers.map((offer) => (
                <span
                  key={offer}
                  className="w-fit rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700"
                >
                  {offer}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            {/* <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-2 py-0.5">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-gray-800">{rating.value}</span>
              <span className="text-[10px] text-gray-500">({rating.count})</span>
            </div> */}

            <div className="flex items-center gap-1.5">
              {provider.hotLine && (
                <a
                  href={`tel:${provider.hotLine}`}
                  className="rounded-xl border border-gray-200 p-2 text-gray-400 transition hover:border-main hover:bg-main hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone size={14} />
                </a>
              )}

              {provider.hotLine && (
                <a
                  href={`https://wa.me/${provider.hotLine.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-gray-200 p-2 text-gray-400 transition hover:border-main hover:bg-main hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={whatsappIcon} alt="WhatsApp" className="h-3.5 w-3.5" />
                </a>
              )}

              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(provider.providerName + " " + (location || ""))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 px-2 py-1 text-gray-400 transition hover:border-main hover:bg-main hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <MapPin size={14} className="inline-block text-main" />
                {/* {t("providers.directions")} */}
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* ================= DESKTOP ================= */}
      <article className="hidden h-full w-full flex-col overflow-hidden rounded-2xl border border-borders bg-white transition-shadow hover:shadow-md md:flex">
        <div className="relative h-52 shrink-0 bg-gray-50">
          <img
            src={provider.imageUrl}
            alt={provider.providerName}
            className="h-full w-full object-cover"
          />

          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-800 shadow">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>{rating.value}</span>
            <span className="text-gray-400">({rating.count})</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center p-4">
          {offers.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {offers.map((offer) => (
                <span
                  key={offer}
                  className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600"
                >
                  {offer}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-lg font-semibold text-dark">
            {provider.providerName}
          </h3>

          <p className="mt-1 text-sm text-gray-500">{provider.categoryName}</p>

          {location && (
            <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm text-gray-500">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProviderCard;