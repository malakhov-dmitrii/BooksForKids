'use client'

import { AllowedLangs } from "@/constants/lang";
import { setLang } from "@/context/lang";
import { useLang } from "@/hooks/useLang";


const LangBlock= () => {
    const { lang, translations } = useLang();

    const handleSwitchLang = (lang: string) => {
        setLang(lang as AllowedLangs)
        localStorage.setItem('lang', JSON.stringify(lang))
    }

    const handleSwitchLangToRu = () => handleSwitchLang('ru')
    const handleSwitchLangToEn = () => handleSwitchLang('en')
    return ( 
        <div className="lang_container">
        <button className={`lang_btn ${lang === 'en' ? 'lang_active' : ""}`} 
        onClick={handleSwitchLangToEn}
        >
        EN
        </button>
        <button className={`lang_btn ${lang === 'ru' ? 'lang_active' : ""}`} 
        onClick={handleSwitchLangToRu}
        >
        RU
        </button>
    </div>
     );
}
 
export default LangBlock;