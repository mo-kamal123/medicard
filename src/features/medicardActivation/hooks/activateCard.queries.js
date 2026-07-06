import { useMutation } from "@tanstack/react-query"
import { activateCard } from "../api/activateCard.api"

export const useActivateCard = () => {
  return useMutation({
    mutationFn: activateCard,
  })
}
