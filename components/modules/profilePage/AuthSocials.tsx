import { useLang } from "@/hooks/useLang";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faGoogle,
// } from '@fortawesome/free-brands-svg-icons'

const AuthPopupSocials = ({
    handleSignupWithOAuth,
}: {
    handleSignupWithOAuth: VoidFunction
}) => {
    const { lang, translations } = useLang();

    return (
        <div className='body_socials'>
            <button className='socials_btn' onClick={handleSignupWithOAuth}>
            <span>
                {/* <FontAwesomeIcon icon={faGoogle} /> */}
                G
                </span>
            <h5>{translations[lang].auth_popup.auth_google}</h5>
            </button>
        </div>
    );
};

export default AuthPopupSocials;