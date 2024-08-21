'use client'
import { useLang } from '@/hooks/useLang'
import Link from 'next/link'
import { IAmInput } from '@/types/authPopup'
import { useAuthForm } from '@/hooks/useAuthForm'
import NameInput from '@/components/modules/profilePage/NameInput'
import EmailInput from '@/components/modules/profilePage/EmailInput'
import PasswordInput from '@/components/modules/profilePage/PasswordInput'
import AuthSocials from '@/components/modules/profilePage/AuthSocials'
import { handleSignUp } from '@/context/auth'
import { useEffect } from 'react'
import { onAuthSuccess } from '@/lib/utils/auth'

const RegistrationPage = ({
  authUrl,
  payload,
}: {
  authUrl: string
  payload?: {
    accessToken: string
    refreshToken: string
  }
}) => {
  const { lang, translations } = useLang()
  const { register, errors, handleSubmit } = useAuthForm(handleSignUp)

  const submitForm = (data: IAmInput) =>
    handleSignUp({
      name: data.name,
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  useEffect(() => {
    if (payload) {
      onAuthSuccess('Success', payload)
    }
  }, [payload])

  return (
    <main className='profile_page'>
      <section className='profile_card'>
        <div className='page_registration'>
          <h1>{translations[lang].auth_popup.my_account}</h1>
          <div className='body_btn_container'>
            <Link href='/login' className='auth_link'>
              <button type='button' className='sign_in_btn switch'>
                <h3>{translations[lang].auth_popup.sign_in}</h3>
              </button>
            </Link>
            <Link href='/registration' className='auth_link'>
              <button type='button' className='register_btn btn_active'>
                <h3>{translations[lang].auth_popup.registration}</h3>
              </button>
            </Link>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <NameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <div className='submit_btn_container'>
              <button className='body_large submit_btn black_btn' type='submit'>
                {translations[lang].auth_popup.registration_text}
              </button>
              <Link href='/login' className='auth_link'>
                <span className='question_text switch'>
                  <h5>{translations[lang].auth_popup.registration_question}</h5>
                </span>
              </Link>
            </div>
          </form>
          <AuthSocials
            handleSignupWithOAuth={() => {
              window.location.href = authUrl
            }}
          />
        </div>
      </section>
    </main>
  )
}

export default RegistrationPage
