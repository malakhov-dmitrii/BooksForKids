import { IAmSelectBtnProps } from '@/types/catalog'
import styles from '@/styles/filters/index.module.css'

const SelectBtn = ({
  open,
  toggle,
  dynamicText,
  defaultText,
}: IAmSelectBtnProps) => (
  <button
    className={`${styles.catalog_filters_btn} ${
      open ? styles.is_open : ''
    }`}
    onClick={toggle}
  >
    {dynamicText ? (
      <span className={styles.catalog_filters_btn_inner}>
        <span className={styles.catalog_filters_btn_text}>
          {defaultText}
        </span>
        <span className={styles.catalog_filters_btn_info}>
          {dynamicText}
        </span>
      </span>
    ) : (
      defaultText
    )}
  </button>
)

export default SelectBtn
