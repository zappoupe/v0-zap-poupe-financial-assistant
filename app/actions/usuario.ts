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
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data } = await supabase
    .from('dados_cliente')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (data) return data as PerfilUsuario

  if (user.email) {
     const { data: dataEmail } = await supabase
      .from('dados_cliente')
      .select('*')
      .eq('email', user.email)
      .single()
      
     if (dataEmail) return dataEmail as PerfilUsuario
  }

  return null
}

export async function atualizarPerfil(formData: FormData) {
  const supabase = await createClient()
  const telefone = formData.get('telefone') as string
  const nome = formData.get('nome') as string

  const { error } = await supabase
    .from('dados_cliente')
    .update({ nomewpp: nome })
    .eq('telefone', telefone)

  if (error) throw new Error('Erro ao atualizar perfil')
}