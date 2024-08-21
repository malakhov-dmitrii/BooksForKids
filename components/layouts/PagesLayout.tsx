'use client'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useUnit } from 'effector-react'
import { Next13ProgressBar } from 'next13-progressbar'
import {
  closeNotifyMeModal,
  closeQuickViewModal,
  openNotifyMeModal,
} from '@/context/modals'
import Layout from './Layout'
import {
  handleCloseCouponModal,
  handleCloseShareModal,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import CookieAlert from '../modules/cookieAlert/CookieAlert'
import {
  $showQuickViewModal,
  $shareModal,
  $notifyMeModal,
  $couponModal,
} from '@/context/modals/state'
import '@/context/goods/init'
import '@/context/auth/init'
import '@/context/favorites/init'
import '@/context/user/init'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const showQuickViewModal = useUnit($showQuickViewModal)
  const notifyMeModal = useUnit($notifyMeModal)
  const shareModal = useUnit($shareModal)
  const couponModal = useUnit($couponModal)
  const [isClient, setIsClient] = useState(false)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)

  useEffect(() => setIsClient(true), [])

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseNotifyMeModal = () => {
    removeOverflowHiddenFromBody()
    closeNotifyMeModal()
  }

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=RussianBooks4Kids')
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)
  }, [])

  return (
    <>
      <html lang='en>'>
        <body>
          <Next13ProgressBar
            height='4px'
            color='var(--color-Accent)'
            showOnShallow
          />

          <QueryClientProvider client={queryClient}>
            <Layout>{children}</Layout>
          </QueryClientProvider>
          <div
            className={`quick_view_modal_overlay ${
              showQuickViewModal ? 'overlay_active' : ''
            }`}
            onClick={handleCloseQuickViewModal}
          />
          <div
            className={`share_modal_overlay ${
              shareModal ? 'overlay_active' : ''
            }`}
            onClick={handleCloseShareModal}
          />
          <div
            className={`coupon_modal_overlay ${
              couponModal ? 'overlay_active' : ''
            }`}
            onClick={handleCloseCouponModal}
          />
          <div
            className={`notify_me_modal_overlay ${
              notifyMeModal ? 'overlay_active' : ''
            }`}
            onClick={handleCloseNotifyMeModal}
          />
          {cookieAlertOpen && (
            <CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
          )}
          <Toaster position='top-center' reverseOrder={false} />
        </body>
      </html>
    </>
  )
}

export default PagesLayout
