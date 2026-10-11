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
    <div className="relative h-full">
      <Link
        to={`/provider/${provider.providerId}`}
        aria-label={provider.providerName}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
      />
      {/* ================= MOBILE ================= */}
      <article className="md:hidden flex h-full items-stretch gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Logo */}
        <div className="relative m-2 me-0 min-h-30 w-30 shrink-0 self-stretch overflow-hidden rounded-xl  ">
          {provider.imageUrl ? (
            <img
              src={provider.imageUrl}
              alt={provider.providerName}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-main/10 text-lg font-bold text-main">
              {provider.providerName?.charAt(0)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-start gap-1.5 py-3 pe-3">
          {/* Name and reviews aligned at the top */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="min-w-0 flex-1 line-clamp-2 text-base font-bold leading-snug text-gray-900">
              {provider.providerName}
            </h3>
            <div className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-900 ring-1 ring-inset ring-amber-100">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>{rating.value}</span>
              <span className="font-normal text-gray-500">({rating.count})</span>
            </div>
          </div>

          {/* Category and distance labels */}
          <div className="flex flex-wrap items-center gap-1.5">
            {provider.categoryName && (
              <span className="inline-flex items-center rounded-md bg-main/10 px-2 py-1 text-[11px] font-semibold leading-tight text-main">
                {provider.categoryName}
              </span>
            )}
            {provider.distanceKm != null && (
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium leading-tight text-gray-600">
                <Navigation size={11} className="shrink-0 text-main" />
                {provider.distanceKm.toFixed(1)} km
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

          {/* Offer labels */}
          <div className="flex flex-wrap gap-1.5">
            {offers.map((offer) => (
              <span
                key={offer}
                className="w-fit rounded-md bg-green-50 px-2 py-1 text-[11px] font-semibold leading-tight text-green-700 ring-1 ring-inset ring-green-100"
              >
                {offer}
              </span>
            ))}
          </div>

          {/* Actions — pinned to bottom */}
          <div className="relative z-20 mt-auto flex items-center justify-end gap-2 pt-1">
            {provider.hotLine && (
              <a
                href={`tel:${provider.hotLine}`}
                aria-label={`Call ${provider.providerName}`}
                className="rounded-xl border border-gray-200 p-2 text-gray-400 transition-colors hover:border-main hover:bg-main hover:text-white"
              >
                <Phone size={14} />
              </a>
            )}

            {provider.hotLine && (
              <a
                href={`https://wa.me/${provider.hotLine.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-gray-200 p-2 text-gray-400 transition-colors hover:border-main hover:bg-main hover:text-white"
              >
                <img src={whatsappIcon} alt="WhatsApp" className="h-3.5 w-3.5 grayscale brightness-0 opacity-60 group-hover:brightness-0 group-hover:grayscale group-hover:invert group-hover:opacity-100" />
              </a>
            )}

            <a
              aria-label={`View ${provider.providerName} on Google Maps`}
              href={`https://www.google.com/maps/search/${encodeURIComponent(provider.providerName + " " + (location || ""))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 p-2 text-gray-400 transition-colors hover:border-main hover:bg-main hover:text-white"
            >
              <MapPin size={14} />
            </a>
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

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-lg font-semibold text-dark">
            {provider.providerName}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {provider.categoryName && (
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold leading-tight text-main">
                  {provider.categoryName}
                </span>
              )}
              {provider.distanceKm != null && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  <Navigation size={12} className="shrink-0 text-main" />
                  {provider.distanceKm.toFixed(1)} km
                </span>
              )}
            </div>

          </div>



          {location && (
            <div className="flex items-center gap-1.5 pt-2 text-sm text-gray-500">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          )}

          <div className="mt-auto flex items-start justify-between gap-2 pt-3">
            {offers.length > 0 && (
              <div className="flex min-w-0 flex-1 flex-wrap gap-2">
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
            {/* Contact actions beside offers */}
            <div className="relative z-20 ms-auto flex shrink-0 items-center gap-1.5">
              {provider.hotLine && (
                <a
                  href={`tel:${provider.hotLine}`}
                  aria-label={`Call ${provider.providerName}`}
                  className="rounded-xl border border-gray-200 p-2 text-gray-400 transition-colors hover:border-main hover:bg-main hover:text-white"
                >
                  <Phone size={14} />
                </a>
              )}
  
              {provider.hotLine && (
                <a
                  href={`https://wa.me/${provider.hotLine.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-gray-200 p-2 text-gray-400 transition-colors hover:border-main hover:bg-main hover:text-white"
                >
                  <img src={whatsappIcon} alt="WhatsApp" className="h-3.5 w-3.5 grayscale brightness-0 opacity-60 group-hover:brightness-0 group-hover:grayscale group-hover:invert group-hover:opacity-100" />
                </a>
              )}
  
              <a
                aria-label={`View ${provider.providerName} on Google Maps`}
                href={`https://www.google.com/maps/search/${encodeURIComponent(provider.providerName + " " + (location || ""))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 p-2 text-gray-400 transition-colors hover:border-main hover:bg-main hover:text-white"
              >
                <MapPin size={14} />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProviderCard;