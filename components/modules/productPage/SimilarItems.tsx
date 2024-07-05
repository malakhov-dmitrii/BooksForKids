import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { useLang } from '@/hooks/useLang'
import Card from '../card/Card'
import { $products } from '@/context/goods/state'
import { loadProductsByFilter } from '@/context/goods'

const SimilarItems = ({
  type,
  category,
}: {
  type: string
  category: string
}) => {
  const products = useUnit($products)
  const { lang, translations } = useLang()

  useEffect(() => {
    loadProductsByFilter({
      limit: 4,
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
      <h2>{translations[lang].product.similar_items}</h2>
      <ul>
        {(products.items || []).map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </ul>
    </>
  )
}

export default SimilarItems
