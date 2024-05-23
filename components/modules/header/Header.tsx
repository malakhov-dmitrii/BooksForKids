'use client'
import Link from 'next/link'
import { useUnit } from 'effector-react'
import Burger from './Burger'
import LangBlock from './LangBlock'
import { $isAuth } from '@/context/auth'
import { openBurger, $searchModal, openSearchModal } from '@/context/modals'
import { useLang } from "@/hooks/useLang";
import { addOverflowHiddenToBody, handleCloseSearchModal, triggerLoginCheck } from '@/lib/utils/common'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CartPopup from './CartPopup/CartPopup';
import HeaderProfile from './HeaderProfile'
import { useEffect } from 'react'
import { $user } from '@/context/user'
import { $cart, $cartFromLs, addProductsFromLSToCart, setCartFromLS, setShouldShowEmpty } from '@/context/cart'
// import {
//     $favorites,
//     $favoritesFromLS,
//     addProductsFromLSToFavorites,
//     setFavoritesFromLS,
//     setShouldShowEmptyFavorites,
//   } from '@/context/favorites'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { setLang } from '@/context/lang'



const Header = () => {
    const isAuth = useUnit($isAuth)
    const { lang, translations } = useLang();
    const isMedia800 = useMediaQuery(800)
    const searchModal = useUnit($searchModal)
    const user = useUnit($user)
    const currentcartByAuth =  useGoodsByAuth($cart, $cartFromLs)
    // const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

    console.log(user);

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
        const cart = JSON.parse(localStorage.getItem('cart') as string)
    //     const favoritesFromLS = JSON.parse(
    //       localStorage.getItem('favorites') as string
    //     )

        if (lang) {
            if (lang === 'ru' || lang === 'en') {
              setLang(lang)
            }
          }

          triggerLoginCheck()

          if (auth?.accessToken) {
            return
          }

          if(cart) {
            setCartFromLS(cart)
          }

        if (cart && Array.isArray(cart)) {
            if (!cart.length) {
                setShouldShowEmpty(true)
            } else {
                setCartFromLS(cart)
            }
        }

    //     if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
    //       if (!favoritesFromLS.length) {
    //         setShouldShowEmptyFavorites(true)
    //       } else {
    //         setFavoritesFromLS(favoritesFromLS)
    //       }
    //     }
    

    }, [])

    useEffect(() => {
        if (isAuth) {
          const auth = JSON.parse(localStorage.getItem('auth') as string)
          const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)
    //       const favoritesFromLS = JSON.parse(
    //         localStorage.getItem('favorites') as string
    //       )

          if (cartFromLS && Array.isArray(cartFromLS)) {
            console.log('deghjfdshgfs')
            addProductsFromLSToCart({
              jwt: auth.accessToken,
              cartItems: cartFromLS,
            })
          }
    
    //       if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
    //         addProductsFromLSToFavorites ({
    //           jwt: auth.accessToken,
    //           favoriteItems: favoritesFromLS,
    //         })
    //       }
        }
      }, [isAuth])

    return (
<header className="header">
    <div
    className={`header_search_overlay ${searchModal ? 'overlay_active' : ""}`}
    onClick={handleCloseSearchModal}
    />
        <div className="container header_container">
          <div className="header_content">
            <Link className="header_logo" href='/'>
               <span className="header_logo_first_letter">B</span><span>ooks<span className="header_logo_first_letter">4</span>Kids</span>
            </Link>
            <nav className="header_right">
                <ul className="nav item_hidden">
                    <li>
                        <h5>
                            <Link className='link_nav' href='/shop'>{translations[lang].header.shop_link}
                            </Link>
                        </h5>
                    </li>
                    <li>
                        <h5>
                        <Link className='link_nav' href='/blog'>{translations[lang].header.blog_link}
                        </Link>
                    </h5>
                    </li>
                    <li>
                        <h5>
                        <Link className='link_nav' href='/about'>{translations[lang].header.about_link}
                        </Link>
                    </h5>
                    </li>
                    <li></li>
                </ul>
                {!isMedia800 &&<LangBlock />}
                <ul className="header_icons">
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
                            href='/login' />
                        )}
                    </li>
                    <li className='header_icon_item item_hidden_big'>
                        <button 
                        className='header_burger' 
                        onClick={handleOpenBurger}
                        />
                    </li>
                </ul>
                <span className='item_hidden_big'>
                  <Burger />
                  </span>
            </nav>
          </div>
        </div>
    </header>
    );
};

export default Header;