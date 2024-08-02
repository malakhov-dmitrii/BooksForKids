import styles from '@/styles/applyCouponBlock/index.module.css';
import { useLang } from '@/hooks/useLang';
import { useState } from 'react';
import ApplyCouponBtn from '../applyCouponBtn/ApplyCouponBtn';

const ApplyCouponBlock = ({
    setIsCorrectCouponCode,
}: {
    setIsCorrectCouponCode: (arg0: boolean) => void
}) => {
    const { lang, translations } = useLang();
    const [value, setValue] = useState('')
    const isCorrectCode = value === 'BringHappiness'
    
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    
        if (e.target.value === 'BringHappiness') {
            setIsCorrectCouponCode(true)
        } else {
            setIsCorrectCouponCode(false)
        }
      }

    return (
    <div className={`${styles.apply_coupon_container}`}>
            <div className={styles.apply_coupon_input_wrapper}>
                <input 
                    type='text' 
                    placeholder={translations[lang].cart.coupon_code} 
                    className={`body_small capitalize ${styles.apply_coupon_placeholder}`}
                    onChange={handleChangeValue} 
                />
            </div>
            <ApplyCouponBtn 
                text={translations[lang].cart.apply_coupon}
                handleApplyCoupon={() => {}}
            />
        </div>
    );
};

export default ApplyCouponBlock;
