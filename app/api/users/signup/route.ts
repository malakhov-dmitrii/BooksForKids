import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  createUserAndGenerateTokens,
  getDbAndReqBody,
  getUserIdCookie,
} from '@/lib/utils/api-routes'
import { Db, Document, WithId } from 'mongodb'

const syncCart = async (db: Db, user: WithId<Document>, userId: string) => {
  const tempCart = await db
    .collection('cart')
    .find({ userId: userId })
    .project({
      inStock: 1,
      _id: 1,
      productId: 1,
      image: 1,
      name: 1,
      authors: 1,
      price: 1,
      isDiscount: 1,
      category: 1,
      count: 1,
    })
    .toArray()

  if (tempCart.length > 0) {
    await db.collection('cart').insertMany(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tempCart.map(({ _id, ...item }) => ({ ...item, userId: user?._id }))
    )
    await db.collection('cart').deleteMany({ userId: userId })
  }
}

export async function POST(req: Request) {
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

  const userId = getUserIdCookie()
  let user = await findUserByEmail(db, reqBody.email)

  if (user) {
    return NextResponse.json({
      warningMessage: 'User already exists',
    })
  }

  const tokens = await createUserAndGenerateTokens(db, reqBody)
  user = await findUserByEmail(db, reqBody.email)

  if (user) {
    await syncCart(db, user, userId)
  }
  return NextResponse.json(tokens)
}

// import { NextResponse } from 'next/server'
// import clientPromise from '@/lib/mongodb'
// import {
//   createUserAndGenerateTokens,
//   findUserByEmail,
//   getDbAndReqBody,
// } from '@/lib/utils/api-routes'

// export async function POST(req: Request) {
//   try {
//     const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
//     const user = await findUserByEmail(db, reqBody.email)

//     if (user) {
//       return NextResponse.json({
//         warningMessage: 'User already exists',
//       })
//     }

//     const tokens = await createUserAndGenerateTokens(db, reqBody)

//     return NextResponse.json(tokens)
//   } catch (error) {
//     throw new Error((error as Error).message)
//   }
// }
