// Next Imports
import { NextResponse } from 'next/server'

import db from '@/libs/prisma/db'

import type { UserCollection } from '@/types/models/UsersTypes'

type ResponseUser = Omit<UserCollection, 'hashedPassword'>

export async function POST(req: Request) {
  // Vars
  const { email, password } = await req.json()
  const user = await db.user.signIn({ email: email, password: password })

  let response: null | ResponseUser = null

  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword: _, ...filteredUserData } = user

    response = {
      ...filteredUserData
    }

    return NextResponse.json(response)
  } else {

    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: ['Email or Password is invalid']
      },
      {
        status: 401,
        statusText: 'Unauthorized Access'
      }
    )
  }
}
