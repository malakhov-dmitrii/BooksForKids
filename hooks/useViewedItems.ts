import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { loadViewedItems } from '@/context/goods'
import { $viewedItems } from '@/context/goods/state'
import { getViewedItemsFromLS } from '@/lib/utils/common'

export const useViewedItems = (excludedProductId?: string) => {
  const viewedItems = useUnit($viewedItems)

  useEffect(() => {
    const viewedItems = getViewedItemsFromLS()

    loadViewedItems({
      payload: excludedProductId
        ? viewedItems.filter((item) => item._id !== excludedProductId)
        : viewedItems,
    })
  }, [excludedProductId])

  const markAsViewed = ({
    category,
    _id,
  }: {
    category: string
    _id: string
  }) => {
    const viewedItems = getViewedItemsFromLS()
    const isInViewed = viewedItems.find((item) => item._id === _id)

    if (isInViewed) {
      return
    }

    localStorage.setItem(
      'viewed',
      JSON.stringify([...viewedItems, { category, _id }])
    )
  }

  return { viewedItems, markAsViewed }
}