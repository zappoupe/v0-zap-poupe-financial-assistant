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