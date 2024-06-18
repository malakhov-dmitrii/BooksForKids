import { createDomain, createEffect, sample } from 'effector'
import {
  IAmAddProductToCartFx,
  IAmAddProductsFromLSToCartFx,
  IAmCartItem,
  IAmDeleteCartItemsFx,
  IAmUpdateCartItemCountFx,
} from '@/types/cart'
import toast from 'react-hot-toast'
import api from '../api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'
import {
  addProductToCartFx,
  deleteCartItemFx,
  getCartItemsFx,
  updateCartItemCountFx,
} from '@/api/cart'

export const addProductsFromLSToCartFx = createEffect(
  async ({ jwt, cartItems }: IAmAddProductsFromLSToCartFx) => {
    try {
      const { data } = await api.post(
        '/api/cart/add-many',
        { items: cartItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { cartItems: IAmCartItem[] } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductsFromLSToCartFx',
            payload: { items: cartItems },
          }
        )
        return newData
      }

      loadCartItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<IAmCartItem[]>()
export const addProductToCart = cart.createEvent<IAmAddProductToCartFx>()
export const addProductsFromLSToCart =
  cart.createEvent<IAmAddProductsFromLSToCartFx>()
export const updateCartItemCount = cart.createEvent<IAmUpdateCartItemCountFx>()
export const setTotalPrice = cart.createEvent<number>()
export const deleteProductFromCart = cart.createEvent<IAmDeleteCartItemsFx>()
export const setShouldShowEmpty = cart.createEvent<boolean>()

export const $cart = cart
  .createStore<IAmCartItem[]>([])
  .on(getCartItemsFx.done, (_, { result }) => result)
  .on(addProductsFromLSToCartFx.done, (_, { result }) => {
    return result.items
  })
  .on(addProductToCartFx.done, (cart, { result }) => {
    return [
      ...new Map(
        [...cart, result.newCartItem].map((item) => [item.clientId, item])
      ).values(),
    ]
  })
  .on(updateCartItemCountFx.done, (cart, { result }) =>
    cart.map((item) =>
      item._id === result.id ? { ...item, count: result.count } : item
    )
  )
  .on(deleteCartItemFx.done, (cart, { result }) =>
    cart.filter((item) => item._id !== result.id)
  )

export const $cartFromLs = cart
  .createStore<IAmCartItem[]>([])
  .on(setCartFromLS, (_, cart) => cart)

export const $totalPrice = cart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)

export const $shouldShowEmpty = cart
  .createStore(false)
  .on(setShouldShowEmpty, (_, value) => value)

sample({
  clock: loadCartItems,
  source: $cart,
  fn: (_, data) => data,
  target: getCartItemsFx,
})

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductToCartFx,
})

sample({
  clock: addProductsFromLSToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductsFromLSToCartFx,
})

sample({
  clock: updateCartItemCount,
  source: $cart,
  fn: (_, data) => data,
  target: updateCartItemCountFx,
})

sample({
  clock: deleteProductFromCart,
  source: $cart,
  fn: (_, data) => data,
  target: deleteCartItemFx,
})
