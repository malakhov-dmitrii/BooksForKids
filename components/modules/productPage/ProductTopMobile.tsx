import AddToCartBtn from "@/components/elements/addToCart/AddToCartBtn";
import { useCartAction } from "@/hooks/useCartAction";
import { useLang } from "@/hooks/useLang";
import { useProductImages } from "@/hooks/useProductImages";
import { addOverflowHiddenToBody, formatPrice } from "@/lib/utils/common";
import styles from '@/styles/product/index.module.css'
import { useUnit } from "effector-react";
import ProductImagesSlider from "./ProductImagesSlider";
import { openShareModal } from "@/context/modals";

const ProductTopMobile = () => {
    const { lang, translations } = useLang()
    const {
      product,
      handleAddToCart,
      allCurrentCartItemCount,
      setCount,
      existingItem,
      count,
    } = useCartAction()
    const images = useProductImages(product)

    const addToCart = () => handleAddToCart(count)

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
            <button className={styles.product_top_mobile_share}
            onClick={handleProductShare}></button>
          </h5>
          <AddToCartBtn
            text={translations[lang].other.add_to_cart}
            className={`white_btn ${styles.product_to_cart_btn_mobile}`}
            handleAddToCart={addToCart}
            btnDisabled={allCurrentCartItemCount === +product.inStock}
          />
        </>
    );
};

export default ProductTopMobile;