import { Db, MongoClient, ObjectId } from 'mongodb'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { shuffle } from './common'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: Request | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
  }

  return { db }
}

export const getGoodsForTheHomePage = async (db: Db) => {
  const russianbooks = await db.collection('russianbooks').find().toArray()

  return shuffle([...russianbooks.slice(0, 6)])
}

export const generateTokens = (name: string, email: string) => {
  const accessToken = jwt.sign(
    {
      name,
      email,
    },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    {
      email,
    },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    { expiresIn: '30d' }
  )

  return { accessToken, refreshToken }
}

export const createUserAndGenerateTokens = async (
  db: Db,
  reqBody: { name: string; password: string; email: string }
) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)

  await db.collection('users').insertOne({
    name: reqBody.name,
    password: hash,
    email: reqBody.email,
    image: '',
    role: 'user',
  })

  return generateTokens(reqBody.name, reqBody.email)
}

export const findUserByEmail = async (db: Db, email: string) =>
  db.collection('users').findOne({ email })

export const getUserIdCookie = () => {
  const userIdCookie = cookies().get('userId')

  if (!userIdCookie) {
    const uuid = crypto.randomUUID()
    cookies().set('userId', uuid)

    return uuid
  }

  return userIdCookie?.value
}

export const getAuthRouteData = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  withReqBody = true
) => {
  const { db, reqBody } = await getDbAndReqBody(
    clientPromise,
    withReqBody ? req : null
  )
  const userId = getUserIdCookie()
  const token = req.headers.get('authorization')?.split(' ')[1]
  const validatedTokenResult = await isValidAccessToken(token)

  return {
    db,
    reqBody,
    validatedTokenResult,
    token,
    // userId is null if token is present - needed to add product to cart/favorites without auth
    userId: token ? null : userId,
  }
}

export const isValidAccessToken = async (token: string | undefined) => {
  const baseError = {
    message: 'Unauthorized',
    status: 401,
  }
  let jwtError = null

  if (!token) {
    return {
      ...baseError,
      error: { message: 'jwt is required' },
    }
  }

  await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    async (err: VerifyErrors | null) => {
      if (err) {
        jwtError = err
      }
    }
  )

  if (jwtError) {
    return {
      ...baseError,
      error: jwtError,
    }
  }

  return { status: 200 }
}

export const parseJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

export const getDataFromDBByCollection = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  collection: string
) => {
  const { db, validatedTokenResult, token, userId } = await getAuthRouteData(
    clientPromise,
    req,
    false
  )

  if (validatedTokenResult.status !== 200 && !userId) {
    return NextResponse.json(validatedTokenResult)
  }

  const user = token ? await findUserByEmail(db, parseJwt(token).email) : null
  const items = await db
    .collection(collection)
    .find({ userId: user?._id ?? userId })
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

  return NextResponse.json(items)
}

export const replaceProductsInCollection = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  collection: string
) => {
  const { db, validatedTokenResult, reqBody, token, userId } =
    await getAuthRouteData(clientPromise, req)

  if (validatedTokenResult.status !== 200 && !userId) {
    return NextResponse.json(validatedTokenResult)
  }

  if (!reqBody.items) {
    return NextResponse.json({
      message: 'items fields is required',
      status: 404,
    })
  }

  const user = token
    ? await db.collection('users').findOne({ email: parseJwt(token).email })
    : null

  const items = (reqBody.items as { productId: string }[]).map((item) => ({
    userId: user?._id ?? userId,
    ...item,
    productId: new ObjectId(item.productId),
  }))

  await db.collection(collection).deleteMany({ userId: user?._id ?? userId })

  if (!items.length) {
    return NextResponse.json({
      status: 201,
      items: [],
    })
  }

  await db.collection(collection).insertMany(items)

  return NextResponse.json({
    status: 201,
    items,
  })
}

export const deleteProduct = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  id: string,
  collection: string
) => {
  const { db, validatedTokenResult, userId } = await getAuthRouteData(
    clientPromise,
    req,
    false
  )

  if (validatedTokenResult.status !== 200 && !userId) {
    return NextResponse.json(validatedTokenResult)
  }

  await db.collection(collection).deleteOne({ _id: new ObjectId(id) })

  return NextResponse.json({ status: 204, id })
}