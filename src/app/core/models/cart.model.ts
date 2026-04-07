import { Product } from "./product.model"
import { User } from "./user.model"

export interface Cart {
    id: number
    user: User
    createdAt: Date
    cartItems: CartItem[] 
}
export interface CartRes {
    message: string,
    cart: Cart
}
export interface CartItem {
    id: number
    cart: Cart
    product: Product
    quantity: number
}
export interface addProductCartRes {
    message: string,
    cartItem: CartItem
}