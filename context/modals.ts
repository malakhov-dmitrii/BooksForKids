import { createDomain } from 'effector';

const modals = createDomain()

export const openBurger = modals.createEvent()
export const closeBurger = modals.createEvent()
export const openSearchModal = modals.createEvent()
export const closeSearchModal = modals.createEvent()
export const showQuickViewModal = modals.createEvent()
export const closeQuickViewModal = modals.createEvent()

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