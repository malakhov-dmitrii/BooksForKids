'use client'
import Link from 'next/link'
import { useUnit } from 'effector-react'
import { useLang } from '@/hooks/useLang'
import { useUserLogout } from '@/hooks/useLogout'
import styles from '@/styles/myAccount/index.module.css'
import 'slick-carousel/slick/slick.css'
// import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from '@/hooks/useMediaQuery'
import MyAccountMobileSlider from '../myAccountMobileSlider/MyAccountMobileSlider'
import { $user } from '@/context/user/state'
// import { $isAuth } from "@/context/auth/state";

const MyAccountDashboardPage = () => {
  const { lang, translations } = useLang()
  const handleLogout = useUserLogout()
  const user = useUnit($user)
  // const user = { name: 'John Doe' }
  const isMedia615 = useMediaQuery(615)
  // const isAuth = useUnit($isAuth)

  return (
    <main>
      <section className={styles.dashboard_page}>
        {user?.name && (
          <div className={`container ${styles.dashboard_page_content}`}>
            <h1>{translations[lang].burger_menu_account.my_account}</h1>
            {/* <MyAccountNavigationLinks /> */}
            <MyAccountMobileSlider />
            <div className={styles.my_account_dashboard_content}>
              <h5 className={styles.my_account_dashboard_content_h}>
                {user?.name ? (
                  <span>
                    {`${translations[lang].my_account.hello} ${user.name}! (${translations[lang].my_account.not} ${user.name}? `}
                  </span>
                ) : (
                  <span>{`${translations[lang].my_account.hello_undefined} `}</span>
                )}
                <button className='accent' onClick={handleLogout}>
                  {translations[lang].my_account.log_out}
                </button>
                {`)`}
              </h5>
              <h5>
                {translations[lang].my_account.from_you_account}
                <Link href='/my-account/orders' className='lowercase accent'>
                  {translations[lang].my_account.recent_orders}
                </Link>
                {translations[lang].my_account.manage_your}
                <Link href='/my-account/addresses' className='lowercase accent'>
                  {translations[lang].my_account.addresses}
                </Link>
                {translations[lang].my_account.and_edit}
                <Link
                  href='/my-account/account-details'
                  className='lowercase accent'
                >
                  {translations[lang].my_account.account_details}.
                </Link>
              </h5>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default MyAccountDashboardPage
