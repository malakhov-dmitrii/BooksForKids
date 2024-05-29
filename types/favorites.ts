import { IAmBaseEffectProps } from './common'

export interface IAmFavoriteItem {
  _id: string
  clientId: string
  userId: string
  productId: string
  image: string
  name: string
  authors: string
  isDiscount: string
  price: string
  vendorCode: string
  category: string
  inStock: string
}

export interface IAmAddProductsFromLSToFavoriteFx {
  jwt: string
  favoriteItems: IAmFavoriteItem[]
}

export type IAmDeleteFavoriteItemsFx = IAmBaseEffectProps
