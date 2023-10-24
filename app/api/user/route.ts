import { NextResponse } from 'next/server'
import prisma from '../../prisma'
import { clerkClient } from '@clerk/nextjs'
import { primaryEmailAddress } from '../../util/user'

export async function findUserOrClerkUser(params: { userId?: string, username?: string }) {
  const result = await prisma.user.findUnique({
    where: params
  })

  if (result) {
    return result
  }

  let user

  if (params.userId) {
    user = await clerkClient.users.getUser(params.userId)
  } else if (params.username) {
    [user] = await clerkClient.users.getUserList({ username: [params.username]})
  } else {
    return false
  }

  if (!user) {
    return false
  }

  const newResult = await prisma.user.create({
    data: {
      id: user.id,
      email: primaryEmailAddress(user),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }
  })

  return newResult
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return new NextResponse("Not Found", { status: 404 })
  }

  const result = await findUserOrClerkUser({ username })

  if (!result) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.json(result)
}
