import { httpClient } from "../../../shared/api/httpClient"

export const getHomeData = async () => {
  const response = await httpClient.get("/Home")
  return response.data
}

export const getCategoryData = async () => {
  const categories = await httpClient.get("/Lookups/categories")
  return categories.data
}
