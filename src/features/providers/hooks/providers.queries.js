import { useQuery } from "@tanstack/react-query";
import { getProviders, getGovernorates, getCities } from "../api/providers.api";

export const useProviders = (params) => {
  return useQuery({
    queryKey: ["providers", params],
    queryFn: () => getProviders(params),
    retry: 1,
  });
};

export const useGovernorates = () => {
  return useQuery({
    queryKey: ["governorates"],
    queryFn: getGovernorates,
    retry: 1,
  });
};

export const useCities = (governorateId) => {
  return useQuery({
    queryKey: ["cities", governorateId],
    queryFn: () => getCities(governorateId),
    enabled: !!governorateId,
    retry: 1,
  });
};