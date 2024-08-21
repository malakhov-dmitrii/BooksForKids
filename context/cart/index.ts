'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'
import { handleJWTError } from '@/lib/utils/errors'
import {
  IAmAddProductToCartFx,
  IAmAddProductsFromLSToCartFx,
  IAmCartItem,
  IAmDeleteCartItemsFx,
  IAmUpdateCartItemCountFx,
} from '@/types/cart'
import api from '@/api/apiInstance'

export const cart = createDomain()

/**
 * @deprecated
 */
export const loadCartItems = cart.createEvent<{ jwt: string }>()

/**
 * @deprecated
 */
export const setCartFromLS = cart.createEvent<IAmCartItem[]>()

/**
 * @deprecated
 */
export const addProductToCart = cart.createEvent<IAmAddProductToCartFx>()

/**
 * @deprecated
 */
export const addProductsFromLSToCart =
  cart.createEvent<IAmAddProductsFromLSToCartFx>()

/**
 * @deprecated
 */
export const updateCartItemCount = cart.createEvent<IAmUpdateCartItemCountFx>()
export const setTotalPrice = cart.createEvent<number>()

/**
 * @deprecated
 */
export const deleteProductFromCart = cart.createEvent<IAmDeleteCartItemsFx>()
export const setShouldShowEmpty = cart.createEvent<boolean>()

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

export const getCartItemsFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/cart/all', {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    if (data?.error) {
      const newData: IAmCartItem[] = await handleJWTError(data.error.name, {
        repeatRequestMethodName: 'getCartItemsFx',
      })
      return newData
    }
    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const addProductToCartFx = createEffect(
  async ({ jwt, ...dataFields }: IAmAddProductToCartFx) => {
    try {
      const { data } = await api.post('/api/cart/add', dataFields, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      if (data?.error) {
        const newData: { newCartItem: IAmCartItem } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductToCartFx',
            payload: { ...dataFields },
          }
        )
        return newData
      }

      // toast.success('Added to cart')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const updateCartItemCountFx = createEffect(
  async ({ jwt, id, count }: IAmUpdateCartItemCountFx) => {
    try {
      const { data } = await api.patch(
        `/api/cart/count?id=${id}`,
        { count },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { count: string; id: string } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'updateCartItemCountFx',
            payload: { id, count },
          }
        )
        return newData
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const deleteCartItemFx = createEffect(
  async ({ jwt, id }: IAmDeleteCartItemsFx) => {
    try {
      const { data } = await api.delete(`/api/cart/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { id: string } = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteCartItemFx',
          payload: { id },
        })
        return newData
      }

      toast.success('Removed from the cart')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)