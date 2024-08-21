'use client'
import { IAmCartItem } from '@/types/cart'
import {
  cart,
  getCartItemsFx,
  addProductsFromLSToCartFx,
  addProductToCartFx,
  updateCartItemCountFx,
  deleteCartItemFx,
  setCartFromLS,
  setTotalPrice,
  setShouldShowEmpty,
} from '.'

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