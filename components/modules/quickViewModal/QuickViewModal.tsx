import Link from 'next/link'
import ProductSlider from '@/components/elements/productSlider/ProductSlider'
import { closeQuickViewModal } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useProductImages } from '@/hooks/useProductImages'
import { useCartAction } from '@/hooks/useCartAction'
import {
  formatPrice,
  isItemInListOfFavorites,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import ProductCounter from '../card/ProductCounter'
import SKU from '../card/SKU'
import styles from '@/styles/quickViewModal/index.module.css'
import ProductDescription from '@/components/elements/productDescription/ProductDescription'
import { useAddToCart } from '@/hooks/api/useCart'
import { useAddToFavorites, useFavorites } from '@/hooks/api/useFavorites'

const QuickViewModal = () => {
  const { lang, translations } = useLang()
  const { product, allCurrentCartItemCount, setCount, existingItem, count } =
    useCartAction()
  const images = useProductImages(product)
  // const { handleAddProductToFavorites, isProductInFavorites } =
  //   useFavoritesAction(product)

  const { data: favorites } = useFavorites()
  const isProductInFavorites = isItemInListOfFavorites(favorites, product._id)

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const addToCart = useAddToCart()
  const addToFavorites = useAddToFavorites()

  return (
    <div className={styles.modal}>
      <button className={styles.modal_close} onClick={handleCloseModal} />
      <div className={styles.modal_left}>
        <ProductSlider images={images} />
      </div>
      <div className={styles.modal_right}>
        <h2 className={styles.modal_right_title}>{product.name}</h2>
        <h4 className={styles.modal_right_price}>
          {formatPrice(+product.price)}
        </h4>
        <div className={styles.modal_right_info}>
          <h5 className={styles.modal_right_raiting}>
            Raiting 1 customer review
          </h5>
          <h5 className={styles.modal_right_description}>
            <ProductDescription />
          </h5>
          <div className={styles.modal_right_btn_container}>
            <div className={styles.modal_right_counter_container}>
              <ProductCounter
                className={`counter ${styles.modal_right_counter}`}
                count={count}
                totalCount={+product.inStock}
                setCount={setCount}
                cartItem={existingItem}
                updateCountAsync={false}
              />
              <AddToCartBtn
                text={translations[lang].other.add_to_cart}
                className={`white_btn ${styles.product_to_cart_btn}`}
                handleAddToCart={() => addToCart.mutate({ ...product, count })}
                btnDisabled={allCurrentCartItemCount === +product.inStock}
              />
            </div>
            <div className={styles.modal_right_icon_container}>
              <button
                className={`${isProductInFavorites}
                            ? ${styles.modal_right_favorite_btn_checked}
                            : ${styles.modal_right_favorite_btn}`}
                onClick={() => addToFavorites.mutate(product)}
              >
                <span className={styles.modal_right_favorite_icon} />
              </button>
              <div className={styles.line_container}>
                <span className={styles.line} />
              </div>
              <ul className={styles.socials}>
                <li>
                  <a
                    href='mailto:rusbooksforkids@gmail.com'
                    className={`${styles.social_media_icon} ${styles.letter}`}
                  />
                </li>
                <li>
                  <a
                    href='https://facebook.com'
                    className={`${styles.social_media_icon} ${styles.fB}`}
                  />
                </li>
                <li>
                  <a
                    href='https://instagram.com'
                    className={`${styles.social_media_icon} ${styles.instagram}`}
                  />
                </li>
              </ul>
            </div>
            <SKU />
            <div className={styles.modal_right_more}>
              <Link
                href={`/catalog/${product.category}/${product._id}`}
                className={styles.modal_right_more_link}
                onClick={handleCloseModal}
              >
                <h6>{translations[lang].product.more}</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
