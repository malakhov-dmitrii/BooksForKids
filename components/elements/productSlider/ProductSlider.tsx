import React, { CSSProperties, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar, Thumbs, Zoom, FreeMode, Navigation } from "swiper/modules"
import { useMediaQuery } from '@/hooks/useMediaQuery';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from '@/styles/productSlider/index.module.css';

const ProductSlider = ({
    images,
}: {
    images: {
        src: string
        alt: string
        id: string
    }[]
}) => {
    const isMedia1070 = useMediaQuery(1070)
    const isMedia890 = useMediaQuery(890)
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return ( 
      <section className={styles.product_slider}>
        <Swiper
        className={`${styles.slider_swiper} ${styles.product_slider_swiper_mini}`}
        direction={'vertical'}
        slidesPerView={4}
        // style={{
        //   "--swiper-scrollbar-border-radius": "0",
        //   "--swiper-scrollbar-drag-bg-color": "var(--color-Dark-gray)",
        //   "--swiper-scrollbar-size": "2px",
        //   "--swiper-pagination-bullet-horizontal-gap": "13.71px"
        // }as CSSProperties}
        spaceBetween={10}
        slideToClickedSlide={true}
        watchOverflow={true}
        autoHeight={true}
        onSwiper={(swiper) => setThumbsSwiper}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}

        >
      {images.map((item) => (
        <SwiperSlide className={`${styles.slider_slide} ${styles.product_slider_slide_mini}`}
          key={item.id}
          style={{ width: isMedia890 ? 54 : isMedia1070 ? 70 : 80 }}
        >
            <img src={item.src} alt={item.alt} />
        </SwiperSlide>
      ))}
        </Swiper>
        <Swiper
        modules={[Scrollbar, Zoom, Thumbs, FreeMode]}
        thumbs={{ swiper: thumbsSwiper }}
        className={`${styles.slider_swiper} ${styles.product_slider_swiper}`}
        watchOverflow={true}
        // watchSlidesVisibility={true}
        // watchSlidesProgress={true}
        // preventInteractionOnTransition={true}
        spaceBetween={10}
        scrollbar={{
            draggable: true,
          }}
        slidesPerView={1}
        zoom={{
          minRatio: 1,
          maxRatio: 2,
        }}
        style={{
          "--swiper-scrollbar-border-radius": "0",
          "--swiper-scrollbar-drag-bg-color": "var(--color-Dark-gray)",
          "--swiper-scrollbar-size": "2px",
          "--swiper-scrollbar-horizontal-bottom": "-24px"
        }as CSSProperties}
        
        >
      {images.map((item) => (
        <SwiperSlide className={`${styles.slider_slide} ${styles.product_slider_slide}`}
          key={item.id}
          style={{ width: isMedia890 ? 270 : isMedia1070 ? 350 : 400 }}
        >
          <div className='swiper-zoom-container'>
            <img src={item.src} alt={item.alt} className={styles.slider_slide_img} />
            </div>
        </SwiperSlide>
      ))}
        </Swiper>
        </section>
     );
}
 
export default ProductSlider;