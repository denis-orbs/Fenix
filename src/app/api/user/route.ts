import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { isAddress } from 'viem'
const prisma = new PrismaClient()
export async function POST(request: NextRequest) {
  try {
    const { account } = await request.json()

    if (!account || !isAddress(account?.toLowerCase())) {
      return NextResponse.json(
        {
          status: 'Invalid address',
        },
        { status: 400 }
      )
    }

    await prisma.users.upsert({
      where: { id: account?.toLowerCase() },
      update: {},
      create: {
        id: account?.toLowerCase(),
      },
    })
    return NextResponse.json(
      {
        status: 'ok',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'Internal Server Error',
      },
      {
        status: 500,
      }
    )
  }
}
