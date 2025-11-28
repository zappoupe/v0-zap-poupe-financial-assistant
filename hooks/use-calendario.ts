import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { EventoCalendario } from '@/types/financeiro'

export function useCalendario() {
  const [eventos, setEventos] = useState<EventoCalendario[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchEventos = useCallback(async () => {
    try {
      setLoading(true)
      
      const [transacoesRes, lembretesRes] = await Promise.all([
        supabase
          .from('financeiro_registros')
          .select('id, descricao, valor, data_hora, tipo'),
        supabase
          .from('lembretes_registros')
          .select('id, descricao, data_hora')
      ])

      const transacoes = transacoesRes.data || []
      const lembretes = lembretesRes.data || []

      const eventosTransacoes: EventoCalendario[] = transacoes.map((t: any) => ({
        id: t.id,
        type: t.tipo === 'entrada' ? 'receita' : 'gasto',
        title: t.descricao || 'Sem descrição',
        amount: Number(t.valor),
        date: new Date(t.data_hora)
      }))

      const eventosLembretes: EventoCalendario[] = lembretes.map((l: any) => ({
        id: l.id + 1000000, 
        type: 'alerta',
        title: l.descricao || 'Lembrete',
        date: new Date(l.data_hora)
      }))

      setEventos([...eventosTransacoes, ...eventosLembretes])

    } catch (error) {
      console.error('Erro ao buscar calendário:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const deletarEvento = async (id: number, type: string) => {
    try {
      let error = null

      if (type === 'alerta') {

        const realId = id - 1000000
        const { error: err } = await supabase
          .from('lembretes_registros')
          .delete()
          .eq('id', realId)
        error = err
      } else {

        const { error: err } = await supabase
          .from('financeiro_registros')
          .delete()
          .eq('id', id)
        error = err
      }

      if (error) throw error

      setEventos(current => current.filter(e => e.id !== id))
      return { success: true }

    } catch (error: any) {
      console.error('Erro ao deletar evento:', error)
      alert("Erro ao excluir: " + error.message)
      return { success: false }
    }
  }

  useEffect(() => {
    fetchEventos()
  }, [fetchEventos])

  return { eventos, loading, refresh: fetchEventos, deletarEvento }
}