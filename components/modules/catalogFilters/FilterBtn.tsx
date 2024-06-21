import { useLang } from '@/hooks/useLang'
import { useProductFiltersFullWidth } from '@/hooks/useProductFiltersFullWidth';
import styles from '@/styles/shopFullWidth/index.module.css'
import { IAmFilterBtnProps } from '@/types/catalog';

const FilterBtn = ({
    callback,
    className,
}: IAmFilterBtnProps) => {
    const { lang, translations } = useLang()

return (
<div>
    <button 
        onClick={callback} 
        className={`${styles.catalog_filter_btn}`}
    >
        {translations[lang].catalog.filter}
    </button> 
</div>
)
};
 
export default FilterBtn;