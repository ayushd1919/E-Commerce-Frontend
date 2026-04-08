export interface OTP {
    id: number
    verification: string
    code: string
    expiresAt: Date
    used: boolean
}
export interface OTPRes {
    message: string,
    otp: OTP
}