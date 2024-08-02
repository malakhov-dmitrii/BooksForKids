import { IAmBaseEffectProps } from "./common"

export interface IAmCartItem {
    _id: string
    clientId: string
    userId: string
    productId: string
    image: string
    name: string
    authors: string
    count: string | number
    price: string
    totalPrice: string
    inStock: string
    isDiscount: string
    category: string
  }

export interface IAmAddProductToCartFx {
  productId: string
  category: string
  count: number
  jwt: string
  clientId: string
  inStock?: string
}

export interface IAmAddProductsFromLSToCartFx {
  jwt: string
  cartItems: IAmCartItem[]
}

export interface IAmUpdateCartItemCountFx extends IAmBaseEffectProps {
  count: number
}

export interface IAmDeleteCartItemBtnProps {
  btnDisabled: boolean
  callback: (param: any) => void
  className?: string
}

export type IAmDeleteCartItemsFx = IAmBaseEffectProps

export interface IAmApplyCouponBtnProps {
  text: string
  className?: string
  btnDisabled?: boolean
  handleApplyCoupon: (param: any) => void
}

export interface IAmUpdateTotalsBtnProps {
  text: string
  className?: string
  btnDisabled?: boolean
  handleUpdateTotals: (param: any) => void
}

export interface IAmProceedToCheckoutBtnProps {
  text: string
  className?: string
  btnDisabled?: boolean
  handleProceedToCheckout: (param: any) => void
}
