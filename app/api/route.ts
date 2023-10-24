import { NextResponse } from 'next/server'
import { auth, currentUser } from "@clerk/nextjs"
import prisma from '../prisma'

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
  const json = await request.json()

  const result = await prisma.userSkill.create({
    data: {
      username: user.username,
      userId: userId,
      type: json.type,
      skill: {
        connectOrCreate: {
          where: { name: json.name },
          create: { name: json.name }
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
      userId: userId
    }
  })
  return NextResponse.json(result)
}