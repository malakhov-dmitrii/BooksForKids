import toast from 'react-hot-toast'
import { useLang } from '@/hooks/useLang'

const CookieAlert = ({
  setCookieAlertOpen,
}: {
  setCookieAlertOpen: (arg0: boolean) => void
}) => {
  const { lang, translations } = useLang()

  const handleAcceptCookie = () => {
    document.cookie = 'CookieBy=RussianBooks4Kids; max-age=' + 60 * 60 * 24 * 30

    if (document.cookie) {
      setCookieAlertOpen(false)
    } else {
      toast.error(
        // eslint-disable-next-line max-len
        "Cookies are blocked or not supported by your browser. Please, enable cookies in the browser's settings"
      )
    }
  }

  const handleCloseAlert = () => setCookieAlertOpen(false)

  return (
    <div className='container cookie_popup_container'>
      <button
        className='cookie_popup_close'
        onClick={handleCloseAlert}
      />
      <p
        className='cookie_popup_text'
        dangerouslySetInnerHTML={{
          __html: translations[lang].other.cookie_text,
        }}
      />
      <button
        className='cookie_popup_accept white_btn'
        onClick={handleAcceptCookie}
      >
        {translations[lang].other.accept}
      </button>
    </div>
  )
}

export default CookieAlert