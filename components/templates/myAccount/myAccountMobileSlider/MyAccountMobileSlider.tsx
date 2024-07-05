import React from 'react'
import Slider from 'react-slick'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useUserLogout } from '@/hooks/useLogout'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import '@/app/globalStyles/slickSliderMyAccount.css'
import { useLang } from '@/hooks/useLang'
import MyAccountNavigationLinks from '../myAccountNavigationLinks/MyAccountNavigationLinks'
import styles from '@/styles/myAccount/index.module.css'
import Link from 'next/link'
import { $favorites, $favoritesFromLS } from '@/context/favorites/state'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const MyAccountMobileSlider = () => {
  const { lang, translations } = useLang()
  const handleLogout = useUserLogout()
  const isMedia350 = useMediaQuery(350)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    // style: {{
    //     display: flex,
    //     border-bottom: 1px solid var(--color-Gray),
    //     height: 60px;
    // }}
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: false,
          arrows: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  }

  return (
    <Slider {...settings} className={styles.my_account_links_container}>
      <h3>
        <Link href='/my-account/dashboard' className={styles.my_account_links}>
          {translations[lang].my_account.dashboard}
        </Link>
      </h3>
      <h3>
        <Link href='/my-account/orders' className={styles.my_account_links}>
          {translations[lang].my_account.orders}
        </Link>
      </h3>
      <h3>
        <Link href='/wishlist' className={styles.my_account_links}>
          {translations[lang].my_account.wishlist}
          {!!currentFavoritesByAuth.length && (
            <span className={styles.my_account_not_empty_count}>
              {' '}
              ({currentFavoritesByAuth.length})
            </span>
          )}
        </Link>
      </h3>
      <h3>
        <Link href='/my-account/addresses' className={styles.my_account_links}>
          {translations[lang].my_account.addresses}
        </Link>
      </h3>
      <h3>
        <Link
          href='/my-account/account-details'
          className={styles.my_account_links}
        >
          {!isMedia350 ? (
            <span>{translations[lang].my_account.account_details}</span>
          ) : (
            <span>{translations[lang].my_account.details}</span>
          )}
        </Link>
      </h3>
      <h3>
        <button className={styles.my_account_links} onClick={handleLogout}>
          {translations[lang].header.logout}
        </button>
      </h3>
    </Slider>
  )
}

export default MyAccountMobileSlider
