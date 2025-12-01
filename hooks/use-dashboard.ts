import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DashboardData, Transacao, DadosGraficoBarra, DadosGraficoPizza, EventoCalendario } from '@/types/financeiro'

const CATEGORY_COLORS: Record<string, string> = {
  'Alimentação': '#10b981',
  'Transporte': '#6366f1',
  'Moradia': '#8b5cf6',
  'Lazer': '#ec4899',
  'Outros': '#f59e0b',
  'Saúde': '#ef4444'
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    resumo: { saldo: 0, entradas: 0, saidas: 0, contagem: 0 },
    transacoesRecentes: [],
    graficoBarras: [],
    graficoPizza: [],
    eventosCalendario: []
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)

      const [transacoesRes, lembretesRes] = await Promise.all([
        supabase
          .from('financeiro_registros')
          .select('*')
          .order('data_hora', { ascending: false }),
        supabase
          .from('lembretes_registros')
          .select('*')
      ])

      if (transacoesRes.error) throw transacoesRes.error
      if (lembretesRes.error) throw lembretesRes.error

      const transacoes = transacoesRes.data as Transacao[]
      const lembretes = lembretesRes.data || []

      const resumo = transacoes.reduce((acc, t) => {
        const valor = Number(t.valor)
        if (t.tipo === 'entrada' || t.tipo === 'receita') {
          acc.entradas += valor
        } else {
          acc.saidas += valor
        }
        acc.contagem++
        return acc
      }, { saldo: 0, entradas: 0, saidas: 0, contagem: 0 })
      
      resumo.saldo = resumo.entradas - resumo.saidas

      const barrasMap = new Map<string, DadosGraficoBarra>()
      transacoes.forEach(t => {
        try {
          const dateObj = new Date(t.data_hora)
          const mes = dateObj.toLocaleDateString('pt-BR', { month: 'short', timeZone: 'UTC' })
          
          if (!barrasMap.has(mes)) {
            barrasMap.set(mes, { name: mes, entradas: 0, saidas: 0 })
          }
          
          const barra = barrasMap.get(mes)!
          if (t.tipo === 'entrada' || t.tipo === 'receita') {
            barra.entradas += Number(t.valor)
          } else {
            barra.saidas += Number(t.valor)
          }
        } catch (e) {
          console.error("Data inválida na transação:", t)
        }
      })

      const graficoBarras = Array.from(barrasMap.values()).reverse()

      const pizzaMap = new Map<string, number>()
      transacoes
        .filter(t => t.tipo !== 'entrada' && t.tipo !== 'receita')
        .forEach(t => {
          const cat = t.categoria || 'Outros'
          const atual = pizzaMap.get(cat) || 0
          pizzaMap.set(cat, atual + Number(t.valor))
        })
        
      const graficoPizza: DadosGraficoPizza[] = Array.from(pizzaMap.entries()).map(([name, value]) => ({
        name,
        value,
        color: CATEGORY_COLORS[name] || '#94a3b8'
      }))

      const eventosTransacoes: EventoCalendario[] = transacoes.map(t => ({
        id: t.id,
        type: (t.tipo === 'entrada' || t.tipo === 'receita') ? 'receita' : 'gasto',
        title: t.descricao || 'Sem descrição',
        amount: Number(t.valor),
        date: new Date(t.data_hora)
      }))

      const eventosLembretes: EventoCalendario[] = lembretes.map((l: any) => ({
        id: l.id + 100000,
        type: 'alerta',
        title: l.descricao,
        date: new Date(l.data_hora)
      }))

      setData({
        resumo,
        transacoesRecentes: transacoes, 
        graficoBarras,
        graficoPizza,
        eventosCalendario: [...eventosTransacoes, ...eventosLembretes]
      })

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const deleteTransaction = async (id: number) => {
    try {
      const { error } = await supabase
        .from('financeiro_registros')
        .delete()
        .eq('id', id)

      if (error) throw error

      setData(prev => ({
        ...prev,
        transacoesRecentes: prev.transacoesRecentes.filter(t => t.id !== id)
      }))
      
      return { success: true }
    } catch (error: any) {
      console.error('Erro ao deletar transação:', error)
      return { success: false, error: error.message }
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  return { data, loading, refresh: fetchDashboardData, deleteTransaction }
}