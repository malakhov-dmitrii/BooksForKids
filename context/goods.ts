'use client'
import { IAmProduct } from '@/types/common';
import { IAmLoadOneProductFx } from '@/types/goods';
import { Effect, createDomain, createEffect, sample } from 'effector';
import { Gate, createGate } from 'effector-react';
import api from '../api/apiInstance'
import toast from 'react-hot-toast';
import { getProductsFirstPageFx } from '@/api/homePage';
import { loadOneProductFx } from '@/api/goods';

// export const loadOneProductFx = createEffect(
//   async ({ productId, category }: IAmLoadOneProductFx) => {
//     console.log('dhgdsgh222')
//       try{
//           const { data } = await api.post('/api/goods/oneProduct', { productId, category })

//           if (data?.message === 'Wrong product id') {
//               return { productItem: { errorMessage: 'Wrong product id'}}
//           }

//           return data
//       } catch (error) {
//           toast.error((error as Error).message)
//   }
// }
// )

const goods = createDomain()

export const HomePageGate = createGate()

export const setCurrentProduct = goods.createEvent<IAmProduct>()
export const loadOneProduct = goods.createEvent<IAmLoadOneProductFx>()

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

  sample({
    clock: loadOneProduct,
    to: loadOneProductFx,
  })