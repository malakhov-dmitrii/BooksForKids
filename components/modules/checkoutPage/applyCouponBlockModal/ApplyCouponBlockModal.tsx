import React, { useState } from 'react';
import ApplyCouponBlock from '../../../elements/applyCouponBlock/ApplyCouponBlock';
import styles from '@/styles/couponModal/index.module.css';
import { handleCloseCouponModal } from '@/lib/utils/common';

const ApplyCouponBlockModal = () => {
    const [isCorrectCouponCode, setIsCorrectCouponCode] = useState(false)

    return (
        <div className={styles.coupon_modal}>
        <button className={styles.modal_close} onClick={handleCloseCouponModal} />
        <div className={styles.coupon_modal_container}>
            <ApplyCouponBlock setIsCorrectCouponCode={setIsCorrectCouponCode}/>
        </div>
    </div>
    );
};

export default ApplyCouponBlockModal;
