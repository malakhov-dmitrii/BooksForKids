'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import { useUnit } from 'effector-react';
import { $burgerIsOpen, closeBurger } from '@/context/modals';
import { removeOverflowHiddenFromBody } from '@/lib/utils/common';
// import { useMediaQuery } from '@/hooks/useMediaQuery';
import LangBlock from './LangBlock';
import { $isAuth } from '@/context/auth';
import BurgerLinkItem from './BurgerLinkItem';

const Burger = () => {
    const isAuth = useUnit($isAuth)
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
      {
          id: 3,
          text: translations[lang].burger_menu.about_link,
          href: '/about',
      },
      {
          id: 4,
          text: translations[lang].burger_menu.blog_link,
          href: '/blog',
      },
      {
          id: 5,
          text: translations[lang].burger_menu.help_link,
          href: '/help',
      },
      {
          id: 6,
          text: translations[lang].burger_menu.contact_link,
          href: '/contact',
      },
      {
          id: 7,
          text: translations[lang].burger_menu.search_link,
          href: '/search',
      }
  ]
    

    const handleCloseBurger = () => {
        removeOverflowHiddenFromBody()
        closeBurger()
    }

    return (
        <nav className={`nav_burger ${burgerIsOpen ? 'open' : 'close'}`}>
          <div className="container nav_burger_container">
            <button
            className="nav_burger_close"
            onClick={handleCloseBurger}
            />
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
                <Link className='burger_account_link' href='/my_account'>
                  <span className='burger_icon_account'></span>
                  <span className="burger_account_span">{translations[lang].burger_menu_account.my_account}</span>
                </Link>
                ) : (
                <Link className='burger_account_link' href='/login'>
                  <span className='burger_icon_account'></span>
                  <span className="burger_account_span">{translations[lang].burger_menu_account.my_account}</span>
                </Link>
                )}
              </h3>
            </li>
            <li className="nav_burger_account_list_item">
              <h3><Link className='burger_account_link' href='/logout'>
              <span className='burger_icon_logout'></span>
              <span className="burger_account_span">{translations[lang].burger_menu_account.logout}</span>
                  </Link>
              </h3>
            </li>
            </ul>
          </div>
        </nav>
     );
}
 
export default Burger;