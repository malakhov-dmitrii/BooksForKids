import { useLang } from '@/hooks/useLang'
import { IAmCardLabelProps } from '@/types/modules'
import styles from '@/styles/card/index.module.css'

const CardLabel = ({
  isNew,
  isBestSeller,
  isDiscount,
  inStock,
}: IAmCardLabelProps) => {
  const { lang, translations } = useLang()

  const outOfStockLabel =
    inStock === undefined ? null : (
      <span className={`${styles.list_item_label} ${styles.list_item_instock}`}>
        {translations[lang].home.out_of_stock}
      </span>
    )

  const newLabel =
    isNew === undefined ? null : (
      <span className={`${styles.list_item_label} ${styles.list_item_isnew}`}>
        {translations[lang].home.is_new}
      </span>
    )

  const bestSellerLabel = (
    <span
      className={`${styles.list_item_label} ${styles.list_item_isbestseller}`}
    >
      {translations[lang].home.is_bestseller}
    </span>
  )

  const discountLabel = (
    <span
      className={
        isDiscount
          ? `discount ${styles.list_item_label} ${styles.list_item_isdiscount}`
          : `${styles.list_item_display_none}`
      }
    >
      {isDiscount}
    </span>
  )

  const newBestSellerLabels = (
    <div className={styles.list_item_label_few}>
      {newLabel}
      {bestSellerLabel}
    </div>
  )

  const newDiscountLabels = (
    <div className={styles.list_item_label_few}>
      {newLabel}
      {discountLabel}
    </div>
  )

  const bestSellerDiscountLabels = (
    <div className={styles.list_item_label_few}>
      {bestSellerLabel}
      {discountLabel}
    </div>
  )

  const newBestSellerDiscountLabels = (
    <div className={styles.list_item_label_few}>
      {newLabel}
      {bestSellerLabel}
      {discountLabel}
    </div>
  )

  if (!inStock) {
    return outOfStockLabel
  } else {
    if (isNew && isBestSeller && isDiscount) {
      return newBestSellerDiscountLabels
    }

    if (isNew && isBestSeller) {
      return newBestSellerLabels
    }

    if (isNew && isDiscount) {
      return newDiscountLabels
    }

    if (isBestSeller && isDiscount) {
      return bestSellerDiscountLabels
    }

    if (isNew) {
      return newLabel
    }

    if (isBestSeller) {
      return bestSellerLabel
    }

    return discountLabel
  }
}

export default CardLabel
