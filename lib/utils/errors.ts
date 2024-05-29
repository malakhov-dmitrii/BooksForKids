import {
  addProductToCartFx,
  deleteCartItemFx,
  getCartItemsFx,
} from '@/api/cart'
import { loginCheckFx } from '@/api/auth'
import { JWTError } from '@/constants/jwt'
import { refreshTokenFx } from '@/context/auth'
import { addProductsFromLSToCartFx } from '@/context/cart'
import { IAmAddProductToCartFx, IAmAddProductsFromLSToCartFx, IAmDeleteCartItemsFx } from '@/types/cart'

import {
  addProductToFavoriteFx,
  addProductsFromLSToFavoritesFx,
  deleteFavoriteItemFx,
  getFavoriteItemsFx,
} from '@/context/favorites'

import {
  IAmAddProductsFromLSToFavoriteFx,
  IAmDeleteFavoriteItemsFx,
} from '@/types/favorites'

export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
  if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
    console.log('gfjhfdhj')
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })

    if (repeatRequestAfterRefreshData) {
      const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

      switch (repeatRequestMethodName) {
        case 'getCartItemsFx':
          return getCartItemsFx({
            jwt: newTokens.accessToken,
          })
        case 'addProductToCartFx':
          return addProductToCartFx({
            ...(payload as IAmAddProductToCartFx),
            jwt: newTokens.accessToken,
          })
        case 'addProductsFromLSToCartFx':
          return addProductsFromLSToCartFx({
            ...(payload as IAmAddProductsFromLSToCartFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteCartItemFx':
          return deleteCartItemFx({
            ...(payload as IAmDeleteCartItemsFx),
            jwt: newTokens.accessToken,
          })
        case 'addProductToFavoriteFx':
          return addProductToFavoriteFx({
            ...(payload as Omit<IAmAddProductToCartFx, 'count'>),
            jwt: newTokens.accessToken,
          })
        case 'getFavoriteItemsFx':
          return getFavoriteItemsFx({
            jwt: newTokens.accessToken,
          })
        case 'addProductsFromLSToFavoritesFx':
          return addProductsFromLSToFavoritesFx({
            ...(payload as IAmAddProductsFromLSToFavoriteFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteFavoriteItemFx':
          return deleteFavoriteItemFx({
            ...(payload as IAmDeleteFavoriteItemsFx),
            jwt: newTokens.accessToken,
          })
        case 'loginCheckFx':
          await loginCheckFx({
            jwt: newTokens.accessToken,
          })
          break
      }
    }
  }
}
