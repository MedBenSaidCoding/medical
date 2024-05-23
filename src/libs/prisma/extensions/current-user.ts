import { getServerSession } from 'next-auth'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

import { authOptions } from '@/libs/auth'
import type { SignInRequestType, SignUpRequestType } from '@/types/models/UsersTypes'

export function currentUser() {
  return Prisma.defineExtension(client => {
    return client.$extends({
      model: {
        user: {
          async current() {
            const session = await getServerSession(authOptions)

            if (!session?.user?.email) {
              return null
            }

            return await client.user.findUnique({
              where: {
                email: session.user.email
              }
            })
          }
        }
      }
    })
  })
}

export function signInUser() {
  return Prisma.defineExtension(client => {
    return client.$extends({
      model: {
        user: {
          async signIn(request: SignInRequestType) {
            if (!request?.email || !request?.password) {
              return null
            }

            const hashedPassword = await hash(request.password, 10)

            return await client.user.findUnique({
              where: {
                email: request.email,
                hashedPassword: hashedPassword
              }
            })
          }
        }
      }
    })
  })
}

export function signUpUser() {
  return Prisma.defineExtension(client => {
    return client.$extends({
      model: {
        user: {
          async signUp(request: SignUpRequestType) {
            if (!request?.email || !request?.password || !request?.name) {
              return null
            }

            const hashedPassword = await hash(request.password, 10)

            return await client.user.create({ data: { email: request?.email, name: request.name, hashedPassword } })
          }
        }
      }
    })
  })
}
