import toast from 'react-hot-toast'
import { IAmProduct } from '@/types/common'
import { $currentProduct } from '@/context/goods/state'
import { useUnit } from 'effector-react'
import { useFavorites } from './api/useFavorites'
import { FavoriteItem } from '@/types/favorites'
// import { useGoodsByAuth } from './useGoodsByAuth'
// import {
//   addProductToFavorites,
//   setIsAddToFavorites,
// } from '@/context/favorites'
// import { isUserAuth } from '@/lib/utils/common'
// import { addFavoriteItemToLS } from '@/lib/utils/favorites'
// import { $favorites, $favoritesFromLS } from '@/context/favorites/state'

export const useFavoritesAction = (/*product: IAmProduct*/) => {
  const product = useUnit($currentProduct)
  const { data: favorites } = useFavorites()
  // const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const currentFavoritesItems =
    favorites?.filter((item: FavoriteItem) => item.productId === product._id) ?? []

  const existingFavoritesItem = currentFavoritesItems.find(
    (item: FavoriteItem) => item.productId === product._id
  )

  const getProductFromFavorites = (productId: string) =>
  favorites?.find((item: FavoriteItem) => item.productId === productId)

  return {
    product,
    currentFavoritesItems,
    existingFavoritesItem,
    getProductFromFavorites,
  }
}