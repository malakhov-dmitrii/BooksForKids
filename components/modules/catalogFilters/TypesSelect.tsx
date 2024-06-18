import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { useTypeFilter } from '@/hooks/useTypeFilter'
import SelectBtn from './SelectBtn'
import CheckboxSelectItem from './CheckboxSelectItem'
import styles from '@/styles/filters/index.module.css'

const TypesSelect = ({
  handleApplyFiltersWithTypes,
}: {
  handleApplyFiltersWithTypes: (types: string[]) => void
}) => {
  const { lang, translations } = useLang()
  const { open, ref, toggle } = useClickOutside()
  const { handleSelectType, types, typesOptions } = useTypeFilter(
    handleApplyFiltersWithTypes
  )

  return (
    <div
      className={`body_medium ${styles.catalog_filters_select} ${styles.catalog_filters_select_type}`}
      ref={ref}
    >
      <SelectBtn
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
      )}
    </div>
  )
}

export default TypesSelect
