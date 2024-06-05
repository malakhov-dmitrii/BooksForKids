import Link from 'next/link'
import { useLang } from "@/hooks/useLang";
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Footer = () => {
    const { lang, translations } = useLang();
    const isMedia750 = useMediaQuery(750);
    // const isMedia640 = useMediaQuery(650);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_content">
                  <div className="footer_row1">
                    <ul className="footer_nav">
                        <li className="footer_nav_li"><h5><Link className='footer_nav_link' href='/contact'>{translations[lang].footer.contact}</Link></h5></li>
                        <li className="footer_nav_li"><h5><Link className='footer_nav_link' href='/terms_of_use'>{translations[lang].footer.terms_of_service}</Link></h5></li>
                        <li className="footer_nav_li"><h5><Link className='footer_nav_link' href='/shipping'>{translations[lang].footer.shipping}</Link></h5></li>
                    </ul>
                    {isMedia750 &&
                        <div className="input_checkbox_wrapper">
                            <input type="checkbox" className='input_checkbox' id="checkbox_id" />
                            <label htmlFor="checkbox_id">{translations[lang].footer.agreement_to_policy}</label>
                        </div>
                    }
                    <div className="get_email_wrapper">
                        <div className="get_email">
                            <div className="input_wrapper">
                                <input type='text' placeholder={translations[lang].footer.give_an_email} className='email_input' />
                            </div>
                            <div className="button_footer_wrapper">
                                <button className="btn_get_email"></button>
                            </div>
                            </div>
                            <div className="line_bottom"></div>
                        </div>
                    </div>
                    <div className="footer_row2">
                        <div className="terms_of_use">
                            <h5>© 2024 BOOKS4KIDS. 
                                <Link className='footer_nav_link' href='/terms_of_use'><span> {translations[lang].footer.terms_of_use}</span></Link> {translations[lang].other.and} <Link className='footer_nav_link' href='/privacy_policy'><span className='privacy_policy'>{translations[lang].footer.privacy_policy}.</span></Link></h5>
                        </div>
                    <div className='social_media_mobile'>
                    {isMedia750 &&
                        <div className="follow_us">{translations[lang].footer.follow_us}
                        <hr className="follow_us_line"/>
                        </div>
                    }
                    <ul className="social_media_icons">
                        <li>
                            <a href='https://linkedin.com' className="social_media_icon linkedIn"/>
                        </li>
                        <li>
                            <a href='https://facebook.com' className="social_media_icon fB"/>
                        </li>
                        <li>
                            <a href='https://instagram.com' className="social_media_icon instagram"/>
                        </li>
                    </ul>
                        </div>
                  </div>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;