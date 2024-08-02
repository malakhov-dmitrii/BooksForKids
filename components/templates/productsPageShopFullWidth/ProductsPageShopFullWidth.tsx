'use client'
import ReactPaginate from 'react-paginate'
import { useLang } from '@/hooks/useLang'
import { IAmProductsPage } from '@/types/catalog'
import styles from '@/styles/shopFullWidth/index.module.css'
import CardSmall from '@/components/modules/card/CardSmall'
import SearchBarFilters from '@/components/elements/searchBarFilters/SearchBarFilters'
import { useEffect } from 'react'
import PriceSelect from '@/components/modules/catalogFilters/PriceSelect'
// import CatalogFilters from "@/components/modules/catalogFilters/CatalogFilters";
import { useProductFiltersFullWidth } from '@/hooks/useProductFiltersFullWidth'
import FilterBtn from '@/components/modules/catalogFilters/FilterBtn'
import React from 'react'
import CatalogFiltersFullWidth from '@/components/modules/catalogFilters/CatalogFiltersFullWidth'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const ProductsPageShopFullWidth = ({
  searchParams,
  pageName,
}: IAmProductsPage) => {
  const { lang, translations } = useLang()
  const isMedia800 = useMediaQuery(800)
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  const {
    products,
    paginationProps,
    handlePageChange,
    // handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithTypes,
    handleApplyFiltersBySort,
    handleApplyFilterOnSale,
    handleApplyFilterInStock,
  } = useProductFiltersFullWidth(
    searchParams,
    pageName,
    pageName === 'catalog/shop_full_width'
  )


  return (
    <div className={`container ${styles.fullwidth_shop_container}`}>
      <div className={styles.fullwidth_filter_block}>
        {!isMedia800 ? 
          <h1>{translations[lang].home.shop_the_latest}</h1>
          : <h1>{translations[lang].home.shop}</h1>
        }
        <FilterBtn callback={handleClick} className='' />
      </div>
      {open && (
        <CatalogFiltersFullWidth
          handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
          handleApplyFiltersWithTypes={handleApplyFiltersWithTypes}
          handleApplyFiltersBySort={handleApplyFiltersBySort}
          handleApplyFilterOnSale={handleApplyFilterOnSale}
          handleApplyFilterInStock={handleApplyFilterInStock}
        />
      )}
      <div className={styles.fullwidth_shop_right}>
        <ul className={styles.fullwidth_shop_cards_list}>
          {(products.items || []).map((item) => (
            <CardSmall key={item._id} item={item} />
          ))}
        </ul>
        {!products.items?.length && (
          <div className={styles.catalog_list_empty}>
            <h1>{translations[lang].other.nothing_found}</h1>
          </div>
        )}
        <div className={styles.page_pagination_container}>
          <ReactPaginate
            {...paginationProps}
            nextLabel={<span>{translations[lang].catalog.next_page}</span>}
            previousLabel={
              <span>{translations[lang].catalog.previous_page}</span>
            }
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductsPageShopFullWidth