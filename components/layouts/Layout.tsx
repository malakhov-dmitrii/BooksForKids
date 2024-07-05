'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Header from '../modules/header/Header'
import SearchBarMobile from '../modules/header/SearchBarMobile';
import SearchModal from '../modules/header/SearchModal';
import Footer from '../modules/footer/Footer';
import { useUnit } from 'effector-react';
import QuickViewModal from '../modules/quickViewModal/QuickViewModal';
import { $searchModal, $showQuickViewModal } from '@/context/modals/state';
// import { $openAuthPopup, openAuthPopup } from '@/context/auth';
// import AuthPopup from '../templates/profilePage/ProfilePage';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isMedia800 = useMediaQuery(800)
    const isMedia520 = useMediaQuery(520)
    const searchModal = useUnit($searchModal)
    const showQuickViewModal = useUnit($showQuickViewModal)
    // const openAddedToCartMobileModal = useUnit($addedToCartMobileModal)
    // const openAuthPopup = useUnit($openAuthPopup)
    
    return (
    <>
    <Header  />
    {isMedia800 && <SearchBarMobile />}
    {children}
    {/* {openAuthPopup && <AuthPopup />} */}
    {searchModal && <SearchModal />}
    {showQuickViewModal && <QuickViewModal />}
    <Footer />
    {/* {isMedia520 && openAddedToCartMobileModal && <QuickViewModal />} */}
    </> 
)
}
 
export default Layout;