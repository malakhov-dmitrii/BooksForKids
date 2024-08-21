import { useLang } from '@/hooks/useLang'
import { emailValidationRules } from '@/lib/utils/auth'
import { IAmAuthInput } from '@/types/authPopup'
import styles from '@/styles/authPopup/index.module.css'

const EmailInput = ({ register, errors }: IAmAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form_block'>
      <h5><input
        type='email'
        className='form_block_input'
        placeholder='Email'
        {...register(
          'email',
          emailValidationRules(
            translations[lang].validation.invalid_email,
            translations[lang].validation.required_email
          )
        )}
      /></h5>
      {errors.email && (
        <span className={styles.error_alert}>{errors.email?.message}</span>
      )}
    </div>
  )
}

export default EmailInput
