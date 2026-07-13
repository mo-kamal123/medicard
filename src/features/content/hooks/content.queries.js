import { useQuery } from "@tanstack/react-query"
import { getContent } from "../api/content.api"

export const useContent = (slug) => {
  return useQuery({
    queryKey: ["content", slug],
    queryFn: () => getContent(slug),
    enabled: !!slug,
    retry: 1,
  })
}
