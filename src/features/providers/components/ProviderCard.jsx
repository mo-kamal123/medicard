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
      <article className="md:hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg">
        <div className="flex gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <img
              src={provider.imageUrl}
              alt={provider.providerName}
              className="h-24 w-24 rounded-2xl border border-gray-200 object-cover shadow-sm"
            />
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold text-gray-900">
                  {provider.providerName}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-main">
                    {provider.categoryName}
                  </span>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {offers.length > 0 && offers.map((offer) => (
                      <span
                        key={offer}
                        className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700"
                      >
                        {offer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-800">
                    {rating.value}
                  </span>
                  <span className="text-xs text-gray-500">({rating.count})</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  <Navigation size={13} className="text-main" />
                  <span>{provider.distanceKm?.toFixed(2)} km</span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {location && (
                <div className="flex min-w-0 items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} className="text-main shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
              {provider.hotLine && (
                <a
                  href={`tel:${provider.hotLine}`}
                  className="rounded-xl border border-gray-200 p-2.5 text-gray-500 transition-all hover:border-main hover:bg-main hover:text-white"
                >
                  <Phone size={16} />
                </a>
              )}

              {provider.hotLine && (
                <a
                  href={`https://wa.me/${provider.hotLine.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-gray-200 p-2.5 text-gray-500 transition-all hover:border-main hover:bg-main hover:text-white"
                >
                  <img src={whatsappIcon} alt="WhatsApp" className="h-4 w-4" />
                </a>
              )}

              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(provider.providerName + " " + (location || ""))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-main px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                {t("providers.directions")}
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