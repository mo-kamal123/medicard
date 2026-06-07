
import { useQuery } from '@tanstack/react-query'
import { getCategoryData } from '../api/home.api'

export const useCategoriesQuery = () => 
  useQuery({
    queryKey: ['categories'],
    queryFn: getCategoryData,
  })

