import LoginPage from '@/components/templates/loginPage/LoginPage'
import clientPromise from '@/lib/mongodb'
import { generateTokens } from '@/lib/utils/api-routes'
import { OAuth2Client } from 'google-auth-library'

const redirectUri = 'http://localhost:3000/login'

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
)

function createAuthUrl() {
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    redirect_uri: redirectUri,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  })
  return authUrl
}

const handleLogin = async (code: string) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  const { tokens } = await client.getToken(code)

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  if (!payload) {
    throw new Error('No payload')
  }

  const name = payload.name ?? 'n/a'
  const email = payload.email ?? ''

  let user = await db.collection('users').findOne({ email })

  if (!user) {
    await db.collection('users').insertOne({
      name,
      email,
      isOAuth: true,
    })

    user = await db.collection('users').findOne({ email })
  }

  const dbTokens = generateTokens(name, email)

  return dbTokens
}

export default async function Login(params: {
  searchParams: { code: string }
}) {
  const { code } = params.searchParams
  const authUrl = createAuthUrl()

  if (!code) {
    return <LoginPage authUrl={authUrl} />
  }

  try {
    const dbTokens = await handleLogin(code)
    return <LoginPage authUrl={authUrl} payload={dbTokens} />
  } catch (error) {
    console.log('ERROR', error)
    return <LoginPage authUrl={authUrl} />
  }
}
