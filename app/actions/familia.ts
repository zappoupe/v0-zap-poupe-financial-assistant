'use server'

import { createClient } from "@/lib/supabase/server"
import { MembroFamilia } from "@/types/financeiro"
import { getPerfilUsuario } from "./usuario"

export async function getMembrosFamilia(): Promise<MembroFamilia[]> {
  const supabase = await createClient()
  const perfil = await getPerfilUsuario()
  if (!perfil) return []

  let familyId = perfil.family_id

  if (!familyId) {
    const { data: plano } = await supabase
      .from('planos_familia')
      .select('id')
      .eq('admin_telefone', perfil.telefone)
      .single()
    
    if (plano) familyId = plano.id
  }

  if (!familyId) return [{ ...perfil, role: 'admin' }]

  const { data: membros } = await supabase
    .from('dados_cliente')
    .select('*')
    .eq('family_id', familyId)

  const { data: adminPlano } = await supabase
    .from('planos_familia')
    .select('admin_telefone')
    .eq('id', familyId)
    .single()

  if (!membros) return []

  return membros.map(m => ({
    id: m.id,
    nomewpp: m.nomewpp,
    telefone: m.telefone,
    role: m.telefone === adminPlano?.admin_telefone ? 'admin' : 'membro'
  }))
}

export async function adicionarMembro(formData: FormData) {
  const supabase = await createClient()
  const perfil = await getPerfilUsuario()
  if (!perfil) throw new Error('Não autenticado')

  const nome = formData.get('nome') as string
  const telefone = formData.get('telefone') as string

  let { data: plano } = await supabase
    .from('planos_familia')
    .select('id, limite_linhas')
    .eq('admin_telefone', perfil.telefone)
    .single()

  if (!plano) {
    const { data: novoPlano, error } = await supabase
      .from('planos_familia')
      .insert([{ admin_telefone: perfil.telefone, limite_linhas: 3 }])
      .select('id, limite_linhas')
      .single()
    
    if (error || !novoPlano) throw new Error('Erro ao criar plano família')
    plano = novoPlano

    await supabase
      .from('dados_cliente')
      .update({ family_id: plano.id })
      .eq('telefone', perfil.telefone)
  }

  if (!plano) throw new Error('Falha ao identificar plano familiar')

  const { count } = await supabase
    .from('dados_cliente')
    .select('*', { count: 'exact', head: true })
    .eq('family_id', plano.id)

  if ((count || 0) >= (plano.limite_linhas || 3)) {
    throw new Error('Limite de membros atingido')
  }

  const { data: usuarioExistente } = await supabase
    .from('dados_cliente')
    .select('id')
    .eq('telefone', telefone)
    .single()

  if (usuarioExistente) {
    await supabase
      .from('dados_cliente')
      .update({ family_id: plano.id })
      .eq('telefone', telefone)
  } else {
    await supabase.from('dados_cliente').insert([{
      nomewpp: nome,
      telefone: telefone,
      family_id: plano.id,
      atendimento_ia: 'ativo',
      trial_ended: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }])
  }
}