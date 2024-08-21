import { useUnit } from 'effector-react'
import { useMemo, useState } from 'react'

import { $currentProduct } from '@/context/goods/state'
import { useCart } from './api/useCart'
import { CartItem } from '@/types/cart'

export const useCartAction = () => {
  const product = useUnit($currentProduct)
  const { data: cart } = useCart()
  const currentCartItems =
    cart?.filter((item: CartItem) => item.productId === product._id) ?? []

  const existingItem = currentCartItems.find(
    (item: CartItem) => item.productId === product._id
  )

  const [count, setCount] = useState(+(existingItem?.count ?? 1))

  const getProductFromCart = (productId: string) =>
    cart?.find((item: CartItem) => item.productId === productId)

  const getCanAddToCart = (productId: string) => {
    const product = getProductFromCart(productId)
    if (!product) return true

    return +product.inStock > product.count
  }

  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((a, { count }) => a + +count, 0),
    [currentCartItems]
  )

  return {
    product,
    currentCartItems,
    setCount: (value: number) => {
      console.log(value)
      setCount(value)
    },
    count,
    existingItem,
    allCurrentCartItemCount,
    getProductFromCart,
    getCanAddToCart,
  }
}
