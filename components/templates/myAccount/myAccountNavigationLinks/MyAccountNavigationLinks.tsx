import Link from "next/link";
import { useLang } from "@/hooks/useLang";
import { $favorites, $favoritesFromLS } from "@/context/favorites";
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth";
import { useUserLogout } from "@/hooks/useLogout";
import styles from '@/styles/myAccount/index.module.css'

const MyAccountNavigationLinks = () => {
    const { lang, translations } = useLang();
    const handleLogout = useUserLogout();
    const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

    return (
        <div className={styles.my_account_links_container}>
        <h3 /*className={styles.my_account_link_active}*/>
            <Link href='/my-account/dashboard' className={styles.my_account_links}>
                {translations[lang].my_account.dashboard}
            </Link>
        </h3>
        <h3>
            <Link href='/my-account/orders' className={styles.my_account_links}>
                {translations[lang].my_account.orders}
            </Link>
        </h3>
        <h3>
            <Link href='/wishlist' className={styles.my_account_links}>
                {translations[lang].my_account.wishlist}
                {!!currentFavoritesByAuth.length && 
                    <span className={styles.my_account_not_empty_count}> ({currentFavoritesByAuth.length})</span>
                }
            </Link>
        </h3>
        <h3>
            <Link href='/my-account/addresses' className={styles.my_account_links}>
                {translations[lang].my_account.addresses}
            </Link>
        </h3>
        <h3>
            <Link href='/my-account/account-details' className={styles.my_account_links}>
                {translations[lang].my_account.account_details}
            </Link>
        </h3>
        <h3>
            <button
                className={styles.my_account_links}
                onClick={handleLogout}
                >
                {translations[lang].header.logout}
            </button>
        </h3>
    </div>
    );
};

export default MyAccountNavigationLinks;