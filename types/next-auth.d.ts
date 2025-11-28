import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    name: string
    telefone: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name: string
      telefone: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    telefone: string
  }
}