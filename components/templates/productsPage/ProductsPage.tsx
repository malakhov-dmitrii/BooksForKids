'use client'
import ReactPaginate from "react-paginate";
import { useLang } from "@/hooks/useLang";
import { useProductFilters } from "@/hooks/useProductFilters";
import { IAmProductsPage } from "@/types/catalog";
import styles from '@/styles/catalog/index.module.css'

const ProductsPage = ({ searchParams, pageName }: IAmProductsPage) => {
    const { lang, translations } = useLang()
    const {
    products,
    paginationProps,
    // handlePageChange,
    // handleApplyFiltersWithCategory,
    // handleApplyFiltersWithPrice,
    // handleApplyFiltersWithSizes,
    // handleApplyFiltersWithColors,
    // handleApplyFiltersBySort,
  } = useProductFilters(searchParams, pageName, pageName === 'catalog')

  console.log(products)
    return (
        <>
            <div className={styles.catalog__bottom}>
                <ReactPaginate
                    {...paginationProps}
                    // nextLabel={<span>{translations[lang].catalog.next_page}</span>}
                    // previousLabel={
                    //     <span>{translations[lang].catalog.previous_page}</span>
                    // }
                    // onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default ProductsPage;