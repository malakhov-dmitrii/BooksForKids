import Link from 'next/link'
import Image from 'next/image'
import { forwardRef, useState } from 'react'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { IAmWrappedComponentProps } from '@/types/hocs'
import { useLang } from '@/hooks/useLang'
import { useCartAction } from '@/hooks/useCartAction'
import CartPopupItem from './CartPopupItem'
import ghost from '@/public/img/pics/ghosts.png'
import { formatPrice, showCountMessage } from '@/lib/utils/common'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import ItemsCount from '@/components/elements/ItemsCount/ItemsCount'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useTotalPriceWithDiscount } from '@/hooks/useTotalPriceWithDiscount'
import { $cart, $cartFromLs } from '@/context/cart/state'

const CartPopup = forwardRef<HTMLDivElement, IAmWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const { lang, translations } = useLang()
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
    const { newTotalWithDiscount } = useTotalPriceWithDiscount()
    const [delayHandler, setDelayHandler] = useState(null)
    const handleShowPopup = () => setOpen(true)
    const handleHidePopup = () => setOpen(false)
    const {
      product,
      handleAddToCart,
      currentCartItems,
      allCurrentCartItemCount,
      setCount,
      existingItem,
      count,
    } = useCartAction()
    // const allCurrentCartItem = countWholeCartItemsAmount()

    console.log(currentCartByAuth)

    return (
      <div className='cart_popup' ref={ref}>
        <Link
          className='header_link_item header_link--cart'
          href='/cart'
          onMouseEnter={handleShowPopup}
        >
          {!!currentCartByAuth.length && (
            <span className='not_empty'>
              <span className='not_empty_count'>
                {countWholeCartItemsAmount(currentCartByAuth)}
              </span>
            </span>
          )}
        </Link>
        {open && (
          <div className='cart_popup_wrapper' onMouseLeave={handleHidePopup}>
            <div className='cart_popup_top'>
              <button className='cart_popup_close' onClick={handleHidePopup} />
              <h5 className='cart_popup_title'>
                {translations[lang].other.shopping_cart}
              </h5>
              <div className='body_small cart_popup_qty_top'>
                <ItemsCount
                  count={countWholeCartItemsAmount(currentCartByAuth)}
                />
              </div>
              <ul className='cart_popup_list'>
                {!!currentCartByAuth.length ? (
                  currentCartByAuth.map((item) => (
                    <li
                      key={item._id || item.clientId}
                      className='popup_cart_list_item'
                    >
                      <CartPopupItem item={item} />
                    </li>
                  ))
                ) : (
                  <li className='cart_popup_list_empty'>
                    <Image
                      src={ghost}
                      alt='empty cart'
                      width={136}
                      height={136}
                    />
                  </li>
                )}
              </ul>
            </div>
            <div className='cart_popup_footer'>
              <div className='cart_popup_footer_text'>
                <div className='cart_popup_footer_text_count'>
                  <h5>
                    {translations[lang].other.subtotal} (
                    <ItemsCount
                      count={countWholeCartItemsAmount(currentCartByAuth)}
                    />
                    )
                  </h5>
                </div>
                <span>{formatPrice(newTotalWithDiscount)}</span>
              </div>
              {!currentCartByAuth.length ? (
                <Link
                  href='/catalog'
                  className='cart_popup_footer_link body_large black_btn'
                >
                  {translations[lang].home.btn_message2}
                </Link>
              ) : (
                <Link
                  href='/cart'
                  className='cart_popup_footer_link body_large black_btn'
                >
                  {translations[lang].other.view_cart}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)
