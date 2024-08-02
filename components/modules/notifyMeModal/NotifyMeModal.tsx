import NotifyOfDeliveryBtn from "@/components/elements/notifyOfDelivery/NotifyOfDeliveryBtn"
import EmailInput from "../profilePage/EmailInput"
import NameInput from "../profilePage/NameInput"
import PhoneInput from "../profilePage/PhoneInput"
import { closeNotifyMeModal } from "@/context/modals"
import { removeOverflowHiddenFromBody } from "@/lib/utils/common"
import styles from '@/styles/notifyMeModal/index.module.css'
import { IAmInput } from "@/types/authPopup"
import { useNotifyMeForm } from "@/hooks/useNotifyMeForm"
import { handleNotifyMe } from "@/context/notify"
import { useLang } from "@/hooks/useLang"

const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeNotifyMeModal()
}

const NotifyMeModal = () => {
    const { lang, translations } = useLang()
    const { register, errors, handleSubmit} =
    useNotifyMeForm(handleNotifyMe)

    const submitForm = (data: IAmInput) =>
    handleNotifyMe({
      phone: data.phone,
      email: data.email,
      name: data.name,
    })

    return (
          <div className={styles.modal}>
            <button className={styles.modal_close} onClick={handleCloseModal} />

            <form onSubmit={handleSubmit(submitForm)}>
                <PhoneInput register={register} errors={errors} />
                <EmailInput register={register} errors={errors} />
                <NameInput register={register} errors={errors} />
                <div className="submit_btn_container capitralize">
                    <NotifyOfDeliveryBtn 
                        text={translations[lang].wishlist.notify_of_delivery} 
                        handleNotifyMe={handleNotifyMe} />
                </div>
            </form>
        </div>
    );
};

export default NotifyMeModal