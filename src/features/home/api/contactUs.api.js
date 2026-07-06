import { httpClient } from "../../../shared/api/httpClient"

export const sendContactMessage = async (data) => {
  const response = await httpClient.post("/Support/contact-us", data)
  return response.data
}
