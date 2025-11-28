import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function limparTelefoneParaBanco(telefone: string): string {
  let numeros = telefone.replace(/\D/g, '')
  if (numeros.length <= 11) {
    return `55${numeros}`
  }
  
  return numeros
}

export function formatarTelefoneParaE164(telefone: string): string {
  const numeros = limparTelefoneParaBanco(telefone)
  return `+${numeros}`
}

export function mascaraTelefone(valor: string): string {
  return valor
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
}