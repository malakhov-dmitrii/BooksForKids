import { $cart, $cartFromLs } from '@/context/cart/state';
// import { useGoodsByAuth } from '@/hooks/useGoodsByAuth';
import { useLang } from '@/hooks/useLang';
import styles from '@/styles/orderInfoBlock/index.module.css';
import { useState } from 'react';

const PaymentOptions = () => {
    const { lang, translations } = useLang();
    const [activeTab, setActiveTab] = useState<
    'checkout_payment1' | 'checkout_payment2' | 'checkout_payment3'
  >('checkout_payment1')
    // const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)

    const handlePlaceOrder = async () => {
      // if (
      //   // TO DO : check if all the needed data filled up
      // ) {
      //   const orderBlock = document.querySelector('.order-block') as HTMLLIElement
      //   scrollToBlock(orderBlock)
      //   toast.error('Enter the address')
      //   return
      }


    return (
        <form className={styles.checkout_options_form}>
        <button 
        className={`${styles.checkout_payment_option} ${styles.checkout_payment1}`}
        onClick={() => setActiveTab('checkout_payment1')}
        >
          <input
            type='radio'
            id='payment-1'
            name='radio-group'
            className={styles.checkout_payment_options_input}
            defaultChecked
          />
          <label
            htmlFor='payment-1'
            className={styles.checkout_payment_option_label}
          >
            <span className={styles.checkout_payment_option_text}>{translations[lang].checkout.card_payment}</span>
            <p className={`body_small hide ${styles.checkout_payment_option_additional_info}`}>{translations[lang].checkout.card_payment_msg}</p>
          </label>
        </button>
        <button 
        className={`${styles.checkout_payment_option} ${styles.checkout_payment2}`}
        onClick={() => setActiveTab('checkout_payment2')}
        >
          <input type='radio' id='payment-2' name='radio-group' className={styles.checkout_payment_options_input} />
          <label
            htmlFor='payment-2'
            className={styles.checkout_payment_option_label}
          >
            <span className={`${styles.checkout_payment_option_text} ${styles.checkout_paypal_container}`}>PayPal<span className={styles.checkout_paypal}/></span>
            <p className={`body_small hide ${styles.checkout_payment_option_additional_info}`}>{translations[lang].checkout.paypal_payment_msg}</p>
          </label>
        </button>
        <button 
        className={`${styles.checkout_payment_option} ${styles.checkout_payment3}`}
        onClick={() => setActiveTab('checkout_payment3')}
        >
          <input type='radio' id='payment-3' name='radio-group' className={styles.checkout_payment_options_input} />
          <label
            htmlFor='payment-3'
            className={styles.checkout_payment_option_label}
          >
            <span className={styles.checkout_payment_option_text}>{translations[lang].checkout.direct_payment}</span>
            <p className={`body_small hide ${styles.checkout_payment_option_additional_info}`}>{translations[lang].checkout.direct_payment_msg}</p>
          </label>
        </button>
        <div className={`${styles.checkout_submit_btn_wrapper}`}>
            <button 
            className={`black_btn uppercase body_large ${styles.checkout_submit_btn}`}
            // disabled={
            //   !currentCartByAuth.length
            // }
            onClick={handlePlaceOrder}
            >
              {translations[lang].checkout.place_order}
        </button>
        </div>
      </form>
    );
};

export default PaymentOptions;