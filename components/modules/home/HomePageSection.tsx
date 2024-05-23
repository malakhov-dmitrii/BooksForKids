import { useLang } from '@/hooks/useLang';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IAmHomePageSectionProps } from '@/types/homePage';
import styles from '@/styles/home/index.module.css';
import ViewAllLink from '@/components/elements/viewAll/ViewAllLink';
import Card from '../card/Card';


const HomePageSection = ({goods}: IAmHomePageSectionProps) => {
    const { lang, translations } = useLang()
    const isMedia800 = useMediaQuery(800)
    
    return (
    
        <section className={styles.home_section}>
            <div className={`container ${styles.home_section_container}`}>
                <div className={styles.home_section_text}>
                    <h1 className='capitalize'>
                    {translations[lang].home.shop_the_latest}
                    </h1>
                    {isMedia800 &&
                    <h5 className='capitalize'> {translations[lang].home.shop_the_latest}</h5>
                    }
                    <ViewAllLink />
                </div>
                <ul className={styles.home_section_list}>
                    {goods.map((item) => (
                        <Card key={item._id} item={item} />
                    )
                    )}
                </ul> 
            </div>
        </section>
    );
                            }

export default HomePageSection;