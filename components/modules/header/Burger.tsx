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

const Burger = () => {
    const isAuth = useUnit($isAuth)
    // const [ShowCatalog] = useState(false)
    const burgerIsOpen = useUnit($burgerIsOpen)
    const { lang, translations } = useLang()
    // const isMedia800 = useMediaQuery(800)
    // const isMedia450 = useMediaQuery(450)
    

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
            <ul className="nav_burger_list">
              <li className="nav_burger_list_item">
                <h3><Link className='burger_link' href='/'>{translations[lang].burger_menu.home_link}
                    </Link>
                </h3>
              </li>
              <li className="nav_burger_list_item">
              <h3><Link className='burger_link' href='/shop'>{translations[lang].burger_menu.shop_link}
                  </Link>
              </h3>
              </li>
              <li className="nav_burger_list_item">
              <h3><Link className='burger_link' href='/about'>{translations[lang].burger_menu.about_link}
                  </Link>
              </h3>
              </li>
              <li className="nav_burger_list_item">
              <h3><Link className='burger_link' href='/blog'>{translations[lang].burger_menu.blog_link}
                  </Link>
              </h3>
              </li>
              <li className="nav_burger_list_item">
              <h3><Link className='burger_link' href='/help'>{translations[lang].burger_menu.help_link}
                  </Link>
              </h3>
              </li>
              <li className="nav_burger_list_item">
              <h3><Link className='burger_link' href='/contact'>{translations[lang].burger_menu.contact_link}
                  </Link>
              </h3>
              </li>
              <li className="nav_burger_list_item">
              <h3><Link className='burger_link' href='/search'>{translations[lang].burger_menu.search_link}
                  </Link>
              </h3>
              </li>
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