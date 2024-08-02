import { IAmAddToCartBtnProps } from '@/types/goods'

const AddToCartBtn = ({
  text,
  className,
  handleAddToCart,
  btnDisabled = false,
}: IAmAddToCartBtnProps) => (
  <button
    className={`body_large ${className}`}
    onClick={handleAddToCart}
    disabled={btnDisabled}
  >
    {text}
  </button>
)

export default AddToCartBtn
