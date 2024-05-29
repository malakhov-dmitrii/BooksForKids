import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthRouteData, parseJwt } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, validatedTokenResult, reqBody, token } = await getAuthRouteData(
      clientPromise,
      req
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    if (Object.keys(reqBody).length < 4) {
      return NextResponse.json({
        message: 'Not all fields passed',
        status: 404,
      })
    }

    const user = await db
      .collection('users')
      .findOne({ email: parseJwt(token as string).email })
    const productItem = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody.productId) })

    if (!productItem) {
      return NextResponse.json({
        message: 'Wrong product id',
        status: 404,
      })
    }

    const newCartItem = {
      userId: user?._id,
      productId: productItem._id,
      image: productItem.images[0],
      name: productItem.name,
      authors: productItem.authors,
      count: reqBody.count,
      price: productItem.price,
      totalPrice: productItem.price,
      inStock: productItem.inStock,
      isDiscount: productItem.isDiscount,
      clientId: reqBody.clientId,
      category: productItem.category,
    }

    // const existingItem = await db.collection('cart').findOne({
    //   $and: [{}]
    // })

    const { insertedId } = await db.collection('cart').insertOne(newCartItem)

    //     await db.collection('cart').updateOne(
    //   { _id: new ObjectId(id) },
    //   {
    //     $set: {
    //       count,
    //     },
    //   }
    // )

    return NextResponse.json({
      status: 201,
      newCartItem: { _id: insertedId, ...newCartItem },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
