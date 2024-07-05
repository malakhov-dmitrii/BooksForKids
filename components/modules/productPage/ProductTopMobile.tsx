import AddToCartBtn from "@/components/elements/addToCart/AddToCartBtn";
import { $addedToCartMobileModalIsOpen, closeAddedToCartMobileModal, openAddedToCartMobileModal } from "@/context/modals";
import { useCartAction } from "@/hooks/useCartAction";
import { useLang } from "@/hooks/useLang";
import { useProductImages } from "@/hooks/useProductImages";
import { formatPrice, removeOverflowHiddenFromBody } from "@/lib/utils/common";
import styles from '@/styles/product/index.module.css'
import AddedToCartMobileModal from "./AddedToCartMobileModal";
import { useUnit } from "effector-react";

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

    const addToCartMobile = () => {
        handleAddToCart(count)
        if (!existingItem) {
            openAddedToCartMobileModal()
        }
      }

    return (
        <>
           {/* <ProductImagesSlider /> */}
          <h3>{product.name}</h3>
          <h5 className={styles.product_top_mobile_price}>
            {formatPrice(+product.price)}
            <span className={styles.product_top_mobile_share}></span>
          </h5>
          <AddToCartBtn
            text={translations[lang].other.add_to_cart}
            className={`white_btn ${styles.product_to_cart_btn_mobile}`}
            handleAddToCart={addToCartMobile}
            btnDisabled={allCurrentCartItemCount === +product.inStock}
          />
          {/* <AddedToCartMobileModal /> */}
        </>
    );
};

export default ProductTopMobile;