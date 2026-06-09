import { useQuery } from "@tanstack/react-query";
import { getProviders } from "../api/providers.api";

export const useProviders = (params) => {
  return useQuery({
    queryKey: ["providers", params],
    queryFn: () => getProviders(params),
    retry: 1,
  });
};