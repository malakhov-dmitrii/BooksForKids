import { IAmCheckFilterBtnProps } from '@/types/catalog'
import styles from '@/styles/filters/index.module.css'
import React from 'react'

const CheckFilterBtn = ({
  callback,
  className,
  btnText,
}: IAmCheckFilterBtnProps) => {
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
    callback(!open)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`${styles.catalog_check_filter_btn}`}
      >
        {btnText}
        <div
          className={`${styles.check_filter_wrapper} ${open ? styles.check_filter_wrapper_active : ''}`}
        >
          <div
            className={`${styles.check_filter_flag} ${open ? styles.check_filter_flag_active : ''}`}
          ></div>
        </div>
      </button>
    </div>
  )
}

export default CheckFilterBtn