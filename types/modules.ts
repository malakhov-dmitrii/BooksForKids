import { StaticImageData } from 'next/image'
import { IAmProduct } from './common'

export interface IAmCardProps {
  item: IAmProduct
  // title?: string
  // price?: number
  // discount?: number
  // image: StaticImageData
}

export interface IAmCardLabelProps {
  isNew: boolean
  isBestSeller: boolean
  isDiscount: string
  inStock: string
}

export interface IAmOrderInfoBlock {
  isCorrectCouponCode?: boolean
  isCheckoutPage?: boolean
}

export interface IAmApplyCouponBlockProps {
  setIsCorrectCouponCode: (arg0: boolean) => void
  // className?: string
}

export interface IAmEmptyPageContentProps {
  title: string
  description: string
  btnText: string
  loading?: boolean
}

export interface IAmShopPopupLinkItemProps {
  item: {
    id: number
    text: string
    href: string
  }
}

export interface IAmBurgerLinkItemProps {
  item: {
    id: number
    text: string
    href: string
  }
}
