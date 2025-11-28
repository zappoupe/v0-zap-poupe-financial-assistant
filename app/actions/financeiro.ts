'use server'

import { createClient } from "@/lib/supabase/server"
import { Transacao, DadosGraficoBarra, DadosGraficoPizza, EventoCalendario, DashboardData } from "@/types/financeiro"
import { getPerfilUsuario } from "./usuario"

const CATEGORY_COLORS: Record<string, string> = {
  'Alimentação': '#10b981',
  'Transporte': '#6366f1',
  'Moradia': '#8b5cf6',
  'Lazer': '#ec4899',
  'Outros': '#f59e0b',
  'Saúde': '#ef4444'
}

export async function getDadosDashboard(): Promise<DashboardData> {
  const perfil = await getPerfilUsuario()
  
  if (!perfil) {
    return {
      resumo: { saldo: 0, entradas: 0, saidas: 0, contagem: 0 },
      transacoesRecentes: [],
      graficoBarras: [],
      graficoPizza: [],
      eventosCalendario: []
    }
  }

  try {
    const supabase = await createClient()

    let telefonesParaBuscar = [perfil.telefone]

    if (perfil.family_id) {
      const { data: membros } = await supabase
        .from('dados_cliente')
        .select('telefone')
        .eq('family_id', perfil.family_id)
      
      if (membros && membros.length > 0) {
        telefonesParaBuscar = membros.map(m => m.telefone)
      }
    }

    const { data: transacoesData, error: erroTransacoes } = await supabase
      .from('financeiro_registros')
      .select('*')
      .in('responsavel', telefonesParaBuscar)
      .order('data_hora', { ascending: false })

    if (erroTransacoes) {
      console.error("Erro SQL Transações:", erroTransacoes)
      throw new Error("Falha ao buscar dados")
    }

    const { data: lembretesData } = await supabase
      .from('lembretes_registros')
      .select('*')
      .in('responsavel', telefonesParaBuscar)

    const transacoes = (transacoesData || []) as Transacao[]
    
    const resumo = transacoes.reduce((acc, t) => {
      const valor = Number(t.valor)
      if (t.tipo === 'entrada') acc.entradas += valor
      else acc.saidas += valor
      return acc
    }, { saldo: 0, entradas: 0, saidas: 0, contagem: 0 })
    resumo.saldo = resumo.entradas - resumo.saidas

    const barrasMap = new Map<string, DadosGraficoBarra>()
    transacoes.forEach(t => {
      try {
        const data = new Date(t.data_hora)
        const mes = data.toLocaleDateString('pt-BR', { month: 'short' })
        
        if (!barrasMap.has(mes)) {
          barrasMap.set(mes, { name: mes, entradas: 0, saidas: 0 })
        }
        
        const barra = barrasMap.get(mes)!
        if (t.tipo === 'entrada') barra.entradas += Number(t.valor)
        else barra.saidas += Number(t.valor)
      } catch (e) {
        console.error("Erro ao processar transação:", e)
      }
    })
    const graficoBarras = Array.from(barrasMap.values()).reverse()

    const pizzaMap = new Map<string, number>()
    transacoes.filter(t => t.tipo === 'saida').forEach(t => {
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
      type: t.tipo === 'entrada' ? 'receita' : 'gasto',
      title: t.descricao || 'Sem descrição',
      amount: Number(t.valor),
      date: new Date(t.data_hora)
    }))

    const eventosLembretes: EventoCalendario[] = (lembretesData || []).map((l: any) => ({
      id: l.id + 100000,
      type: 'alerta' as const,
      title: l.descricao,
      date: new Date(l.data_hora)
    }))

    return {
      resumo,
      transacoesRecentes: transacoes.slice(0, 5),
      graficoBarras,
      graficoPizza,
      eventosCalendario: [...eventosTransacoes, ...eventosLembretes]
    }

  } catch (error) {
    console.error("Erro geral no Dashboard:", error)
    return {
      resumo: { saldo: 0, entradas: 0, saidas: 0, contagem: 0 },
      transacoesRecentes: [],
      graficoBarras: [],
      graficoPizza: [],
      eventosCalendario: []
    }
  }
}

export async function criarLembrete(formData: FormData) {
  const perfil = await getPerfilUsuario()
  
  if (!perfil) {
    throw new Error('Usuário não autenticado')
  }

  const supabase = await createClient()

  const rawData = {
    descricao: formData.get('title'),
    data_hora: formData.get('date'),
    responsavel: perfil.telefone,
    tipo: formData.get('type')
  }
  
  const { error } = await supabase.from('lembretes_registros').insert([rawData])
  if (error) throw new Error('Falha ao criar lembrete')
}