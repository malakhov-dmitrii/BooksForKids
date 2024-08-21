import styles from '@/styles/myAccount/index.module.css'
import {} from '@/context/favorites'
// import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import WishlistItem from './WishlistItem'
// import { $favorites, $favoritesFromLS } from '@/context/favorites/state'
import { useEffect } from 'react'
import { loadFavoriteItems } from '@/context/favorites'
import { useFavorites } from '@/hooks/api/useFavorites'

const WishlistList = () => {
  // const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const { data: favorites } = useFavorites()
  console.log(favorites)

  // useEffect(() => {
  //   const auth = JSON.parse(localStorage.getItem('auth') as string)
  //   loadFavoriteItems({ jwt: auth.accessToken })
  // }, [])

  return (
    <>
      {favorites?.map((item) => (
        <li key={item._id || item.clientId} className={styles.wishlist_item}>
          <WishlistItem item={item} />
        </li>
      ))}
    </>
  )
}

export default WishlistList