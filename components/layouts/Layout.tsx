'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from '../modules/header/Header'
import SearchBarMobile from '../modules/header/SearchBarMobile';
import SearchModal from '../modules/header/SearchModal';
import Footer from '../modules/footer/Footer';
import { useUnit } from 'effector-react';
import QuickViewModal from '../modules/quickViewModal/QuickViewModal';
import { $couponModal, $notifyMeModal, $searchModal, $shareModal, $showQuickViewModal } from '@/context/modals/state';
import NotifyMeModal from '../modules/notifyMeModal/NotifyMeModal';
import ShareModal from '../modules/shareModal/ShareModal';
import ApplyCouponBlockModal from '../modules/checkoutPage/applyCouponBlockModal/ApplyCouponBlockModal';
// import { $openAuthPopup, openAuthPopup } from '@/context/auth';
// import AuthPopup from '../templates/profilePage/ProfilePage';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isMedia800 = useMediaQuery(800)
    const isMedia520 = useMediaQuery(520)
    const searchModal = useUnit($searchModal)
    const shareModal = useUnit($shareModal)
    const couponModal = useUnit($couponModal)
    const showQuickViewModal = useUnit($showQuickViewModal)
    const notifyMeModal = useUnit($notifyMeModal)
    // const openAuthPopup = useUnit($openAuthPopup)
    
    return (
    <>
    <Header  />
    {isMedia800 && <SearchBarMobile />}
    {children}
    {/* {openAuthPopup && <AuthPopup />} */}
    {searchModal && <SearchModal />}
    {shareModal && <ShareModal />}
    {showQuickViewModal && <QuickViewModal />}
    {notifyMeModal && <NotifyMeModal />}
    {couponModal && <ApplyCouponBlockModal />}
    <Footer />
    </> 
)
}
 
export default Layout;