export type SignInRequestType = Omit<SignUpRequestType, 'name'>

export type SignUpRequestType = {
  email: string
  password: string
  name: string
}

export type UserCollection = {
  id: string
  name: string
  email: string
  image: string | null
}
