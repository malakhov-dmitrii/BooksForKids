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

  return { viewedItems }
}
