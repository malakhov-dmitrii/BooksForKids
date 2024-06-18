// import { IAmCheckFilterBtnProps } from "@/types/catalog";

import { useLang } from '@/hooks/useLang'
import { useProductFiltersFullWidth } from '@/hooks/useProductFiltersFullWidth';
import styles from '@/styles/shopFullWidth/index.module.css'
import { IAmFilterBtnProps } from '@/types/catalog';
// import React from 'react';

// import CatalogFilters from "./CatalogFilters";

const FilterBtn = ({
    callback,
    className,
}: IAmFilterBtnProps) => {
    // const [open, setOpen] = React.useState(false);
    const { lang, translations } = useLang()
    // const handleClick = () => {
    //     setOpen(!open);
    //   };
    // const {
    // products,
    // paginationProps,
    // handlePageChange,
    // // handleApplyFiltersWithCategory,
    // handleApplyFiltersWithPrice,
    // handleApplyFiltersWithTypes,
    // // handleApplyFiltersWithColors,
    // handleApplyFiltersBySort,
    // handleApplyFilterOnSale,
    // } = useProductFiltersFullWidth()

return (
<div>
    <button 
        onClick={callback} 
        className={`${styles.catalog_filter_btn}`}
    >
        {translations[lang].catalog.filter}
        {/* {open && <CatalogFilters 
            handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
            handleApplyFiltersWithTypes={handleApplyFiltersWithTypes}
            handleApplyFiltersBySort={handleApplyFiltersBySort} 
            handleApplyFilterOnSale={handleApplyFilterOnSale}
        />} */}
        {/* <div className={`${styles.filter_wrapper} ${open ? styles.filter_wrapper_active : ''}`}>
            <div className={`${styles.filter_flag} ${open ? styles.filter_flag_active : ''}`}></div>
        </div> */}
    </button> 
</div>
)
};
 
export default FilterBtn;

// const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className={`uppercase ${styles.calc_shipping_list_inner}`}>
//         <div className={styles.calc_shipping_list_inner_title}>
//             <h5>{translations[lang].cart.calculate_shipping}</h5>
//             <button className={`${styles.calc_shipping_list_inner_title_btn} ${open? 'calc_shipping_list_inner_title_btn_open' : 'calc_shipping_list_inner_title_btn_close'}`}
//             onClick={handleClick}
//             ><span /></button>
//         </div>
//         <div className={`${styles.calc_shipping_list_main} ${open? 'hide' : ''}`}>
//             <ul>
//             <li><select
//                 value={selectedState}
//                 className={styles.calc_shipping_select}
//                 onChange={() => {}}>
//                 {
//                     states.map(state => (