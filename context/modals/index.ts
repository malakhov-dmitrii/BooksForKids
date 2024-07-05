'use client'
import { createDomain } from 'effector'

export const modals = createDomain()

export const openBurger = modals.createEvent()
export const closeBurger = modals.createEvent()
export const openSearchModal = modals.createEvent()
export const closeSearchModal = modals.createEvent()
export const showQuickViewModal = modals.createEvent()
export const closeQuickViewModal = modals.createEvent()
export const openAddedToCartMobileModal = modals.createEvent()
export const closeAddedToCartMobileModal = modals.createEvent()