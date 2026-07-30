import { httpClient } from "../../../shared/api/httpClient"

export const getProviderPage = async (id) => {
  const response = await httpClient.get(`/ProviderPage/${id}`)
  return response.data
}

export const getProviderServices = async (id, pageNumber = 1) => {
  const response = await httpClient.get("https://medicard-api-v2.medicardeg.com/services", { params: { providerId: id, pageNumber, pageSize: 10 } })
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
