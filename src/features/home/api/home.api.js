import { httpClient } from "../../../shared/api/httpClient"


const getHomeData = async () => {}

export const getCategoryData = async () => {
    const categories = await httpClient.get('/Lookups/categories')
    return categories.data
}