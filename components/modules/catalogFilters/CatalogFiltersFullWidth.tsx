import { useUnit } from 'effector-react'
// import CategorySelect from './CategorySelect'
import PriceSelect from './PriceSelect'
import { IAmCatalogFiltersProps } from '@/types/catalog'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import { $typesOptions } from '@/context/catalog'
import styles from '@/styles/shopFullWidth/index.module.css'
import TypesSelect from './TypesSelect'
import SortSelect from './SortSelect'
import OnSaleFilter from './OnSaleFilter'
import InStockFilter from './InStockFilter'

const CatalogFiltersFullWidth = ({
  handleApplyFiltersWithPrice,
     handleApplyFiltersWithTypes,
     handleApplyFilterOnSale,
     handleApplyFilterInStock,
  handleApplyFiltersBySort,
}: IAmCatalogFiltersProps) => {
  const typesOptions = useUnit($typesOptions)
  const isMedia910 = useMediaQuery(910)

    // setTypesOptions(updatedOptions)

  return (
    <>
      <div className={styles.catalog_filters}>
        <div className={styles.catalog_filters_top}>
          {isMedia910 && (
            <>
              <div className={styles.catalog_filters_top_left}>
                <SortSelect 
                  handleApplyFiltersBySort={handleApplyFiltersBySort}
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
          {!isMedia910 && (
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

export default CatalogFiltersFullWidth
