'use client'
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { useUnit } from "effector-react"
import { EarthoOneProvider } from '@eartho/one-client-react'
import { Next13ProgressBar } from 'next13-progressbar'
import { closeQuickViewModal } from "@/context/modals"
import Layout from "./Layout"
import { removeOverflowHiddenFromBody } from "@/lib/utils/common"
import CookieAlert from "../modules/cookieAlert/CookieAlert"
import { $showQuickViewModal } from "@/context/modals/state"
import '@/context/goods/init'
import '@/context/auth/init'
import '@/context/cart/init'
import '@/context/favorites/init'
import '@/context/user/init'



const PagesLayout = ({ children }: { children: React.ReactNode }) => {
const showQuickViewModal = useUnit($showQuickViewModal)
const [isClient, setIsClient] = useState(false)
const [cookieAlertOpen, setCookieAlertOpen] = useState(false)

useEffect(() => setIsClient(true), [])

const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

useEffect(() => {
  const checkCookie = document.cookie.indexOf('CookieBy=RussianBooks4Kids')
  checkCookie != -1
    ? setCookieAlertOpen(false)
    : setTimeout(() => setCookieAlertOpen(true), 3000)
}, [])

    return (
      <>
      {/* {isClient ? (
          <EarthoOneProvider 
          clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`} domain='http://localhost:3000/'
          > */}
      <html lang='en>'>
      <body>
      <Next13ProgressBar height='4px' color='var(--color-Accent)' showOnShallow />
      <Layout>{children}</Layout>
      <div className={`quick_view_modal_overlay ${
          showQuickViewModal ? 'overlay_active': ''
      }`}
      onClick={handleCloseQuickViewModal}
      />
      {cookieAlertOpen && 
      (<CookieAlert setCookieAlertOpen={setCookieAlertOpen} />)
      }
      <Toaster position='top-center' reverseOrder={false} />
      </body>
      </html>
      {/* </EarthoOneProvider>
      ) : (
          <html lang='en'>
          <body>
            <></>
          </body>
        </html>
      )} */}
      </>
     );
};
 
export default PagesLayout;