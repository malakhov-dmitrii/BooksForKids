import { setIsAuth } from '@/context/auth'
import { setShouldShowEmptyFavorites } from '@/context/favorites'
// import { setShouldShowEmpty } from '@/context/cart'
import { closeSearchModal } from '@/context/modals'
import { loginCheck } from '@/context/user'
import { IAmCartItem } from '@/types/cart'
import { IAmProduct } from '@/types/common'
import { IAmFavoriteItem } from '@/types/favorites'
import { EventCallable } from 'effector'
import toast from 'react-hot-toast'

export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenToBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
}

export const getWindowWidth = () => {
  const { innerWidth: windowWidth } =
    typeof window !== 'undefined' ? window : { innerWidth: 0 }

  return { windowWidth }
}

export const handleCloseSearchModal = () => {
  closeSearchModal()
  removeOverflowHiddenFromBody()
}

export const shuffle = <T>(array: T[]) => {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

export const formatPrice = (x: number) =>
  x.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export const idGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

// export const handleOpenAuthPopup = () => {
//   addOverflowHiddenToBody()
//   openAuthPopup()
// }

// export const handleCloseAuthPopup = () => {
//   removeOverflowHiddenFromBody()
//   closeAuthPopup()
// }

//   export const closeAuthPopupWhenSomeModalOpened = (
//     showQuickViewModal: boolean
//   ) => {
//     if (showQuickViewModal) {
//       closeAuthPopup()
//       return
//     }
//   handleCloseAuthPopup()
// }
export const isUserAuth = () => {
  const auth = JSON.parse(localStorage.getItem('auth') as string)
  if (!auth?.accessToken) {
    setIsAuth(false)
    return false
  }
  return true
}
export const triggerLoginCheck = () => {
  if (!isUserAuth()) {
    return
  }
  const auth = JSON.parse(localStorage.getItem('auth') as string)
  loginCheck({ jwt: auth.accessToken })
}

export const isItemInListOfFavorites = (
  array: IAmFavoriteItem[],
  productId: string
) => array.some((item) => item.productId === productId)

export const isItemInList = (array: IAmCartItem[], productId: string) =>
  array.some((item) => item.productId === productId)

export const deleteProductFromLS = <T>(
  id: string,
  key: string,
  event: EventCallable<T>,
  setShouldShowEmpty: (arg0: boolean) => void,
  message: string,
  withToast = true
) => {
  let items = JSON.parse(localStorage.getItem(key) as string)

  if (!items) {
    items = []
  }

  const updatedItems = items.filter(
    (item: { clientId: string }) => item.clientId !== id
  )

  localStorage.setItem(key, JSON.stringify(updatedItems))
  event(updatedItems)
  withToast && toast.success(message)

  if (!updatedItems.length) {
    setShouldShowEmpty(true)
  }
}

export const showCountMessage = (count: string, lang: string) => {
  if (count == '11' || count == '12' || count == '13' || count == '14') {
    return lang === 'ru' ? 'товаров' : 'items'
  }
  if (count.endsWith('1')) {
    return lang === 'ru' ? 'товар' : 'item'
  }
  if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
    return lang === 'ru' ? 'товара' : 'items'
  }
  return lang === 'ru' ? 'товаров' : 'items'
}
export const checkOffsetParam = (offset: string | string[] | undefined) =>
  offset && !isNaN(+offset) && +offset >= 0
export const getSearchParamsUrl = () => {
  const paramsString = window.location.search
  const urlParams = new URLSearchParams(paramsString)
  return urlParams
}
export const updateSearchParam = (
  key: string,
  value: string | number,
  pathname: string
) => {
  // const urlParams = getSearchParamsUrl()
  // urlParams.set(key, `${value}`)
  // const newPath = `${pathname}?${urlParams.toString()}`
  // window.history.pushState({ path: newPath }, '', newPath)
  const urlParams = getSearchParamsUrl()

  if (value) {
    urlParams.set(key, `${value}`)
  } else {
    urlParams.delete(key)
  }
  const newPath = `${pathname}?${urlParams.toString()}`
  window.history.pushState({ path: newPath }, '', newPath)
}

export const checkPriceParam = (price: number) =>
  price && !isNaN(price) && price >= 0 && price <= 200

export const getCheckedArrayParam = (param: string): string[] => {
  try {
    const typesArr = JSON.parse(decodeURIComponent(param))

    if (Array.isArray(typesArr) && typesArr.length) {
      return typesArr as string[]
    } else return []
  } catch (error) {
    return []
  }
}

export const getViewedItemsFromLS = () => {
  let viewedItems: IAmProduct[] = JSON.parse(
    localStorage.getItem('watched') as string
  )

  if (!viewedItems || !Array.isArray(viewedItems)) {
    viewedItems = []
  }

  return viewedItems
}

// export const handleCloseShareModal = () => {
//   removeOverflowHiddenFromBody()
//   closeShareModal()
// }
