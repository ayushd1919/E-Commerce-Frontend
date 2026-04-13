import { Category } from "./category.model"

export interface Type {
    id: number
    name: string
    category: Category[]
}
export interface TypeRes {
    message: string, 
    types: Type[]
}
export interface createTypeRes {
    message: string,
    type: Type
}