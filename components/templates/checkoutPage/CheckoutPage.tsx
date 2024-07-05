'use client'
import { useLang } from "@/hooks/useLang";
import { useUnit } from "effector-react";
import Link from "next/link";
import styles from '@/styles/checkoutPage/index.module.css';
import ApplyCouponBlock from "@/components/elements/applyCouponBlock/ApplyCouponBlock";
import OrderInfoBlock from "@/components/modules/orderInfoBlock/OrderInfoBlock";
import { MutableRefObject, useRef, useState } from "react";
import { $isAuth } from "@/context/auth/state";

const CheckoutPage = ({

}) => {
    const isAuth = useUnit($isAuth)
    const { lang, translations } = useLang();
    const [userWantToCreateAccount, setUserWantToCreateAccount] = useState(false)
    const [shipToDifferentAddress, setshipToDifferentAddress] = useState(false)
    const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>
    const [isCorrectCouponCode, setIsCorrectCouponCode] = useState(false)

    const handleCreatingAccountChange = () => setUserWantToCreateAccount(!userWantToCreateAccount)
    const handleShipToDiffAddressChange = () => setshipToDifferentAddress(!shipToDifferentAddress)

    const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if (e.key == ' ' || e.code == 'Space') {
          e.preventDefault()
          setUserWantToCreateAccount(!checkboxRef.current.checked)
          checkboxRef.current.checked = !checkboxRef.current.checked
        }
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
                                    onClick={() => {}}>
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
                                {/* FORM */}
                                {!isAuth ? (
                                    <label className={`input_checkbox_wrapper ${styles.order_create_account_checkbox}`}>
                                        <input type="checkbox" 
                                        className={`input_checkbox ${styles.order_checkbox}`} 
                                        tabIndex={-1}
                                        onChange={handleCreatingAccountChange}
                                        checked={userWantToCreateAccount}
                                        ref={checkboxRef}
                                        />
                                        <span className={styles.order_checkbox_mark} />
                                        <span
                                            className={styles.order_checkbox_frame}
                                            tabIndex={0}
                                            onKeyDown={handleTabCheckbox}
                                            />
                                        <span className={styles.order_checkbox_text}>
                                            {translations[lang].checkout.create_an_account}
                                        </span>
                                    </label>
                                        ) : ""
                                }
                                <label className={`input_checkbox_wrapper ${styles.order_ship_to_different_checkbox}`}>
                                    <input type="checkbox" 
                                        className={`input_checkbox ${styles.order_checkbox}`} 
                                        tabIndex={-1}
                                        onChange={handleShipToDiffAddressChange}
                                        checked={shipToDifferentAddress}
                                    />
                                    <span className={styles.order_checkbox_mark} />
                                    <span
                                        className={styles.order_checkbox_frame}
                                        tabIndex={0}
                                    />
                                    <span className={styles.order_checkbox_text}>
                                        {translations[lang].checkout.ship_to_different}
                                    </span>
                                </label>
                                <div className={styles.checkout_order_notes_container}>
                                    <h5>{translations[lang].checkout.order_notes}</h5>
                                </div>
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