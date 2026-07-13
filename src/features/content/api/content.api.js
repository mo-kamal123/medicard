import { httpClient } from "../../../shared/api/httpClient"

export const getContent = async (slug) => {
  const response = await httpClient.get(`/Content/${slug}`)
  return response.data
}
