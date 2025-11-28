import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Transacao } from '@/types/financeiro'

export interface CategoriaGasto {
  category: string
  value: number
  limit: number
  percent: number
  color: string
  items: number
  icon: string
}

export interface ResumoGastos {
  totalAtual: number
  totalAnterior: number
  orcamentoTotal: number
  disponivel: number
  tendencia: number
  categorias: CategoriaGasto[]
  transacoes: Transacao[]
}

const CATEGORY_META: Record<string, { icon: string; color: string; limit: number }> = {
  'Alimentação': { icon: '🍔', color: '#10b981', limit: 2000 },
  'Transporte': { icon: '🚗', color: '#3b82f6', limit: 1000 },
  'Moradia': { icon: '🏠', color: '#8b5cf6', limit: 3000 },
  'Lazer': { icon: '🎮', color: '#ec4899', limit: 500 },
  'Saúde': { icon: '💊', color: '#f59e0b', limit: 600 },
  'Educação': { icon: '📚', color: '#06b6d4', limit: 800 },
  'Compras': { icon: '🛍️', color: '#ef4444', limit: 1000 },
  'Contas': { icon: '⚡', color: '#14b8a6', limit: 1500 },
  'Outros': { icon: '📦', color: '#64748b', limit: 500 }
}

export function useGastos() {
  const [data, setData] = useState<ResumoGastos>({
    totalAtual: 0,
    totalAnterior: 0,
    orcamentoTotal: 0,
    disponivel: 0,
    tendencia: 0,
    categorias: [],
    transacoes: []
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchGastos = useCallback(async () => {
    try {
      setLoading(true)
      
      const hoje = new Date()
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString()
      const inicioMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1).toISOString()
      const fimMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).toISOString()
      const { data: transacoes, error } = await supabase
        .from('financeiro_registros')
        .select('*')
        .or('tipo.eq.saida,tipo.eq.despesa') 
        .gte('data_hora', inicioMesAnterior)
        .order('data_hora', { ascending: false })

      if (error) throw error

      const lista = (transacoes || []) as Transacao[]
      const atuais = lista.filter(t => t.data_hora >= inicioMes)
      const anteriores = lista.filter(t => t.data_hora >= inicioMesAnterior && t.data_hora <= fimMesAnterior)
      const totalAtual = atuais.reduce((acc, t) => acc + Number(t.valor), 0)
      const totalAnterior = anteriores.reduce((acc, t) => acc + Number(t.valor), 0)
      
      const tendencia = totalAnterior > 0 
        ? ((totalAtual - totalAnterior) / totalAnterior) * 100 
        : 0

      const catMap = new Map<string, CategoriaGasto>()

      atuais.forEach(t => {
        const nomeCat = t.categoria || 'Outros'
        const meta = CATEGORY_META[nomeCat] || CATEGORY_META['Outros']
        
        if (!catMap.has(nomeCat)) {
          catMap.set(nomeCat, {
            category: nomeCat,
            value: 0,
            items: 0,
            limit: meta.limit, 
            color: meta.color,
            icon: meta.icon,
            percent: 0
          })
        }

        const cat = catMap.get(nomeCat)!
        cat.value += Number(t.valor)
        cat.items += 1
      })

      const categorias = Array.from(catMap.values()).map(c => ({
        ...c,
        percent: (c.value / c.limit) * 100
      }))

      const orcamentoTotal = categorias.reduce((acc, c) => acc + c.limit, 0) || 5000 
      
      setData({
        totalAtual,
        totalAnterior,
        orcamentoTotal,
        disponivel: orcamentoTotal - totalAtual,
        tendencia,
        categorias,
        transacoes: atuais
      })

    } catch (error) {
      console.error('Erro ao calcular gastos:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchGastos()
  }, [fetchGastos])

  return { data, loading, refresh: fetchGastos }
}