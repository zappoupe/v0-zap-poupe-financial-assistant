import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Meta } from '@/types/financeiro'

export function useMetas() {
  const [metas, setMetas] = useState<Meta[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const getPerfilSeguro = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || !user.email) throw new Error('Usuário não logado')

    const { data: perfilData, error } = await supabase.rpc('get_meu_perfil')
    
    if (error) {
      console.error("Erro RPC:", error)
      throw new Error("Erro ao buscar perfil.")
    }

    if (perfilData) return perfilData

    const { data: perfilEmail } = await supabase
      .from('dados_cliente')
      .select('telefone, user_id')
      .eq('email', user.email)
      .single()

    if (perfilEmail) {
        if (!perfilEmail.user_id) {
            await supabase
              .from('dados_cliente')
              .update({ user_id: user.id })
              .eq('email', user.email)
        }
        return perfilEmail
    }
    
    throw new Error('Perfil não encontrado.')
  }

  const fetchMetas = useCallback(async () => {
    try {
      setLoading(true)
      const perfil = await getPerfilSeguro()

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
      const perfil = await getPerfilSeguro()

      const { error } = await supabase.from('financeiro_metas').insert([{
        ...novaMeta,
        responsavel: perfil.telefone,
        status: 'em_progresso',
        icone: 'Target'
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