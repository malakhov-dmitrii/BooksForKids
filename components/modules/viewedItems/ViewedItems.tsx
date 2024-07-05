import { useLang } from '@/hooks/useLang'
import { IAmProducts } from '@/types/goods'
import styles from '@/styles/viewedItems/index.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Slider from 'react-slick'
import Card from '../card/Card'
import ViewAllLink from '@/components/elements/viewAll/ViewAllLink'

const ViewedItems = ({ viewedItems }: { viewedItems: IAmProducts }) => {
  const { lang, translations } = useLang()
  const isMedia430 = useMediaQuery(430)
  const isMedia370 = useMediaQuery(370)

  const settings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
    autoplay: false,
    arrows: false,
  }

  return (
    <div className={styles.viewed}>
      <h2>{translations[lang].product.viewed_items}</h2>
      <ViewAllLink href='/viewed' />
      <div className={styles.viewed_inner}>
        <Slider {...settings} className={styles.viewed_slider}>
          {(viewedItems.items || []).map((item) => (
            <div
              key={item._id}
              className={styles.viewed_slide}
              style={{ width: isMedia370 ? 240 : isMedia430 ? 280 : 350 }}
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
