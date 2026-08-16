import { httpClient } from "../../../shared/api/httpClient"

const API_BASE = "https://medicard-api-v2.medicardeg.com/api"

export const getProviderPage = async (id) => {
  const response = await httpClient.get(`/ProviderPage/${id}`)
  return response.data
}

export const getProviderCategories = async (providerId) => {
  const response = await httpClient.get(`${API_BASE}/CategoryService/providerCategories`, {
    params: { providerId },
  })
  return response.data
}

export const getServicesByCategory = async (providerId, categoryId, search = "", pageNumber = 1, pageSize = 6) => {
  const response = await httpClient.get(`${API_BASE}/ProviderPage/servicesByCategory`, {
    params: { providerId, categoryId, search: search || undefined, pageNumber, pageSize },
  })
  return response.data
}

export const getProviderReviews = async (id) => {
  const response = await httpClient.get(`/ProviderPage/${id}/reviews`)
  return response.data
}

export const getProviderPackages = async (id) => {
  const response = await httpClient.get(`/ProviderPage/${id}/packages`)
  return response.data
}

export const getPackage = async (id) => {
  const response = await httpClient.get(`/Package/${id}`)
  return response.data
}
