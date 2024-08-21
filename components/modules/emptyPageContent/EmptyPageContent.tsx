import Image from 'next/image'
import { useLang } from '@/hooks/useLang'
import { IAmEmptyPageContentProps } from '@/types/modules'
import styles from '@/styles/emptyPageContent/index.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ghost from '@/public/img/pics/ghosts.png'
import EmptyPageLinks from './EmptyPageLinks'

const EmptyPageContent = ({
  title,
  description,
  btnText,
  loading = false,
}: IAmEmptyPageContentProps) => {
  const { lang, translations } = useLang()
  const isMedia1140 = useMediaQuery(1140)
  const isMedia570 = useMediaQuery(570)

  return (
    <div className={styles.empty_content}>
      {!loading && (
        <div className={styles.empty_content_left}>
          <Image src={ghost} alt='empty cart' width={240} height={240} />
        </div>
      )}
      <div className={styles.empty_content_right}>
        <h1 className={styles.empty_content_title}>{title}</h1>
        <h5 className={styles.empty_content_description}>{description}</h5>
        {!loading && <EmptyPageLinks btnText={btnText} />}
      </div>
    </div>
  )
}

export default EmptyPageContent
