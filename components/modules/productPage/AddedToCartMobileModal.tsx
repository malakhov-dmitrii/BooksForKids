import Link from 'next/link'
import { $addedToCartMobileModalIsOpen, closeAddedToCartMobileModal } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { useProductImages } from '@/hooks/useProductImages'
import { useCartAction } from '@/hooks/useCartAction'
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn'
import { IAmCartItem } from '@/types/cart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/product/index.module.css'
import ProductTopMobile from './ProductTopMobile'
import ItemAdded from './ItemAdded'
import ShopPopup from '../header/ShopPopup'
import Burger from '../header/Burger'
import { useUnit } from 'effector-react'

const AddedToCartMobileModal = () => {
    const { lang, translations } = useLang()
    const isMedia520 = useMediaQuery(520)
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

    const addedProductModalIsOpen = useUnit($addedToCartMobileModalIsOpen)

    const handleCloseModal = () => {
        removeOverflowHiddenFromBody()
        closeAddedToCartMobileModal()
        document.location.href = '/'
    }

    return (
        <>
        {isMedia520 && (
            <div className={`${styles.modal_added_product} ${$addedToCartMobileModalIsOpen ? styles.modal_added_product_open : styles.modal_added_product_close}`}>
                <div className={styles.modal_header_added_product}>
                    <button 
                        className={styles.close_modal_added_product_btn}
                        onClick={handleCloseModal}
                    />
                <Link className="header_logo" href='/'>
                    <span className="header_logo_first_letter">B</span><span>ooks<span className="header_logo_first_letter">4</span>Kids</span>
                </Link>
                <div>
                    {/* <ShopPopup /> */}
                    <Burger />
                </div>
                </div>
                <ProductTopMobile />
                {/* <ItemAdded /> */}
            </div>
        )}
        </>
    );
};

export default AddedToCartMobileModal;