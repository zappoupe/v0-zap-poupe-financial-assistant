export interface Transacao {
  id: number
  created_at?: string
  data_hora: string
  responsavel: string
  categoria: string
  tipo: 'entrada' | 'saida'
  valor: number
  descricao: string
}

export interface ResumoFinanceiro {
  saldo: number
  entradas: number
  saidas: number
}