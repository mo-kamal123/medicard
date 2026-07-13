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

export const getGovernorates = async () => {
  const response = await httpClient.get("/Lookups/governorates");
  return response.data;
};

export const getCities = async (governorateId) => {
  const response = await httpClient.get("/Lookups/cities", { params: { governorateId } });
  return response.data;
};