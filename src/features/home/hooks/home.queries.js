import { useQuery } from "@tanstack/react-query"
import { getCategoryData, getHomeData } from "../api/home.api"

export const useCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryData,
  })

export const useHomeData = () =>
  useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
  })
