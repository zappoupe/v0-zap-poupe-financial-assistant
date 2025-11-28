import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: perfil } = await supabase
    .from('dados_cliente')
    .select('nomewpp, telefone')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="min-h-screen flex bg-muted/20">
      <DashboardSidebar 
        userName={perfil?.nomewpp || user.email || "Usuário"} 
        userEmail={user.email || ""} 
      />
      <main className="flex-1 lg:ml-64">{children}</main>
    </div>
  )
}