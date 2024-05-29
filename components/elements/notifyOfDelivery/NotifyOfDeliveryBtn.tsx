import { IAmNotifyOfDeliveryBtnProps } from "@/types/elements"

const NotifyOfDeliveryBtn = ( { 
    text,
    className,
    handleNotifyMe,
    btnDisabled = false 
    }: IAmNotifyOfDeliveryBtnProps) => (
    <button 
    className={`body_large ${className}`}
    onClick={handleNotifyMe}
    >
      {text}
    </button>
)

export default NotifyOfDeliveryBtn