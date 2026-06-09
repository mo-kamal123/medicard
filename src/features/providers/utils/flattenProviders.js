export const flattenProviders = (items = []) => {
  return items.flatMap((provider) =>
    (provider.branches || []).map((branch) => ({
      id: `${provider.providerId}-${branch.branchId}`,
      providerId: provider.providerId,
      providerName: provider.providerName,
      categoryName: provider.categoryName,
      imageUrl: provider.imageUrl,
      hotLine: provider.hotLine,
      maxDiscountPercentage: provider.maxDiscountPercentage,
      rating: provider.rating,
      reviewsCount: provider.reviewsCount,
      offers: provider.offers || [],

      branchId: branch.branchId,
      branchName: branch.branchName,
      address: branch.fullAddress,
      governorate: branch.governorateName,
      city: branch.cityName,
      phone1: branch.phoneNumber1,
      phone2: branch.phoneNumber2,
      mapUrl: branch.mapUrl,
      latitude: branch.latitude,
      longitude: branch.longitude,
      distanceKm: branch.distanceKm,
    }))
  );
};