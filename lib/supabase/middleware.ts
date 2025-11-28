import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // IMPORTANTE: Não use getUser() aqui para evitar chamadas excessivas ao banco no middleware
  // Use getSession() que valida apenas o JWT localmente (mais rápido e evita loops)
  const { data: { session } } = await supabase.auth.getSession()

  const path = request.nextUrl.pathname

  // Proteção: Se não tem sessão e tenta ir para dashboard -> Login
  if (path.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirecionamento: Se tem sessão e tenta ir para login -> Dashboard
  if ((path === '/login' || path === '/cadastro') && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}