import { NextResponse } from 'next/server'
import prisma from '../../prisma'
import { clerkClient } from '@clerk/nextjs'
import { primaryEmailAddress } from '../../util/user'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return new NextResponse("Not Found", { status: 404 })
  }

  const result = await prisma.user.findUnique({
    where: { username }
  })

  if (result) {
    return NextResponse.json(result)
  }

  const [user] = await clerkClient.users.getUserList({ username: [username]})

  if (!user) {
    return new NextResponse("Not Found", { status: 404 })
  }

  const userResult = await prisma.user.create({
    data: {
      id: user.id,
      email: primaryEmailAddress(user),
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName
    }
  })

  return NextResponse.json(userResult)
}
