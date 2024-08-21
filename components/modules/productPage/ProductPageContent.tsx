'use client'
import React, { useEffect, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import { useCartAction } from '@/hooks/useCartAction'
import { formatPrice, isItemInListOfFavorites } from '@/lib/utils/common'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import ProductCounter from '../card/ProductCounter'
import SKU from '../card/SKU'
import styles from '@/styles/product/index.module.css'
// import { useFavoritesAction } from '@/hooks/useFavoritesAction'
import ProductImagesSlider from './ProductImagesSlider'
import { useUnit } from 'effector-react'
import AddInfoList from './AddInfoList'
import CardActionBtn from '@/components/elements/cardActions/CardActionBtn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductDescription from '@/components/elements/productDescription/ProductDescription'
import ProductInfoAccordion from './ProductInfoAccordion'
import ItemAdded from './ItemAdded'
import ProductTopMobile from './ProductTopMobile'
import CardLabel from '../card/CardLabel'
import SimilarItems from './SimilarItems'
import { $currentProduct } from '@/context/goods/state'
import { useViewedItems } from '@/hooks/useViewedItems'
import ViewedItems from '../viewedItems/ViewedItems'
import ShareBlock from '../shareBlock/ShareBlock'
import { useAddToCart } from '@/hooks/api/useCart'
import { useAddToFavorites, useFavorites } from '@/hooks/api/useFavorites'

const ProductPageContent = () => {
  const product = useUnit($currentProduct)

  const [activeTab, setActiveTab] = useState<
    'description' | 'additionalInfo' | 'reviews'
  >('description')

  const { lang, translations } = useLang()
  const { allCurrentCartItemCount, setCount, existingItem, count } =
    useCartAction()
  //   const images = useProductImages(product)
  // const { handleAddProductToFavorites, isProductInFavorites } =
  //   useFavoritesAction(product)
  const { data: favorites } = useFavorites()
  const isProductInFavorites = isItemInListOfFavorites(favorites, product._id)

  const isMedia520 = useMediaQuery(520)
  const isMedia700 = useMediaQuery(700)

  const { viewedItems, markAsViewed } = useViewedItems(product._id)

  useEffect(() => {
    markAsViewed({ category: product.category, _id: product._id })
  }, [product._id, product.category, markAsViewed])

  const addToCart = useAddToCart()
  const addToFavorites = useAddToFavorites()

  return (
    <>
      <div className={styles.product_item_container_content}>
        {existingItem ? <ItemAdded /> : ''}
      </div>
      {!isMedia700 && (
        <div className={styles.product_top}>
          <div className={styles.product_top_left}>
            <div className={styles.label_container}>
              <CardLabel
                inStock={product.inStock}
                isNew={product.isNew}
                isBestSeller={product.isBestSeller}
                isDiscount={product.isDiscount}
              />
            </div>
            <ProductImagesSlider />
          </div>
          <div className={styles.product_top_right}>
            <div className={styles.product_top_right_top}>
              <h2 className={styles.product_top_right_title}>{product.name}</h2>
              {!!product.price ? (
                <h4 className={styles.product_top_right_price}>
                  {formatPrice(+product.price)}
                </h4>
              ) : (
                ''
              )}
              <h5 className={styles.product_top_right_raiting}>
                Raiting 1 customer review
              </h5>
              <h5 className={styles.product_top_right_description}>
                {product.description}
              </h5>
              <div className={styles.product_top_right_counter_container}>
                <ProductCounter
                  className={`counter ${styles.product_top_right_counter}`}
                  count={count}
                  totalCount={+product.inStock}
                  setCount={setCount}
                  cartItem={existingItem}
                  updateCountAsync={false}
                />
                <AddToCartBtn
                  text={translations[lang].other.add_to_cart}
                  className={`white_btn ${styles.product_to_cart_btn}`}
                  handleAddToCart={() =>
                    addToCart.mutate({
                      ...(product || existingItem),
                      count,
                    })
                  }
                  btnDisabled={allCurrentCartItemCount === +product.inStock}
                />
              </div>
            </div>
            <div className={styles.product_top_right_icon_desktop}>
              <div className={styles.product_top_right_icon_container}>
                <div className={styles.product_add_to_favorites_container}>
                  <CardActionBtn
                    text={translations[lang].card.add_to_favorites}
                    iconClass={`${
                      isProductInFavorites
                        ? 'card_action_btn_add_to_favorites_checked'
                        : 'card_action_btn_add_to_favorites'
                    }`}
                    callback={() => addToFavorites.mutate(product)}
                  />
                </div>
                <div className={styles.line_container}>
                  <span className={styles.line} />
                </div>
                <ShareBlock />
              </div>
              <SKU />
            </div>
          </div>
        </div>
      )}
      {isMedia700 && (
        <div className={styles.product_top_mobile}>
          <ProductTopMobile />
          <div
            className={`body_small ${styles.product_top_description_container}`}
          >
            <ProductDescription />
          </div>
        </div>
      )}
      {!isMedia520 && (
        <div className={styles.product_middle}>
          <div className={styles.product_middle_headings}>
            <button
              onClick={() => setActiveTab('description')}
              className={styles.product_middle_headings_btn}
            >
              <h3
                className={
                  activeTab === 'description'
                    ? styles.product_middle_headings_active
                    : ''
                }
              >
                {translations[lang].product.description}
              </h3>
            </button>
            <button onClick={() => setActiveTab('additionalInfo')}>
              <h3
                className={
                  activeTab === 'additionalInfo'
                    ? styles.product_middle_headings_active
                    : ''
                }
              >
                {translations[lang].product.additional_info}
              </h3>
            </button>
            <button onClick={() => setActiveTab('reviews')}>
              <h3
                className={
                  activeTab === 'reviews'
                    ? styles.product_middle_headings_active
                    : ''
                }
              >
                {translations[lang].product.reviews}
              </h3>
            </button>
          </div>
          <div className={styles.product_middle_info}>
            {activeTab === 'description' ? (
              <h5>{product.description}</h5>
            ) : activeTab === 'additionalInfo' ? (
              <ul className={styles.additional_info_block}>
                <AddInfoList product={product} />
              </ul>
            ) : activeTab === 'reviews' ? (
              <h1 className={styles.product_middle_info_active}>Reviews</h1>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
      {isMedia520 && (
        <div className={`body_small ${styles.product_middle_mobile}`}>
          <ProductInfoAccordion title={translations[lang].product.description}>
            <p className={styles.product_middle_mobile_text}>
              {product.description}
            </p>
          </ProductInfoAccordion>
          <ProductInfoAccordion
            title={translations[lang].product.additional_info}
          >
            <p className={styles.product_middle_mobile_text}>
              <AddInfoList product={product} />
            </p>
          </ProductInfoAccordion>
          <ProductInfoAccordion title={translations[lang].product.reviews}>
            <p className={styles.product_middle_mobile_text}>
              <span>Reviews</span>
            </p>
          </ProductInfoAccordion>
        </div>
      )}
      {!isMedia520 && (
        <div className={styles.product_bottom}>
          {product.type && (
            <SimilarItems type={product.type} category={product.category} />
          )}
        </div>
      )}
      {isMedia520 && (
        <div className={styles.product_bottom}>
          {product.type && (
            <SimilarItems type={product.type} category={product.category} />
          )}
        </div>
      )}
      {!!viewedItems.items?.length && <ViewedItems viewedItems={viewedItems} />}
    </>
  )
}

export default ProductPageContent
