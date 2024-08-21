'use client'
import { useLang } from "@/hooks/useLang";
import { useUnit } from "effector-react";
import Link from "next/link";
import styles from '@/styles/checkoutPage/index.module.css';
import ApplyCouponBlock from "@/components/elements/applyCouponBlock/ApplyCouponBlock";
import OrderInfoBlock from "@/components/modules/orderInfoBlock/OrderInfoBlock";
import { useState } from "react";
import { $isAuth } from "@/context/auth/state";
import { addOverflowHiddenToBody } from "@/lib/utils/common";
import { openCouponModal } from "@/context/modals";
import BillingDetails from "@/components/modules/checkoutPage/billingDetails/BillingDetails";

const CheckoutPage = ({

}) => {
    const isAuth = useUnit($isAuth)
    const { lang, translations } = useLang();
    const [isCorrectCouponCode, setIsCorrectCouponCode] = useState(false)

    const handleCouponModal = () => {
        addOverflowHiddenToBody()
        openCouponModal()
      }

    return ( 
        <main>
            <section className={styles.checkout}>
                <div className={`container ${styles.checkout_container}`}>
                    <h1>{translations[lang].checkout.checkout}</h1>
                    <div className={styles.checkout_content}>
                        <div className={styles.checkout_content_top}>
                            <div className={styles.checkout_left_links}>
                                {!isAuth ? (
                                    <Link 
                                        className={styles.checkout_left_link}
                                        href='/login'>
                                            <h5><span className={styles.checkout_left_links_gray}>{translations[lang].checkout.returning_customer} </span>
                                             {translations[lang].checkout.click_here_to_login}
                                            </h5>
                                    </Link>
                                ) : <h5></h5>
                                }
                                <button 
                                    className={styles.checkout_left_link}
                                    onClick={handleCouponModal}>
                                        <span className={styles.checkout_left_links_gray}>{translations[lang].checkout.have_a_coupon} </span>
                                         {translations[lang].checkout.click_here_to_enter_code}
                                </button>
                            </div>
                            <div className={styles.checkout_apply_coupon_block}>
                                <h5 className={styles.checkout_apply_coupon_block_msg}>
                                    {translations[lang].checkout.if_you_have_code}
                                </h5>
                                <ApplyCouponBlock setIsCorrectCouponCode={setIsCorrectCouponCode}/>
                            </div>   
                        </div>
                        <div className={styles.checkout_content_bottom}>
                            <div className={styles.checkout_content_left}>
                                <h2 className='capitalize'>{translations[lang].checkout.billing_details}</h2>
                                <BillingDetails />                   
                            </div>
                            <div className={styles.checkout_content_right}>
                                <h2 className='capitalize'>{translations[lang].checkout.your_order}</h2>
                                <OrderInfoBlock 
                                    isCorrectCouponCode={isCorrectCouponCode} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
     );
}
 
export default CheckoutPage;