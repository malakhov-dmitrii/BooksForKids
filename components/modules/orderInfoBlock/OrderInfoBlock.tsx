import { useLang } from '@/hooks/useLang';
import { useTotalPrice } from '@/hooks/useTotalPrice';
import { formatPrice } from '@/lib/utils/common';
import styles from '@/styles/orderInfoBlock/index.module.css';
import { IAmOrderInfoBlock } from '@/types/modules';
import { useState } from 'react';
import YourOrderList from '../checkoutPage/yourOrderList/YourOrderList';
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth';
import { useTotalPriceWithDiscount } from '@/hooks/useTotalPriceWithDiscount';
import { $cart, $cartFromLs } from '@/context/cart/state';
import PaymentOptions from '../checkoutPage/paymentOptions/PaymentOptions';

const OrderInfoBlock = ({
    isCorrectCouponCode,
    isCheckoutPage
}: IAmOrderInfoBlock) => {
    const { lang, translations } = useLang();
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);
    const [paymentMethod, setPaymentMethod] = useState(true)
    const { newTotal } = useTotalPrice();
    const { newTotalWithDiscount } = useTotalPriceWithDiscount()
    const [costOfShipping, setcostOfShipping] = useState(false)
    const priceWithCouponCode = isCorrectCouponCode
    ? formatPrice(Math.round(newTotalWithDiscount - newTotalWithDiscount * 0.1))
    : formatPrice(newTotalWithDiscount)

    return ( 
        <div className={styles.order_block}>
            <div className={styles.order_block_content}>
                <div className={styles.order_block_headings}>
                    <h5 className='uppercase'>{translations[lang].checkout.product}</h5>
                    <h5 className='uppercase'>{translations[lang].cart.total}</h5>
                </div>
                <ul className={styles.checkout_list}>
                    <YourOrderList />
                </ul>
                <div className={styles.order_block_subtotal}>
                    <h5 className='uppercase'>{translations[lang].other.subtotal}
                        {isCorrectCouponCode 
                        ? (<span className='lowercase'> {translations[lang].checkout.with_coupon}</span>)
                        : ""
                        }   
                    </h5>
                    {/* Subtotal and Total */}
                    <h5 className='dark_gray'>
                        {isCorrectCouponCode 
                        ? (<span><span className='line_through'>{formatPrice(newTotal)}</span><span> $ {formatPrice(+priceWithCouponCode)}</span></span>)
                        : (formatPrice(newTotal))
                        }                        
                    </h5> 
                </div>
                <div className={styles.order_block_shipping}>
                    {/* cost of shipping */}
                    <h5 className='uppercase'>{translations[lang].cart.shipping}</h5>
                    <h5 className='dark_gray'>{translations[lang].checkout.free_shipping}</h5>
                </div>
                <div className={styles.order_block_total}>
                    <p className='uppercase body_large'>{translations[lang].cart.total}</p>
                    <p className='body_large'>
                        {isCorrectCouponCode 
                        ? (formatPrice(+priceWithCouponCode))
                        : (formatPrice(newTotalWithDiscount))
                        } 
                    </p>
                </div>
                {/* {isCheckoutPage && <></>} */}
                <div className={styles.order_payment_methods_block}>
                    {/* <form>
                        <h5><input name='payment_methods' type='radio' value='card_payment' checked/>{translations[lang].checkout.card_payment}</h5>
                            <p className={`body_small`}>{translations[lang].checkout.card_payment_msg}</p>
                        <h5><input name='payment_methods' type='radio' value='paypal' />PayPal<span /></h5>
                            <p className={`body_small hide`}>{translations[lang].checkout.paypal_payment_msg}</p>
                        <h5><input name='payment_methods' type='radio' value='direct_bank' />{translations[lang].checkout.direct_payment}</h5>
                            <p className={`body_small hide`}>{translations[lang].checkout.direct_payment_msg}</p>
                        <button className='black_btn'><input type='submit' className={`uppercase body_large ${styles.order_place_input}`} value={translations[lang].checkout.place_order} /></button>
                    </form> */}
                    <PaymentOptions />
                </div>
            </div>
        </div>
     );
}
 
export default OrderInfoBlock;