import React, { useState } from 'react';
import ApplyCouponBlock from '../../../elements/applyCouponBlock/ApplyCouponBlock';

const ApplyCouponBlockPopUp = () => {
    const [isCorrectCouponCode, setIsCorrectCouponCode] = useState(false)

    return (
        <ApplyCouponBlock setIsCorrectCouponCode={setIsCorrectCouponCode}/>
    );
};

export default ApplyCouponBlockPopUp;
