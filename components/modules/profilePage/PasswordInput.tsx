import { useLang } from '@/hooks/useLang'
import { IAmAuthInput } from '@/types/authPopup'
import styles from '@/styles/authPopup/index.module.css'

const PasswordInput = ({ register, errors }: IAmAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form_block'>
      <h5><input
        type='password'
        className='form_block_input'
        placeholder={translations[lang].auth_popup.password}
        {...register('password', {
          required: translations[lang].validation.required_password,
          minLength: 4,
          maxLength: 40,
        })}
      /></h5>
      {errors.password && (
        <span className={styles.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>
          {translations[lang].validation.min_4}
        </span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>
          {translations[lang].validation.max_20}
        </span>
      )}
    </div>
  )
}
export default PasswordInput