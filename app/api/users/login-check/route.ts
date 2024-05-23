import clientPromise from '@/lib/mongodb'
import { getAuthRouteData, findUserByEmail, parseJwt } from '@/lib/utils/api-routes'
import { IAmUser } from '@/types/user'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        const { db, validatedTokenResult, token } = await getAuthRouteData(
            clientPromise,
            req,
            false
        )

        if (validatedTokenResult.status !== 200) {
            return NextResponse.json(validatedTokenResult)
        }
        
        const user = (await findUserByEmail(
        db, 
        parseJwt(token as string).email
        )) as unknown as IAmUser
        
        return NextResponse.json({ 
            status: 200, 
            message: 'token is valid', 
            user: { email: user.email, name: user.name, _id: user?._id },
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const dynamic = 'force-dynamic'
