import styles from '@/styles/searchBarFilters/index.module.css'

const SearchBarFilters = () => {
    return ( 
        <div className={styles.search_bar_filters}>
            <div className={styles.input_wrapper_search}>
                <div className={styles.search_icon}></div>
                <input className={`body_medium ${styles.input_search}`} type="text" placeholder="Search..." />
            </div>
        </div>
     );
}
 
export default SearchBarFilters;