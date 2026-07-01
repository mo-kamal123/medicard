import { useQuery } from "@tanstack/react-query"
import { getProviderPage, getProviderServices, getProviderReviews, getProviderPackages } from "../api/providerPage.api"

export const useProviderPage = (id) => {
  return useQuery({
    queryKey: ["providerPage", id],
    queryFn: () => getProviderPage(id),
    enabled: !!id,
    retry: 1,
  })
}

export const useProviderServices = (id, enabled) => {
  return useQuery({
    queryKey: ["providerServices", id],
    queryFn: () => getProviderServices(id),
    enabled: !!id && enabled,
    retry: 1,
  })
}

export const useProviderReviews = (id, enabled) => {
  return useQuery({
    queryKey: ["providerReviews", id],
    queryFn: () => getProviderReviews(id),
    enabled: !!id && enabled,
    retry: 1,
  })
}

export const useProviderPackages = (id, enabled) => {
  return useQuery({
    queryKey: ["providerPackages", id],
    queryFn: () => getProviderPackages(id),
    enabled: !!id && enabled,
    retry: 1,
  })
}