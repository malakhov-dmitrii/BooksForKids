
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { $products, loadProductsByFilter, loadProductsByFilterFx } from '@/context/goods'
import {
  checkOffsetParam,
  getSearchParamsUrl,
  updateSearchParam,
} from '@/lib/utils/common'
import { SearchParams } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.css'
import { usePathname } from 'next/navigation'

export const useProductFilters = (
  searchParams: SearchParams,
  category: string,
  isCatalog = false
) => {
  const products = useUnit($products)
  const isValidOffset = checkOffsetParam(searchParams.offset)
  const pagesCount = Math.ceil((products.count || 6) / 6)
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +(searchParams.offset || 0) : 0
  )
  const pathname = usePathname()

  useEffect(() => {
    const urlParams = getSearchParamsUrl()

    urlParams.delete('offset')

    if (!isValidOffset) {
      loadProductsByFilter({
        limit: 6,
        offset: 0,
        additionalParam: urlParams.toString(),
        isCatalog,
        category,
      })

      updateSearchParam('offset', 0, pathname)
      setCurrentPage(0)
      return
    }

    loadProductsByFilter({
      limit: 6 * +(searchParams.offset || 0) + 6,
      offset: +(searchParams.offset || 0) * 6,
      additionalParam: urlParams.toString(),
      isCatalog,
      category,
    })

    setCurrentPage(+(searchParams.offset || 0))
  }, [])

  const handlePageChange = ({ selected }: { selected: number }) => {
    const urlParams = getSearchParamsUrl()

    urlParams.delete('offset')

    loadProductsByFilter({
      limit: 6 * selected + 6,
      offset: selected * 6,
      additionalParam: urlParams.toString(),
      isCatalog,
      category,
    })

    updateSearchParam('offset', selected, pathname)
    setCurrentPage(selected)
  }

  // const handleApplyFiltersWithCategory = (categoryType: string) => {
  //   updateSearchParam('type', categoryType, pathname)
  //   handlePageChange({ selected: 0 })
  // }

  const handleApplyFiltersWithPrice = (priceFrom: string, priceTo: string) => {
    updateSearchParam('priceFrom', priceFrom, pathname)
    updateSearchParam('priceTo', priceTo, pathname)
    handlePageChange({ selected: 0 })
  }

  const handleApplyFiltersWithTypes = (types: string[]) => {
    updateSearchParam(
      'types',
      encodeURIComponent(JSON.stringify(types)),
      pathname
    )
    handlePageChange({ selected: 0 })
  }

  const handleApplyFilterOnSale = (isDiscount: string[]) => {
    updateSearchParam(
      'isDiscount',
      encodeURIComponent(JSON.stringify(isDiscount)),
      pathname
    )
    handlePageChange({ selected: 0 })
  }

  const  handleApplyFilterInStock = (isDiscount: string[]) => {
    updateSearchParam(
      'isDiscount',
      encodeURIComponent(JSON.stringify(isDiscount)),
      pathname
    )
    handlePageChange({ selected: 0 })
  }
 

  // const handleApplyFiltersWithColors = (sizes: string[]) => {
  //   updateSearchParam(
  //     'colors',
  //     encodeURIComponent(JSON.stringify(sizes)),
  //     pathname
  //   )
  //   handlePageChange({ selected: 0 })
  // }

  const handleApplyFiltersBySort = (sort: string) => {
    const urlParams = getSearchParamsUrl()
    const offset = urlParams.get('offset')

    updateSearchParam('sort', sort, pathname)
    handlePageChange({
      selected: checkOffsetParam(offset as string) ? +(offset || 0) : 0,
    })
  }

  const paginationProps = {
    containerClassName: styles.catalog_bottom_list,
    pageClassName: `catalog-pagination-item ${styles.catalog_bottom_list_item}`,
    pageLinkClassName: styles.catalog_bottom_list_item_link,
    previousClassName: `catalog-pagination-prev ${styles.catalog_bottom_list_prev}`,
    nextClassName: `catalog-pagination-next ${styles.catalog_bottom_list_next}`,
    breakClassName: styles.catalog_bottom_list_break,
    breakLinkClassName: styles.catalog_bottom_list_break_link,
    breakLabe: '...',
    pageCount: pagesCount,
    forcePage: currentPage,
  }

  return {
    paginationProps,
    products,
    pagesCount,
    handlePageChange,
    handleApplyFilterOnSale,
    handleApplyFilterInStock,
    // handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithTypes,
    // handleApplyFiltersWithColors,
    handleApplyFiltersBySort,
  }
}
