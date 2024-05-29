'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import React, { CSSProperties, useRef, useState } from 'react';
import { Pagination, Autoplay, FreeMode, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/effect-fade";
import 'swiper/css/thumbs';
import { useLang } from "@/hooks/useLang";
import img1 from "@/public/img/home_slider/slider_books1.jpg";
import img2 from "@/public/img/home_slider/slider_books2.jpg";
import img3 from "@/public/img/home_slider/slider_books3.jpg";
import HomeSlide from './HomeSlide';
import product from "@/public/img/home_slider/agniya_barto1.jpeg";
import styles from '@/styles/home/index.module.css';

const HomeSlider = () => {
    const { lang, translations } = useLang();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const slides = [
        {
            "_id": 1,
            "image": img1,
            "title": `${translations[lang].home.title1}`,
            "product": product,
            "price": "$27.55",
            "btn_message": `${translations[lang].home.btn_message1}`
        },
        {
            "_id": 2,
            "image": img2,
            "title": `${translations[lang].home.title1}`,
            "product": product,
            "price": "",
            "btn_message": `${translations[lang].home.btn_message2}`
        },
        {
            "_id": 3,
            "image": img3,
            "title": `${translations[lang].home.title2}`,
            "product": product,
            "price": "",
            "btn_message": `${translations[lang].home.btn_message3}`
        },
    ]

    return ( <section className={styles.home_slider}>
        <div className={`container ${styles.home_slider_container}`}>
        <Swiper
          modules={[Pagination, Autoplay, FreeMode, Thumbs]}
          className={styles.home_swiper_slider}
          loop={true}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{
            delay: 10000
          }}
          pagination={{
            clickable: true,
            // bulletActiveClass: '{styles.home_slider_bullet_active}'
          }}
          speed={800}
          slidesPerView='auto'
          initialSlide={0}
          slideToClickedSlide={true}
          style={{
            "--swiper-pagination-color": "var(--color-White)",
            "--swiper-pagination-bullet-inactive-color": "var(--color-White)",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-horizontal-gap": "13.71px"
          }as CSSProperties}
        >
            {slides.map((slide) => 
              <SwiperSlide className={styles.home_slider_slide} key={slide._id}>
                <HomeSlide slide={slide} />
              </SwiperSlide>
            )}
        </Swiper>
        </div>
    </section>
        );
}
 
export default HomeSlider;