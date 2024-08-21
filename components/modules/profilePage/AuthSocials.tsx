import { useLang } from '@/hooks/useLang'

const AuthPopupSocials = ({
  handleSignupWithOAuth,
}: {
  handleSignupWithOAuth: VoidFunction
}) => {
  const { lang, translations } = useLang()

  return (
    <div className='body_socials'>
      <button className='socials_btn' onClick={handleSignupWithOAuth}>
        <span>G</span>
        <h5>{translations[lang].auth_popup.auth_google}</h5>
      </button>
    </div>
  )
}

export default AuthPopupSocials
