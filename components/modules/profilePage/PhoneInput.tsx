import { useLang } from '@/hooks/useLang'
import { phoneValidationRules } from '@/lib/utils/auth'
import { IAmAuthInput } from '@/types/authPopup'
import styles from '@/styles/authPopup/index.module.css'

const PhoneInput = ({ register, errors }: IAmAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form_block'>
      <h5><input
        type='phone'
        className='form_block_input'
        placeholder='Phone number'
        {...register(
          'phone',
          phoneValidationRules(
            translations[lang].validation.invalid_phone,
            translations[lang].validation.required_phone
          )
        )}
      /></h5>
      {errors.phone && (
        <span className={styles.error_alert}>{errors.phone?.message}</span>
      )}
    </div>
  )
}
export default PhoneInput
