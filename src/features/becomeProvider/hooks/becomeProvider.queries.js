import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../api/becomeProvider.api"

export const useCategories = () => {
  return useQuery({
    queryKey: ["becomeProviderCategories"],
    queryFn: getCategories,
    retry: 1,
  })
}
