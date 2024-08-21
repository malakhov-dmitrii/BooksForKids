import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthRouteData, parseJwt } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody, token, userId, validatedTokenResult } =
      await getAuthRouteData(clientPromise, req)

    if (validatedTokenResult.status !== 200 && !userId) {
      return NextResponse.json(validatedTokenResult)
    }

    if (Object.keys(reqBody).length < 4) {
      return NextResponse.json({
        message: 'Not all fields passed',
        status: 404,
      })
    }

    const user = token
      ? await db.collection('users').findOne({ email: parseJwt(token).email })
      : null
    const productItem = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody._id) })

    if (!productItem) {
      return NextResponse.json({
        message: 'Wrong product id',
        status: 404,
      })
    }

    // Check if the product already exists in the cart
    const existingCartItem = await db.collection('cart').findOne({
      userId: user?._id ?? userId,
      productId: productItem._id,
    })

    if (existingCartItem) {
      // Update the count of the existing item
      const updatedCount = (existingCartItem.count ?? 1) + (reqBody.count ?? 1)

      const { modifiedCount } = await db.collection('cart').updateOne(
        { _id: existingCartItem._id },
        {
          $set: {
            count: updatedCount,
            totalPrice: productItem.price * updatedCount,
          },
        }
      )

      console.log({ modifiedCount })

      if (modifiedCount === 1) {
        return NextResponse.json({
          status: 200,
          message: 'Cart item updated successfully',
          newCartItem: {
            ...existingCartItem,
            count: updatedCount,
            totalPrice: productItem.price * updatedCount,
          },
        })
      } else {
        return NextResponse.json({
          status: 500,
          message: 'Failed to update cart item',
        })
      }
    } else {
      // Create a new cart item
      const newCartItem = {
        userId: user?._id ?? userId,
        productId: productItem._id,
        image: productItem.images[0],
        name: productItem.name,
        authors: productItem.authors,
        count: reqBody.count ?? 1,
        price: productItem.price,
        totalPrice: productItem.price * (reqBody.count ?? 1),
        inStock: productItem.inStock,
        isDiscount: productItem.isDiscount,
        clientId: reqBody.clientId,
        category: productItem.category,
      }

      const { insertedId } = await db.collection('cart').insertOne(newCartItem)
      return NextResponse.json({
        status: 201,
        newCartItem: { _id: insertedId, ...newCartItem },
      })
    }
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

/**
 * {
 *  id: string
 *  title: string
 *  imageUrl: string
 *  body: string - markdown
 *  publishedAt: string
 *  tags: string[]
 * }
 */
