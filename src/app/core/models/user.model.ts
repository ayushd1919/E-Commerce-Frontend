import { Address } from "./address.model"
import { Cart } from "./cart.model"
import { Order } from "./order.model"

export enum UserRole {
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}

export interface User {
    id: number
    name: string
    email: string
    role: UserRole
    address?: Address
    profilePhoto?: string
    isLocked: boolean
    createdAt: Date
    orders?: Order
    cart?: Cart
}
export interface authRes {
    message: string
    user: User
}

export interface SessionRes {
    jti: string;
    userId: number;
    name: string;
    createdAt: Date;
    userAgent: string;
    ip: string;
}