import { useCartAction } from "@/hooks/useCartAction";
import { useLang } from "@/hooks/useLang";
import styles from '@/styles/productDescription/index.module.css';

const ProductDescription = () => {
    const { lang, translations } = useLang()
    const { product } = useCartAction()

    if (product.description.length > 100) {
        product.description = Array.from(product.description).slice(1, 100).join('') + ' ...'
    } 

    const showDescription = () => {
        product.description = Array.from(product.description).slice(1, product.description.length).join('')
    }

    return (
    <div className={styles.more_info_description} >{product.description}
    <span className={styles.more_info_description_span}><button onClick={showDescription} className={`body_small ${styles.more_info_description_btn} `}>{translations[lang].product.more_info}</button></span>
    </div>
    )
}
 
export default ProductDescription;