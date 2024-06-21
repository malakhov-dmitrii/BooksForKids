import { useCartAction } from "@/hooks/useCartAction";
import { useLang } from "@/hooks/useLang";
import styles from '@/styles/productDescription/index.module.css';
import React from "react";

const ProductDescription = () => {
    const { lang, translations } = useLang()
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const { product } = useCartAction()

    return (
    <div className={styles.more_info_description_container} onClick={handleClick}>
        <div className={`${styles.more_info_description} ${open ? styles.more_info_description_open : styles.more_info_description_closed}`}>
            {product.description}
        </div>
        <div className={styles.description_btn_container}>
            <button className={`body_small ${styles.more_info_description_btn}`}>
                {!open ? 
                    <span>{translations[lang].product.more_info}</span> 
                    :
                    <span>{translations[lang].product.less_info}</span>
                }
            </button>
        </div>
    </div>
    )
}
 
export default ProductDescription;