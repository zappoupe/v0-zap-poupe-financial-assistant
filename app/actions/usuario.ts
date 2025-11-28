'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
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
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) return null

    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('dados_cliente')
      .select('*')
      .eq('user_id', session.user.id)
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
  const telefone = formData.get('telefone') as string
  const nome = formData.get('nome') as string

  const { error } = await supabase
    .from('dados_cliente')
    .update({ nomewpp: nome })
    .eq('telefone', telefone)

  if (error) throw new Error('Erro ao atualizar perfil')
}