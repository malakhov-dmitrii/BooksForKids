import Image from 'next/image'
import Link from 'next/link'
// import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  deleteProductFromLS,
  formatPrice,
  isUserAuth,
} from '@/lib/utils/common'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/myAccount/index.module.css'
import DeleteItemBtn from '@/components/elements/deleteItemBtn/DeleteItemBtn'

import { useFavoritesAction } from '@/hooks/useFavoritesAction'
import { IAmFavoriteItem } from '@/types/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLs, addProductToCart } from '@/context/cart'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import NotifyOfDeliveryBtn from '@/components/elements/notifyOfDelivery/NotifyOfDeliveryBtn'
import { addCartItemToLS } from '@/lib/utils/cart'
import { IAmProduct } from '@/types/common'
import {
  deleteProductFromFavorites,
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/context/favorites'
import { useProductDelete } from '@/hooks/useProductDelete'

const WishlistItem = ({ item }: { item: IAmFavoriteItem }) => {
  const { lang, translations } = useLang()
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const isProductInCart = currentCartByAuth.find(
    (cartItem) => cartItem.productId === item.productId
  )
  const { handleDelete } = useProductDelete(
    item._id || item.clientId,
    deleteProductFromFavorites
  )

  const addToCart = () => {
    const cartItem = {
      ...item,
      _id: item.productId,
      images: [item.image],
    }

    if (!isUserAuth()) {
      addCartItemToLS(cartItem as unknown as IAmProduct, 1)
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    const clientId = addCartItemToLS(
      cartItem as unknown as IAmProduct,
      1,
      false
    )

    addProductToCart({
      jwt: auth.accessToken,
      productId: item.productId,
      category: item.category,
      count: 1,
      clientId,
    })
  }

  const handleDeleteFavorite = () => {
    if (!isUserAuth()) {
      deleteProductFromLS(
        item.clientId,
        'favorites',
        setFavoritesFromLS,
        setShouldShowEmptyFavorites,
        'Removed from wishlist!'
      )
      return
    }

    handleDelete()
    deleteProductFromLS(
      item.clientId,
      'favorites',
      setFavoritesFromLS,
      setShouldShowEmptyFavorites,
      '',
      false
    )
  }

  return (
    <>
      <div className={styles.wishlist_delete_btn_container}>
        <DeleteItemBtn
          btnDisabled={false}
          className={styles.wishlist_item_delete}
          callback={handleDeleteFavorite}
        />
      </div>
      <div
        className={`${styles.wishlist_item_cell} ${styles.wishlist_item_cell_product_name}`}
      >
        <div className={styles.wishlist_item_img}>
          <Image
            src={item.image}
            alt={item.image}
            width={100}
            height={100}
            className={styles.wishlist_item_image}
          />
        </div>
        <div className={styles.wishlist_item_title_container}>
          <Link
            href={`/catalog/${item.category}/${item.productId}`}
            className={styles.wishlist_item_title}
          >
            <h5>
              {item.name} | {item.authors}
            </h5>
          </Link>
        </div>
      </div>
      <div className={styles.wishlist_item_cell}>
        {item.isDiscount ? (
          <h5>
            <span
              className={`line_through ${styles.wishlist_item_discount} ${styles.wishlist_item_price}`}
            >
              {formatPrice(+item.price)}
            </span>
            <br />
            <span
              className={styles.wishlist_item_price}
            >{`${formatPrice(+item.price * (1 - +item.isDiscount / 100))}`}</span>
          </h5>
        ) : (
          <h5 className={styles.wishlist_item_price}>
            {formatPrice(+item.price)}
          </h5>
        )}
      </div>
      <div className={`capitalize dark_gray ${styles.wishlist_item_cell}`}>
        {+item.inStock === 1 ? (
          <h5>{translations[lang].wishlist.only_1}</h5>
        ) : +item.inStock ? (
          <h5>{translations[lang].wishlist.in_stock}</h5>
        ) : (
          <h5>{translations[lang].wishlist.out_of_stock}</h5>
        )}
      </div>
      <div className={styles.wishlist_item_cell}>
        {+item.inStock ? (
          !!isProductInCart ? (
            <div>
              <button className={`black_btn disabled ${styles.wishlist_btn}`}>
                {translations[lang].card.in_cart}
              </button>
              <Link
                href='/cart'
                className={`black_btn ${styles.wishlist_btn} ${styles.wishlist_btn_view_cart}`}
              >
                {translations[lang].other.view_cart}
              </Link>
            </div>
          ) : (
            <div>
              <AddToCartBtn
                text={translations[lang].wishlist.to_cart}
                className={`black_btn ${styles.wishlist_btn}`}
                handleAddToCart={addToCart}
              />
              <Link href='/cart'>
                <AddToCartBtn
                  text={translations[lang].wishlist.quick_buy}
                  className={`black_btn ${styles.wishlist_btn} ${styles.wishlist_btn_quick_buy}`}
                  handleAddToCart={addToCart}
                />
              </Link>
            </div>
          )
        ) : (
          <NotifyOfDeliveryBtn
            text={translations[lang].wishlist.notify_of_delivery}
            className={`black_btn ${styles.wishlist_btn}`}
            handleNotifyMe={() => ''}
          />
        )}
      </div>
    </>
  )
}

export default WishlistItem
