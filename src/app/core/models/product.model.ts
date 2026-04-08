import { CartItem } from "./cart.model"
import { OrderItem } from "./order.model"
import { SubCategory } from "./subCategory.model"

export interface Product {
    id: number
    name: string
    description: string
    price: number
    stock: number
    displayPhoto: ProductImage[]
    deleted: boolean
    subCategory: SubCategory
    orderItems: OrderItem[]
    cartItems: CartItem[]
    createdAt: Date
}
export interface ProductImage {
    id: number
    isPrimary: boolean
    path: string
    product: Product
}
export interface Pagination {
    total: number,
    page: number,
    limit: number,
    totalPages: number
}
export interface productRes {
    message: string,
    product: Product,
    pagination: Pagination
}