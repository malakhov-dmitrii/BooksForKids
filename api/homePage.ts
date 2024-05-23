import { createEffect } from 'effector'
import api from './apiInstance'

export const getProductsFirstPageFx = createEffect(async () => {
  const { data } = await api.get('/api/goods/homePageGoods')

  return data
})

