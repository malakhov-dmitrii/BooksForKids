import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import { useCartAction } from '@/hooks/useCartAction'
import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenToBody, formatPrice } from '@/lib/utils/common'
import styles from '@/styles/product/index.module.css'
import ProductImagesSlider from './ProductImagesSlider'
import { openShareModal } from '@/context/modals'
import { useAddToCart } from '@/hooks/api/useCart'

const ProductTopMobile = () => {
  const { lang, translations } = useLang()
  const { product, allCurrentCartItemCount, count } = useCartAction()
  // const images = useProductImages(product)

  const addToCart = useAddToCart()

  const handleProductShare = () => {
    addOverflowHiddenToBody()
    openShareModal()
  }

  return (
    <>
      <ProductImagesSlider />
      <h3>{product.name}</h3>
      <h5 className={styles.product_top_mobile_price}>
        {formatPrice(+product.price)}
        <button
          className={styles.product_top_mobile_share}
          onClick={handleProductShare}
        />
      </h5>
      <AddToCartBtn
        text={translations[lang].other.add_to_cart}
        className={`white_btn ${styles.product_to_cart_btn_mobile}`}
        handleAddToCart={() => addToCart.mutate({ ...product, count })}
        btnDisabled={allCurrentCartItemCount === +product.inStock}
      />
    </>
  )
}

export default ProductTopMobile
