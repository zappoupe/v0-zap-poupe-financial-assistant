import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Meta } from '@/types/financeiro'

export function useMetas() {
  const [metas, setMetas] = useState<Meta[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Função auxiliar robusta para identificar o usuário
  const getPerfil = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado')

    // Tentativa 1: Busca direta pelo ID (Padrão)
    // Usamos maybeSingle() para evitar o erro 406 se não encontrar
    let { data: perfil } = await supabase
      .from('dados_cliente')
      .select('telefone')
      .eq('user_id', user.id)
      .maybeSingle()

    // Tentativa 2: Se não achou pelo ID, tenta pelo Email (Recuperação)
    if (!perfil && user.email) {
      console.log("Tentando recuperar perfil por e-mail...")
      
      const { data: perfilEmail } = await supabase
        .from('dados_cliente')
        .select('telefone, id')
        .eq('email', user.email)
        .maybeSingle()

      if (perfilEmail) {
        // Se achou pelo email, faz o vínculo do ID para o futuro
        await supabase
          .from('dados_cliente')
          .update({ user_id: user.id })
          .eq('email', user.email)
        
        perfil = { telefone: perfilEmail.telefone }
      }
    }

    if (!perfil) throw new Error('Perfil não encontrado')
    
    return { user, perfil }
  }

  const fetchMetas = useCallback(async () => {
    try {
      setLoading(true)
      const { perfil } = await getPerfil()

      const { data, error } = await supabase
        .from('financeiro_metas')
        .select('*')
        .eq('responsavel', perfil.telefone)
        .order('data_limite', { ascending: true })

      if (error) throw error
      
      setMetas(data as Meta[])
    } catch (error) {
      console.error('Erro ao buscar metas:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const criarMeta = async (novaMeta: any) => {
    try {
      const { perfil } = await getPerfil()

      const { error } = await supabase.from('financeiro_metas').insert([{
        titulo: novaMeta.titulo,
        valor_objetivo: novaMeta.valor_objetivo,
        valor_atual: novaMeta.valor_atual || 0,
        data_limite: novaMeta.data_limite,
        categoria: novaMeta.categoria,
        icone: 'Target',
        status: 'em_progresso',
        responsavel: perfil.telefone
      }])

      if (error) throw error

      await fetchMetas()
      return { success: true }
    } catch (error: any) {
      console.error("Erro ao criar meta:", error)
      return { success: false, error: error.message }
    }
  }

  const deletarMeta = async (id: number) => {
    try {
      const { error } = await supabase
        .from('financeiro_metas')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setMetas(current => current.filter(m => m.id !== id))
      return { success: true }
    } catch (error: any) {
      console.error('Erro ao deletar:', error)
      return { success: false }
    }
  }

  useEffect(() => {
    fetchMetas()
  }, [fetchMetas])

  return { metas, loading, criarMeta, deletarMeta }
}