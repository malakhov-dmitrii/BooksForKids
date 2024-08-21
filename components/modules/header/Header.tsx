'use client'
import Link from 'next/link'
import { useUnit } from 'effector-react'
import Burger from './Burger'
import LangBlock from './LangBlock'
import { $isAuth } from '@/context/auth/state'
import { openBurger, openSearchModal } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import {
  addOverflowHiddenToBody,
  handleCloseBurger,
  handleCloseSearchModal,
  triggerLoginCheck,
} from '@/lib/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CartPopup from './CartPopup/CartPopup'
import HeaderProfile from './HeaderProfile'
import { useEffect } from 'react'
import {
  //   addProductsFromLSToFavorites,
  setShouldShowEmptyFavorites,
} from '@/context/favorites'
import ShopPopup from './ShopPopup'
import { $burgerIsOpen, $searchModal } from '@/context/modals/state'
import { setLang } from '@/context/lang'
import { usePathname } from 'next/navigation'

const Header = () => {
  const isAuth = useUnit($isAuth)
  const { lang, translations } = useLang()
  const isMedia800 = useMediaQuery(800)
  const searchModal = useUnit($searchModal)
  const burgerIsOpen = useUnit($burgerIsOpen)
  const pathname = usePathname()

  const activeLink =
    pathname.includes('catalog') || pathname === '/'
      ? 'catalog'
      : pathname.includes('blog')
        ? 'blog'
        : pathname.includes('about')
          ? 'about'
          : ''

  const handleOpenBurger = () => {
    addOverflowHiddenToBody()
    openBurger()
  }

  const handleOpenSearchModal = () => {
    openSearchModal()
    addOverflowHiddenToBody()
  }

  useEffect(() => {
    triggerLoginCheck()
  }, [])

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const lang = JSON.parse(localStorage.getItem('lang') as string)
    const favorites = JSON.parse(localStorage.getItem('favorites') as string)

    if (lang) {
      if (lang === 'ru' || lang === 'en') {
        setLang(lang)
      }
    }

    triggerLoginCheck()

    if (!favorites || !favorites?.length) {
      setShouldShowEmptyFavorites(true)
    }

    if (auth?.accessToken) {
      return
    }
  }, [isAuth])

  return (
    <header className='header'>
      <div
        className={`header_search_overlay ${searchModal ? 'overlay_active' : ''}`}
        onClick={handleCloseSearchModal}
      />
      <div className='container header_container'>
        <div className='header_content'>
          <Link className='header_logo' href='/'>
            <span className='header_logo_first_letter'>B</span>
            <span>
              ooks<span className='header_logo_first_letter'>4</span>Kids
            </span>
          </Link>
          <nav className='header_right'>
            <ul className='nav item_hidden'>
              <li>
                <h5
                  className={`nav_heading ${activeLink === 'catalog' ? 'nav_heading_active' : ''}`}
                >
                  <ShopPopup />
                </h5>
              </li>
              <li>
                <h5
                  className={`nav_heading ${activeLink === 'blog' ? 'nav_heading_active' : ''}`}
                >
                  <Link className='link_nav' href='/blog'>
                    {translations[lang].header.blog_link}
                  </Link>
                </h5>
              </li>
              <li>
                <h5
                  className={`nav_heading ${activeLink === 'about' ? 'nav_heading_active' : ''}`}
                >
                  <Link className='link_nav' href='/about'>
                    {translations[lang].header.about_link}
                  </Link>
                </h5>
              </li>
              <li />
            </ul>
            {!isMedia800 && <LangBlock />}
            <ul className='header_icons'>
              <li className='header_icon_item item_hidden'>
                <button
                  className='header_link_item header_link--search'
                  onClick={handleOpenSearchModal}
                />
              </li>
              <li className='header_icon_item'>
                <CartPopup />
              </li>
              <li className='header_icon_item item_hidden'>
                {isAuth ? (
                  <HeaderProfile />
                ) : (
                  <Link
                    className='header_link_item header_link--profile'
                    href='/login'
                  />
                )}
              </li>
              <li className='header_icon_item item_hidden_big'>
                {burgerIsOpen ? (
                  <button
                    className='header_burger header_burger_close'
                    onClick={handleCloseBurger}
                  />
                ) : (
                  <button
                    className='header_burger header_burger_open'
                    onClick={handleOpenBurger}
                  />
                )}
              </li>
            </ul>
            <span className='item_hidden_big'>
              <Burger />
            </span>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
