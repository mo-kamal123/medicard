import { httpClient } from "../../../shared/api/httpClient";

export const getProviders = async (params) => {
  const response = await httpClient.get(
    "/Search/providers",
    {
      params,
    }
  );

  return response.data;
};