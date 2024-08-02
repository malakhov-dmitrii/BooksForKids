'use client'
import { closeBurger, 
  closeCouponModal, 
  closeNotifyMeModal, 
  closeQuickViewModal, 
  closeSearchModal, 
  closeShareModal, 
  modals, 
  openBurger, 
  openCouponModal, 
  openNotifyMeModal, 
  openSearchModal, 
  openShareModal, 
  showQuickViewModal } from '.'

export const $burgerIsOpen = modals
  .createStore(false)
  .on(openBurger, () => true)
  .on(closeBurger, () => false)

export const $searchModal = modals
.createStore(false)
.on(openSearchModal, () => true)
.on(closeSearchModal, () => false)

export const $showQuickViewModal = modals
.createStore(false)
.on(showQuickViewModal, () => true)
.on(closeQuickViewModal, () => false)

export const $shareModal = modals
  .createStore(false)
  .on(openShareModal, () => true)
  .on(closeShareModal, () => false)

export const $notifyMeModal = modals
.createStore(false)
.on(openNotifyMeModal, () => true)
.on(closeNotifyMeModal, () => false)

export const $couponModal = modals
  .createStore(false)
  .on(openCouponModal, () => true)
  .on(closeCouponModal, () => false)
