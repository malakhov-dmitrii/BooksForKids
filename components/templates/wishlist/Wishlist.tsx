'use client'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/myAccount/index.module.css'
import EmptyPageContent from '@/components/modules/emptyPageContent/EmptyPageContent'
import { useUnit } from 'effector-react'
// import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import WishlistList from '@/components/modules/wishlist/WishlistList'
// import {
//   // $favorites,
//   // $favoritesFromLS,
//   $shouldShowEmptyFavorites,
// } from '@/context/favorites/state'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useFavorites } from '@/hooks/api/useFavorites'

const Wishlist = () => {
  // const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const { lang, translations } = useLang()
  const isMedia1070 = useMediaQuery(1070)
  const { data: favorites } = useFavorites()
  // const shouldShowEmptyFavorites = useUnit($shouldShowEmptyFavorites)

  return (
    <main>
      {(!!favorites?.length && !isMedia1070) ?
       ( <section className={styles.wishlist_section}>
          <div className={`container ${styles.wishlist_container}`}>
            <h1 className='capitalize'>
              {translations[lang].wishlist.wishlist}
            </h1>
            <div className={styles.wishlist_content}>
              <div></div>
              <div>
                <h5 className={`uppercase ${styles.wishlist_content_h}`}>
                  {translations[lang].wishlist.product_name}
                </h5>
              </div>
              <div>
                <h5 className='uppercase'>
                  {translations[lang].wishlist.price}
                </h5>
              </div>
              <div>
                <h5 className='uppercase'>
                  {translations[lang].wishlist.stock_status}
                </h5>
              </div>
              <div>
                <h5 className='uppercase'>
                  {translations[lang].wishlist.actions}
                </h5>
              </div>
            </div>
            <div className={styles.wishlist_content_items}>
              <ul className={styles.wishlist_list_items}>
                <WishlistList />
              </ul>
            </div>
          </div>
        </section>) : 
        (favorites?.length && isMedia1070) ? 
        ( <div className={`container ${styles.wishlist_container}`}>
          <h1 className='capitalize'>
            {translations[lang].wishlist.wishlist}
          </h1>
            <ul className={styles.wishlist_list_items}>
              <WishlistList />
            </ul>
          </div>
        ) : (<section>
            <div className='container'>
              <EmptyPageContent
                title={translations[lang].other.favorite_empty}
                description={translations[lang].other.favorite_empty_advice}
                btnText={translations[lang].other.shop_now}
              />
            </div>
          </section>)
      }
    </main>
  )
}

export default Wishlist