import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { usePriceFilter } from '@/hooks/usePriceFilter'
import SelectBtn from './SelectBtn'
import styles from '@/styles/filters/index.module.css'
import { IAmHomePageSectionProps } from '@/types/homePage';
import { $homePageGoods } from '@/context/goods'
import { formatPrice } from '@/lib/utils/common';
import { getCheckedPriceFrom, getCheckedPriceTo } from '@/lib/utils/catalog'

const PriceSelect = ({
  handleApplyFiltersWithPrice,
}: {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
}) => {
  const { lang, translations } = useLang()
  const { open, ref, toggle, setOpen } = useClickOutside()
  const {
    setPriceFrom,
    setPriceTo,
    priceFrom,
    priceTo,
    setPriceInfo,
    priceInfo,
    priceFromInfo,
    priceToInfo,
    handleChangePriceFrom,
    handleChangePriceTo,
  } = usePriceFilter()

  const handleSelectPrice = () => {
    const validPriceFrom = getCheckedPriceFrom(+priceFrom) as string
    const validPriceTo = getCheckedPriceTo(+priceTo) as string

    setPriceFrom(validPriceFrom)
    setPriceTo(validPriceTo)
    setPriceInfo(
      `${priceFromInfo(validPriceFrom)} ${priceToInfo(validPriceTo)}`
    )
    setOpen(false)
    handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
  }

  const handleClearPrice = () => {
    setPriceFrom('')
    setPriceTo('')
    setPriceInfo('')
    setOpen(false)
    handleApplyFiltersWithPrice('', '')
  }

  return (
    <div className={`body_medium ${styles.catalog_filters_select}`} ref={ref}>
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.price}
        dynamicText={priceInfo}
      />
        {open && (
          <ul
            className={`${styles.catalog_filters_list}`}
          >
            <li
              className={`${styles.catalog_filters_list_item} ${styles.catalog_filters_list_item_price}`}
            >
 <div className={styles.catalog_filters_list_item_inputs}>
              <label>
                <span>{translations[lang].catalog.from}</span>
                <input
                  type='text'
                  placeholder={formatPrice(10)}
                  value={priceFrom}
                  onChange={handleChangePriceFrom}
                  className={styles.catalog_filters_list_item_price_input}
                />
              </label>
              <label>
                <span>{translations[lang].catalog.to}</span>
                <input
                  type='text'
                  placeholder={formatPrice(200)}
                  value={priceTo}
                  onChange={handleChangePriceTo}
                  className={styles.catalog_filters_list_item_price_input}
                />
              </label>
            </div>
            <button
              className={`white_btn ${styles.catalog_filters_list_item_done}`}
              disabled={!priceFrom && !priceTo}
              onClick={handleSelectPrice}
            >
              {translations[lang].catalog.done}
            </button>
            <button
              className={`white_btn ${styles.catalog_filters_list_item_done}`}
              onClick={handleClearPrice}
            >
              {translations[lang].catalog.clear}
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export default PriceSelect
