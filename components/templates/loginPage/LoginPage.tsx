'use client'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import EmailInput from '@/components/modules/profilePage/EmailInput'
import PasswordInput from '@/components/modules/profilePage/PasswordInput'
import { useAuthForm } from '@/hooks/useAuthForm'
import { handleSignIn } from '@/context/auth'
import { IAmInput } from '@/types/authPopup'
import AuthSocials from '@/components/modules/profilePage/AuthSocials'
import { useEffect } from 'react'
import { onAuthSuccess } from '@/lib/utils/auth'

const LoginPage = ({
  authUrl,
  payload,
}: {
  authUrl: string
  payload?: { accessToken: string; refreshToken: string }
}) => {
  const { lang, translations } = useLang()
  const { register, errors, handleSubmit } = useAuthForm(handleSignIn)

  useEffect(() => {
    if (payload) onAuthSuccess('Success', payload)
  }, [payload])

  const submitForm = (data: IAmInput) =>
    handleSignIn({
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <main className='container profile_page'>
      <section className='profile_card'>
        <div className='page_sign_in'>
          <h1>{translations[lang].auth_popup.my_account}</h1>
          <div className='body_btn_container'>
            <Link href='/login' className='auth_link'>
              <button type='button' className='register_btn btn_active'>
                <h3>{translations[lang].auth_popup.sign_in}</h3>
              </button>
            </Link>
            <Link href='/registration' className='auth_link'>
              <button type='button' className='sign_in_btn switch'>
                <h3>{translations[lang].auth_popup.registration}</h3>
              </button>
            </Link>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <div className='submit_btn_container'>
              <button className='body_large submit_btn black_btn' type='submit'>
                {translations[lang].auth_popup.sign_in}
              </button>
              <Link href='/registration' className='auth_link'>
                <span className='question_text switch'>
                  <h5>{translations[lang].auth_popup.login_question}</h5>
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

export default LoginPage
