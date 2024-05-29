'use client'
import Link from "next/link";
import { useUnit } from 'effector-react'
import { useLang } from "@/hooks/useLang";
import { useUserLogout } from "@/hooks/useLogout";
import { $user } from '@/context/user'
import styles from '@/styles/myAccount/index.module.css'
import { $favorites, $favoritesFromLS } from "@/context/favorites";
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth";

const MyAccountDashboardPage = () => {
    const { lang, translations } = useLang();
    const handleLogout = useUserLogout();
    const user = useUnit($user);
    const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)


    return (
        <main className={`container ${styles.dashboard_page_container}`}>
            <section className={styles.dashboard_page}>
                <div className={styles.dashboard_page_content}>
                    <h1>{translations[lang].burger_menu_account.my_account}</h1>
                    <div className={styles.my_account_links_container}>
                        <h3 className={styles.my_account_link_active}>
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
                    <div className={styles.my_account_dashboard_content}>
                        <h5 className={styles.my_account_dashboard_content_h}>
                            {`${translations[lang].my_account.hello} ${user.name}! (${translations[lang].my_account.not} ${user.name}? `}
                        <button
                            className='accent'
                            onClick={handleLogout}
                            >
                            {translations[lang].my_account.log_out}
                        </button>
                        {`)`}
                        </h5>
                        <h5>
                        {translations[lang].my_account.from_you_account}
                        <Link href='/my-account/orders' className='lowercase accent'>{translations[lang].my_account.recent_orders}</Link>
                        {translations[lang].my_account.manage_your}
                        <Link href='/my-account/addresses' className='lowercase accent'>{translations[lang].my_account.addresses}</Link>
                        {translations[lang].my_account.and_edit}
                        <Link href='/my-account/account-details' className='lowercase accent'>{translations[lang].my_account.account_details}.</Link>
                        </h5>
                    </div>
                </div>
            </section>
        </main>
           );
};

export default MyAccountDashboardPage;