"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from "@/app/login/actions"

// REMOVIDO: "Gastos Detalhados"
const navigation = [
  { name: "Resumo Financeiro", href: "/dashboard", icon: "📊" },
  { name: "Relatórios & Análises", href: "/dashboard/relatorios", icon: "📄" },
  { name: "Calendário Financeiro", href: "/dashboard/calendario", icon: "📅" },
  { name: "Metas & Projeções", href: "/dashboard/metas", icon: "🎯" },
  { name: "Plano Família", href: "/dashboard/familia", icon: "👨‍👩‍👧‍👦" },
  { name: "Perfil do Usuário", href: "/dashboard/perfil", icon: "👤" },
]

interface SidebarProps {
  userName: string
  userEmail: string
}

export function DashboardSidebar({ userName }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const userInitials = userName.substring(0, 2).toUpperCase()

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-xl">💬</div>
            <span className="text-xl font-bold">ZapPoupe</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <span>✕</span> : <span>☰</span>}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-200 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center gap-2 px-6 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-xl">💬</div>
            <span className="text-xl font-bold">ZapPoupe</span>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="flex-1">{item.name}</span>
                  {isActive && <span>→</span>}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-lg bg-muted/50">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                {userInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">Premium</p>
              </div>
            </div>
            
            <form action={logout}>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-destructive"
                type="submit"
              >
                <span className="mr-3">🚪</span>
                Sair
              </Button>
            </form>
          </div>
        </div>
      </aside>
    </>
  )
}