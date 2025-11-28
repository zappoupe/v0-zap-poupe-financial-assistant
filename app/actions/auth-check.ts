'use server'

import { createClient } from "@/lib/supabase/server"

export async function verificarPermissaoEmail(email: string) {
  const supabase = await createClient()
  const { data: existe, error } = await supabase.rpc('verificar_email_cliente', {
    email_check: email
  })

  if (error) {
    return { permitido: false, erro: "Erro ao verificar base de dados." }
  }

  if (!existe) {
    return { 
      permitido: false, 
      redirectUrl: "https://lp.zappoupe.com.br/" 
    }
  }

  return { permitido: true }
}