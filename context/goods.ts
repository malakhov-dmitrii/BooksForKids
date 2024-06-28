'use client'
import { IAmProduct } from '@/types/common';
import { IAmLoadOneProductFx, IAmLoadProductsByFilterFx, IAmProducts } from '@/types/goods';
import { Effect, createDomain, createEffect, sample } from 'effector';
import { Gate, createGate } from 'effector-react';
import api from '../api/apiInstance'
import toast from 'react-hot-toast';
import { getProductsFirstPageFx } from '@/api/homePage';
import { loadOneProductFx } from '@/api/goods';

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

const goods = createDomain()

export const HomePageGate = createGate()

export const setCurrentProduct = goods.createEvent<IAmProduct>()
export const loadOneProduct = goods.createEvent<IAmLoadOneProductFx>()
export const loadProductsByFilter = goods.createEvent<IAmLoadProductsByFilterFx>()
// export const loadWatchedProducts = goods.createEvent<IAmLoadWatchedProductsFx>()

const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message)
    })

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    clock: gate.open,
    target: effect,
  })

  export const $homePageGoods = goodsStoreInstance(getProductsFirstPageFx)

  goodsSampleInstance(getProductsFirstPageFx, HomePageGate)

  export const $currentProduct = goods
  .createStore<IAmProduct>({} as IAmProduct)
  .on(setCurrentProduct, (_,product) => product)
  .on(loadOneProductFx.done, (_, {result}) => result.productItem)

  export const $products = goods
  .createStore<IAmProducts>({} as IAmProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)

  sample({
    clock: loadOneProduct,
    source: $currentProduct,
    fn: (_, data) => data,
    target: loadOneProductFx,
  })
  
  sample({
    clock: loadProductsByFilter,
    source: $products,
    fn: (_, data) => data,
    target: loadProductsByFilterFx,
  })
  
  // sample({
  //   clock: loadWatchedProducts,
  //   source: $watchedProducts,
  //   fn: (_, data) => data,
  //   target: loadWatchedProductsFx,
  // })
  