import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function DashboardHeader() {
  const session = await getServerSession(authOptions)
  
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-balance">
        Olá, {session?.user?.name || 'Usuário'}!
      </h1>
      <p className="text-muted-foreground capitalize">{currentDate}</p>
    </div>
  )
}