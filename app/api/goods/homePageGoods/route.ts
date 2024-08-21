import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getDbAndReqBody, getGoodsForTheHomePage } from "@/lib/utils/api-routes";

export async function GET() {
    const { db } = await getDbAndReqBody(clientPromise, null)
    
    return NextResponse.json(await getGoodsForTheHomePage(db))
}