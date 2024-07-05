'use client'
import { IAmProduct } from '@/types/common'
import { IAmProducts } from '@/types/goods'
import { Effect } from 'effector'
import {
  setCurrentProduct,
  loadProductsByFilterFx,
  loadOneProductFx,
  goods,
  loadViewedItemsFx,
  getProductsFirstPageFx,
} from '.'

const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message)
    })

export const $homePageGoods = goodsStoreInstance(getProductsFirstPageFx)

export const $currentProduct = goods
  .createStore<IAmProduct>({} as IAmProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

export const $products = goods
  .createStore<IAmProducts>({} as IAmProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)

export const $viewedItems = goods
  .createStore<IAmProducts>({} as IAmProducts)
  .on(loadViewedItemsFx.done, (_, { result }) => result)
