import { useUnit } from 'effector-react'
import { useMemo, useState } from 'react'
<<<<<<< HEAD
import { $currentProduct } from '@/context/goods/state'
import { useCart } from './api/useCart'
import { CartItem } from '@/types/cart'
=======

import { $currentProduct } from '@/context/goods/state'
import { CartItem, useCart } from './api/useCart'
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5

export const useCartAction = () => {
  const product = useUnit($currentProduct)
  const { data: cart } = useCart()
  const currentCartItems =
    cart?.filter((item: CartItem) => item.productId === product._id) ?? []

  const existingItem = currentCartItems.find(
    (item: CartItem) => item.productId === product._id
  )

<<<<<<< HEAD
  const [count, setCount] = useState(1)
=======
  const [count, setCount] = useState(+(existingItem?.count ?? 1))
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5

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
<<<<<<< HEAD
    setCount: (value: number) => {
      console.log(value)
      setCount(value)
    },
=======
    setCount,
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
    count,
    existingItem,
    allCurrentCartItemCount,
    getProductFromCart,
    getCanAddToCart,
  }
}
