import Image from 'next/image'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  addOverflowHiddenToBody,
  deleteProductFromLS,
  formatPrice,
  isItemInList,
  isUserAuth,
} from '@/lib/utils/common'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/myAccount/index.module.css'
import DeleteItemBtn from '@/components/elements/deleteItemBtn/DeleteItemBtn'

<<<<<<< HEAD
import { FavoriteItem, IAmFavoriteItem } from '@/types/favorites'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import NotifyOfDeliveryBtn from '@/components/elements/notifyOfDelivery/NotifyOfDeliveryBtn'
// import {
//   deleteProductFromFavorites,
//   setFavoritesFromLS,
//   setShouldShowEmptyFavorites,
// } from '@/context/favorites'
import { useProductDelete } from '@/hooks/useProductDelete'
import { openNotifyMeModal } from '@/context/modals'
import { useAddToCart, useCart } from '@/hooks/api/useCart'
import { useCartAction } from '@/hooks/useCartAction'
import { useRemoveFromFavorites } from '@/hooks/api/useFavorites'
=======
import { IAmFavoriteItem } from '@/types/favorites'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import NotifyOfDeliveryBtn from '@/components/elements/notifyOfDelivery/NotifyOfDeliveryBtn'
import {
  deleteProductFromFavorites,
  setFavoritesFromLS,
  setShouldShowEmptyFavorites,
} from '@/context/favorites'
import { useProductDelete } from '@/hooks/useProductDelete'
import { openNotifyMeModal } from '@/context/modals'
import { useAddToCart, useCart } from '@/hooks/api/useCart'
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5

const WishlistItem = ({ item }: { item: FavoriteItem }) => {
  const { lang, translations } = useLang()
  const isMedia1070 = useMediaQuery(1070)
  const { data: cart } = useCart()
<<<<<<< HEAD
  // const { data: favorites } = useFavorites()
  const removeFromFavorites = useRemoveFromFavorites()
  const isProductInCart = isItemInList(cart, item._id)

  const { getCanAddToCart } = useCartAction()

  // const { handleDelete } = useProductDelete(
  //   item._id || item.clientId,
  //   deleteProductFromFavorites
  // )

  const addToCart = useAddToCart()

  // const handleDeleteFavorite = () => {
  //   if (!isUserAuth()) {
  //     deleteProductFromLS(
  //       item.clientId,
  //       'favorites',
  //       setFavoritesFromLS,
  //       setShouldShowEmptyFavorites,
  //       'Removed from wishlist!'
  //     )
  //     return
  //   }

  //   handleDelete()
  //   deleteProductFromLS(
  //     item.clientId,
  //     'favorites',
  //     setFavoritesFromLS,
  //     setShouldShowEmptyFavorites,
  //     '',
  //     false
  //   )
  // }

=======
  const isProductInCart = cart?.find(
    (cartItem) => cartItem.productId === item.productId
  )
  const { handleDelete } = useProductDelete(
    item._id || item.clientId,
    deleteProductFromFavorites
  )

  const addToCart = useAddToCart()

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

>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
  const handleOpenNotifyMeModal = () => {
    addOverflowHiddenToBody()
    openNotifyMeModal()
    // setCurrentProduct(item)
  }

  return (
    <>
      {!isMedia1070 && (
        <div className={styles.wishlist_item_big}>
          <div className={styles.wishlist_delete_btn_container}>
            <DeleteItemBtn
              btnDisabled={false}
              className={`${styles.wishlist_item_delete} ${styles.wishlist_item_delete_big}`}
<<<<<<< HEAD
              callback={() => removeFromFavorites.mutate({ id: item._id })}
=======
              callback={handleDeleteFavorite}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
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
<<<<<<< HEAD
                  {item.name} | {item.characteristics?.authors}
=======
                  {item.name} | {item.authors}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
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
                  <button
                    className={`black_btn disabled ${styles.wishlist_btn}`}
                  >
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
<<<<<<< HEAD
                    handleAddToCart={() => addToCart.mutate(item)}
=======
                    handleAddToCart={() =>
                      addToCart.mutate({ ...item, count: 1 })
                    }
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
                  />
                  <Link href='/cart'>
                    <AddToCartBtn
                      text={translations[lang].wishlist.quick_buy}
                      className={`black_btn ${styles.wishlist_btn} ${styles.wishlist_btn_quick_buy}`}
<<<<<<< HEAD
                      handleAddToCart={() => addToCart.mutate(item)}
=======
                      handleAddToCart={() =>
                        addToCart.mutate({ ...item, count: 1 })
                      }
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
                    />
                  </Link>
                </div>
              )
            ) : (
              <NotifyOfDeliveryBtn
                text={translations[lang].wishlist.notify_of_delivery}
                className={`black_btn ${styles.wishlist_btn}`}
                handleNotifyMe={handleOpenNotifyMeModal}
              />
            )}
          </div>
        </div>
      )}
      {isMedia1070 && (
        <div className={styles.wishlist_item_small}>
          <DeleteItemBtn
            btnDisabled={false}
            className={`${styles.wishlist_item_delete} ${styles.wishlist_item_delete_small}`}
<<<<<<< HEAD
            callback={() => removeFromFavorites.mutate({ id: item._id })}
=======
            callback={handleDeleteFavorite}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
          />
          <div className={styles.wishlist_item_small_first_row}>
            <div className={styles.wishlist_item_img}>
              <Image
                src={item.image}
                alt={item.image}
                width={100}
                height={100}
                className={styles.wishlist_item_image}
              />
            </div>
            <div className={styles.wishlist_item_title_container_small}>
              <Link
                href={`/catalog/${item.category}/${item.productId}`}
                className={styles.wishlist_item_title}
              >
                <h5>
<<<<<<< HEAD
                  {item.name} | {item.characteristics?.authors}
=======
                  {item.name} | {item.authors}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
                </h5>
              </Link>
              <div className={styles.wishlist_item_price_small}>
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
              <div
                className={`capitalize dark_gray ${styles.wishlist_item_in_stock_small}`}
              >
                {+item.inStock === 1 ? (
                  <h5>{translations[lang].wishlist.only_1}</h5>
                ) : +item.inStock ? (
                  <h5>{translations[lang].wishlist.in_stock}</h5>
                ) : (
                  <h5>{translations[lang].wishlist.out_of_stock}</h5>
                )}
              </div>
            </div>
          </div>

          <div className={styles.wishlist_item_btns}>
            {+item.inStock ? (
              !!isProductInCart ? (
                <div>
                  <button
                    className={`black_btn disabled ${styles.wishlist_btn}`}
                  >
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
<<<<<<< HEAD
                    handleAddToCart={() => addToCart.mutate(item)}
                    btnDisabled={!getCanAddToCart(item._id)}
=======
                    handleAddToCart={addToCart}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
                  />
                  <Link href='/cart'>
                    <AddToCartBtn
                      text={translations[lang].wishlist.quick_buy}
                      className={`black_btn ${styles.wishlist_btn} ${styles.wishlist_btn_quick_buy}`}
<<<<<<< HEAD
                      handleAddToCart={() => addToCart.mutate(item)}
                      btnDisabled={!getCanAddToCart(item._id)}
=======
                      handleAddToCart={addToCart}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
                    />
                  </Link>
                </div>
              )
            ) : (
              <NotifyOfDeliveryBtn
                text={translations[lang].wishlist.notify_of_delivery}
                className={`black_btn ${styles.wishlist_btn}`}
                handleNotifyMe={handleOpenNotifyMeModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default WishlistItem
