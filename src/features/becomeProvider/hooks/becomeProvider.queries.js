import { useQuery, useMutation } from "@tanstack/react-query"
import { getCategories, becomeProvider } from "../api/becomeProvider.api"

export const useCategories = () => {
  return useQuery({
    queryKey: ["becomeProviderCategories"],
    queryFn: getCategories,
    retry: 1,
  })
}

export const useBecomeProvider = () => {
  return useMutation({
    mutationFn: becomeProvider,
  })
}
