export interface Transacao {
  id: number
  data_hora: string
  responsavel: string
  categoria: string
  tipo: 'entrada' | 'saida' | 'receita' | 'despesa'
  valor: number
  descricao: string
  criado_em?: string
}

export interface Meta {
  id: number
  titulo: string
  valor_objetivo: number
  valor_atual: number
  data_limite: string
  categoria: string
  icone: string
  status: string
  responsavel: string
}

export interface MembroFamilia {
  id: number
  nomewpp: string
  telefone: string
  role: 'admin' | 'membro'
}

export interface DashboardSummary {
  saldo: number
  entradas: number
  saidas: number
  contagem: number
}

export interface DadosGraficoBarra {
  name: string
  entradas: number
  saidas: number
  [key: string]: string | number
}

export interface DadosGraficoPizza {
  name: string
  value: number
  color: string
  [key: string]: string | number
}

export interface EventoCalendario {
  id: number
  type: "gasto" | "receita" | "evento" | "alerta"
  title: string
  amount?: number
  date: Date
}

export interface DashboardData {
  resumo: DashboardSummary
  transacoesRecentes: Transacao[]
  graficoBarras: DadosGraficoBarra[]
  graficoPizza: DadosGraficoPizza[]
  eventosCalendario: EventoCalendario[]
}
