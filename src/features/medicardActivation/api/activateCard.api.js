import { httpClient } from "../../../shared/api/httpClient"

export const activateCard = async (data) => {
  const response = await httpClient.post("/CardActivation/activate", data)
  return response.data
}
