import { Category } from "./category.model"

export interface Type {
    id: number
    name: string
    category: Category[]
}
export interface TypeRes {
    message: string, 
    type: Type[]
}