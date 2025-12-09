'use server'

import { createClient } from "@/lib/supabase/server"

export interface PerfilUsuario {
  id: number
  nomewpp: string
  telefone: string
  email: string
  trial_ended: string | null
  atendimento_ia: string
  family_id?: string
  user_id?: string
}

export async function getPerfilUsuario(): Promise<PerfilUsuario | null> {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) return null

    const { data, error } = await supabase
      .from('dados_cliente')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error || !data) return null

    return data as PerfilUsuario
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }
}

export async function atualizarPerfil(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autorizado')

  const telefone = formData.get('telefone') as string
  const nome = formData.get('nome') as string

  const { error } = await supabase
    .from('dados_cliente')
    .update({ nomewpp: nome })
    .eq('telefone', telefone)
    .eq('user_id', user.id)

  if (error) throw new Error('Erro ao atualizar perfil')
}

export async function atualizarSenha(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'As senhas não coincidem' }
  }

  if (password.length < 6) {
    return { error: 'A senha deve ter no mínimo 6 caracteres' }
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}