'use client'
import { IAmLoadOneProductFx, IAmLoadProductsByFilterFx, IAmLoadViewedItemsFx } from "@/types/goods"
import { createDomain, createEffect } from "effector"
import toast from "react-hot-toast"
import api from '@/api/apiInstance'
import { createGate } from "effector-react"
import { IAmProduct } from "@/types/common"

export const goods = createDomain()

export const HomePageGate = createGate()

export const setCurrentProduct = goods.createEvent<IAmProduct>()
export const loadOneProduct = goods.createEvent<IAmLoadOneProductFx>()
export const loadProductsByFilter =
  goods.createEvent<IAmLoadProductsByFilterFx>()
export const loadViewedItems = goods.createEvent<IAmLoadViewedItemsFx>()

export const loadProductsByFilterFx = createEffect(
    async ({
      limit,
      offset,
      category,
      isCatalog,
      types,
      additionalParam,
    }: IAmLoadProductsByFilterFx) => {
      try {
        const url = `/api/goods/filter?limit=${limit}&offset=${offset}&category=${category}&${additionalParam}${isCatalog ? '&catalog=true' : ''}${types ? `&types=${types}` : ''}`
  
        // const url = '/api/goods/filter'
        // const params = new URLSearchParams()
  
        // params.set('limit', limit.toString())
        // params.set('offset', offset.toString())
        // params.set('category', category)
  
        // additionalParam && params.set('additionalParam', additionalParam)
        // isCatalog && params.set('isCatalog', isCatalog.toString())
        // types && params.set('types', types)
  
        const { data } = await api.get(url)
  
        return data
      } catch (error) {
        toast.error((error as Error).message)
      }
    }
  )

export const loadOneProductFx = createEffect(
  async ({ productId, category }: IAmLoadOneProductFx) => {
    try {
      const { data } = await api.post('/api/goods/oneProduct', {
        productId,
        category,
      })

      if (data?.message === 'Wrong product id') {
        return { productItem: { errorMessage: 'Wrong product id' } }
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const getProductsFirstPageFx = createEffect(async () => {
  const { data } = await api.get('/api/goods/homePageGoods')

  return data
})

export const loadViewedItemsFx = createEffect(
  async ({ payload }: IAmLoadViewedItemsFx) => {
    try {
      const { data } = await api.post('/api/goods/viewed', { payload })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

