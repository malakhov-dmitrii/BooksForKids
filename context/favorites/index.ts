'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'
import { handleJWTError } from '@/lib/utils/errors'
import api from '@/api/apiInstance'
import { IAmAddProductToCartFx } from '@/types/cart'
import {
  IAmAddProductsFromLSToFavoriteFx,
  IAmDeleteFavoriteItemsFx,
  IAmFavoriteItem,
} from '@/types/favorites'

export const favorites = createDomain()

export const addProductToFavorites =
  favorites.createEvent<Omit<IAmAddProductToCartFx, 'count'>>()
export const loadFavoriteItems = favorites.createEvent<{ jwt: string }>()
export const setFavoritesFromLS = favorites.createEvent<IAmFavoriteItem[]>()
export const setIsAddToFavorites = favorites.createEvent<boolean>()
export const addProductsFromLSToFavorites =
  favorites.createEvent<IAmAddProductsFromLSToFavoriteFx>()
export const setShouldShowEmptyFavorites = favorites.createEvent<boolean>()
export const deleteProductFromFavorites =
  favorites.createEvent<IAmDeleteFavoriteItemsFx>()

export const getFavoriteItemsFx = createEffect(
  async ({ jwt }: { jwt: string }) => {
    try {
      const { data } = await api.get('/api/favorites/all', {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: IAmFavoriteItem[] = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'getFavoriteItemsFx',
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

export const addProductToFavoriteFx = createEffect(
  async ({ jwt, ...dataFields }: Omit<IAmAddProductToCartFx, 'count'>) => {
    console.log({ dataFields })

    try {
      const { data } = await api.post('/api/favorites/add', dataFields, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newFavoriteItem: IAmFavoriteItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToFavoriteFx',
            payload: { ...dataFields },
          })
        return newData
      }

      toast.success('Added to wishlist!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const addProductsFromLSToFavoritesFx = createEffect(
  async ({ jwt, favoriteItems }: IAmAddProductsFromLSToFavoriteFx) => {
    try {
      const { data } = await api.post(
        '/api/favorites/add-many',
        { items: favoriteItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { cartItems: IAmFavoriteItem[] } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'addProductsFromLSToFavoritesFx',
            payload: { items: favoriteItems },
          }
        )
        return newData
      }

      loadFavoriteItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const deleteFavoriteItemFx = createEffect(
  async ({ jwt, id }: IAmDeleteFavoriteItemsFx) => {
    try {
      const { data } = await api.delete(`/api/favorites/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { id: string } = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteFavoriteItemFx',
          payload: { id },
        })
        return newData
      }

      toast.success('Removed from wishlist!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
