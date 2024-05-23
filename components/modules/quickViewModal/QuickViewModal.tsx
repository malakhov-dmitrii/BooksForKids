import Link from 'next/link';
import ProductSlider from '@/components/elements/productSlider/ProductSlider';
import { closeQuickViewModal } from '@/context/modals'
import { useLang } from "@/hooks/useLang";
import { useProductImages } from '@/hooks/useProductImages';
import { useCartAction } from '@/hooks/useCartAction';
import { formatPrice, isItemInList, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn';
import ProductCounter from '../card/ProductCounter';
import SKU from '../card/SKU';
import styles from '@/styles/quickViewModal/index.module.css';
import ProductDescription from '@/components/elements/productDescription/ProductDescription';
import { addItemToCart, addProductsToCart } from '@/lib/utils/cart';
import { IAmCartItem } from '@/types/cart';
// import { useFavoritesAction } from '@/hooks/useFavoritesAction';

const QuickViewModal = ( ) => {
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
//   const {
//     handleAddProductToFavorites,
//     isProductInFavorites,
//   } = useFavoritesAction(product)

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
}

// const addToCart = () => {
//     addItemToCart(product, count || 1)
//   }

// const addToCart = () => 
//     {
//     if (existingItem) {
//         handleAddToCart(count)}
//     else {addProductsToCart(product, count || 1)}
//     }

const addToCart = () => handleAddToCart(count)

    return (

        <div className={styles.modal}>
            <button className={styles.modal_close} onClick={handleCloseModal} />
            <div className={styles.modal_left}>
                <ProductSlider images={images} />
            </div>
            <div className={styles.modal_right}>
                <h2 className={styles.modal_right_title}>{product.name}</h2>
                <h4 className={`price ${styles.modal_right_price}`}>
                {formatPrice(+product.price)}
                </h4>
                <div className={styles.modal_right_info}>
                    <h5 className={styles.modal_right_raiting}>Raiting 1 customer review</h5>
                    <h5 className={styles.modal_right_description}>
                    <ProductDescription />
                    </h5>
                    <div className={styles.modal_right_btn_container}>
                        <div className={styles.modal_right_counter_container}>
                            <ProductCounter
                                className={`counter ${styles.modal_right_counter}`}
                                count={count}
                                totalCount={+product.inStock}
                                initialCount={+(existingItem?.count || 1)}
                                setCount={setCount}
                                cartItem={existingItem as IAmCartItem}
                                updateCountAsync={false}
                                />
                            <AddToCartBtn text={translations[lang].other.add_to_cart}
                            className={styles.product_to_cart_btn}
                            handleAddToCart={addToCart}
                            btnDisabled={
                              allCurrentCartItemCount === +product.inStock
                            }
                             />
                        </div>
                        <div className={styles.modal_right_icon_container}>
                            <button 
                            // className={`${isProductInFavorites}
                            // ? ${styles.modal_right_favorite_btn_checked}
                            // : ${styles.modal_right_favorite_btn}`}
                            // onClick={handleAddProductToFavorites}
                            >
                                <span className={styles.modal_right_favorite_icon}></span>
                            </button> 
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
     );
}
 
export default QuickViewModal;