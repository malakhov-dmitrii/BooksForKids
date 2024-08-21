'use client'
import { useLang } from '@/hooks/useLang';
import { handleCloseShareModal } from '@/lib/utils/common';
import styles from '@/styles/shareModal/index.module.css'
import ShareBlock from '../shareBlock/ShareBlock';

const ShareModal = () => {
    const { lang, translations } = useLang()

    return (
        <div className={styles.share_modal}>
            <button className={styles.modal_close} onClick={handleCloseShareModal} />
            <div className={styles.share_modal_content}>
                <h5 className={styles.share_modal_title}>{translations[lang].product.share}</h5>
                <div className={styles.share_modal_icons_container}>
                    <ShareBlock />
                </div>
            </div>
        </div>
    );
};

export default ShareModal;