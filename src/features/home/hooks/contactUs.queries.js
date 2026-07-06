import { useMutation } from "@tanstack/react-query"
import { sendContactMessage } from "../api/contactUs.api"

export const useContactUs = () => {
  return useMutation({
    mutationFn: sendContactMessage,
  })
}
