import { useState } from 'react'
import { usePriceAction } from './usePriceAction'
<<<<<<< HEAD
import { CartItem } from '@/types/cart'
=======
import { CartItem } from './api/useCart'
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5

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
<<<<<<< HEAD
}
=======
}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
