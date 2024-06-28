import { Sort } from 'mongodb'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { checkPriceParam, getCheckedArrayParam } from '@/lib/utils/common'
import { allowedTypes } from '@/constants/product'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || 6
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const typeParam = url.searchParams.get('type')
    const categoryParam = url.searchParams.get('category')
    const priceFromParam = url.searchParams.get('priceFrom')
    const priceToParam = url.searchParams.get('priceTo')
    const typesParam = url.searchParams.get('types')
    // const collectionParam = url.searchParams.get('collection')
    // const isDiscountParam = url.searchParams.get('isDiscount')
    const sortParam = url.searchParams.get('sort') || 'default'
    const isFullPriceRange =
      priceFromParam &&
      priceToParam &&
      checkPriceParam(+priceFromParam) &&
      checkPriceParam(+priceToParam)
    const typesArr = getCheckedArrayParam(typesParam as string)
    const isValidTypes =
      typesArr.length > 0 &&
      typesArr.every((type) => allowedTypes.includes(type))

    const filter = {
      ...(typeParam && { type: typeParam }),
      // ...(isFullPriceRange && {
      //   price: { $gt: +priceFromParam, $lt: +priceToParam },
      // }),

      ...(typesArr.length > 0 && {
        type: { $in: typesArr },
      }),

      //   ...(collectionParam && {
      //     ['characteristics.collection']: collectionParam,
      //   }),
    }

    console.log('filter', filter, { isValidTypes, typesArr })

    const sort = {
      ...(sortParam.includes('cheap_first') && {
        // (if (isDiscountParam) {
        //   price = 1 - (+isDiscountParam/100)})
        price: 1,
      }),
      ...(sortParam.includes('expensive_first') && {
        price: -1,
      }),
      ...(sortParam.includes('new') && {
        isNew: -1,
      }),
      ...(sortParam.includes('bestseller') && {
        isBestSeller: -1,
      }),
      // ...(sortParam.includes('higher_raiting') && {
      //   popularity: -1,
      // }),
    }

    if (isCatalogParam) {
      const getFilteredCollection = async (collection: string) => {
        const goods = await db
          .collection(collection)
          .find(filter)
          .sort(sort as Sort)
          .toArray()

        return goods
      }

      const [russianbooks] = await Promise.allSettled([
        getFilteredCollection('russianbooks'),
      ])

      if (russianbooks.status !== 'fulfilled') {
        return NextResponse.json({
          count: 0,
          items: [],
        })
      }

      const allGoods = [...russianbooks.value].filter((i) => {
        // if at least one is set, continue
        if (priceFromParam || priceToParam) {
          const realPrice = i.isDiscount ? +i.price - +i.isDiscount : +i.price
          return (
            +realPrice >= +(priceFromParam ?? 0) &&
            +realPrice <= +(priceToParam ?? Infinity)
          )
        }

        return true
      })
      // .sort((a, b) => {
      //     if (sortParam.includes('cheap_first')) {
      //       return +a.price - +b.price
      //     }

      //     if (sortParam.includes('expensive_first')) {
      //       return +b.price - +a.price
      //     }

      //     if (sortParam.includes('new')) {
      //       return Number(b.isNew) - Number(a.isNew)
      //     }

      //     if (sortParam.includes('popular')) {
      //       return +b.popularity - +a.popularity
      //     }

      //     return 0
      //   })

      return NextResponse.json({
        count: allGoods.length,
        items: allGoods.slice(+offset, +limit),
      })
    }

    // return NextResponse.json({
    //     count: 0,
    //     items: [],
    //   })

    const currentGoods = await db
      .collection(categoryParam as string)
      .find(filter)
      .sort(sort as Sort)
      .toArray()

    return NextResponse.json({
      count: currentGoods.length,
      items: currentGoods.slice(+offset, +limit),
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'