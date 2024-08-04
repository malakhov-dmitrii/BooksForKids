'use client'
import CalcShippingBlock from '@/components/modules/cartPage/calcShippingBlock/CalcShippingBlock'
import CartList from '@/components/modules/cartPage/CartList'
import UpdateTotalsBtn from '@/components/modules/cartPage/updateTotalsBtn/UpdateTotalsBtn'
import ApplyCouponBlock from '@/components/elements/applyCouponBlock/ApplyCouponBlock'
import { useLang } from '@/hooks/useLang'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { formatPrice } from '@/lib/utils/common'
import styles from '@/styles/cartPage/index.module.css'
import Link from 'next/link'
import EmptyPageContent from '@/components/modules/emptyPageContent/EmptyPageContent'
import { useUnit } from 'effector-react'
import { useCart } from '@/hooks/api/useCart'
import { $shouldShowEmpty } from '@/context/cart/state'

const CartPage = () => {
  const { data: cart } = useCart()
  const { lang, translations } = useLang()
  const { newTotal } = useTotalPrice()
  const shouldShowEmpty = useUnit($shouldShowEmpty)

  function setIsCorrectCouponCode(): void {
    throw new Error('Function not implemented.')
  }
  console.log(newTotal)
  return (
    <main>
      {!shouldShowEmpty ? (
        <section className={styles.shopping_cart}>
          <div className={`container ${styles.shopping_cart_container}`}>
            <h1>{translations[lang].other.shopping_cart}</h1>
            <div className={styles.shopping_cart_content}>
              <div className={styles.shopping_cart_content_left}>
                <ul className={styles.shopping_cart_list}>
                  <CartList />
                </ul>
                <div className={styles.shopping_cart_left_bottom}>
                  <button
                    className={`uppercase body_large white_btn ${styles.shopping_cart_updateCart_btn}`}
                  >
                    {translations[lang].cart.update_cart}
                  </button>
                  <div className={styles.cart_apply_coupon_container}>
                    <div className={styles.cart_apply_coupon_content}>
                      <ApplyCouponBlock
                        setIsCorrectCouponCode={setIsCorrectCouponCode}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.shopping_cart_content_right}>
                <h2 className={styles.cart_totals_title}>
                  {translations[lang].cart.cart_totals}
                </h2>
                <div className={styles.cart_subtotal_container}>
                  <h5 className={`uppercase`}>
                    {translations[lang].other.subtotal}
                  </h5>
                  <h5 className={styles.cart_subtotal_price}>
                    {formatPrice(newTotal)}
                  </h5>
                </div>
                <div className={styles.cart_shipping_calc_container}>
                  <div className={styles.cart_shipping_calc_container_top}>
                    <h5 className={`uppercase`}>
                      {translations[lang].cart.shipping}
                    </h5>
                    <h5 className={styles.cart_shipping_calc_container_top_msg}>
                      {translations[lang].cart.shipping_msg}
                    </h5>
                  </div>
                  <div className={styles.cart_shipping_calc}>
                    <CalcShippingBlock />
                    <UpdateTotalsBtn
                      text={translations[lang].cart.update_totals}
                      className='body_large update_totals_btn white_btn'
                      handleUpdateTotals={() => {}}
                    />
                  </div>
                  <div className={styles.cart_shipping_bottom}>
                    <div className={styles.cart_shipping_bottom_total}>
                      <p className={`body_large uppercase`}>
                        {translations[lang].cart.total}
                      </p>
                      <p
                        className={`body_large ${styles.cart_shipping_bottom_total_price}`}
                      >
                        {formatPrice(newTotal)}
                      </p>
                    </div>
                    <Link
                      href={`/checkout`}
                      className={`uppercase body_large black_btn ${styles.cart_shipping_checkout_link} ${
                        !cart?.length ? styles.disabled : ''
                      }`}
                    >
                      {translations[lang].cart.proceed_to_checkout}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              title={translations[lang].other.cart_empty}
              description={translations[lang].other.cart_empty_advice}
              btnText={translations[lang].other.shop_now}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default CartPage
