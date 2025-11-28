'use server'

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPerfilUsuario } from "./usuario"

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
  transacoes: any[]
}

const CATEGORY_META = {
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

export async function getDadosGastos(): Promise<ResumoGastos> {
  const perfil = await getPerfilUsuario()
  
  if (!perfil) {
    redirect('/login')
  }

  const supabase = await createClient()

  let telefones = [perfil.telefone]
  if (perfil.family_id) {
    const { data: membros } = await supabase
      .from('dados_cliente')
      .select('telefone')
      .eq('family_id', perfil.family_id)
    
    if (membros) telefones = membros.map(m => m.telefone)
  }

  const hoje = new Date()
  const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString()
  const inicioMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1).toISOString()
  const fimMesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0).toISOString()

  const { data: transacoes } = await supabase
    .from('financeiro_registros')
    .select('*')
    .in('responsavel', telefones)
    .or(`tipo.eq.saida,tipo.eq.despesa`) 
    .gte('data_hora', inicioMesAnterior)
    .order('data_hora', { ascending: false })

  const atuais = transacoes?.filter(t => t.data_hora >= inicioMes) || []
  const anteriores = transacoes?.filter(t => t.data_hora >= inicioMesAnterior && t.data_hora <= fimMesAnterior) || []

  const totalAtual = atuais.reduce((acc, t) => acc + Number(t.valor), 0)
  const totalAnterior = anteriores.reduce((acc, t) => acc + Number(t.valor), 0)
  
  const tendencia = totalAnterior > 0 
    ? ((totalAtual - totalAnterior) / totalAnterior) * 100 
    : 0

  const catMap = new Map<string, CategoriaGasto>()

  atuais.forEach(t => {
    const nomeCat = t.categoria || 'Outros'
    const meta = CATEGORY_META[nomeCat as keyof typeof CATEGORY_META] || CATEGORY_META['Outros']
    
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
  
  return {
    totalAtual,
    totalAnterior,
    orcamentoTotal,
    disponivel: orcamentoTotal - totalAtual,
    tendencia,
    categorias,
    transacoes: atuais
  }
}