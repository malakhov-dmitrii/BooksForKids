'use client'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/home/index.module.css';

const ViewAllLink = () => {
  const { lang, translations } = useLang()
  const isMedia800 = useMediaQuery(800)


  return (
    <Link href='/catalog' className={styles.view_all_link}>
      <h4 className='capitalize'>{translations[lang].other.view_all_link}</h4>
      {isMedia800 &&
      <div className='capitalize body_small'>
      {translations[lang].other.view_all_link}
      </div>
     }
    </Link>
  )
}

export default ViewAllLink