import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useLang } from '@/hooks/useLang'
import Card from '../card/Card'
import { $products } from '@/context/goods/state'
import { loadProductsByFilter } from '@/context/goods'
import ViewAllLink from '@/components/elements/viewAll/ViewAllLink'
import styles from '@/styles/product/index.module.css'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Slider from 'react-slick'
import { baseSettingsViewedSimilarSlider } from '@/constants/slider'

const SimilarItems = ({
  type,
  category,
}: {
  type: string
  category: string
}) => {
  const products = useUnit($products)
  const { lang, translations } = useLang()
  const isMedia520 = useMediaQuery(520)

  useEffect(() => {
    loadProductsByFilter({
      limit: 3,
      offset: 0,
      category,
      additionalParam: `type=${type}`,
    })
  }, [category, type])

  if (!products.items?.length) {
    return null
  }

  return (
    <>
      <div className={styles.similar_top}>
        <h2>{translations[lang].product.similar_items}</h2>
        {!isMedia520 && <ViewAllLink href={`/catalog?types=${type}&category=${category}`} />}
      </div>
      {!isMedia520 && <ul className={`list-reset ${styles.similar_container}`}>
        {(products.items || []).map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </ul>}
      {isMedia520 && 
        <Slider {...baseSettingsViewedSimilarSlider} className={`list-reset`}>
        {(products.items || []).map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </Slider>}
    </>
  )
}

export default SimilarItems
