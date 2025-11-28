'use server'

import { createClient } from "@/lib/supabase/server"
import { Meta } from "@/types/financeiro"
import { getPerfilUsuario } from "./usuario"

export async function getMetas(): Promise<Meta[]> {
  const supabase = await createClient()
  const perfil = await getPerfilUsuario()
  if (!perfil) return []

  let telefonesParaBuscar = [perfil.telefone]

  if (perfil.family_id) {
    const { data: membros } = await supabase
      .from('dados_cliente')
      .select('telefone')
      .eq('family_id', perfil.family_id)
    
    if (membros && membros.length > 0) {
      telefonesParaBuscar = membros.map(m => m.telefone)
    }
  }

  const { data, error } = await supabase
    .from('financeiro_metas')
    .select('*')
    .in('responsavel', telefonesParaBuscar)
    .order('data_limite', { ascending: true })

  if (error) return []
  return data as Meta[]
}

export async function criarMeta(formData: FormData) {
  const supabase = await createClient()
  const perfil = await getPerfilUsuario()
  if (!perfil) throw new Error('Não autenticado')

  const meta = {
    titulo: formData.get('titulo'),
    valor_objetivo: Number(formData.get('valor_objetivo')),
    valor_atual: Number(formData.get('valor_atual') || 0),
    data_limite: formData.get('data_limite'),
    categoria: formData.get('categoria'),
    icone: 'Target',
    responsavel: perfil.telefone,
    status: 'em_progresso'
  }

  const { error } = await supabase.from('financeiro_metas').insert([meta])
  if (error) throw new Error('Erro ao criar meta')
}

export async function excluirMeta(id: number) {
  const supabase = await createClient()
  await supabase.from('financeiro_metas').delete().eq('id', id)
}