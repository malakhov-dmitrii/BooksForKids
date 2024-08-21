// import toast from 'react-hot-toast'
// import { IAmProduct } from '@/types/common'
// import { idGenerator } from './common'
// import {
//   setFavoritesFromLS,
//   setShouldShowEmptyFavorites,
// } from '@/context/favorites'
// import { IAmFavoriteItem } from '@/types/favorites'

// export const addFavoriteItemToLS = (
//   product: IAmProduct,
//   withToast = true
// ) => {
//   let favoritesFromLS: IAmFavoriteItem[] = JSON.parse(
//     localStorage.getItem('favorites') as string
//   )

//   const clientId = idGenerator()

//   if (!favoritesFromLS) {
//     favoritesFromLS = []
//   }

//   setShouldShowEmptyFavorites(false)

//   const existingItem = favoritesFromLS.find(
//     (item) => item.productId === product._id
//   )

//   if (existingItem) {
//     // toast.success('Added to wishlist')
//     return existingItem.clientId
//   }

//   const favorites = [
//     ...favoritesFromLS,
//     {
//       clientId,
//       productId: product._id,
//       image: product.images[0],
//       name: product.name,
//       authors: product.authors,
//       price: product.price,
//       inStock: product.inStock,
//       isDiscount: product.isDiscount,
//       category: product.category,
//     },
//   ]

//   localStorage.setItem('favorites', JSON.stringify(favorites))
//   setFavoritesFromLS(favorites as IAmFavoriteItem[])
//   withToast && toast.success('Added to favorites')

//   return clientId
// }
