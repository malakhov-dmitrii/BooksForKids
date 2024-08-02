import Slider from 'react-slick'
import React, { useState, useEffect, useRef } from "react";
import { useUnit } from 'effector-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductImageItem from './ProductImageItem'
import { useProductImages } from '@/hooks/useProductImages'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import '@/app/globalStyles/slickSliderProductPage.css'
import { baseSliderMobileSettings } from '@/constants/slider'
// import styles from '@/styles/productImagesSlider/index.module.css'
import ProductImagesItem from './ProductImageItem'
import CardLabel from '../card/CardLabel'
import { $currentProduct } from '@/context/goods/state'

const ProductImagesSlider = () => {
  const product = useUnit($currentProduct)
  const images = useProductImages(product)
  const isMedia1440 = useMediaQuery(1440)
  const isMedia1040 = useMediaQuery(1040)
  const isMedia700 = useMediaQuery(700)
  const isMedia435 = useMediaQuery(435)
  const isMedia550 = useMediaQuery(550)
  const isMedia690 = useMediaQuery(690)
  const isMedia635 = useMediaQuery(635)
  const isMedia350 = useMediaQuery(350)
  const slideBigImgSize = isMedia1040 ? 350 : isMedia1440 ? 540 : 480
  const slideSmallImgSize = isMedia1040 ? 54 : isMedia1440 ? 70 : 80
  const slideMobileImgSize = isMedia350 ? 280 : isMedia435 ? 320 : isMedia550 ? 400 : isMedia635 ? 500 : isMedia690 ? 600 : 650

  // function AsNavFor() {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    // let sliderRef1 = useRef(null);
    // let sliderRef2 = useRef(null);
    let sliderRef1 = useRef<Slider | null>(null);
    let sliderRef2 = useRef<Slider | null>(null);
  
    useEffect(() => {
      setNav1(sliderRef1);
      setNav2(sliderRef2);
    }, []);

  return (
    <>
      {!isMedia700 && (
        <div>
          <Slider
            infinite={false}
            vertical={true}
            ProductImagesSlider={nav1}
            ref={(slider) => (sliderRef2 = slider)}
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
          <Slider
            ProductImagesSlider={nav2}
            ref={slider => (sliderRef1 = slider)}
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
          </Slider>
        </div>
      )}
      {isMedia700 && (
        <Slider
          {...baseSliderMobileSettings}
          className='product_top_images_slider'
        >
          {images.map((img: any) => (
            <ProductImagesItem
              key={img.id}
              image={img}
              imgSize={slideMobileImgSize}
            />
          ))}
        </Slider>
      )}
    </>
  )
}

export default ProductImagesSlider