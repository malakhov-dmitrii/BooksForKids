import { IAmCartItem } from "./cart"

export interface IAmLoadOneProductFx {
    productId: string
    category: string
  }

export interface IAmProductCounterProps {
  className: string
  count: number
  setCount: (arg0: number) => void
  cartItem: IAmCartItem
  updateCountAsync: boolean
  initialCount?: number
  totalCount?: number
}

export interface IAmAddToCartBtnProps {
  text: string
  className?: string
  btnDisabled?: boolean
  handleAddToCart: (param: any) => void
}





