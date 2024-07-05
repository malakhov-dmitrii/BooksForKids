import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { allowedTypes } from '@/constants/product';
import { useLang } from '@/hooks/useLang';
import Card from '../card/Card';
import { $products } from '@/context/goods/state';
import { loadProductsByFilter } from '@/context/goods';

const SimilarItems = ({ type }: { type: string}) => {
const products = useUnit($products)
const { lang, translations } = useLang()

useEffect(() => {
    loadProductsByFilter({
      limit: 4,
      offset: 0,
      category:
      allowedTypes[
          Math.floor(Math.random() * allowedTypes.length)
        ],
      additionalParam: `type=${type}`,
    })
  }, [])

  if (!products.items?.length) {
    return null
  }

  console.log(products);

    return (
        <>
        <h2>{translations[lang].product.similar_items}</h2>
        <ul>
            {(products.items || []).map((item) => (
              <Card key={item._id} item={item} />
            ))}
        </ul>
        </>
    );
};

export default SimilarItems;