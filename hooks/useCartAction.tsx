import { useUnit } from 'effector-react'
import { $currentProduct } from '@/context/goods'
import { isUserAuth } from '@/lib/utils/common'
import { addCartItemToLS, addProductsToCart } from '@/lib/utils/cart'
import { useMemo, useState } from 'react'
import { $cart, $cartFromLs, updateCartItemCount } from '@/context/cart'
import { useGoodsByAuth } from './useGoodsByAuth'
import { isItemInList } from '@/lib/utils/common'

export const useCartAction = () => {
  const product = useUnit($currentProduct)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )

  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id
  )

  const [count, setCount] = useState(+(existingItem?.count as string) || 1)

  const getProductFromCart = (productId: string) => {
    return currentCartByAuth.find((item) => item.productId === productId)
  }

  const getCanAddToCart = (productId: string) => {
    const product = getProductFromCart(productId)

    console.log('product', { product, currentCartByAuth, productId })

    if (!product) return true

    return product.inStock > product.count
  }

  const isProductInCart = isItemInList(currentCartByAuth, product._id)
  const handleAddToCart = (countFromCounter?: number) => {
    if (existingItem) {
      if (!isUserAuth()) {
        addCartItemToLS(product, countFromCounter || 1)
        return
      }

      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const count = !!countFromCounter
        ? +existingItem.count !== countFromCounter
          ? countFromCounter
          : +existingItem.count + 1
        : +existingItem.count + 1

      updateCartItemCount({
        jwt: auth.accessToken,
        id: existingItem._id as string,
        count: +existingItem.count + 1,
      })

      addCartItemToLS(product, countFromCounter || 1)
      return
      // addCartItemToLS(product, count)
      // return
    }
    addProductsToCart(product, countFromCounter || 1)
  }

  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((a, { count }) => a + +count, 0),
    [currentCartItems]
  )

  return {
    product,
    currentCartItems,
    handleAddToCart,
    setCount,
    count,
    existingItem,
    currentCartByAuth,
    allCurrentCartItemCount,
    getProductFromCart,
    getCanAddToCart,
  }
}
