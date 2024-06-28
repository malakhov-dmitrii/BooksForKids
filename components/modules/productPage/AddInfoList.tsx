import { useLang } from "@/hooks/useLang";
import styles from '@/styles/product/index.module.css';
import { IAmProduct } from '@/types/common';

const AddInfoList = ({ product }: { product: IAmProduct }) => {

    const additionalInfoHeadings = [
        {
            id: 1,
            text: translations[lang].product.sku,
        },
        {
            id: 2,
            text: translations[lang].product.type,
        },
        {
            id: 3,
            text: translations[lang].product.year,
        },
        {
            id: 4,
            text: translations[lang].product.authors,
        },
        {
            id: 5,
            text: translations[lang].product.publishing,
        },
        {
            id: 6,
            text: translations[lang].product.age,
        },
        {
            id: 7,
            text: translations[lang].product.size,
        },
        {
            id: 8,
            text: translations[lang].product.number_of_pages,
        },
        {
            id: 9,
            text: translations[lang].product.weight,
        },
        {
            id: 10,
            text: translations[lang].product.cover,
        }
      ];
    
      const additionalInfoContent = [
        {
            id: 1,
            text: product.vendorCode,
        },
        {
            id: 2,
            text: product.type,
        },
        {
            id: 3,
            text: product.characteristics.year,
        },
        {
            id: 4,
            text: product.authors,
        },
        {
            id: 5,
            text: product.characteristics.publishing,
        },
        {
            id: 6,
            text: product.characteristics.age,
        },
        {
            id: 7,
            text: product.characteristics.size,
        },
        {
            id: 8,
            text: product.characteristics.number_of_pages,
        },
        {
            id: 9,
            text: product.characteristics.weight,
        },
        {
            id: 10,
            text: product.characteristics.cover,
        },
        {
            id: 11,
            text: product.characteristics.features,
        },
      ]

  return (
    <>
        {additionalInfoHeadings.map((item) => (
          <li
            key={item.id}
            className={styles.djhgdfjh}
          >
            <dl>
            {additionalInfoHeadings.map((item) => (
                <dt
                key={item.id}
                className={styles.djhgdfjh}>

            </dt>
        ))}
            {additionalInfoContent.map((item) => (
                <dd
                key={item.id}
                className={styles.djhgdfjh}>
            </dd>
        ))}
            </dl>
          </li>
        ))}
    </>
  )
}

export default AddInfoList