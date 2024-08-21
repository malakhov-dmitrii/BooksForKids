import { useLang } from '@/hooks/useLang'
import styles from '@/styles/filters/index.module.css'
import CheckFilterBtn from './CheckFilterBtn'

const OnSaleFilter = ({
  handleApplyFilterOnSale,
}: {
  handleApplyFilterOnSale: (types: string[]) => void
}) => {
  const { lang, translations } = useLang()
  
  return (
    <div
      className={`body_medium ${styles.catalog_filters_check} ${styles.catalog_filters_check_on_sale}`}
    >
      <CheckFilterBtn
        className={``}
        callback={handleApplyFilterOnSale}
        btnText={translations[lang].catalog.on_sale}
      />
      {/* <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.shop_by_type}
        dynamicText={types.join(', ')}
      />
      {open && (
        <ul
          className={`${styles.catalog_filters_list}`}
        >
          {typesOptions.map((item) => (
            <CheckboxSelectItem
              key={item.id}
              item={item}
              callback={handleSelectType}
            />
          ))}
        </ul>
      )} */}
    </div>
  )
}

export default OnSaleFilter