import NameErrorMessage from '@/components/elements/nameErrorMessage/NameErrorMessage'
import { useLang } from '@/hooks/useLang'
import { nameValidationRules } from '@/lib/utils/auth'
import { IAmAuthInput } from '@/types/authPopup'
import styles from '@/styles/authPopup/index.module.css'

const NameInput = ({ register, errors }: IAmAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form_block'>
      <h5><input
        type='text'
        className='form_block_input'
        placeholder={translations[lang].auth_popup.name}
        {...register(
          'name',
          nameValidationRules(
            translations[lang].validation.invalid_value,
            translations[lang].validation.requiredName
          )
        )}
      /></h5>
      <NameErrorMessage
        errors={errors}
        className={`body_small ${styles.error_alert}`}
        fieldName='name'
      />
    </div>
  )
}

export default NameInput