import { createClient } from "@/lib/supabase/server"

export async function DashboardHeader() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  let nomeExibicao = 'Usuário'
  if (user) {
    const { data: perfil } = await supabase
      .from('dados_cliente')
      .select('nomewpp')
      .eq('user_id', user.id)
      .single()
    if (perfil?.nomewpp) nomeExibicao = perfil.nomewpp
  }

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-balance">
        Olá, {nomeExibicao}!
      </h1>
      <p className="text-muted-foreground capitalize">{currentDate}</p>
    </div>
  )
}