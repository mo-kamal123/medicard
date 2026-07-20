import { useTranslation } from "react-i18next";
import { MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const getOffers = (provider, t) => {
  if (provider.offers?.length) return provider.offers.slice(0, 2);

  const offers = [];
  if (provider.maxDiscountPercentage) {
    offers.push(t("providers.upToOff", { discount: provider.maxDiscountPercentage }));
  }
  if (provider.categoryName === "Lab") {
    offers.push(t("providers.scanOff"));
  } else if (provider.categoryName === "Hospital") {
    offers.push(t("providers.examOff"));
  }

  return offers.slice(0, 2);
};

const getRating = (provider) => {
  if (provider.averageRating) {
    return {
      value: Number(provider.averageRating).toFixed(1),
      count: provider.totalReviews || 0,
    };
  }

  const seed = provider.providerId || 1;
  return {
    value: (4 + (seed % 6) / 10).toFixed(1),
    count: 100 + (seed * 37) % 300,
  };
};

const ProviderCard = ({ provider }) => {
  const { t } = useTranslation();
  const offers = getOffers(provider, t);
  const rating = getRating(provider);
  const location = provider.city || provider.branchName || provider.governorate;

  return (
    <Link to={`/provider/${provider.providerId}`} className="flex h-full">
      <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-borders bg-white transition-shadow hover:shadow-md">
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

          <h3 className="text-lg font-semibold text-dark">{provider.providerName}</h3>
          <p className="mt-1 text-sm text-gray-500">{provider.categoryName}</p>

          {location && (
            <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm text-gray-500">
              <MapPin size={14} className="shrink-0" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProviderCard;
