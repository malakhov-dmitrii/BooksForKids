import toast from 'react-hot-toast'
import { IAmProduct } from '@/types/common'
import { useGoodsByAuth } from './useGoodsByAuth'
import { addProductToFavorites, setIsAddToFavorites } from '@/context/favorites'
import { isUserAuth } from '@/lib/utils/common'
import { addFavoriteItemToLS } from '@/lib/utils/favorites'
import { $favorites, $favoritesFromLS } from '@/context/favorites/state'

export const useFavoritesAction = (product: IAmProduct) => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const existingItem = currentFavoritesByAuth.find(
    (item) => item.productId === product._id
  )

  const handleAddProductToFavorites = (e: any) => {
    e.preventDefault()
    if (existingItem) {
      toast.success('Added to wishlist')
      return
    }

    if (!isUserAuth()) {
      addFavoriteItemToLS(product)
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const clientId = addFavoriteItemToLS(product, false)

    console.log(product)

    addProductToFavorites({
      jwt: auth.accessToken,
      productId: product._id,
      category: product.category,
      clientId,
      inStock: product.inStock,
    })
    return

    setIsAddToFavorites(true)
  }

  return {
    handleAddProductToFavorites,
    isProductInFavorites: existingItem,
  }
}
