import { useLang } from '@/hooks/useLang'
import styles from '@/styles/product/index.module.css'
import { IAmProduct } from '@/types/common'

const AddInfoList = ({ product }: { product: IAmProduct }) => {
  const { lang, translations } = useLang()
  const additionalInfo = [
    {
      id: 1,
      title: translations[lang].product.sku,
      text: product.vendorCode,
    },
    {
      id: 2,
      title: translations[lang].product.type,
      text: product.type,
    },
    {
      id: 3,
      title: translations[lang].product.year,
      text: product.characteristics.year,
    },
    {
      id: 4,
      title: translations[lang].product.authors,
      text: product.characteristics.author,
    },
    {
      id: 5,
      title: translations[lang].product.publishing,
      text: product.characteristics.publishing,
    },
    {
      id: 6,
      title: translations[lang].product.age,
      text: product.characteristics.age,
    },
    {
      id: 7,
      title: translations[lang].product.size,
      text: product.characteristics.size,
    },
    {
      id: 8,
      title: translations[lang].product.number_of_pages,
      text: product.characteristics.number_of_pages,
    },
    {
      id: 9,
      title: translations[lang].product.weight,
      text: product.characteristics.weight,
    },
    {
      id: 10,
      title: translations[lang].product.cover,
      text: product.characteristics.cover,
    },
  ]

  return (
    <>
      {additionalInfo.map((item) => (
        <li key={item.id} className='list-reset'>
          <dl key={item.id} className={styles.additional_info_row}>
            <dt className={styles.additional_info_heading}>{item.title}:</dt>
            <dd className={styles.additional_info_content}>{item.text}</dd>
          </dl>
        </li>
      ))}
    </>
  )
}

export default AddInfoList