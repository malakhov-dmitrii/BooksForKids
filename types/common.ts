import { StoreWritable } from 'effector'

export interface IAmProduct {
  _id: string
  type: string
  category: string
  collection: string
  price: number
  name: string
  authors: string
  description: string
  characteristics: { [index: string]: string }
  images: string[]
  vendorCode: string
  inStock: string
  isBestSeller: boolean
  isNew: boolean
  isDiscount: string
  popularity: number
  errorMessage?: string
}

export interface IAmBaseEffectProps {
  jwt: string
  id: string
}

export type UseGoodsByAuth<T> = StoreWritable<T>