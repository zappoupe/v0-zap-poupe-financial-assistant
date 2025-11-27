import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-muted/20">
      <DashboardSidebar />
      <main className="flex-1 lg:ml-64">{children}</main>
    </div>
  )
}
