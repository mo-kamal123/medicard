import { useQuery } from "@tanstack/react-query"
import { getProviderPage, getProviderCategories, getServicesByCategory, getProviderReviews, getProviderPackages, getPackage } from "../api/providerPage.api"

export const useProviderPage = (id) => {
  return useQuery({
    queryKey: ["providerPage", id],
    queryFn: () => getProviderPage(id),
    enabled: !!id,
    retry: 1,
  })
}

export const useProviderCategories = (providerId, enabled) => {
  return useQuery({
    queryKey: ["providerCategories", providerId],
    queryFn: () => getProviderCategories(providerId),
    enabled: !!providerId && enabled,
    retry: 1,
  })
}

export const useServicesByCategory = (providerId, categoryId, search = "", pageNumber = 1, enabled = true) => {
  return useQuery({
    queryKey: ["providerServicesByCategory", providerId, categoryId, search, pageNumber],
    queryFn: () => getServicesByCategory(providerId, categoryId, search, pageNumber),
    enabled: !!providerId && !!categoryId && enabled,
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

export const usePackage = (id) => {
  return useQuery({
    queryKey: ["package", id],
    queryFn: () => getPackage(id),
    enabled: !!id,
    retry: 1,
  })
}