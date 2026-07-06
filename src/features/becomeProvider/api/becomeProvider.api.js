import { httpClient } from "../../../shared/api/httpClient"

export const getCategories = async () => {
  const response = await httpClient.get("/Lookups/categories")
  return response.data
}

export const becomeProvider = async (data) => {
  const response = await httpClient.post("/Support/become-provider", data)
  return response.data
}
