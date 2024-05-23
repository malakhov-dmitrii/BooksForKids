import { IAmUpdateTotalsBtnProps } from "@/types/cart";

const UpdateTotalsBtn = ( { 
    text,
    className,
    handleUpdateTotals,
    btnDisabled = false 
    }: IAmUpdateTotalsBtnProps) => (
    <button 
    className={`uppercase ${className}`}
    onClick={handleUpdateTotals}
    >
      {text}
    </button>
)
 
export default UpdateTotalsBtn;