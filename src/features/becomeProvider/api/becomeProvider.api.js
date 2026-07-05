import { httpClient } from "../../../shared/api/httpClient"

export const getCategories = async () => {
  const response = await httpClient.get("/CategoryService/categories")
  return response.data
}
