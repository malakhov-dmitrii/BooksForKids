import { IAmSelectItemProps } from '@/types/catalog'
import styles from '@/styles/filters/index.module.css'

const SelectItem = ({
  isActive,
  mobileClassName,
  item,
  setOption,
}: IAmSelectItemProps) => {

  const handleSelectOption = () => {
    if (isActive) {
      return
    }

    setOption(item.title)
    item.filterHandler()
  }

  return (
    <li
      className={`${styles.catalog_filters_list_item} ${
        isActive ? styles.option_active : ''
      } ${mobileClassName || ''}`}
    >
      {isActive && (
        <span
          className={`${mobileClassName}`}
        >
        </span>
      )}
      <button
        onClick={handleSelectOption}
        className={`${styles.catalog_filters_list_item_btn}`}
      >
        {item.title}
      </button>
    </li>
  )
}

export default SelectItem
