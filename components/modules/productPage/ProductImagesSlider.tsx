import Slider from 'react-slick'
import { useUnit } from 'effector-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductImageItem from './ProductImageItem'
import { useProductImages } from '@/hooks/useProductImages'
import { $currentProduct } from '@/context/goods'
import { baseSliderSettings } from '@/constants/slider'
import styles from '@/styles/productImagesSlider/index.module.css'
import ProductImagesItem from './ProductImageItem'

const ProductImagesSlider = () => {
    const product = useUnit($currentProduct)
    const images = useProductImages(product)
    const isMedia1440 = useMediaQuery(1440)
    const isMedia1040 = useMediaQuery(1040)
    const isMedia520 = useMediaQuery(520)
    const isMedia420 = useMediaQuery(470)
    const imgSize = isMedia1040 ? 230 : isMedia1440 ? 540 : 480
    const slideImgSize = isMedia420 ? 280 : 432

    return (
        <>
            {!isMedia520 && (
                <div className={styles.product_slider_container}>
                <ul className={styles.product_slider_for}>
                    {images.map((img) => (
                        <ProductImagesItem key={img.id} image={img} imgSize={imgSize} />
                    ))}
                </ul>
                
                
                </div>
            )}
        </>
    );
};

export default ProductImagesSlider;