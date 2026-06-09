export const filterProviders = (providers, filters) => {
  const keyword = filters.keyword?.trim().toLowerCase();
  let result = [...providers];

  if (keyword) {
    result = result.filter((provider) => {
      const searchable = [
        provider.providerName,
        provider.categoryName,
        provider.city,
        provider.governorate,
        provider.branchName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(keyword);
    });
  }

  if (filters.category && filters.category !== "all") {
    result = result.filter(
      (provider) =>
        provider.categoryName?.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.governorate && filters.governorate !== "all") {
    result = result.filter(
      (provider) =>
        provider.governorate?.toLowerCase() === filters.governorate.toLowerCase()
    );
  }

  if (filters.city && filters.city !== "all") {
    result = result.filter(
      (provider) => provider.city?.toLowerCase() === filters.city.toLowerCase()
    );
  }

  if (filters.sortBy === "rating") {
    result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (filters.sortBy === "discount") {
    result.sort(
      (a, b) => (b.maxDiscountPercentage || 0) - (a.maxDiscountPercentage || 0)
    );
  } else {
    result.sort((a, b) => a.providerName.localeCompare(b.providerName));
  }

  return result;
};
