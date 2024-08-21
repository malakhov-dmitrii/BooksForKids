import { useLang } from '@/hooks/useLang'
import { IAmProducts } from '@/types/goods'
import styles from '@/styles/viewedItems/index.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Slider from 'react-slick'
import Card from '../card/Card'
import ViewAllLink from '@/components/elements/viewAll/ViewAllLink'
import { baseSettingsViewedSimilarSlider } from '@/constants/slider'
import Link from 'next/link'

const ViewedItems = ({ viewedItems }: { viewedItems: IAmProducts }) => {
  const { lang, translations } = useLang()
  const isMedia520 = useMediaQuery(520)
  const isMedia430 = useMediaQuery(430)
  const isMedia370 = useMediaQuery(370)

  return (
    <div className={styles.viewed}>
      {isMedia520 && <div className={styles.viewed_top}>
        <Link href='/viewed'><h5>{translations[lang].product.viewed_items}</h5></Link>
        </div> }
        {!isMedia520 && <div className={styles.viewed_top}> 
          <h2>{translations[lang].product.viewed_items}</h2>
        <ViewAllLink href='/viewed' />
        </div>
        }
      <div className={styles.viewed_inner}>
        <Slider {...baseSettingsViewedSimilarSlider}>
          {(viewedItems.items || []).map((item) => (
            <div
              key={item._id}
              className={`list-reset viewed_slide`}
              // style={{ margin-right: isMedia370 ? 240 : isMedia430 ? 280 : 350 }}
            >
              <Card item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ViewedItems