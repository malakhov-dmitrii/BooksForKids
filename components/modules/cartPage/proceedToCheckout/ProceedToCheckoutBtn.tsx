import { IAmProceedToCheckoutBtnProps } from "@/types/cart"

const ProceedToCheckoutBtn = ( { 
    text,
    className,
    handleProceedToCheckout,
    btnDisabled = false 
    }: IAmProceedToCheckoutBtnProps) => (
    <button 
    className={`body_large uppercase black_btn ${className}`}
    onClick={handleProceedToCheckout}
    >
      {text}
    </button>
)

export default ProceedToCheckoutBtn