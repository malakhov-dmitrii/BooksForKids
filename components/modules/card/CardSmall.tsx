import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useLang } from '@/hooks/useLang'
import { IAmCardProps } from '@/types/modules'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CardLabel from './CardLabel'
import CardActionBtn from '@/components/elements/cardActions/CardActionBtn'
import {
  addOverflowHiddenToBody,
  formatPrice,
  isItemInList,
} from '@/lib/utils/common'
import { setCurrentProduct } from '@/context/goods'
import { showQuickViewModal } from '@/context/modals'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import { useCartAction } from '@/hooks/useCartAction'
import { addItemToCart, addProductsToCart } from '@/lib/utils/cart'
import { useFavoritesAction } from '@/hooks/useFavoritesAction'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  $favorites,
  $favoritesFromLS,
  setIsAddToFavorites,
} from '@/context/favorites'
import styles from '@/styles/cardSmall/index.module.css'
import toast from 'react-hot-toast'

const Card = ({ item }: IAmCardProps) => {
  const { lang, translations } = useLang()
  const isMedia1160 = useMediaQuery(1160)
  const { currentCartByAuth, product, getCanAddToCart } = useCartAction()
  const isProductInCart = isItemInList(currentCartByAuth, item._id)
  const { handleAddProductToFavorites, isProductInFavorites } =
    useFavoritesAction(item)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const currentFavoriteItems = currentFavoritesByAuth.filter(
    (item) => item.productId === product._id
  )

  const handleShowQuickViewModal = (e: any) => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }

  const addToCart = (e: any) => {
    if (getCanAddToCart(item._id)) {
      addProductsToCart(item, 1)
    } else {
      toast.error('Not enough stock')
    }
  }

  const addAndGoToCartActionBtn = (e: any) => {
    setIsAddToFavorites(false)
    addProductsToCart(item, 1)
    document.location.href = '/cart'
  }

  return (
    <>
      <li
        className={styles.list_item}
      >
        <div className={styles.label_container}>
          <CardLabel
            inStock={item.inStock}
            isNew={item.isNew}
            isBestSeller={item.isBestSeller}
            isDiscount={item.isDiscount}
          />
        </div>
        <Link
          href={`/catalog/${item.category}/${item._id}`}
          className={styles.card_top_link}
        >
          <div
            className={styles.card_top_container}
          >
            <Image
              src={item.images[0]}
              alt={item.name}
              width={500}
              height={500}
            />
          </div>
          <div className={styles.card_bottom_container}>
            <h3>{item.name}</h3>
            <div>
              {item.isDiscount ? (
                <h4>
                  <span
                    className={`line_through ${styles.card_price_discount}`}
                  >
                    {formatPrice(+item.price)}
                  </span>
                  <span>{`${formatPrice(+item.price * (1 - +item.isDiscount / 100))}`}</span>
                </h4>
              ) : (
                <h4 className={styles.price}>{formatPrice(+item.price)}</h4>
              )}
            </div>
          </div>
        </Link>
        {!isMedia1160 ?  (
            isProductInCart ?
            (
              <div className={styles.card_to_cart_btn_container_added}>
                <AddToCartBtn
                  text={
                    isProductInCart
                      ? translations[lang].card.in_cart
                      : translations[lang].card.to_cart
                  }
                  className={`${styles.card_cart_btn} ${isProductInCart ? styles.card_cart_btn_added : ''}`}
                  handleAddToCart={addToCart}
                  btnDisabled={!getCanAddToCart(item._id)}
                />
              </div>
            )
            :
            (
              <div className={styles.card_to_cart_btn_container}>
                <AddToCartBtn
                  text={
                    isProductInCart
                      ? translations[lang].card.in_cart
                      : translations[lang].card.to_cart
                  }
                  className={`${styles.card_cart_btn} ${isProductInCart ? styles.card_cart_btn_added : ''}`}
                  handleAddToCart={addToCart}
                  btnDisabled={!getCanAddToCart(item._id)}
                />
              </div>
            )
          ) : (
            <div className={styles.card_to_cart_btn_container_small}>
              <AddToCartBtn
                text={
                  isProductInCart
                    ? translations[lang].card.in_cart
                    : translations[lang].card.to_cart
                }
                className={`${styles.card_cart_btn} ${isProductInCart ? styles.card_cart_btn_added : ''}`}
                handleAddToCart={addToCart}
                btnDisabled={!getCanAddToCart(item._id)}
              />
            </div>
          )}
        {!isMedia1160 && (
          <div className={styles.card_actions_container}>
            <div className={styles.card_actions}>
              <CardActionBtn
                text={translations[lang].card.add_to_cart}
                iconClass='card_action_btn_add_to_cart'
                callback={addAndGoToCartActionBtn}
              />
              <CardActionBtn
                text={translations[lang].card.quick_view}
                iconClass='card_action_btn_quick_view'
                callback={handleShowQuickViewModal}
              />
              <CardActionBtn
                text={translations[lang].card.add_to_favorites}
                iconClass={`${
                  isProductInFavorites
                    ? 'card_action_btn_add_to_favorites_checked'
                    : 'card_action_btn_add_to_favorites'
                }`}
                callback={handleAddProductToFavorites}
              />
            </div>
          </div>
        )}
      </li>
    </>
  )
}

export default Card