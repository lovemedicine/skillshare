import { NextResponse } from 'next/server'
import { auth, currentUser } from "@clerk/nextjs"
import prisma from '../prisma'
import { primaryEmailAddress } from '../util/user'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const result = await prisma.userSkill.findMany({
    where: Object.fromEntries(searchParams),
    include: { skill: true },
    orderBy: [
      {
        createdAt: 'desc',
      }
    ]
  })
  return NextResponse.json(result)
}

export async function POST(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const user = await currentUser()

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const json = await request.json()

  const result = await prisma.userSkill.create({
    data: {
      username: user.username,
      type: json.type,
      skill: {
        connectOrCreate: {
          where: { name: json.name },
          create: { name: json.name }
        }
      },
      user: {
        connectOrCreate: {
          where: { username: user.username },
          create: {
            id: user.id,
            username: user.username,
            email: primaryEmailAddress(user),
            firstName: user.firstName,
            lastName: user.lastName
          }
        }
      }
    }
  })

  return NextResponse.json(result)
}

export async function DELETE(request: Request) {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const json = await request.json()
  const result = await prisma.userSkill.delete({
    where: {
      id: json.id,
      userId
    }
  })

  return NextResponse.json(result)
}