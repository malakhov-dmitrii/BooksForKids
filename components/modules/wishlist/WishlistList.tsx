import styles from '@/styles/myAccount/index.module.css'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $favorites, $favoritesFromLS } from '@/context/favorites'
import WishlistItem from './WishlistItem'


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