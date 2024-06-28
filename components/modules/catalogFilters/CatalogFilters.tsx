import { useUnit } from 'effector-react'
// import CategorySelect from './CategorySelect'
import PriceSelect from './PriceSelect'
import { IAmCatalogFiltersProps } from '@/types/catalog'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import {
  setTypes,
} from '@/context/catalog'
// import SelectInfoItem from './SelectInfoItem'
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
  handleApplyFiltersBySort,
}: IAmCatalogFiltersProps) => {
  const typesOptions = useUnit($typesOptions)
  const isMedia715 = useMediaQuery(715)
  const isMedia610 = useMediaQuery(610)

    // setTypesOptions(updatedOptions)

  return (
    <>
      <div className={styles.catalog_filters}>
        <div className={styles.catalog_filters_top}>
          {!isMedia610 && (
            <>
              <div className={styles.catalog_filters_top_left}>
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
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CatalogFilters
