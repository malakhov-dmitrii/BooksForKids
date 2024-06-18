import { IAmCartItem } from '@/types/cart'
import { IAmProduct } from '@/types/common'
import { idGenerator, isUserAuth } from './common'
import {
  addProductToCart,
  setCartFromLS,
  setShouldShowEmpty,
} from '@/context/cart'
import toast from 'react-hot-toast'

export const addItemToCart = (product: IAmProduct, count: number) => {
  console.log('product.inStock', product.inStock)
  console.log('count', count)

  if (+product.inStock < count) {
    console.log('Not enough stock')
    toast.success('Not enough stock')
    return
  }

  if (!isUserAuth()) {
    addCartItemToLS(product, count)
    return
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)

  const clientId = addCartItemToLS(product, count, false)
  addProductToCart({
    jwt: auth.accessToken,
    productId: product._id,
    category: product.category,
    count,
    clientId,
  })
}

export const addCartItemToLS = (
  product: IAmProduct,
  count: number,
  withToast = true
) => {
  let cartFromLS: IAmCartItem[] = JSON.parse(
    localStorage.getItem('cart') as string
  )
  const clientId = idGenerator()

  if (!cartFromLS) {
    cartFromLS = []
  }

  setShouldShowEmpty(false)

  const existingItem = cartFromLS.find((item) => item.productId === product._id)

  if (existingItem) {
    const updatedCount = +existingItem.count + 1

    // const updatedCount = (count > 1) ? (+existingItem.count = count) : (+existingItem.count + 1)
    // const updatedCount = +existingItem.count !== count ? count : +existingItem.count + 1
    // const updatedCount = existingItem.count !== count ? count : +existingItem.count + 1

    const updatedCart = cartFromLS.map((item) =>
      item.productId === existingItem.productId
        ? { ...existingItem, count: updatedCount }
        : item
    )

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartFromLS(updatedCart)
    toast.success('Added to cart')
    return existingItem.clientId
  }

  const cart = [
    ...cartFromLS,
    {
      clientId,
      productId: product._id,
      count,
      image: product.images[0],
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      isDiscount: product.isDiscount,
      category: product.category,
      authors: product.authors,
    },
  ]
  localStorage.setItem('cart', JSON.stringify(cart))
  setCartFromLS(cart as IAmCartItem[])
  withToast && toast.success('Added to cart')

  return clientId
}

export const addProductsToCart = (product: IAmProduct, count: number) => {
  addItemToCart(product, count)
  return
}

export const updateCartItemCountInLS = (cartItemId: string, count: number) => {
  let cart: IAmCartItem[] = JSON.parse(localStorage.getItem('cart') as string)

  if (!cart) {
    cart = []
  }

  const updatedCart = cart.map((item) =>
    item.clientId === cartItemId ? { ...item, count } : item
  )

  localStorage.setItem('cart', JSON.stringify(updatedCart))
  setCartFromLS(updatedCart as IAmCartItem[])
}

export const countWholeCartItemsAmount = (cart: IAmCartItem[]) =>
  cart.reduce((defaultCount, item) => defaultCount + +item.count, 0)
