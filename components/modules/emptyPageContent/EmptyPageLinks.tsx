import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import styles from '@/styles/emptyPageContent/index.module.css'

const EmptyPageLinks = ({btnText}: { btnText: string }) => {
    const { lang, translations } = useLang();
    
    return (
        <div className={styles.empty_content_links}>
            <Link className={`black_btn ${styles.empty_content_btn} `} href='/catalog'>{btnText}</Link>
            <Link className={`black_btn ${styles.empty_content_btn} `}  href='/'>{translations[lang].other.to_home_page}</Link>
            
        </div>
    );
};

export default EmptyPageLinks;