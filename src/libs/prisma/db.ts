import { SignInRequestType, SignUpRequestType } from '@/types/models/UsersTypes'
import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'

const prismaClientSingleton = () => {
  const prisma = new PrismaClient().$extends({
    model: {
      user: {
        async signUp(request: SignUpRequestType) {
          if (!request?.email || !request?.password || !request?.name) {
            return null
          }

          const hashedPassword = await hash(request.password, 10)

          return await prisma.user.create({ data: { email: request?.email, name: request.name, hashedPassword } })
        },
        async signIn(request: SignInRequestType) {
          if (!request?.email || !request?.password) {
            return null
          }

          const searchedUser = await prisma.user.findUnique({
            where: {
              email: request.email,
            }
          })

          if (!searchedUser) {
            return null
          }
          const match = await compare(request.password, searchedUser?.hashedPassword as string)
          if(!match)
          {
            return null
          }

          return searchedUser
        },

      }
    }
  })

  return prisma
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
