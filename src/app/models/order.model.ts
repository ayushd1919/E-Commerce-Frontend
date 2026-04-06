import { Product } from "./product.model"

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}
export enum PaymentMethod {
    CASH = 'CASH',
    DEBIT_CARD = 'DEBIT_CARD',
    CREDIT_CARD = 'CREDIT_CARD',
    UPI = 'UPI'
}
export interface Order {
    id: number
    totalAmount: number
    createdAt: Date
    paymentMethod: PaymentMethod
    shippingName: string
    shippingAddress: string
    status: OrderStatus
    orderItems: OrderItem[]
}
export interface OrderItem {
    id: number
    order: Order
    product: Product[]
    quantity: number
    priceAtPurchased: number
}