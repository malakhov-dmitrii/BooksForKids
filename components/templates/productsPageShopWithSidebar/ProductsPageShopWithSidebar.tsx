'use client'
import ReactPaginate from 'react-paginate'
import { useLang } from '@/hooks/useLang'
import { useProductFilters } from '@/hooks/useProductFilters'
import { IAmProductsPage } from '@/types/catalog'
import styles from '@/styles/sidebarShop/index.module.css'
import CardSmall from '@/components/modules/card/CardSmall'
import SearchBarFilters from '@/components/elements/searchBarFilters/SearchBarFilters'
import CatalogFilters from '@/components/modules/catalogFilters/CatalogFilters'
import CatalogFiltersFullWidth from '@/components/modules/catalogFilters/CatalogFiltersFullWidth'
import FilterBtn from '@/components/modules/catalogFilters/FilterBtn'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import React from 'react'
// import { setCatalogCategoryOptions } from "@/context/catalog";

const ProductsPageShopWithSidebar = ({
  searchParams,
  pageName,
}: IAmProductsPage) => {
  const { lang, translations } = useLang()
  const isMedia1300 = useMediaQuery(1300)
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
  } = useProductFilters(searchParams, pageName, pageName === 'catalog/shop_with_sidebar')

  return (
    <div className={`container ${styles.sidebar_shop_container}`}>
        {!isMedia800 ? 
          <h1>{translations[lang].home.shop_the_latest}</h1>
          : <h1>{translations[lang].home.shop}</h1>
        }
      {isMedia1300 &&
        <div /*className={styles.sidebar_filter_block}*/>
        <FilterBtn callback={handleClick} className={styles.sidebar_filter_btn}/>
      {open && (
        <CatalogFiltersFullWidth
          handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
          handleApplyFiltersWithTypes={handleApplyFiltersWithTypes}
          handleApplyFiltersBySort={handleApplyFiltersBySort}
          handleApplyFilterOnSale={handleApplyFilterOnSale}
          handleApplyFilterInStock={handleApplyFilterInStock}
        />
      )}
      </div>
      }
      <div className={styles.sidebar_shop_content}>
        <div className={styles.sidebar_container}>
          <SearchBarFilters />
          <CatalogFilters
            handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
            handleApplyFiltersWithTypes={handleApplyFiltersWithTypes}
            handleApplyFiltersBySort={handleApplyFiltersBySort}
            handleApplyFilterOnSale={handleApplyFilterOnSale}
            handleApplyFilterInStock={handleApplyFilterInStock}
          />
        </div>
        <div className={styles.sidebar_shop_right}>
          <ul className={styles.sidebar_shop_cards_list}>
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
    </div>
  )
}

export default ProductsPageShopWithSidebar