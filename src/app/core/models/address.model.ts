import { User } from "./user.model"

export interface Address {
    id: string
    name: string
    addressLine1: string
    addressLine2: string
    city: string
    pincode: string
    user: User
}
export interface AddressRes {
    message: string,
    address: Address
}