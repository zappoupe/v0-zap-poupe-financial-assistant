import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface Perfil {
  id: number
  nomewpp: string
  telefone: string
  email?: string
  user_id?: string
  trial_ended?: string
  atendimento_ia?: string
  family_id?: string
}

export function usePerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchPerfil = useCallback(async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      let { data: dataRpc, error } = await supabase.rpc('get_meu_perfil')
      let perfilData = dataRpc as Perfil

      if (!perfilData || (Object.keys(perfilData).length === 0)) {
         const { data: perfilEmail } = await supabase
            .from('dados_cliente')
            .select('*')
            .eq('email', user.email)
            .single()
         
         if (perfilEmail) {
             console.log("Vinculando perfil desconectado...")
             await supabase
               .from('dados_cliente')
               .update({ user_id: user.id })
               .eq('email', user.email)
             
             perfilData = perfilEmail as Perfil
         }
      }

      if (perfilData) {
        setPerfil(perfilData)
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchPerfil()
  }, [fetchPerfil])

  return { perfil, loading, refetch: fetchPerfil }
}