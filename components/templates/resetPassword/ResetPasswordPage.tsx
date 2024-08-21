'use client'
import EmailInput from "@/components/modules/profilePage/EmailInput";
import { useLang } from "@/hooks/useLang";
import { IAmInput } from "@/types/authPopup";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import styles from '@/styles/resetPassword/index.module.css'


const ResetPasswordPage = () => {

    const { lang, translations } = useLang();
    return (
        <main className={`container ${styles.reset_password_page}`}>
            <section>
                <div className={styles.reset_password_page_container}>
                    <h1>{translations[lang].auth_popup.forgot_password}</h1>
                    <h3>{translations[lang].other.if_you_forgot_password}</h3>
                    <EmailInput register={register} errors={errors} />
                    <button
                        onClick={() => {}}
                        className={`black_btn uppercese ${styles.reset_password_btn}`}
                    >{translations[lang].other.reset_pasword}</button>
                </div>
            </section>
        </main>
    );
};

export default ResetPasswordPage;