import { SubCategory } from "./subCategory.model"
import { Type } from "./type.model"

export interface Category {
    id: number
    name: string
    type: Type
    subCategory: SubCategory[]
}
export interface CategoryRes {
    message: string
    category: Category[]
}