import { IAmCheckboxSelectItemProps } from '@/types/catalog'
import styles from '@/styles/filters/index.module.css'

const CheckboxSelectItem = ({
  item,
  callback,
  mobileClassName,
}: IAmCheckboxSelectItemProps) => {
  const handleChangeOption = () => callback(item.value)

  return (
    <li
      className={`${styles.catalog_filters_list_item} ${
        item.checked ? styles.option_active : ''
      } ${mobileClassName}`}
    >
      <label className={`${styles.catalog_filters_list_item_btn}`}>
        <input
          type='checkbox'
          checked={item.checked}
          onChange={handleChangeOption}
          className={styles.catalog_filters_list_item_btn_input}
        />
        <span className={styles.catalog_filters_list_item_btn_checkbox_text}>
          {item?.title}
        </span>
      </label>
    </li>

  )
}

export default CheckboxSelectItem
