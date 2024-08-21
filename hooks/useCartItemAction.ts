import { useState } from 'react'
import { usePriceAction } from './usePriceAction'
import { CartItem } from '@/types/cart'

export const useCartItemAction = (cartItem: CartItem) => {
  const [count, setCount] = useState(+cartItem.count)
  const { price, increasePrice, decreasePrice } = usePriceAction(
    +cartItem.count,
    +cartItem.price
  )

  return {
    price,
    count,
    setCount,
    increasePrice,
    decreasePrice,
  }
}
