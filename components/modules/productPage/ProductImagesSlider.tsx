import Slider from 'react-slick'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductImageItem from './ProductImageItem'
import { useProductImages } from '@/hooks/useProductImages'
import { $currentProduct } from '@/context/goods'
import { baseSliderMobileSettings } from '@/constants/slider'
import styles from '@/styles/productImagesSlider/index.module.css'
import ProductImagesItem from './ProductImageItem'
import CardLabel from '../card/CardLabel'

const ProductImagesSlider = () => {
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const product = useUnit($currentProduct)
    const images = useProductImages(product)
    const isMedia1440 = useMediaQuery(1440)
    const isMedia1040 = useMediaQuery(1040)
    const isMedia520 = useMediaQuery(520)
    const isMedia420 = useMediaQuery(470)
    const slideBigImgSize = isMedia1040 ? 350 : isMedia1440 ? 540 : 480
    const slideSmallImgSize = isMedia1040 ? 54 : isMedia1440 ? 70 : 80
    const slideMobileImgSize = isMedia420 ? 280 : 432

    return (
        <>
            {!isMedia520 && (
                <>
                     <Slider 
                        asNavFor={nav2} 
                        // ref={(slider1) => setNav1(slider1)}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows={false}
                        fade={true}
                    >
                    {images.map((img: any) => (
                        <ProductImageItem
                        key={img.id}
                        image={img}
                        imgSize={slideBigImgSize}
                        />
                        ))}
                    {/* <CardLabel
                      inStock={product.inStock}
                      isNew={product.isNew}
                      isBestSeller={product.isBestSeller}
                      isDiscount={product.isDiscount}
                    /> */}
                </Slider>
                <Slider
                    asNavFor={nav1}
                    // ref={(slider2) => setNav2(slider2)}
                    slidesToShow={4}
                    swipeToSlide={true}
                    slidesToScroll={1}
                    focusOnSelect={true}
                    dots={true}
                >
                    {images.map((img: any) => (
                        <ProductImageItem
                        key={img.id}
                        image={img}
                        imgSize={slideSmallImgSize}
                        />
                        ))}
                </Slider>
              </>
            )}
            {isMedia520 && (
              <Slider
                {...baseSliderMobileSettings}
                className={styles.product_top_images_slider}
              >
                {images.map((img) => (
                  <ProductImagesItem
                    key={img.id}
                    image={img}
                    imgSize={slideMobileImgSize}
                  />
                ))}
              </Slider>
            )}
        </>
    );
};

export default ProductImagesSlider;