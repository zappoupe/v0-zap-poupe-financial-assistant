import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createClient } from "@supabase/supabase-js"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
              }
            }
          )

          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (authError || !authData.user) {
            return null
          }

          const { data: perfil } = await supabase
            .from('dados_cliente')
            .select('*')
            .eq('user_id', authData.user.id)
            .maybeSingle()

          if (!perfil) {
            const { data: perfilEmail } = await supabase
              .from('dados_cliente')
              .select('*')
              .eq('email', credentials.email)
              .maybeSingle()

            if (perfilEmail) {
              await supabase
                .from('dados_cliente')
                .update({ user_id: authData.user.id })
                .eq('email', credentials.email)

              return {
                id: authData.user.id,
                email: authData.user.email!,
                name: perfilEmail.nomewpp || 'Usuário',
                telefone: perfilEmail.telefone || '',
              }
            }

            return null
          }

          return {
            id: authData.user.id,
            email: authData.user.email!,
            name: perfil.nomewpp || 'Usuário',
            telefone: perfil.telefone || '',
          }

        } catch (error) {
          console.error('Erro no authorize:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.telefone = (user as any).telefone
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.telefone = token.telefone as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}