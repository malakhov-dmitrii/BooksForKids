import { IAmCartItem } from "./cart"
import { IAmProduct } from "./common"

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

export interface IAmLoadProductsByFilterFx {
  limit: number
  offset: number
  category: string
  additionalParam?: string
  isCatalog?: boolean
}

export interface IAmProducts {
  count: number
  items: IAmProduct[]
}

// export interface IAmLoadWatchedProductsFx {
//   payload: { _id: string; category: string }[]
// }





