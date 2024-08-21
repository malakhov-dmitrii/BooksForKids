import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import styles from '@/styles/product/index.module.css'

const ItemAdded = () => {
    const { lang, translations } = useLang()

    return (
        <div className={styles.item_added_block}>
            <h5 className={styles.item_added_text}>{translations[lang].product.item_added}</h5>
            <Link href='/cart' className={`body_large uppercase ${styles.item_added_block_btn}`}>
                {translations[lang].other.view_cart}
            </Link>
        </div>
    );
};

export default ItemAdded;