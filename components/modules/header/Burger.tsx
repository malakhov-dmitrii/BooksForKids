'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useUnit } from 'effector-react';
import { handleCloseBurger} from '@/lib/utils/common';
// import { useMediaQuery } from '@/hooks/useMediaQuery';
import LangBlock from './LangBlock';
import BurgerLinkItem from './BurgerLinkItem';
import { $isAuth } from '@/context/auth/state';
import { $burgerIsOpen } from '@/context/modals/state';
import { useUserLogout } from '@/hooks/useLogout';

const Burger = () => {
    const isAuth = useUnit($isAuth)
    const handleLogout = useUserLogout()
    // const [ShowCatalog] = useState(false)
    const burgerIsOpen = useUnit($burgerIsOpen)
    const { lang, translations } = useLang()
    // const isMedia800 = useMediaQuery(800)
    // const isMedia450 = useMediaQuery(450)

    const burgerLinks = [
      {
          id: 1,
          text: translations[lang].burger_menu.home_link,
          href: '/',
      },
      {
          id: 2,
          text: translations[lang].burger_menu.shop_link,
          href: '/catalog/shop_full_width',
      },
      ,
      {
          id: 3,
          text: translations[lang].my_account.wishlist,
          href: '/wishlist',
      },
      {
          id: 4,
          text: translations[lang].burger_menu.about_link,
          href: '/about',
      },
      {
          id: 5,
          text: translations[lang].burger_menu.blog_link,
          href: '/blog',
      },
      {
          id: 6,
          text: translations[lang].burger_menu.help_link,
          href: '/help',
      },
      {
          id: 7,
          text: translations[lang].burger_menu.contact_link,
          href: '/contact',
      }
  ]
    
    return (
        <nav className={`nav_burger ${burgerIsOpen ? 'open' : 'close'}`}>
          <div className="container nav_burger_container">
            {/* <button
            className="nav_burger_close"
            onClick={handleCloseBurger}
            /> */}
            <ul className='nav_burger_list'>
              {burgerLinks.map((item) => (
                  <BurgerLinkItem
                      key={item.text}
                      item={item}
                  />
              ))}
            </ul>
            <div className="nav_burger_lang">
              <LangBlock />
            </div>
            <ul className="nav_burger_account">
            <li className="nav_burger_account_list_item">
              <h3>
              {isAuth ? (
                <Link className='burger_account_link' href='/my-account/dashboard' onClick={handleCloseBurger}>
                  <span className='burger_icon_account'></span>
                  <span className="burger_account_span">{translations[lang].burger_menu_account.my_account}</span>
                </Link>
                ) : (
                <Link className='burger_account_link' href='/login' onClick={handleCloseBurger}>
                  <span className='burger_icon_account'></span>
                  <span className="burger_account_span">{translations[lang].burger_menu_account.my_account}</span>
                </Link>
                )}
              </h3>
            </li>
            <li className="nav_burger_account_list_item">
              <h3><button className='burger_account_link' onClick={handleLogout}>
              <span className='burger_icon_logout'></span>
              <span className="burger_account_span">{translations[lang].burger_menu_account.logout}</span>
                  </button>
              </h3>
            </li>
            </ul>
          </div>
        </nav>
     );
}
 
export default Burger;