'use client'
import ReactPaginate from "react-paginate";
import { useLang } from "@/hooks/useLang";
import { useProductFilters } from "@/hooks/useProductFilters";
import { IAmProductsPage } from "@/types/catalog";
import styles from '@/styles/sidebarShop/index.module.css'
import CardSmall from "@/components/modules/card/CardSmall";
import SearchBarFilters from "@/components/elements/searchBarFilters/SearchBarFilters";
import { useEffect } from "react";
import PriceSelect from "@/components/modules/catalogFilters/PriceSelect";
import CatalogFilters from "@/components/modules/catalogFilters/CatalogFilters";
// import { setCatalogCategoryOptions } from "@/context/catalog";

const ProductsPage = ({ searchParams, pageName }: IAmProductsPage) => {
    const { lang, translations } = useLang()
    const {
    products,
    paginationProps,
    handlePageChange,
    // handleApplyFiltersWithCategory,
    handleApplyFiltersWithPrice,
    handleApplyFiltersWithTypes,
    // handleApplyFiltersWithColors,
    handleApplyFiltersBySort,
    handleApplyFilterOnSale,
  } = useProductFilters(searchParams, pageName, pageName === 'catalog')

// useEffect(() => {
//     if (pageName == 'catalog') {
//         setCatalogCategoryOptions({
//             rootCatrgoryOptions: [
//                 {
//                     id: 2,
//                     title: translations[lang].catalog.russian_books,
//                     href: '/catalog/russianbooks',
//                 }
//             ],
//         })
//         break
//     }
// })

    return (
        <div className={`container ${styles.sidebar_shop_container}`}>
            <h1>{translations[lang].home.shop_the_latest}</h1>
            <div className={styles.sidebar_shop_content}>
                <div className={styles.sidebar_container}>
                    <SearchBarFilters />
                    <CatalogFilters
                        handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
                        handleApplyFiltersWithTypes={handleApplyFiltersWithTypes}
                        handleApplyFiltersBySort={handleApplyFiltersBySort} 
                        handleApplyFilterOnSale={handleApplyFilterOnSale}
                        />
                </div>
                <div className={styles.sidebar_shop_right}>
                    <ul className={styles.sidebar_shop_cards_list}>
                        {(products.items || []).map((item) => (
                            <CardSmall key={item._id} item={item}/>
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
                            nextLabel={
                              <span>{translations[lang].catalog.next_page}</span>}
                            previousLabel={
                              <span>{translations[lang].catalog.previous_page}</span>
                            }
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;