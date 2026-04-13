import { Order } from "./order.model"
import { User } from "./user.model"

export interface customersRes {
    message: string
    customers: User[]
}
export interface customerRes {
    message: string
    customer: User
}
export interface lockRes {
    message: string
}
export interface adminOrdersRes {
    message: string
    orders: Order[]
}
export interface adminOrderRes {
    message: string
    order: Order
}
export interface AdminStats {
  totalCustomers: number
  lockedCustomers: number
  totalOrders: number
  totalProducts: number
  totalRevenue: number
}