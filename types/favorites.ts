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

export interface FavoriteItem {
  _id: string
  characteristics?: {
    authors: string[]
  }
  productId: string
  image: string
  name: string
  price: number
  inStock: string
  isDiscount: string
  category: string
  clientId?: string
}
