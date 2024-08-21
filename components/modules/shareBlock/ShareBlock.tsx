'use client'
import { WhatsappShareButton, TelegramShareButton, EmailShareButton } from 'react-share'
import styles from '@/styles/shareBlock/index.module.css'

const ShareBlock = () => {
    return (
        <ul className={styles.socials}>
        <li>
          {/* <a
            href='mailto:rusbooksforkids@gmail.com'
            className={`${styles.social_media_icon} ${styles.letter}`}
          /> */}
           <EmailShareButton url={window.location.href}
          style={{marginRight: 20 }}>
            <span className={`${styles.social_media_icon} ${styles.letter}`}></span>
          </EmailShareButton>
        </li>
        <li>
          {/* <a
            href='https://facebook.com'
            className={`${styles.social_media_icon} ${styles.fB}`}
          /> */}
          <WhatsappShareButton url={window.location.href}
          style={{marginRight: 17 }}>
            <span className={`${styles.social_media_icon} ${styles.whatsapp}`}></span>
          </WhatsappShareButton>
        </li>
        <li>
          {/* <a
            href='https://instagram.com'
            className={`${styles.social_media_icon} ${styles.instagram}`}
          /> */}
          <TelegramShareButton url={window.location.href}>
            <span className={`${styles.social_media_icon} ${styles.telegram}`}></span>
          </TelegramShareButton>
        </li>
      </ul>
    );
};

export default ShareBlock;