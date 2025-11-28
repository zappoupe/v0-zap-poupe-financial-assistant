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

    let { data: perfil, error } = await supabase
      .from('dados_cliente')
      .select('telefone, user_id')
      .eq('user_id', user.id)
      .single()

    if (!perfil) {
      const { data: perfilEmail } = await supabase
        .from('dados_cliente')
        .select('telefone, id')
        .eq('email', user.email)
        .single()

      if (perfilEmail) {
        console.log("Perfil encontrado por e-mail. Vinculando conta...")
        
        await supabase
          .from('dados_cliente')
          .update({ user_id: user.id })
          .eq('email', user.email)
        
        perfil = { telefone: perfilEmail.telefone, user_id: user.id }
      }
    }

    if (!perfil) throw new Error('Perfil não encontrado. Contate o suporte.')
    
    return perfil
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
      alert(error.message)
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
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  useEffect(() => {
    fetchMetas()
  }, [fetchMetas])

  return { metas, loading, criarMeta, deletarMeta }
}