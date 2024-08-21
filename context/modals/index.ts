'use client'
import { createDomain } from 'effector'

export const modals = createDomain()

export const openBurger = modals.createEvent()
export const closeBurger = modals.createEvent()
export const openSearchModal = modals.createEvent()
export const closeSearchModal = modals.createEvent()
export const showQuickViewModal = modals.createEvent()
export const closeQuickViewModal = modals.createEvent()
export const openNotifyMeModal = modals.createEvent()
export const closeNotifyMeModal = modals.createEvent()
export const openShareModal = modals.createEvent()
export const closeShareModal = modals.createEvent()
export const openCouponModal = modals.createEvent()
export const closeCouponModal = modals.createEvent()