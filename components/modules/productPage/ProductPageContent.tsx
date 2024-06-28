import React from 'react';
import Link from 'next/link';
import { useLang } from "@/hooks/useLang";
import { useProductImages } from '@/hooks/useProductImages';
import { useCartAction } from '@/hooks/useCartAction';
import { addOverflowHiddenToBody, formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import AddToCartBtn from '@/components/elements/addToCart/AddToCartBtn';
import ProductCounter from '../card/ProductCounter';
import SKU from '../card/SKU';
import styles from '@/styles/product/index.module.css';
import { IAmCartItem } from '@/types/cart';
import { useFavoritesAction } from '@/hooks/useFavoritesAction';
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth';
import { $favorites, $favoritesFromLS } from '@/context/favorites';
import { IAmFavoriteItem } from '@/types/favorites';
import ProductImagesSlider from './ProductImagesSlider';
import { useUnit } from 'effector-react';
import { $currentProduct } from '@/context/goods';
import AddInfoList from './AddInfoList';
import CardActionBtn from '@/components/elements/cardActions/CardActionBtn';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ProductDescription from '@/components/elements/productDescription/ProductDescription';
import ProductInfoAccordion from './ProductInfoAccordion';

const ProductPageContent = () => {
  const product = useUnit($currentProduct)
  const [openDescription, setOpenDescription] = React.useState(true);
  const [openAddIndo, setOpenAddIndo] = React.useState(false);
  const [openReviews, setOpenReviews] = React.useState(true);
//   const [closeDescription, setCloseDescription] = React.useState(false);
//   const [closeAddIndo, setCloseAddIndo] = React.useState(true);
//   const [closeReviews, setCloseReviews] = React.useState(true);

  const handleClickDescription = () => {
    setOpenDescription(!openDescription);
    // setCloseAddIndo(closeAddIndo);
    // setCloseReviews(closeReviews);
};

const handleClickAddInfo = () => {
    // setCloseDescription(closeDescription);
    setOpenAddIndo(!openAddIndo);
    // setCloseReviews(closeReviews);
};

const handleClickReviews = () => {
    // setCloseDescription(closeDescription);
    // setCloseAddIndo(closeAddIndo);
    setOpenReviews(!openReviews);
};

  const { lang, translations } = useLang()
  const {
    handleAddToCart,
    allCurrentCartItemCount,
    setCount,
    currentCartItems,
    existingItem,
    count,
  } = useCartAction()
//   const images = useProductImages(product)
  const {
    handleAddProductToFavorites,
    isProductInFavorites,
  } = useFavoritesAction(product)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const currentFavoriteItems = currentFavoritesByAuth.filter(
    (product) => product.productId === product._id)

    const isMedia520 = useMediaQuery(520)

  const additionalInfoHeadings = [
    {
        id: 1,
        text: translations[lang].product.sku,
    },
    {
        id: 2,
        text: translations[lang].product.type,
    },
    {
        id: 3,
        text: translations[lang].product.year,
    },
    {
        id: 4,
        text: translations[lang].product.authors,
    },
    {
        id: 5,
        text: translations[lang].product.publishing,
    },
    {
        id: 6,
        text: translations[lang].product.age,
    },
    {
        id: 7,
        text: translations[lang].product.size,
    },
    {
        id: 8,
        text: translations[lang].product.number_of_pages,
    },
    {
        id: 9,
        text: translations[lang].product.weight,
    },
    {
        id: 10,
        text: translations[lang].product.cover,
    }
  ];

  const additionalInfoContent = [
    {
        id: 1,
        text: product.vendorCode,
    },
    {
        id: 2,
        text: product.type,
    },
    {
        id: 3,
        text: "product.characteristics.year",
    },
    {
        id: 4,
        text: product.authors,
    },
    {
        id: 5,
        text: "product.characteristics.publishing",
    },
    {
        id: 6,
        text: "product.characteristics.age",
    },
    {
        id: 7,
        text: "product.characteristics.size",
    },
    {
        id: 8,
        text: "product.characteristics.number_of_pages",
    },
    {
        id: 9,
        text: "product.characteristics.weight",
    },
    {
        id: 10,
        text: "product.characteristics.cover",
    },
    {
        id: 11,
        text: "product.characteristics.features",
    },
  ]

    // const { watchedProducts } = useWatchedProducts(product._id)

    // useEffect(() => {
    //   const watchedProducts = getWatchedProductFromLS()
  
    //   const isInWatched = watchedProducts.find((item) => item._id === product._id)
  
    //   if (isInWatched) {
    //     return
    //   }
  
    //   localStorage.setItem(
    //     'watched',
    //     JSON.stringify([
    //       ...watchedProducts,
    //       { category: product.category, _id: product._id },
    //     ])
    //   )
    // }, [product._id, product.category])
  
    const handleProductShare = () => {
      addOverflowHiddenToBody()
    //   openShareModal()
    }

const addToCart = () => handleAddToCart(count)

    return (
        <>
        {!isMedia520 && (
        <div className={styles.product_top}>
            <div className={styles.product_top_left}>
                {/* <ProductImagesSlider /> */}
            </div>
            <div className={styles.product_top_right}>
                <div className={styles.product_top_right_top}>
                    <h2 className={styles.product_top_right_title}>{product.name}</h2>
                    <h4 className={styles.product_top_right_price}>
                    {formatPrice(+product.price)}
                    </h4>
                        <h5 className={styles.product_top_right_raiting}>Raiting 1 customer review</h5>
                        <h5 className={styles.product_top_right_description}>
                            {product.description}
                        </h5>
                        <div className={styles.product_top_right_counter_container}>
                            <ProductCounter
                                className={`counter ${styles.product_top_right_counter}`}
                                count={count}
                                totalCount={+product.inStock}
                                initialCount={+(existingItem?.count || 1)}
                                setCount={setCount}
                                cartItem={existingItem as IAmCartItem}
                                updateCountAsync={false}
                                />
                            <AddToCartBtn text={translations[lang].other.add_to_cart}
                            className={`white_btn ${styles.product_to_cart_btn}`}
                            handleAddToCart={addToCart}
                            btnDisabled={
                              allCurrentCartItemCount === +product.inStock
                            }
                             />
                        </div>
                </div>
                <div className={styles.product_top_right_icon_desktop}>
                        <div className={styles.product_top_right_icon_container}>
                            {/* <button 
                            className={`${isProductInFavorites}
                            ? ${styles.product_top_right_favorite_btn_checked}
                            : ${styles.product_top_right_favorite_btn}`}
                            onClick={handleAddProductToFavorites}
                            >
                                <span className={styles.product_top_right_favorite_icon}></span>
                            </button> */}
                            <div className={styles.product_add_to_favorites_container}>
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
                            <div className={styles.line_container}><span className={styles.line}></span></div>
                            <ul className={styles.socials}>
                                <li>
                                    <a href='mailto:rusbooksforkids@gmail.com' className={`${styles.social_media_icon} ${styles.letter}`}/>
                                </li>
                                <li>
                                    <a href='https://facebook.com' className={`${styles.social_media_icon} ${styles.fB}`}/>
                                </li>
                                <li>
                                    <a href='https://instagram.com' className={`${styles.social_media_icon} ${styles.instagram}`}/>
                                </li>
                            </ul>
                        </div>
                        <SKU />
                </div>
            </div>
        </div>
        )}
        {isMedia520 && (
            <div className={styles.product_top_mobile}>
                {/* <ProductImagesSlider /> */}
                <h3>{product.name}</h3>
                <h5 className={styles.product_top_mobile_price}>
                    {formatPrice(+product.price)}
                    <span className={styles.product_top_mobile_share}></span>
                </h5>
                <AddToCartBtn 
                    text={translations[lang].other.add_to_cart}
                    className={`white_btn ${styles.product_to_cart_btn_mobile}`}
                    handleAddToCart={addToCart}
                    btnDisabled={
                        allCurrentCartItemCount === +product.inStock
                    }
                />
                <div className={`body_small ${styles.product_top_description_container}`}>
                    <ProductDescription />
                </div>
            </div>
        )}
        {!isMedia520 && 
        (<div className={styles.product_middle}>
            <ul className={styles.product_middle_headings}>
                <button onClick={handleClickDescription}><li>{translations[lang].product.description}</li></button>
                <button onClick={handleClickAddInfo }><li>{translations[lang].product.additional_info}</li></button>
                <button onClick={handleClickReviews}><li>{translations[lang].product.reviews}</li></button>
            </ul>
            <div className={styles.product_middle_info}>
                {openDescription ? 
                <span>{product.description}</span>
                : openAddIndo ?
                <ul>
                    {/* <AddInfoList product={product} /> */}
                    <h1>Характеристики</h1>
                </ul>
                : openReviews ?
                <h1>Reviews</h1>
                : ''
                }
            </div>
        </div>
        )}
        {isMedia520 && 
        (
        <div className={styles.product_middle_mobile}> 
            <ProductInfoAccordion
               title={translations[lang].product.description}>
                <p className={styles.product_middle_mobile_text}>
                    {product.description}
                </p>
            </ProductInfoAccordion>
            <ProductInfoAccordion
               title={translations[lang].product.additional_info}>
                <p className={styles.product_middle_mobile_text}>
                    {/* <AddInfoList product={product} /> */}
                    <h1>Характеристики</h1>
                </p>
            </ProductInfoAccordion>
            <ProductInfoAccordion
               title={translations[lang].product.reviews}>
                <p className={styles.product_middle_mobile_text}>
                    <span>Reviews</span>
                </p>
            </ProductInfoAccordion>
        </div>
        )} 
        <div>Bottom</div>
        </>
     );
}
 
export default ProductPageContent;