import styles from '@/styles/myAccount/index.module.css'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import WishlistItem from './WishlistItem'
import { $favorites, $favoritesFromLS } from '@/context/favorites/state'


const WishlistList = () => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  return (
    <>
        {currentFavoritesByAuth.map((item) => (
          <li
            key={item._id || item.clientId}
            className={styles.wishlist_item}
          >
            <WishlistItem item={item} />
          </li>
        ))}
    </>
  )
}

export default WishlistList