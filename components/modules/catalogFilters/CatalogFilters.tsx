import { useUnit } from 'effector-react'
// import CategorySelect from './CategorySelect'
import PriceSelect from './PriceSelect'
import { IAmCatalogFiltersProps } from '@/types/catalog'
// import SizesSelect from './SizesSelect'
// import ColorsSelect from './ColorsSelect'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
//   setColors,
//   setColorsOptions,
//   setFiltersPopup,
  setTypes,
} from '@/context/catalog'
// import SelectInfoItem from './SelectInfoItem'
// import FiltersPopup from './FiltersPopup/FiltersPopup'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { $typesOptions } from '@/context/catalog'
import styles from '@/styles/catalog/index.module.css'
import TypesSelect from './TypesSelect'
import SortSelect from './SortSelect'
import OnSaleFilter from './OnSaleFilter'
import InStockFilter from './InStockFilter'

const CatalogFilters = ({
  handleApplyFiltersWithPrice,
     handleApplyFiltersWithTypes,
     handleApplyFilterOnSale,
     handleApplyFilterInStock,
//   handleApplyFiltersWithColors,
  handleApplyFiltersBySort,
}: IAmCatalogFiltersProps) => {
  const typesOptions = useUnit($typesOptions)
//   const colorsOptions = useUnit($colorsOptions)
  const isMedia715 = useMediaQuery(715)
  const isMedia610 = useMediaQuery(610)

//   const handleRemoveSizeOption = (id: number) => {
//     const updatedOptions = sizesOptions.map((item) =>
//       item.id === id ? { ...item, checked: false } : item
//     )

    // setTypesOptions(updatedOptions)

//     const updatedSizes = updatedOptions
//       .filter((item) => item.checked)
//       .map((item) => item.size)

//     setSizes(updatedSizes)
//     handleApplyFiltersWithSizes(updatedSizes)
//   }

//   const handleRemoveColorOption = (id: number) => {
//     const updatedOptions = colorsOptions.map((item) =>
//       item.id === id ? { ...item, checked: false } : item
//     )

//     setColorsOptions(updatedOptions)

//     const updatedColorsByText = updatedOptions
//       .filter((item) => item.checked)
//       .map(({ colorText }) => colorText)

//     const updatedColorsByCode = updatedOptions
//       .filter((item) => item.checked)
//       .map(({ colorCode }) => colorCode)

//     setColors(updatedColorsByText)
//     handleApplyFiltersWithColors(updatedColorsByCode)
//   }

//   const handleOpenPopup = () => {
//     addOverflowHiddenToBody()
//     setFiltersPopup(true)
//   }

  return (
    <>
      {/* <FiltersPopup
        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        handleApplyFiltersWithColors={handleApplyFiltersWithColors}
      /> */}
      <div className={styles.catalog_filters}>
        <div className={styles.catalog_filters_top}>
          {!isMedia610 && (
            <>
              <div className={styles.catalog_filters_top_left}>
                {/* {isMedia910 && (
                  <SizesSelect
                    handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
                  />
                )} */}
                <TypesSelect
                  handleApplyFiltersWithTypes={handleApplyFiltersWithTypes}
                />
                <SortSelect 
                  handleApplyFiltersBySort={handleApplyFiltersBySort}
                />
                <PriceSelect
                  handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
                />
                <OnSaleFilter
                  handleApplyFilterOnSale={handleApplyFilterOnSale}
                />
                <InStockFilter
                    handleApplyFilterInStock={handleApplyFilterInStock}
                />
              </div>
              {/* {!isMedia715 && (
                <SizesSelect
                  handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
                />
              )} */}
            </>
          )}
          {/* {isMedia610 && (
            <>
              <SortSelect handleApplyFiltersBySort={handleApplyFiltersBySort} />
              <button
                className={`btn-reset ${styles.catalog__filters__top__filter_btn}`}
                onClick={handleOpenPopup}
              />
            </>
          )} */}
        </div>
        {/* <div className={styles.catalog__filters__bottom}>
          <motion.ul
            className={`${styles.catalog__filters__bottom__list}`}
            {...basePropsForMotion}
          >
            {sizesOptions
              .filter((item) => item.checked)
              .map((item) => (
                <SelectInfoItem
                  key={item.id}
                  id={item.id}
                  text={item.size}
                  handleRemoveItem={handleRemoveSizeOption}
                />
              ))}
            {colorsOptions
              .filter((item) => item.checked)
              .map((item) => (
                <SelectInfoItem
                  key={item.id}
                  id={item.id}
                  text={item.colorText}
                  handleRemoveItem={handleRemoveColorOption}
                />
              ))}
          </motion.ul>
        </div> */}
      </div>
    </>
  )
}

export default CatalogFilters
