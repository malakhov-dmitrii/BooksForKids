'use client'
import CardSmall from '@/components/modules/card/CardSmall';
import { useLang } from '@/hooks/useLang';
import { useViewedItems } from '@/hooks/useViewedItems';
import styles from '@/styles/viewedPage/index.module.css'

const ViewedPage = () => {
const { viewedItems } = useViewedItems()
const { lang, translations } = useLang()

    return (
         <main>
            <section className='container'>
                <div className={styles.viewed_items_container}>
                    <h1>{translations[lang].product.viewed_items}</h1>
                    <ul className={`list-reset ${styles.viewed_items_list}`}>
                        {(viewedItems.items || []).map((item) => (
                            <CardSmall key={item._id} item={item} />
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default ViewedPage;