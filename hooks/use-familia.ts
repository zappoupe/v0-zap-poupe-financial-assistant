import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { MembroFamilia } from '@/types/financeiro'

export function useFamilia() {
  const [membros, setMembros] = useState<MembroFamilia[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchFamilia = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.rpc('get_detalhes_familia')
      
      if (error) throw error
      const listaMembros = (data as any[]).map(m => ({
        id: m.id,
        nomewpp: m.nomewpp,
        telefone: m.telefone,
        role: m.role as 'admin' | 'membro'
      }))

      setMembros(listaMembros)

    } catch (error) {
      console.error('Erro ao buscar família:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const adicionarMembro = async (nome: string, telefone: string) => {
    try {
      const { data, error } = await supabase.rpc('adicionar_familiar', {
        nome_novo: nome,
        telefone_novo: telefone
      })

      if (error) throw error
      if (data && typeof data === 'object' && 'success' in data && !data.success) {
         throw new Error(data.error || 'Erro ao adicionar')
      }

      await fetchFamilia() 
      return { success: true }
    } catch (error: any) {
      console.error('Erro ao adicionar membro:', error)
      return { success: false, error: error.message }
    }
  }

  useEffect(() => {
    fetchFamilia()
  }, [fetchFamilia])

  return { membros, loading, adicionarMembro }
}