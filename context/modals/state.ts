'use client'
import { closeAddedToCartMobileModal, closeBurger, closeQuickViewModal, closeSearchModal, modals, openAddedToCartMobileModal, openBurger, openSearchModal, showQuickViewModal } from '.'

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

export const $addedToCartMobileModalIsOpen = modals
.createStore(false)
.on(openAddedToCartMobileModal, () => true)
.on(closeAddedToCartMobileModal, () => false)

// export const $shareModal = modals
//   .createStore(false)
//   .on(openShareModal, () => true)
//   .on(closeShareModal, () => false)
