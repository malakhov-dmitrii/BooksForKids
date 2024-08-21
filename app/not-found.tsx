'use client'
import Link from 'next/link';
import styles from '@/styles/notFoundPage/index.module.css'
import { useLang } from '@/hooks/useLang';


const NotFoundPage = () => {
    const { lang, translations } = useLang();

    return (
        <main>
            <section>
                <div className="container">
                    <div className={styles.not_found_page_content}>
                        <h1>404 Error</h1>
                        <h3>{translations[lang].other.err_msg1}<br />
                        {translations[lang].other.err_msg2}
                        </h3>
                        <Link className={`black_btn ${styles.empty_content_btn} `}  href='/'>
                        <div className={styles.btn_not_found_wrapper}>
                            <button className={`white_btn ${styles.btn_not_found}`}>
                                {translations[lang].other.homepage}
                            </button>
                        </div>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NotFoundPage;