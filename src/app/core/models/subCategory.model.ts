import { Category } from "./category.model"
import { Product } from "./product.model"

export interface SubCategory {
    id: number
    name: string
    category: Category[]
    product: Product[]
}
export interface SubCategoryRes {
    message: string
    subCategory: SubCategory[]
}