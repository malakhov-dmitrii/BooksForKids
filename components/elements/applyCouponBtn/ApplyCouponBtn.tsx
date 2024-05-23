import { IAmApplyCouponBtnProps } from "@/types/cart";

const ApplyCouponBtn = ( { 
    text,
    className,
    handleApplyCoupon,
    btnDisabled = false 
    }: IAmApplyCouponBtnProps) => (
    <button 
    className={`body_large uppercase apply_coupon_btn black_btn ${className}`}
    onClick={handleApplyCoupon}
    >
      {text}
    </button>
)
 
export default ApplyCouponBtn;